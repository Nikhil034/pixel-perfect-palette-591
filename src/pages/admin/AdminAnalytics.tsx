import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Eye, TrendingUp, Users, Globe, Clock } from "lucide-react";

interface VisitData {
  date: string;
  visits: number;
  uniqueVisitors: number;
}

interface PageData {
  page: string;
  visits: number;
}

const AdminAnalytics = () => {
  const [dailyData, setDailyData] = useState<VisitData[]>([]);
  const [topPages, setTopPages] = useState<PageData[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    avgSessionPages: 0,
    topReferrers: [] as { referrer: string; count: number }[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: visits } = await supabase
      .from("page_visits")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    if (!visits) {
      setIsLoading(false);
      return;
    }

    // Daily breakdown
    const dailyMap = new Map<string, { visits: number; visitors: Set<string> }>();
    visits.forEach((v) => {
      const date = new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { visits: 0, visitors: new Set() });
      }
      const entry = dailyMap.get(date)!;
      entry.visits++;
      if (v.visitor_id) entry.visitors.add(v.visitor_id);
    });

    setDailyData(
      Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        visits: data.visits,
        uniqueVisitors: data.visitors.size,
      }))
    );

    // Top pages
    const pageMap = new Map<string, number>();
    visits.forEach((v) => {
      pageMap.set(v.page_path, (pageMap.get(v.page_path) || 0) + 1);
    });
    setTopPages(
      Array.from(pageMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([page, visits]) => ({ page, visits }))
    );

    // Referrers
    const referrerMap = new Map<string, number>();
    visits.forEach((v) => {
      if (v.referrer) {
        referrerMap.set(v.referrer, (referrerMap.get(v.referrer) || 0) + 1);
      }
    });

    const allVisitors = new Set(visits.map((v) => v.visitor_id).filter(Boolean));
    const allSessions = new Set(visits.map((v) => v.session_id).filter(Boolean));

    setTotalStats({
      totalVisits: visits.length,
      uniqueVisitors: allVisitors.size,
      avgSessionPages: allSessions.size > 0 ? Math.round(visits.length / allSessions.size * 10) / 10 : 0,
      topReferrers: Array.from(referrerMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([referrer, count]) => ({ referrer, count })),
    });

    setIsLoading(false);
  };

  const maxVisits = Math.max(...dailyData.map((d) => d.visits), 1);

  if (isLoading) {
    return <div className="animate-pulse text-muted-foreground font-body">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground font-body mt-1">Last 30 days overview</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-kozy-rose opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground font-body">Total Page Views</p>
                <p className="text-2xl font-semibold font-display">{totalStats.totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground font-body">Unique Visitors</p>
                <p className="text-2xl font-semibold font-display">{totalStats.uniqueVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-kozy-sage opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground font-body">Pages / Session</p>
                <p className="text-2xl font-semibold font-display">{totalStats.avgSessionPages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-accent opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground font-body">Avg Daily Views</p>
                <p className="text-2xl font-semibold font-display">
                  {dailyData.length > 0
                    ? Math.round(totalStats.totalVisits / dailyData.length)
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic" className="font-body">Traffic</TabsTrigger>
          <TabsTrigger value="pages" className="font-body">Top Pages</TabsTrigger>
          <TabsTrigger value="referrers" className="font-body">Referrers</TabsTrigger>
        </TabsList>

        {/* Traffic Chart (CSS bar chart) */}
        <TabsContent value="traffic">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Daily Traffic</CardTitle>
              <CardDescription className="font-body">Page views over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyData.length === 0 ? (
                <p className="text-center text-muted-foreground font-body py-8">No traffic data yet</p>
              ) : (
                <div className="space-y-2">
                  {dailyData.slice(-14).map((day) => (
                    <div key={day.date} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 shrink-0 font-body">
                        {day.date}
                      </span>
                      <div className="flex-1 h-6 bg-muted/30 rounded overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded transition-all duration-500"
                          style={{ width: `${(day.visits / maxVisits) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-8 text-right font-body">{day.visits}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Pages */}
        <TabsContent value="pages">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Most Visited Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {topPages.length === 0 ? (
                <p className="text-center text-muted-foreground font-body py-8">No page data yet</p>
              ) : (
                <div className="space-y-3">
                  {topPages.map((page, i) => (
                    <div key={page.page} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground w-6">{i + 1}</span>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-body text-sm">{page.page}</span>
                      </div>
                      <span className="font-display font-semibold text-sm">{page.visits} views</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrers */}
        <TabsContent value="referrers">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Top Referrers</CardTitle>
            </CardHeader>
            <CardContent>
              {totalStats.topReferrers.length === 0 ? (
                <p className="text-center text-muted-foreground font-body py-8">No referrer data yet</p>
              ) : (
                <div className="space-y-3">
                  {totalStats.topReferrers.map((ref, i) => (
                    <div key={ref.referrer} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <span className="font-body text-sm truncate max-w-[300px]">{ref.referrer}</span>
                      <span className="font-display font-semibold text-sm">{ref.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Google Analytics hint */}
      <Card className="border-border/50 border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-body text-sm font-medium">Google Analytics Integration</p>
              <p className="text-xs text-muted-foreground font-body">
                For deeper behavioral insights, add your Google Analytics tracking ID to get heatmaps, 
                user flows, conversion funnels, and more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;

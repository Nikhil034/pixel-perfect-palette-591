import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp, Eye, DollarSign } from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  todayVisits: number;
  totalRevenue: number;
  pendingOrders: number;
  uniqueVisitors: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    todayVisits: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    uniqueVisitors: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [productsRes, ordersRes, visitsRes, recentOrdersRes] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id, total, status", { count: "exact" }),
      supabase.from("page_visits").select("id, visitor_id", { count: "exact" }).gte("created_at", today.toISOString()),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    const totalRevenue = ordersRes.data?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;
    const pendingOrders = ordersRes.data?.filter(o => o.status === "pending").length || 0;
    const uniqueVisitors = new Set(visitsRes.data?.map(v => v.visitor_id)).size;

    setStats({
      totalProducts: productsRes.count || 0,
      totalOrders: ordersRes.count || 0,
      todayVisits: visitsRes.count || 0,
      totalRevenue,
      pendingOrders,
      uniqueVisitors,
    });

    setRecentOrders(recentOrdersRes.data || []);
    setIsLoading(false);
  };

  const statCards = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-kozy-sage" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-accent" },
    { label: "Products", value: stats.totalProducts, icon: Package, color: "text-primary" },
    { label: "Today's Visits", value: stats.todayVisits, icon: Eye, color: "text-kozy-rose" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: TrendingUp, color: "text-destructive" },
    { label: "Unique Visitors Today", value: stats.uniqueVisitors, icon: Users, color: "text-secondary" },
  ];

  if (isLoading) {
    return <div className="animate-pulse text-muted-foreground font-body">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Welcome back to your Kozy admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                  <p className="text-2xl font-semibold font-display mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-xl">Recent Orders</CardTitle>
          <CardDescription className="font-body">Latest orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium font-body text-sm">
                      {order.guest_name || "Registered User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending" ? "bg-kozy-rose/20 text-kozy-rose" :
                      order.status === "confirmed" ? "bg-primary/20 text-primary" :
                      order.status === "shipped" ? "bg-secondary/20 text-secondary-foreground" :
                      order.status === "delivered" ? "bg-kozy-sage/20 text-kozy-sage" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-semibold font-display">${order.total?.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

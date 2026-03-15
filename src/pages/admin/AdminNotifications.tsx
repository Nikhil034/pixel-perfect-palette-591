import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Notification = Tables<"notifications">;

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) setNotifications(data);
    setIsLoading(false);
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    fetchNotifications();
  };

  if (isLoading) {
    return <div className="animate-pulse text-muted-foreground font-body">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Notifications</h1>
        <p className="text-muted-foreground font-body mt-1">All sent notifications</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground font-body">No notifications sent yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 flex items-start justify-between gap-4 hover:bg-muted/20">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-body text-sm font-medium">{notif.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        notif.is_read ? "bg-muted text-muted-foreground" : "bg-accent/20 text-accent"
                      }`}>
                        {notif.is_read ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 font-body">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(notif.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;

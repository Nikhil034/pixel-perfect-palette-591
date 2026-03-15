import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders">;

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-kozy-rose/20 text-kozy-rose",
  confirmed: "bg-primary/20 text-primary",
  processing: "bg-secondary/20 text-secondary-foreground",
  shipped: "bg-kozy-sage/20 text-kozy-sage",
  delivered: "bg-kozy-sage/30 text-kozy-sage",
  cancelled: "bg-destructive/20 text-destructive",
};

const notificationTemplates: Record<string, string> = {
  confirmed: "Your order has been confirmed! We're preparing your handcrafted items with love. 🌸",
  processing: "Your order is being crafted! Our artisans are working on your special items. 🧶",
  shipped: "Great news! Your order is on its way to you. Ready to ship! 📦",
  delivered: "Your order has been delivered! We hope you love your Kozy creations. 💐",
  cancelled: "Your order has been cancelled. If you have questions, please reach out to us.",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [notificationMessage, setNotificationMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data);
    setIsLoading(false);
  };

  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    setOrderItems(data || []);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: `Order status updated to ${newStatus}` });
    fetchOrders();

    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const sendNotification = async (order: Order, message: string) => {
    if (!order.user_id) {
      toast({ title: "Cannot notify", description: "Guest orders don't have notifications", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("notifications").insert({
      user_id: order.user_id,
      order_id: order.id,
      title: `Order Update: ${order.status}`,
      message: message || notificationTemplates[order.status] || "Your order has been updated.",
      type: "order_update",
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Notification sent!" });
    setNotificationMessage("");
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.guest_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.guest_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <div className="animate-pulse text-muted-foreground font-body">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Orders</h1>
        <p className="text-muted-foreground font-body mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground font-body">Order</th>
                  <th className="text-left p-4 font-medium text-muted-foreground font-body">Customer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground font-body">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground font-body">Total</th>
                  <th className="text-left p-4 font-medium text-muted-foreground font-body">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground font-body">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="p-4 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                    <td className="p-4 font-body">
                      {order.guest_name || "Registered User"}
                      {order.guest_phone && (
                        <span className="block text-xs text-muted-foreground">{order.guest_phone}</span>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground font-body">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-display font-semibold">${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => viewOrderDetails(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.user_id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => sendNotification(order, notificationTemplates[order.status] || "")}
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground font-body">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Order Details</DialogTitle>
            <DialogDescription className="font-mono text-xs">
              {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="p-3 rounded-lg bg-muted/30 space-y-1">
                <p className="font-medium font-body">
                  {selectedOrder.guest_name || "Registered User"}
                </p>
                {selectedOrder.guest_email && (
                  <p className="text-sm text-muted-foreground">{selectedOrder.guest_email}</p>
                )}
                {selectedOrder.guest_phone && (
                  <p className="text-sm text-muted-foreground">{selectedOrder.guest_phone}</p>
                )}
              </div>

              {/* Order Items */}
              <div>
                <Label className="font-body text-sm font-medium">Items</Label>
                <div className="mt-2 space-y-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <div>
                        <p className="font-body text-sm font-medium">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size && `Size: ${item.size} · `}Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-display font-semibold">${item.total_price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-border pt-3 space-y-1 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-kozy-sage">
                    <span>Discount</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${selectedOrder.shipping_fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-display">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Update Status */}
              <div className="space-y-2">
                <Label className="font-body">Update Status</Label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(v) => updateOrderStatus(selectedOrder.id, v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Send Notification */}
              {selectedOrder.user_id && (
                <div className="space-y-2">
                  <Label className="font-body">Send Notification</Label>
                  <Textarea
                    value={notificationMessage || notificationTemplates[selectedOrder.status] || ""}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    rows={2}
                    placeholder="Custom notification message..."
                  />
                  <Button
                    variant="sage"
                    className="w-full gap-2"
                    onClick={() =>
                      sendNotification(
                        selectedOrder,
                        notificationMessage || notificationTemplates[selectedOrder.status] || ""
                      )
                    }
                  >
                    <Bell className="h-4 w-4" />
                    Send Notification
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;

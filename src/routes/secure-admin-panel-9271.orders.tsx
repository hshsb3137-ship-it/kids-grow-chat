import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, deleteOrder } from "@/lib/api";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/orders")({ component: OrdersAdmin });

function OrdersAdmin() {
  const qc = useQueryClient();
  const { data: orders = [] } = useQuery({ queryKey: ["admin-orders"], queryFn: fetchOrders });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">WhatsApp orders submitted by customers</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr><th className="p-3">Date</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th><th></th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 align-top">
                <td className="p-3 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</td>
                <td className="p-3">
                  <ul className="space-y-0.5">
                    {o.items.map((i, idx) => <li key={idx}>{i.name} × <b>{i.quantity}</b></li>)}
                  </ul>
                </td>
                <td className="p-3 font-bold">₹{o.total}</td>
                <td className="p-3"><span className="rounded-full bg-sunny px-2 py-0.5 text-[10px] font-bold">{o.status}</span></td>
                <td className="p-3 text-right">
                  <button onClick={async () => { if (confirm("Delete order?")) { await deleteOrder(o.id); qc.invalidateQueries({ queryKey: ["admin-orders"] }); } }}
                    className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

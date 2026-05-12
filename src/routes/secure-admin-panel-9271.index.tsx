import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchOrders, fetchCategories, fetchTestimonials } from "@/lib/api";
import { Package, ShoppingBag, Tags, MessageSquareQuote, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/")({
  component: Dashboard,
});

function Dashboard() {
  const products = useQuery({ queryKey: ["admin-products"], queryFn: () => fetchProducts({ activeOnly: false }) });
  const orders = useQuery({ queryKey: ["admin-orders"], queryFn: fetchOrders });
  const cats = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const tests = useQuery({ queryKey: ["admin-testimonials"], queryFn: () => fetchTestimonials({ activeOnly: false }) });

  const totalRevenue = (orders.data ?? []).reduce((s, o) => s + Number(o.total), 0);

  const cards = [
    { label: "Products", value: products.data?.length ?? 0, icon: Package, accent: "bg-sky" },
    { label: "Orders", value: orders.data?.length ?? 0, icon: ShoppingBag, accent: "bg-bubble" },
    { label: "Categories", value: cats.data?.length ?? 0, icon: Tags, accent: "bg-grape" },
    { label: "Testimonials", value: tests.data?.length ?? 0, icon: MessageSquareQuote, accent: "bg-mint" },
    { label: "Revenue (orders)", value: `₹${totalRevenue}`, icon: IndianRupee, accent: "bg-sunny" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{c.label}</span>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${c.accent} text-foreground`}><c.icon className="h-4 w-4" /></span>
            </div>
            <div className="mt-3 font-display text-2xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold">Recent Orders</h2>
        {(orders.data ?? []).slice(0, 5).length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border">
            {(orders.data ?? []).slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-semibold">{o.items.map((i) => `${i.name}×${i.quantity}`).join(", ")}</span>
                <span className="font-bold">₹{o.total}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

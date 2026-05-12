import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Infinity Learning Center" },
      { name: "description", content: "Browse all educational books, flashcards and worksheets." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = cat === "All" || p.category?.name === cat;
      const ql = q.toLowerCase();
      const matchesQ = !q || p.name.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql);
      return matchesCat && matchesQ;
    });
  }, [products, q, cat]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Our <span className="text-gradient">Shop</span></h1>
          <p className="mt-2 text-muted-foreground">Find the perfect learning kit for your child</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..."
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...cats.map((c) => c.name)].map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  cat === c ? "bg-gradient-primary text-primary-foreground shadow-soft" : "bg-accent text-foreground hover:bg-primary/20"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-muted" />))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No products found. Try another search. <Link to="/" className="text-primary underline">Back home</Link></p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        )}
      </section>
    </Layout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Infinity Learning Center" },
      { name: "description", content: "Browse all educational books, flashcards, worksheets and learning kits." },
    ],
  }),
  component: ShopPage,
});

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function ShopPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const matchesQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

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
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  cat === c ? "bg-gradient-primary text-primary-foreground shadow-soft" : "bg-accent text-foreground hover:bg-primary/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No products found. Try another search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

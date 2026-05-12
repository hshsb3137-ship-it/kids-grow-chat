import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => fetchProducts(),
  });
  const featured = products.filter((p) => p.is_featured).slice(0, 6);
  const list = featured.length ? featured : products.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Featured <span className="text-gradient">Products</span></h2>
          <p className="mt-2 text-muted-foreground">Hand-picked bestsellers for happy little learners</p>
        </div>
        <Link to="/shop" className="hidden rounded-full bg-accent px-4 py-2 text-sm font-bold hover:bg-primary hover:text-primary-foreground sm:inline-block">
          View all →
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}

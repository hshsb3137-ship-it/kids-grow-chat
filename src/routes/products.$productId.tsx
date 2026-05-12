import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProductBySlug, fetchProducts, firstImage } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { Minus, Plus, ShoppingBag, MessageCircle, Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.productId} — Infinity Learning Center` },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { data: product, isLoading } = useQuery({ queryKey: ["product", productId], queryFn: () => fetchProductBySlug(productId) });
  const { data: all = [] } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (isLoading) return <Layout><div className="py-32 text-center text-muted-foreground">Loading…</div></Layout>;
  if (!product) {
    return (
      <Layout>
        <div className="mx-auto max-w-md py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Product not found</h1>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const img = firstImage(product);
  const related = all.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 3);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-8 shadow-soft">
            <img src={img} alt={product.name} className="mx-auto aspect-square w-full max-w-md object-contain" />
            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-card px-3 py-1 text-xs font-bold text-primary shadow-soft">
                ✨ {product.badge}
              </span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {product.category?.name && <span className="text-xs font-bold uppercase tracking-wide text-primary">{product.category.name}</span>}
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {product.age_group && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold">Age {product.age_group}</span>}
              <span className="font-display text-3xl font-bold text-gradient">₹{product.price}</span>
            </div>
            <p className="mt-5 text-muted-foreground">{product.long_description || product.description}</p>

            {product.benefits?.length > 0 && (
              <ul className="mt-5 space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border bg-card shadow-soft">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img }, qty)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-pop transition hover:scale-105">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <a href={whatsappOrderUrl(product.name, qty)} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:scale-105">
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">You may also <span className="text-gradient">like</span></h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

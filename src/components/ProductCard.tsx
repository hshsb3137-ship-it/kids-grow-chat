import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product, Accent } from "@/lib/types";
import { firstImage } from "@/lib/api";
import { useCart } from "@/context/CartContext";

const accentBg: Record<Accent, string> = {
  sky: "bg-sky/30",
  sunny: "bg-sunny/40",
  bubble: "bg-bubble/30",
  grape: "bg-grape/25",
  mint: "bg-mint/40",
};
const badgeStyle: Record<Accent, string> = {
  sky: "bg-sky text-sky-foreground",
  sunny: "bg-sunny text-sunny-foreground",
  bubble: "bg-bubble text-bubble-foreground",
  grape: "bg-grape text-grape-foreground",
  mint: "bg-mint text-sky-foreground",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const img = firstImage(product);
  const accent: Accent = (accentBg[product.accent as Accent] ? product.accent : "sky") as Accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-pop"
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.slug }}
        className={`relative block aspect-square overflow-hidden ${accentBg[accent]}`}
      >
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-soft ${badgeStyle[accent]}`}>
            ✨ {product.badge}
          </span>
        )}
        {product.age_group && (
          <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-foreground shadow-soft backdrop-blur">
            Age {product.age_group}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.category?.name && (
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{product.category.name}</span>
        )}
        <Link
          to="/products/$productId"
          params={{ productId: product.slug }}
          className="font-display text-lg font-bold leading-tight hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-foreground">₹{product.price}</span>
        </div>
        <button
          onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: img })}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:scale-[1.02]"
        >
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

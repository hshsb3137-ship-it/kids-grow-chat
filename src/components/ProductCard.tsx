import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const accentBg: Record<Product["accent"], string> = {
  sky: "bg-sky/30",
  sunny: "bg-sunny/40",
  bubble: "bg-bubble/30",
  grape: "bg-grape/25",
  mint: "bg-mint/40",
};
const badgeStyle: Record<Product["accent"], string> = {
  sky: "bg-sky text-sky-foreground",
  sunny: "bg-sunny text-sunny-foreground",
  bubble: "bg-bubble text-bubble-foreground",
  grape: "bg-grape text-grape-foreground",
  mint: "bg-mint text-sky-foreground",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

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
        params={{ productId: product.id }}
        className={`relative block aspect-square overflow-hidden ${accentBg[product.accent]}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-soft ${badgeStyle[product.accent]}`}>
            ✨ {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-foreground shadow-soft backdrop-blur">
          Age {product.ageGroup}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{product.category}</span>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="font-display text-lg font-bold leading-tight hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-foreground">₹{product.price}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:scale-[1.02]"
        >
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { whatsappCartUrl } from "@/lib/whatsapp";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, total, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-background shadow-pop"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-bold">Your Cart</h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full bg-accent hover:bg-primary/20"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-hero">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Pick a few learning kits your child will love.</p>
                </div>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-pop"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 flex-none rounded-xl object-cover"
                          loading="lazy"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-sm font-bold leading-tight">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="grid h-7 w-7 flex-none place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="mt-1 text-sm font-bold text-primary">₹{item.price}</span>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-border bg-background">
                              <button
                                onClick={() => setQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button
                                onClick={() => setQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-border bg-background/95 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-display text-2xl font-bold text-gradient">₹{total}</span>
                  </div>
                  <a
                    href={whatsappCartUrl(items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })))}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-pop transition hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                  </a>
                  <button
                    onClick={clear}
                    className="mt-2 w-full rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-destructive"
                  >
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

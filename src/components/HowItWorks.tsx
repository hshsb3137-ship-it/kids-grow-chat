import { motion } from "framer-motion";
import { MousePointerClick, ShoppingBag, MessageCircle } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Select Products", desc: "Browse colorful flashcards, worksheets & tuition materials." },
  { icon: ShoppingBag, title: "Add to Cart", desc: "Adjust quantities and review your order in one tap." },
  { icon: MessageCircle, title: "Order on WhatsApp", desc: "Send your cart with one click. We confirm & ship fast." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">How <span className="text-gradient">Ordering Works</span></h2>
        <p className="mt-2 text-muted-foreground">Three simple steps to learning made fun</p>
      </div>
      <div className="relative grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-pop"
          >
            <span className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground shadow-soft">
              {i + 1}
            </span>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-hero text-primary">
              <s.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

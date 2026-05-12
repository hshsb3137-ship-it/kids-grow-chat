import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/lib/api";

export function Testimonials() {
  const { data: reviews = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchTestimonials(),
  });
  if (reviews.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">What <span className="text-gradient">Parents Say</span></h2>
        <p className="mt-2 text-muted-foreground">Real words from real families</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex gap-1">
              {Array.from({ length: r.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-sunny text-sunny" />
              ))}
            </div>
            <p className="mt-3 text-sm text-foreground/80">"{r.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                {r.name[0]}
              </div>
              <div>
                <span className="block font-bold leading-tight">{r.name}</span>
                {r.role && <span className="text-xs text-muted-foreground">{r.role}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

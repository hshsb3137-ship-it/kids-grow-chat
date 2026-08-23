import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/lib/api";

export function Testimonials() {
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchTestimonials(),
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: "smooth" });
  };

  if (isLoading || isError || reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            What <span className="text-gradient">Parents Say</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Real feedback from happy moms 💗</p>
        </div>
        {reviews.length > 1 && (
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scrollBy(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:scale-105 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scrollBy(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition hover:scale-105 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 4) * 0.06 }}
            className="flex w-[85%] shrink-0 snap-center flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[48%] lg:w-[31.5%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array.from({ length: Math.max(1, Math.min(5, r.rating)) }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-sunny text-sunny" />
                ))}
              </div>
              <Quote className="h-5 w-5 text-primary/40" />
            </div>

            {r.image_url && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-gradient-hero">
                <img
                  src={r.image_url}
                  alt={`Review from ${r.name || "a parent"}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-72 w-full object-contain"
                />
              </div>
            )}

            <p className="mt-4 flex-1 text-sm text-foreground/80">"{r.quote}"</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-primary font-bold text-primary-foreground">
                {r.image_url ? (
                  <img src={r.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  (r.name?.charAt(0).toUpperCase() || "★")
                )}
              </div>
              <div>
                {r.name && <span className="block font-bold leading-tight">{r.name}</span>}
                {r.role && <span className="text-xs text-muted-foreground">{r.role}</span>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

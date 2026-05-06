import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Anjali R.", text: "My daughter waits for the flashcards every evening! She learned all alphabets in 2 weeks.", rating: 5 },
  { name: "Suresh K.", text: "The tuition notes are super clear. My son's marks jumped from 65 to 92 in just one term.", rating: 5 },
  { name: "Meera P.", text: "Handwriting book is magical — I can finally read what my 6-year-old writes!", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">What <span className="text-gradient">Parents Say</span></h2>
        <p className="mt-2 text-muted-foreground">Real words from real families</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
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
            <p className="mt-3 text-sm text-foreground/80">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                {r.name[0]}
              </div>
              <span className="font-bold">{r.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

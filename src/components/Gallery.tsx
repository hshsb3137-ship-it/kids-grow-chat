import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

const items = [
  { src: g1, label: "Worksheet Sessions" },
  { src: g2, label: "Abacus Class" },
  { src: g3, label: "Cube Training" },
];

export function Gallery() {
  return (
    <section className="bg-gradient-hero py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Happy <span className="text-gradient">Classroom</span></h2>
          <p className="mt-2 text-muted-foreground">A peek into our colorful learning world</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl shadow-soft"
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                width={1024}
                height={768}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
                <span className="font-display text-lg font-bold text-primary-foreground">{it.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

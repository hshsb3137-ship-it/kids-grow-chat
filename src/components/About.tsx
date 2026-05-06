import { motion } from "framer-motion";
import { Heart, Brain, Sparkles, Smile } from "lucide-react";

const features = [
  { icon: Smile, title: "Joyful Learning", desc: "Bright, playful materials kids actually want to open." },
  { icon: Brain, title: "Brain Development", desc: "Activities crafted to boost focus, memory & logic." },
  { icon: Sparkles, title: "Spark Creativity", desc: "Open-ended worksheets that encourage imagination." },
  { icon: Heart, title: "Made with Love", desc: "Designed by teachers who care about your child." },
];

export function About() {
  return (
    <section className="bg-gradient-hero py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            About <span className="text-gradient">Infinity Learning</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            We help children from ages 3–12 fall in love with learning through colorful books,
            engaging tuition classes and brain-boosting activities. Every page is crafted to
            grow young minds — gently, joyfully, infinitely.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-pop"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

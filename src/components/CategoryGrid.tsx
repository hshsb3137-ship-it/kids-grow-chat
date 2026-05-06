import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Leaf, GraduationCap, PenTool, Brain, Box } from "lucide-react";

const cats = [
  { label: "Flashcards", icon: BookOpen, bg: "bg-gradient-bubble", text: "text-bubble-foreground" },
  { label: "EVS Worksheet", icon: Leaf, bg: "bg-mint", text: "text-sky-foreground" },
  { label: "Tuition Material", icon: GraduationCap, bg: "bg-gradient-primary", text: "text-primary-foreground" },
  { label: "Handwriting", icon: PenTool, bg: "bg-gradient-sunny", text: "text-sunny-foreground" },
  { label: "Brain Exercise", icon: Brain, bg: "bg-gradient-sky", text: "text-sky-foreground" },
  { label: "Rubik's Cube", icon: Box, bg: "bg-bubble", text: "text-bubble-foreground" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Explore <span className="text-gradient">Categories</span></h2>
        <p className="mt-2 text-muted-foreground">Pick a category your child will love</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
        {cats.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to="/shop"
              className={`group flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl ${c.bg} ${c.text} p-3 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-pop`}
            >
              <c.icon className="h-8 w-8 transition group-hover:scale-110" />
              <span className="text-xs font-bold leading-tight sm:text-sm">{c.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

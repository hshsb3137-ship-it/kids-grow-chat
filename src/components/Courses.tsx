import { motion } from "framer-motion";
import { GraduationCap, Mic2, Calculator, PenTool, Box, Brain } from "lucide-react";

const courses = [
  { icon: GraduationCap, title: "Tuition Classes", desc: "Daily classes for grades 1–8 in all subjects.", bg: "bg-gradient-primary", text: "text-primary-foreground" },
  { icon: Mic2, title: "Phonics", desc: "Read confidently with sound-based learning.", bg: "bg-gradient-bubble", text: "text-bubble-foreground" },
  { icon: Calculator, title: "Abacus", desc: "Mental math made fast, fun & accurate.", bg: "bg-gradient-sky", text: "text-sky-foreground" },
  { icon: PenTool, title: "Handwriting", desc: "Beautiful cursive & print in 30 days.", bg: "bg-gradient-sunny", text: "text-sunny-foreground" },
  { icon: Box, title: "Rubik's Cube", desc: "Solve any cube in under 2 minutes.", bg: "bg-grape text-grape-foreground", text: "" },
  { icon: Brain, title: "Brain Exercises", desc: "Logic, memory & focus power-ups.", bg: "bg-mint", text: "text-sky-foreground" },
];

export function CoursesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Our <span className="text-gradient">Courses</span></h2>
        <p className="mt-2 text-muted-foreground">Live classes designed to help kids shine</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`group rounded-3xl ${c.bg} ${c.text} p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-pop`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-card/30 backdrop-blur">
              <c.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
            <p className="mt-1 text-sm opacity-90">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

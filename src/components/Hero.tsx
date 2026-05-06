import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-kids.png";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { MessageCircle, ShoppingBag, BookOpen, Pencil, Star, Lightbulb } from "lucide-react";

const floaters = [
  { icon: BookOpen, className: "left-4 top-10 bg-sky text-sky-foreground", delay: 0 },
  { icon: Pencil, className: "right-6 top-20 bg-sunny text-sunny-foreground", delay: 0.6 },
  { icon: Star, className: "left-10 bottom-16 bg-bubble text-bubble-foreground", delay: 1.2 },
  { icon: Lightbulb, className: "right-10 bottom-10 bg-grape text-grape-foreground", delay: 0.3 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-bubble/40 blur-3xl animate-blob" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky/40 blur-3xl animate-blob" />
      <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-sunny/30 blur-3xl animate-blob" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-card/70 px-4 py-1.5 text-xs font-bold text-primary shadow-soft backdrop-blur">
            ✨ Loved by 5,000+ parents
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Smart Learning <br />
            for <span className="text-gradient">Curious Kids</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg md:mx-0">
            Flashcards, Worksheets, Tuition Notes & Brain Exercise Books — designed to make learning fun, colorful and stress-free.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-pop transition hover:scale-105"
            >
              <ShoppingBag className="h-4 w-4" /> Shop Now
            </Link>
            <a
              href={whatsappContactUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Order
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground md:justify-start">
            <span>📚 50+ Books</span>
            <span>🎓 6 Courses</span>
            <span>⭐ 4.9/5 Rating</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-0 m-6 rounded-[2.5rem] bg-card/60 backdrop-blur shadow-pop" />
            <img
              src={heroImg}
              alt="Happy kids learning with books and toys"
              width={1280}
              height={1024}
              className="relative z-10 animate-float-slow"
            />
            {floaters.map((f, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -16, 0], rotate: [0, 8, -6, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                className={`absolute z-20 grid h-12 w-12 place-items-center rounded-2xl shadow-soft ${f.className}`}
              >
                <f.icon className="h-6 w-6" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

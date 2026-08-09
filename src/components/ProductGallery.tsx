import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resolveImage } from "@/lib/api";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const urls = useMemo(() => {
    const list = (images ?? []).filter(Boolean).map((u) => resolveImage(u));
    return list.length ? list : [resolveImage(undefined)];
  }, [images]);

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);
  const count = urls.length;

  // Only images we've decided to load: current + immediate neighbours.
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]));
  useEffect(() => {
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (count > 1) {
        next.add((index + 1) % count);
        next.add((index - 1 + count) % count);
      }
      return next;
    });
  }, [index, count]);

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + count) % count);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-8 shadow-soft">
      <div
        className="relative mx-auto aspect-square w-full max-w-md touch-pan-y select-none"
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          if (touchX.current === null || count < 2) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={urls[index]}
            custom={dir}
            src={urls[index]}
            alt={`${alt}${count > 1 ? ` — image ${index + 1} of ${count}` : ""}`}
            width={800}
            height={800}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Preload only the immediate neighbours, off-screen */}
      <div aria-hidden className="hidden">
        {urls.map((u, i) =>
          i !== index && loaded.has(i) ? <img key={u} src={u} alt="" loading="lazy" decoding="async" /> : null,
        )}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105 hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105 hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {urls.map((u, i) => (
              <button
                key={u}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                className={`h-2 rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-2 bg-card/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

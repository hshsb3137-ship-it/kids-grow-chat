import { whatsappContactUrl } from "@/lib/whatsapp";
import { Sparkles } from "lucide-react";

export function OfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-8 text-center shadow-pop sm:p-12">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sunny/40 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-bubble/40 blur-2xl" />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-card/30 px-4 py-1.5 text-xs font-bold text-primary-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Festival Offer
        </span>
        <h3 className="relative mt-4 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
          Flat 20% OFF on All Books!
        </h3>
        <p className="relative mt-2 text-primary-foreground/90">Order via WhatsApp before stocks run out</p>
        <a
          href={whatsappContactUrl("Hi! I'd like to use the 20% OFF festival offer.")}
          target="_blank"
          rel="noreferrer"
          className="relative mt-5 inline-block rounded-full bg-card px-6 py-3 text-sm font-bold text-primary shadow-soft transition hover:scale-105"
        >
          Claim Offer
        </a>
      </div>
    </section>
  );
}

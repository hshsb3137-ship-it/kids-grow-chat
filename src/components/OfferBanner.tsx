import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fetchSiteContent } from "@/lib/api";
import type { OfferContent } from "@/lib/types";
import { whatsappContactUrl } from "@/lib/whatsapp";

export function OfferBanner() {
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const offer = (data?.offer_banner ?? null) as OfferContent | null;
  if (!offer || !offer.enabled) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-8 text-center shadow-pop sm:p-12">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sunny/40 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-bubble/40 blur-2xl" />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-card/30 px-4 py-1.5 text-xs font-bold text-primary-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Special Offer
        </span>
        <h3 className="relative mt-4 font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
          {offer.text}
        </h3>
        <div className="relative mt-5 flex flex-wrap justify-center gap-3">
          {offer.link?.startsWith("/") ? (
            <Link to={offer.link} className="rounded-full bg-card px-6 py-3 text-sm font-bold text-primary shadow-soft transition hover:scale-105">
              Shop Now
            </Link>
          ) : (
            <a href={whatsappContactUrl(`Hi! I'd like to use the offer: ${offer.text}`)} target="_blank" rel="noreferrer"
              className="rounded-full bg-card px-6 py-3 text-sm font-bold text-primary shadow-soft transition hover:scale-105">
              Claim Offer
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

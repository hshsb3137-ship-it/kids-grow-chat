import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { OfferBanner } from "@/components/OfferBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinity Learning Center — Fun Learning for Smart Kids" },
      { name: "description", content: "Premium flashcards, EVS worksheets and tuition materials for kids 3–10. Add to cart & order on WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <Hero />
      <TrustBadges />
      <FeaturedProducts />
      <HowItWorks />
      <About />
      <OfferBanner />
      <Testimonials />
    </Layout>
  );
}

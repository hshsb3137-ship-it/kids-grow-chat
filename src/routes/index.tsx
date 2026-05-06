import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { About } from "@/components/About";
import { CoursesSection } from "@/components/Courses";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { OfferBanner } from "@/components/OfferBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { name: "description", content: "Shop colorful flashcards, EVS worksheets, tuition notes, handwriting & brain exercise books. Order via WhatsApp instantly." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <OfferBanner />
      <About />
      <CoursesSection />
      <Gallery />
      <Testimonials />
    </Layout>
  );
}

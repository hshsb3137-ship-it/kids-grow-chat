import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Infinity Learning Center" },
      { name: "description", content: "Learn how Infinity Learning Center helps kids develop creativity, confidence and brain power through fun learning." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">About <span className="text-gradient">Us</span></h1>
          <p className="mt-3 text-muted-foreground">
            Infinity Learning Center is a family of teachers, illustrators and parents on a
            mission to make studying joyful for every child.
          </p>
        </div>
      </section>
      <About />
      <Gallery />
      <Testimonials />
    </Layout>
  );
}

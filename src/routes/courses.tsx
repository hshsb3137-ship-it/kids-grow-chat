import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { CoursesSection } from "@/components/Courses";
import { whatsappContactUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Infinity Learning Center" },
      { name: "description", content: "Tuition, Phonics, Abacus, Handwriting, Rubik's Cube and Brain Exercise classes for kids." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Our <span className="text-gradient">Courses</span></h1>
          <p className="mt-3 text-muted-foreground">Engaging live & offline classes for kids 4–14 years.</p>
          <a
            href={whatsappContactUrl("Hi! I'd like to enroll my child in a course.")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground shadow-soft transition hover:scale-105"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </section>
      <CoursesSection />
    </Layout>
  );
}

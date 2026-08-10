import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { fetchSiteContent } from "@/lib/api";
import type { AboutHeroContent, AboutStoryContent } from "@/lib/types";
import { DEFAULT_ABOUT_HERO, DEFAULT_ABOUT_STORY, DEFAULT_STORY_IMAGE } from "@/lib/about-defaults";

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
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const hero: AboutHeroContent = { ...DEFAULT_ABOUT_HERO, ...(data?.about_hero ?? {}) };
  const story: AboutStoryContent = { ...DEFAULT_ABOUT_STORY, ...(data?.about_story ?? {}) };
  const storyImage = story.image_url || DEFAULT_STORY_IMAGE;
  const headWords = hero.heading.trim().split(" ");

  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            {headWords.slice(0, -1).join(" ")}{headWords.length > 1 ? " " : ""}
            <span className="text-gradient">{headWords[headWords.length - 1]}</span>
          </h1>
          <p className="mt-3 text-muted-foreground">{hero.subtitle}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <figure className="m-0">
            <img
              src={storyImage}
              alt={story.caption || story.heading}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-soft"
            />
            {story.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">{story.caption}</figcaption>
            )}
          </figure>
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{story.heading}</h2>
            <p className="mt-4 whitespace-pre-line text-muted-foreground">{story.content}</p>
          </div>
        </div>
      </section>

      <About />

      <Testimonials />
    </Layout>
  );
}

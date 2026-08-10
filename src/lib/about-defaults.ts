import type { AboutContent, AboutFeature, AboutHeroContent, AboutStoryContent } from "./types";
import storyImg from "@/assets/gallery-1.jpg";

export const DEFAULT_ABOUT_HERO: AboutHeroContent = {
  heading: "About Us",
  subtitle:
    "Infinity Learning Center is a family of teachers, illustrators and parents on a mission to make studying joyful for every child.",
};

export const DEFAULT_ABOUT_STORY: AboutStoryContent = {
  heading: "Our Story",
  content:
    "What started as a small tuition class for a handful of neighbourhood kids grew into a learning studio trusted by hundreds of families. Every flashcard, worksheet and material we make is tested with real children first.",
  image_url: null,
  caption: "Learning that feels like play",
};

export const DEFAULT_STORY_IMAGE = storyImg;

export const DEFAULT_ABOUT: AboutContent = {
  heading: "About Infinity Learning",
  body: "We help children fall in love with learning.",
  stats: [],
};

export const DEFAULT_ABOUT_FEATURES: AboutFeature[] = [
  { icon: "Smile", title: "Joyful Learning", desc: "Bright, playful materials kids actually want to open.", display_order: 1, is_active: true },
  { icon: "Brain", title: "Brain Development", desc: "Activities crafted to boost focus, memory & logic.", display_order: 2, is_active: true },
  { icon: "Sparkles", title: "Spark Creativity", desc: "Open-ended worksheets that encourage imagination.", display_order: 3, is_active: true },
  { icon: "Heart", title: "Made with Love", desc: "Designed by teachers who care about your child.", display_order: 4, is_active: true },
];

import flashcards from "@/assets/product-flashcards.jpg";
import evs from "@/assets/product-evs.jpg";
import tuition from "@/assets/product-tuition.jpg";

export type Category = "Flashcards" | "EVS Worksheet Books" | "Tuition Materials";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  longDescription?: string;
  benefits?: string[];
  ageGroup: string;
  badge?: string;
  category: Category;
  accent: "sky" | "sunny" | "bubble" | "grape" | "mint";
};

export const categories: Category[] = [
  "Flashcards",
  "EVS Worksheet Books",
  "Tuition Materials",
];

export const products: Product[] = [
  {
    id: "abc-animal-flashcards",
    name: "ABC Animal Flashcards",
    price: 199,
    image: flashcards,
    description: "52 colorful flashcards to teach alphabets, numbers & animals.",
    longDescription:
      "A vibrant set of 52 thick, tear-resistant flashcards designed by early-years teachers. Each card pairs a letter with a friendly animal illustration to make recall effortless.",
    benefits: [
      "Boosts letter & word recognition",
      "Improves memory and focus",
      "Perfect for daily 10-minute learning routines",
    ],
    ageGroup: "3–6 years",
    badge: "Best Seller",
    category: "Flashcards",
    accent: "bubble",
  },
  {
    id: "numbers-shapes-flashcards",
    name: "Numbers & Shapes Flashcards",
    price: 179,
    image: flashcards,
    description: "Bright cards covering 1–100 numbers, shapes & basic counting.",
    longDescription:
      "Help your child build a strong number sense with playful counting cards and shape identification activities printed on premium matte cardstock.",
    benefits: [
      "Strengthens early math foundations",
      "Visual + tactile learning",
      "Reusable with dry-erase marker",
    ],
    ageGroup: "3–7 years",
    badge: "New",
    category: "Flashcards",
    accent: "sky",
  },
  {
    id: "sight-words-flashcards",
    name: "Sight Words Flashcards",
    price: 219,
    image: flashcards,
    description: "100 most-used English sight words for fluent reading.",
    longDescription:
      "Curated by reading specialists, these 100 sight word cards build the vocabulary kids need to read independently with confidence.",
    benefits: [
      "Improves reading fluency",
      "Daily 5-minute practice routine",
      "Includes parent guide",
    ],
    ageGroup: "4–8 years",
    category: "Flashcards",
    accent: "grape",
  },
  {
    id: "evs-worksheet-class1",
    name: "EVS Worksheet Book — Class 1",
    price: 249,
    image: evs,
    description: "Fun worksheets covering plants, animals, weather & our world.",
    longDescription:
      "60 colourful worksheets aligned with the latest CBSE curriculum. Activities include matching, colouring, and short observation tasks that bring the environment to life.",
    benefits: [
      "Curriculum aligned",
      "Builds observation skills",
      "Encourages eco-awareness",
    ],
    ageGroup: "5–7 years",
    badge: "Top Rated",
    category: "EVS Worksheet Books",
    accent: "mint",
  },
  {
    id: "evs-worksheet-class2",
    name: "EVS Worksheet Book — Class 2",
    price: 269,
    image: evs,
    description: "Engaging activities on family, food, water and good habits.",
    longDescription:
      "Class 2 friendly worksheets with crosswords, draw-and-write, and small projects designed to keep children excited about EVS.",
    benefits: [
      "Boosts comprehension",
      "Project-based learning",
      "Glossy full-colour pages",
    ],
    ageGroup: "6–8 years",
    category: "EVS Worksheet Books",
    accent: "sky",
  },
  {
    id: "evs-worksheet-class3",
    name: "EVS Worksheet Book — Class 3",
    price: 289,
    image: evs,
    description: "Advanced EVS practice with diagrams, quizzes and mini tests.",
    longDescription:
      "Helps Class 3 students master EVS concepts through structured worksheets, quick revisions and printable mini tests.",
    benefits: [
      "Exam-ready revisions",
      "Includes answer key",
      "Strengthens scientific thinking",
    ],
    ageGroup: "7–9 years",
    badge: "Popular",
    category: "EVS Worksheet Books",
    accent: "bubble",
  },
  {
    id: "tuition-notes-pack",
    name: "Tuition Class Notes Pack",
    price: 349,
    image: tuition,
    description: "Complete printed notes used in our daily tuition classes.",
    longDescription:
      "A comprehensive notes pack used by 1,000+ tuition students. Covers all major subjects with simple explanations, examples and practice questions.",
    benefits: [
      "Subject-wise organised",
      "Simple, parent-friendly explanations",
      "Practice questions with solutions",
    ],
    ageGroup: "6–10 years",
    badge: "Best Seller",
    category: "Tuition Materials",
    accent: "grape",
  },
  {
    id: "math-practice-book",
    name: "Daily Math Practice Book",
    price: 229,
    image: tuition,
    description: "20-min daily math drills covering all primary topics.",
    longDescription:
      "Builds calculation speed and accuracy through 100 short daily worksheets — addition, subtraction, multiplication, division & word problems.",
    benefits: [
      "Improves mental math",
      "Tracks weekly progress",
      "Confidence-building drills",
    ],
    ageGroup: "6–10 years",
    category: "Tuition Materials",
    accent: "sunny",
  },
  {
    id: "english-grammar-book",
    name: "English Grammar Workbook",
    price: 259,
    image: tuition,
    description: "Step-by-step grammar lessons with fun activities.",
    longDescription:
      "Covers nouns, verbs, tenses, punctuation and sentence-building through colourful examples and engaging exercises.",
    benefits: [
      "Strong foundation in grammar",
      "Includes exam-style questions",
      "Self-evaluation tests",
    ],
    ageGroup: "6–10 years",
    badge: "New",
    category: "Tuition Materials",
    accent: "sky",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

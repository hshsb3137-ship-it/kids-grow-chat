import flashcards from "@/assets/product-flashcards.jpg";
import evs from "@/assets/product-evs.jpg";
import tuition from "@/assets/product-tuition.jpg";
import handwriting from "@/assets/product-handwriting.jpg";
import brain from "@/assets/product-brain.jpg";
import rubiks from "@/assets/product-rubiks.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  category: string;
  accent: "sky" | "sunny" | "bubble" | "grape" | "mint";
};

export const products: Product[] = [
  {
    id: "flashcards-abc",
    name: "ABC Animal Flashcards",
    price: 199,
    image: flashcards,
    description: "52 colorful flashcards to teach alphabets, numbers & animals.",
    badge: "Best Seller",
    category: "Flashcards",
    accent: "bubble",
  },
  {
    id: "evs-worksheet",
    name: "EVS Worksheet Book",
    price: 249,
    image: evs,
    description: "Fun worksheets covering plants, animals, weather & our world.",
    badge: "New",
    category: "EVS Worksheet Book",
    accent: "mint",
  },
  {
    id: "tuition-material",
    name: "Tuition Class Notes Pack",
    price: 349,
    image: tuition,
    description: "Complete printed notes used in our daily tuition classes.",
    badge: "Popular",
    category: "Tuition Classes Material",
    accent: "grape",
  },
  {
    id: "handwriting-book",
    name: "Magic Handwriting Practice",
    price: 179,
    image: handwriting,
    description: "Trace, write & master beautiful cursive and print handwriting.",
    category: "Handwriting Practice",
    accent: "bubble",
  },
  {
    id: "brain-book",
    name: "Brain Exercise Activity Book",
    price: 229,
    image: brain,
    description: "Puzzles, riddles & logic games that boost thinking power.",
    badge: "Top Rated",
    category: "Brain Exercise Book",
    accent: "grape",
  },
  {
    id: "rubiks-kit",
    name: "Rubik's Cube Training Kit",
    price: 399,
    image: rubiks,
    description: "Cube + step-by-step guide to solve in under 2 minutes.",
    badge: "Hot",
    category: "Rubik's Cube Training",
    accent: "sky",
  },
];

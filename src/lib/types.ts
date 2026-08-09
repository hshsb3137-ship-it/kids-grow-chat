export type Accent = "sky" | "sunny" | "bubble" | "grape" | "mint";

export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  long_description: string | null;
  benefits: string[];
  age_group: string;
  badge: string | null;
  category_id: string | null;
  category?: { name: string } | null;
  accent: Accent;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  status: string;
  created_at: string;
}

export interface HeroContent {
  heading: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}
export interface OfferContent {
  enabled: boolean;
  text: string;
  link: string;
}
export interface AboutContent {
  heading: string;
  body: string;
  stats: { label: string; value: string }[];
}
export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_url: string;
}

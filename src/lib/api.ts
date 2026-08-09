import { supabase } from "@/integrations/supabase/client";
import type { Product, Category, Testimonial, Order, OrderItem } from "./types";
import flashcardsImg from "@/assets/product-flashcards.jpg";
import evsImg from "@/assets/product-evs.jpg";
import tuitionImg from "@/assets/product-tuition.jpg";

const fallbackMap: Record<string, string> = {
  "/src/assets/product-flashcards.jpg": flashcardsImg,
  "/src/assets/product-evs.jpg": evsImg,
  "/src/assets/product-tuition.jpg": tuitionImg,
};

export function resolveImage(url: string | undefined): string {
  if (!url) return flashcardsImg;
  return fallbackMap[url] ?? url;
}

export function firstImage(p: Product): string {
  return resolveImage(p.images?.[0]);
}

export async function fetchProducts(opts?: { activeOnly?: boolean }): Promise<Product[]> {
  let q = supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("display_order", { ascending: true });
  if (opts?.activeOnly !== false) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as unknown as Product | null;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchTestimonials(opts?: { activeOnly?: boolean }): Promise<Testimonial[]> {
  let q = supabase.from("testimonials").select("*").order("display_order", { ascending: true });
  if (opts?.activeOnly !== false) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function fetchSiteContent(): Promise<Record<string, any>> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const out: Record<string, any> = {};
  (data ?? []).forEach((r: any) => (out[r.key] = r.value));
  return out;
}

export async function upsertSiteContent(key: string, value: any) {
  const { error } = await supabase.from("site_content").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Order[];
}

export async function createOrder(items: OrderItem[], total: number) {
  const { error } = await supabase.from("orders").insert({ items: items as any, total });
  if (error) console.error("Order log failed:", error);
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
export async function upsertProduct(p: Partial<Product> & { id?: string }) {
  const payload: any = { ...p };
  delete payload.category;
  if (payload.id) {
    const { error } = await supabase.from("products").update(payload).eq("id", payload.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) throw error;
  }
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
export async function upsertCategory(c: Partial<Category> & { id?: string }) {
  if (c.id) {
    const { error } = await supabase.from("categories").update(c).eq("id", c.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("categories").insert(c as any);
    if (error) throw error;
  }
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
export async function upsertTestimonial(t: Partial<Testimonial> & { id?: string }) {
  if (t.id) {
    const { error } = await supabase.from("testimonials").update(t).eq("id", t.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("testimonials").insert(t as any);
    if (error) throw error;
  }
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

const IMAGE_BUCKET = "product-images";

export async function uploadTestimonialImage(file: File): Promise<string> {
  const ok = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!ok.includes(file.type)) throw new Error("Unsupported file type. Use JPG, PNG or WEBP.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Image is too large. Maximum size is 8 MB.");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `testimonials/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Best-effort removal of a previously uploaded image from storage. */
export async function removeStorageImage(url: string | null | undefined) {
  if (!url) return;
  const marker = `/${IMAGE_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = decodeURIComponent(url.slice(idx + marker.length));
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path]);
  if (error) console.error("Storage cleanup failed:", error.message);
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}

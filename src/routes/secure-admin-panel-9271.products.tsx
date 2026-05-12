import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProducts, fetchCategories, deleteProduct, upsertProduct, firstImage } from "@/lib/api";
import type { Product, Accent } from "@/lib/types";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Edit2, Trash2, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/products")({ component: ProductsAdmin });

const accents: Accent[] = ["sky", "sunny", "bubble", "grape", "mint"];

function emptyProduct(): Partial<Product> {
  return { slug: "", name: "", price: 0, description: "", long_description: "", benefits: [], age_group: "",
    badge: null, category_id: null, accent: "sky", images: [], is_featured: false, is_active: true, display_order: 0 };
}

function ProductsAdmin() {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["admin-products"], queryFn: () => fetchProducts({ activeOnly: false }) });
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [q, setQ] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-products"] });

  const onSave = async () => {
    if (!editing) return;
    try {
      await upsertProduct(editing);
      setEditing(null);
      refresh();
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e: any) { alert(e.message || e); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    refresh();
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Add, edit, and manage your products</p>
        </div>
        <button onClick={() => setEditing(emptyProduct())} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft">
          <Plus className="h-4 w-4" /> New Product
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..."
          className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={firstImage(p)} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{p.category?.name ?? "—"}</td>
                <td className="p-3 font-bold">₹{p.price}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {p.is_featured && <span className="rounded-full bg-bubble px-2 py-0.5 text-[10px] font-bold text-bubble-foreground">Featured</span>}
                    {p.is_active ? <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold">Active</span> : <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">Hidden</span>}
                    {p.badge && <span className="rounded-full bg-sunny px-2 py-0.5 text-[10px] font-bold">{p.badge}</span>}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="inline-flex gap-1">
                    <button onClick={() => setEditing(p)} className="grid h-8 w-8 place-items-center rounded-lg bg-accent hover:bg-primary/20"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => onDelete(p.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No products</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-card p-6 shadow-pop">
            <h2 className="mb-4 font-display text-xl font-bold">{editing.id ? "Edit Product" : "New Product"}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name"><input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} className={inputCls} /></Field>
              <Field label="Slug"><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={inputCls} /></Field>
              <Field label="Price (₹)"><input type="number" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className={inputCls} /></Field>
              <Field label="Age group"><input value={editing.age_group ?? ""} onChange={(e) => setEditing({ ...editing, age_group: e.target.value })} className={inputCls} /></Field>
              <Field label="Category">
                <select value={editing.category_id ?? ""} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })} className={inputCls}>
                  <option value="">— None —</option>
                  {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Badge">
                <select value={editing.badge ?? ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })} className={inputCls}>
                  <option value="">— None —</option>
                  <option>Best Seller</option><option>New</option><option>Popular</option><option>Top Rated</option>
                </select>
              </Field>
              <Field label="Accent color">
                <select value={editing.accent ?? "sky"} onChange={(e) => setEditing({ ...editing, accent: e.target.value as Accent })} className={inputCls}>
                  {accents.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </Field>
              <Field label="Display order"><input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className={inputCls} /></Field>
            </div>
            <Field label="Short description"><textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={`${inputCls} min-h-[60px]`} /></Field>
            <Field label="Long description"><textarea value={editing.long_description ?? ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} className={`${inputCls} min-h-[80px]`} /></Field>
            <Field label="Benefits (one per line)">
              <textarea value={(editing.benefits ?? []).join("\n")} onChange={(e) => setEditing({ ...editing, benefits: e.target.value.split("\n").filter(Boolean) })} className={`${inputCls} min-h-[80px]`} />
            </Field>
            <Field label="Images">
              <ImageUpload images={editing.images ?? []} onChange={(images) => setEditing({ ...editing, images })} />
            </Field>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /> Featured</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.is_active !== false} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full bg-accent px-4 py-2 text-sm font-bold">Cancel</button>
              <button onClick={onSave} className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-soft">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-3 block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

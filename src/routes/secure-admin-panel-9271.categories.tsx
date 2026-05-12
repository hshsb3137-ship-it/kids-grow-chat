import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCategories, upsertCategory, deleteCategory } from "@/lib/api";
import type { Category } from "@/lib/types";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/categories")({ component: CategoriesAdmin });

function CategoriesAdmin() {
  const qc = useQueryClient();
  const { data: cats = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ["categories"] });

  const save = async () => {
    if (!editing?.name) return;
    const slug = editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await upsertCategory({ ...editing, slug });
    setEditing(null);
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Organize your products</p>
        </div>
        <button onClick={() => setEditing({ name: "", slug: "", display_order: cats.length + 1 })} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <ul className="divide-y divide-border">
          {cats.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 p-4">
              <div>
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.slug} · order {c.display_order}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(c)} className="grid h-8 w-8 place-items-center rounded-lg bg-accent"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={async () => { if (confirm("Delete?")) { await deleteCategory(c.id); refresh(); } }}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </li>
          ))}
          {cats.length === 0 && <li className="p-8 text-center text-muted-foreground">No categories</li>}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-card p-6 shadow-pop">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.id ? "Edit" : "New"} Category</h2>
              <button onClick={() => setEditing(null)}><X className="h-4 w-4" /></button>
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Name</span>
              <input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </label>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Display order</span>
              <input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </label>
            <button onClick={save} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-2.5 text-sm font-bold text-primary-foreground">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

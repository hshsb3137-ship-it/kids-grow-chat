import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/testimonials")({ component: TestimonialsAdmin });

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["admin-testimonials"], queryFn: () => fetchTestimonials({ activeOnly: false }) });
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-testimonials"] }); qc.invalidateQueries({ queryKey: ["testimonials"] }); };

  const save = async () => { if (!editing?.name || !editing.quote) return; await upsertTestimonial(editing); setEditing(null); refresh(); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Reviews from happy parents</p>
        </div>
        <button onClick={() => setEditing({ name: "", quote: "", rating: 5, is_active: true, display_order: data.length + 1 })} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {data.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold">{t.name}</div>
                {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(t)} className="grid h-8 w-8 place-items-center rounded-lg bg-accent"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={async () => { if (confirm("Delete?")) { await deleteTestimonial(t.id); refresh(); } }} className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground/80">"{t.quote}"</p>
            <div className="mt-2 text-xs text-muted-foreground">★ {t.rating} · {t.is_active ? "Active" : "Hidden"}</div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-card p-6 shadow-pop">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-xl font-bold">{editing.id ? "Edit" : "New"} Testimonial</h2><button onClick={() => setEditing(null)}><X className="h-4 w-4" /></button></div>
            <label className="block"><span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Name</span><input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></label>
            <label className="mt-3 block"><span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Role</span><input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></label>
            <label className="mt-3 block"><span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Quote</span><textarea value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm min-h-[100px]" /></label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block"><span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Rating (1-5)</span><input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></label>
              <label className="block"><span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Order</span><input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></label>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.is_active !== false} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
            <button onClick={save} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-2.5 text-sm font-bold text-primary-foreground"><Save className="h-4 w-4" /> Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

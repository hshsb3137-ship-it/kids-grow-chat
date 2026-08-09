import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  fetchTestimonials,
  upsertTestimonial,
  deleteTestimonial,
  uploadTestimonialImage,
  removeStorageImage,
} from "@/lib/api";
import type { Testimonial } from "@/lib/types";
import { Edit2, Trash2, Plus, Save, X, Upload, Star, Eye, EyeOff, RefreshCw, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/testimonials")({ component: TestimonialsAdmin });

type Draft = Partial<Testimonial> & { id?: string };

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data = [], isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => fetchTestimonials({ activeOnly: false }),
  });

  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removedUrl, setRemovedUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  const openNew = () =>
    setEditing({ name: "", role: "", quote: "", rating: 5, is_active: true, display_order: data.length + 1, image_url: null });

  const pickFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadTestimonialImage(file);
      setEditing((e) => (e ? { ...e, image_url: url } : e));
      toast.success("Photo uploaded");
    } catch (e: any) {
      console.error("Testimonial image upload failed:", e);
      toast.error(e?.message ?? "Image upload failed. Please check the file type and size.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async () => {
    if (!editing?.name?.trim() || !editing.quote?.trim()) {
      toast.error("Name and quote are required.");
      return;
    }
    setSaving(true);
    try {
      await upsertTestimonial({
        ...editing,
        name: editing.name.trim(),
        role: editing.role?.trim() || null,
        quote: editing.quote.trim(),
        image_url: editing.image_url ?? null,
      });
      if (removedUrl && removedUrl !== editing.image_url) await removeStorageImage(removedUrl);
      toast.success(editing.id ? "Testimonial updated" : "Testimonial added");
      setEditing(null);
      setRemovedUrl(null);
      refresh();
    } catch (e: any) {
      console.error("Testimonial save failed:", e);
      toast.error(e?.message ?? "Unable to save testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (t: Testimonial) => {
    try {
      await upsertTestimonial({ id: t.id, is_active: !t.is_active });
      toast.success(t.is_active ? "Testimonial hidden" : "Testimonial published");
      refresh();
    } catch (e: any) {
      console.error("Toggle failed:", e);
      toast.error(e?.message ?? "Unable to update testimonial. Please try again.");
    }
  };

  const remove = async (t: Testimonial) => {
    if (!confirm(`Delete the review from ${t.name}?`)) return;
    try {
      await deleteTestimonial(t.id);
      await removeStorageImage(t.image_url);
      toast.success("Testimonial deleted");
      refresh();
    } catch (e: any) {
      console.error("Delete failed:", e);
      toast.error(e?.message ?? "Unable to delete testimonial. Please try again.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Reviews from happy parents</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus className="h-4 w-4" /> New Testimonial
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {[0, 1].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted" />)}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <p className="font-semibold text-destructive">Unable to load testimonials. Please try again.</p>
          <p className="mt-1 text-xs text-muted-foreground">{(error as any)?.message}</p>
          <button onClick={() => refetch()} className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground">
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} /> Retry
          </button>
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 font-semibold">No testimonials yet</p>
          <p className="text-sm text-muted-foreground">Add your first parent review to show it on the website.</p>
          <button onClick={openNew} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            <Plus className="h-4 w-4" /> New Testimonial
          </button>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-primary text-lg font-bold text-primary-foreground">
                  {t.image_url ? <img src={t.image_url} alt="" className="h-full w-full object-cover" loading="lazy" /> : t.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-bold">{t.name}</div>
                      {t.role && <div className="truncate text-xs text-muted-foreground">{t.role}</div>}
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button onClick={() => toggleActive(t)} title={t.is_active ? "Deactivate" : "Activate"} className="grid h-8 w-8 place-items-center rounded-lg bg-accent">
                        {t.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => { setRemovedUrl(null); setEditing(t); }} title="Edit" className="grid h-8 w-8 place-items-center rounded-lg bg-accent"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => remove(t)} title="Delete" className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/80">"{t.quote}"</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5"><Star className="h-3 w-3 fill-sunny text-sunny" /> {t.rating}</span>
                    <span>· Order {t.display_order}</span>
                    <span className={`rounded-full px-2 py-0.5 font-bold ${t.is_active ? "bg-mint/40 text-foreground" : "bg-muted text-muted-foreground"}`}>
                      {t.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="my-8 w-full max-w-md rounded-3xl bg-card p-6 shadow-pop">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.id ? "Edit" : "New"} Testimonial</h2>
              <button onClick={() => setEditing(null)} aria-label="Close"><X className="h-4 w-4" /></button>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Name</span>
              <input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </label>

            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Role</span>
              <input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </label>

            <div className="mt-3">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Photo</span>
              <input
                ref={fileRef}
                id="testimonial-photo"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              <label htmlFor="testimonial-photo" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading…" : editing.image_url ? "Replace Photo" : "Upload Photo"}
              </label>
              <p className="mt-1 text-[11px] text-muted-foreground">JPG, PNG or WEBP · max 8 MB</p>
              {editing.image_url && (
                <div className="mt-2 flex items-start gap-3">
                  <img src={editing.image_url} alt="Preview" className="h-24 w-24 rounded-xl border border-border object-cover" />
                  <button
                    type="button"
                    onClick={() => { setRemovedUrl(editing.image_url ?? null); setEditing({ ...editing, image_url: null }); }}
                    className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Quote</span>
              <textarea value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className="min-h-[100px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </label>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Rating (1-5)</span>
                <input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Order</span>
                <input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </label>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.is_active !== false} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active
            </label>

            <button onClick={save} disabled={saving || uploading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Upload, X, GripVertical } from "lucide-react";
import { uploadProductImage, resolveImage } from "@/lib/api";

export function ImageUpload({ images, onChange }: { images: string[]; onChange: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        const url = await uploadProductImage(f);
        urls.push(url);
      }
      onChange([...images, ...urls]);
    } catch (e: any) {
      alert("Upload failed: " + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { if (dragIdx !== null) return; e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { if (dragIdx !== null) return; e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border bg-muted/30"}`}
      >
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag & drop or click to upload — you can select multiple images</p>
        <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" id="img-upload" />
        <label htmlFor="img-upload" className="cursor-pointer rounded-full bg-gradient-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
          {busy ? "Uploading…" : "Choose files"}
        </label>
      </div>
      {images.length > 0 && (
        <>
          <p className="mt-3 text-xs text-muted-foreground">
            Drag thumbnails to reorder. The first image is the primary product image.
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {images.map((url, i) => (
              <div
                key={url}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragEnter={() => setOverIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIdx !== null) reorder(dragIdx, i);
                  setDragIdx(null); setOverIdx(null);
                }}
                onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                className={`relative aspect-square cursor-grab overflow-hidden rounded-xl border bg-card transition active:cursor-grabbing ${
                  overIdx === i && dragIdx !== null && dragIdx !== i ? "border-primary ring-2 ring-primary" : "border-border"
                } ${dragIdx === i ? "opacity-50" : ""}`}
              >
                <img src={resolveImage(url)} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute left-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-card/90 text-muted-foreground shadow-soft">
                  <GripVertical className="h-3 w-3" />
                </span>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-soft">
                    Primary
                  </span>
                )}
                <button type="button" onClick={() => onChange(images.filter((u) => u !== url))}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-soft">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

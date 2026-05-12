import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadProductImage, resolveImage } from "@/lib/api";

export function ImageUpload({ images, onChange }: { images: string[]; onChange: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

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

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border bg-muted/30"}`}
      >
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
        <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" id="img-upload" />
        <label htmlFor="img-upload" className="cursor-pointer rounded-full bg-gradient-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
          {busy ? "Uploading…" : "Choose files"}
        </label>
      </div>
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              <img src={resolveImage(url)} alt="" className="h-full w-full object-cover" />
              <button type="button" onClick={() => onChange(images.filter((u) => u !== url))}
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-soft">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

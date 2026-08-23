import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchSiteContent, upsertSiteContent, uploadAboutImage } from "@/lib/api";
import { DEFAULT_ABOUT_FEATURES, DEFAULT_ABOUT_HERO, DEFAULT_ABOUT_STORY, DEFAULT_STORY_IMAGE } from "@/lib/about-defaults";
import type { AboutFeature } from "@/lib/types";
import { Save, Trash2, Plus, ArrowUp, ArrowDown, Upload } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/homepage")({ component: HomepageAdmin });

function HomepageAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const [hero, setHero] = useState<any>({ heading: "", subtitle: "", cta_primary: "Shop Now", cta_secondary: "WhatsApp Order" });
  const [offer, setOffer] = useState<any>({ enabled: true, text: "", link: "/shop" });
  const [about, setAbout] = useState<any>({ heading: "", body: "", stats: [] });
  const [contact, setContact] = useState<any>({ phone: "", whatsapp: "", email: "", address: "", map_url: "" });
  const [aboutHero, setAboutHero] = useState<any>(DEFAULT_ABOUT_HERO);
  const [story, setStory] = useState<any>(DEFAULT_ABOUT_STORY);
  const [features, setFeatures] = useState<AboutFeature[]>(DEFAULT_ABOUT_FEATURES);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.hero) setHero({ ...hero, ...data.hero });
    if (data.offer_banner) setOffer({ ...offer, ...data.offer_banner });
    if (data.about) setAbout({ ...about, ...data.about });
    if (data.contact) setContact({ ...contact, ...data.contact });
    if (data.about_hero) setAboutHero({ ...DEFAULT_ABOUT_HERO, ...data.about_hero });
    if (data.about_story) setStory({ ...DEFAULT_ABOUT_STORY, ...data.about_story });
    if (Array.isArray(data.about_features) && data.about_features.length) setFeatures(data.about_features);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const save = async (key: string, value: any) => {
    await upsertSiteContent(key, value);
    qc.invalidateQueries({ queryKey: ["site_content"] });
    alert("Saved!");
  };

  const handlePhoto = async (file: File | undefined | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadAboutImage(file);
      setStory((s: any) => ({ ...s, image_url: url }));
    } catch (e: any) {
      alert("Upload failed: " + (e.message || e));
    } finally {
      setUploading(false);
    }
  };

  const updFeature = (i: number, patch: Partial<AboutFeature>) =>
    setFeatures((f) => f.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const moveFeature = (i: number, dir: -1 | 1) =>
    setFeatures((f) => {
      const j = i + dir;
      if (j < 0 || j >= f.length) return f;
      const next = [...f];
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((x, idx) => ({ ...x, display_order: idx + 1 }));
    });

  const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Homepage Content</h1>
        <p className="text-muted-foreground">Edit hero, banners, about and contact info</p>
      </div>

      <Section title="Hero Section">
        <Lbl>Heading</Lbl><input value={hero.heading} onChange={(e) => setHero({ ...hero, heading: e.target.value })} className={inputCls} />
        <Lbl>Subtitle</Lbl><textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className={`${inputCls} min-h-[60px]`} />
        <div className="grid grid-cols-2 gap-3">
          <div><Lbl>Primary CTA</Lbl><input value={hero.cta_primary} onChange={(e) => setHero({ ...hero, cta_primary: e.target.value })} className={inputCls} /></div>
          <div><Lbl>Secondary CTA</Lbl><input value={hero.cta_secondary} onChange={(e) => setHero({ ...hero, cta_secondary: e.target.value })} className={inputCls} /></div>
        </div>
        <SaveBtn onClick={() => save("hero", hero)} />
      </Section>

      <Section title="Offer Banner">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!offer.enabled} onChange={(e) => setOffer({ ...offer, enabled: e.target.checked })} /> Show banner</label>
        <Lbl>Text</Lbl><input value={offer.text} onChange={(e) => setOffer({ ...offer, text: e.target.value })} className={inputCls} />
        <Lbl>Link (e.g. /shop)</Lbl><input value={offer.link} onChange={(e) => setOffer({ ...offer, link: e.target.value })} className={inputCls} />
        <SaveBtn onClick={() => save("offer_banner", offer)} />
      </Section>

      <Section title="About Page — Hero Section">
        <Lbl>Hero Heading</Lbl><input value={aboutHero.heading} onChange={(e) => setAboutHero({ ...aboutHero, heading: e.target.value })} className={inputCls} />
        <Lbl>Hero Subtitle</Lbl><textarea value={aboutHero.subtitle} onChange={(e) => setAboutHero({ ...aboutHero, subtitle: e.target.value })} className={`${inputCls} min-h-[70px]`} />
        <SaveBtn onClick={() => save("about_hero", aboutHero)} />
      </Section>

      <Section title="About Page — Our Story">
        <Lbl>Story Heading</Lbl><input value={story.heading} onChange={(e) => setStory({ ...story, heading: e.target.value })} className={inputCls} />
        <Lbl>Story Content</Lbl><textarea value={story.content} onChange={(e) => setStory({ ...story, content: e.target.value })} className={`${inputCls} min-h-[120px]`} />
        <Lbl>Story Photo</Lbl>
        <div className="flex flex-wrap items-center gap-3">
          <img src={story.image_url || DEFAULT_STORY_IMAGE} alt="Story preview"
            className="h-24 w-32 rounded-xl border border-border object-cover shadow-soft" />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : story.image_url ? "Replace Photo" : "Upload Photo"}
            <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden"
              onChange={(e) => { handlePhoto(e.target.files?.[0]); e.target.value = ""; }} />
          </label>
          {story.image_url && (
            <button onClick={() => setStory({ ...story, image_url: null })}
              className="inline-flex items-center gap-2 rounded-full border border-destructive px-4 py-2 text-sm font-bold text-destructive">
              <Trash2 className="h-4 w-4" /> Remove Photo
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">JPG, JPEG, PNG or WEBP · max 8 MB. Without a custom photo the default image is used.</p>
        <Lbl>Photo Caption</Lbl><input value={story.caption} onChange={(e) => setStory({ ...story, caption: e.target.value })} className={inputCls} />
        <SaveBtn onClick={() => save("about_story", story)} />
      </Section>

      <Section title="About Page — Why Choose Infinity">
        <Lbl>Heading</Lbl><input value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} className={inputCls} />
        <Lbl>Body</Lbl><textarea value={about.body} onChange={(e) => setAbout({ ...about, body: e.target.value })} className={`${inputCls} min-h-[100px]`} />
        <Lbl>Stats (label:value, one per line)</Lbl>
        <textarea value={(about.stats ?? []).map((s: any) => `${s.label}:${s.value}`).join("\n")}
          onChange={(e) => setAbout({ ...about, stats: e.target.value.split("\n").filter(Boolean).map((l) => { const [label, value] = l.split(":"); return { label: (label || "").trim(), value: (value || "").trim() }; }) })}
          className={`${inputCls} min-h-[80px]`} />
        <SaveBtn onClick={() => save("about", about)} />
      </Section>

      <Section title="About Page — Feature Cards">
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border p-4">
              <div className="grid gap-3 sm:grid-cols-[90px_1fr]">
                <div><Lbl>Icon/Emoji</Lbl><input value={f.icon} onChange={(e) => updFeature(i, { icon: e.target.value })} className={inputCls} /></div>
                <div><Lbl>Title</Lbl><input value={f.title} onChange={(e) => updFeature(i, { title: e.target.value })} className={inputCls} /></div>
              </div>
              <Lbl>Description</Lbl>
              <textarea value={f.desc} onChange={(e) => updFeature(i, { desc: e.target.value })} className={`${inputCls} min-h-[60px]`} />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={f.is_active !== false} onChange={(e) => updFeature(i, { is_active: e.target.checked })} /> Active
                </label>
                <span className="text-xs text-muted-foreground">Order {f.display_order ?? i + 1}</span>
                <button onClick={() => moveFeature(i, -1)} className="rounded-full border border-border p-1.5"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => moveFeature(i, 1)} className="rounded-full border border-border p-1.5"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setFeatures(features.filter((_, idx) => idx !== i).map((x, idx) => ({ ...x, display_order: idx + 1 })))}
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-destructive px-3 py-1.5 text-xs font-bold text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setFeatures([...features, { icon: "⭐", title: "New feature", desc: "", display_order: features.length + 1, is_active: true }])}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold">
          <Plus className="h-4 w-4" /> Add Feature
        </button>
        <SaveBtn onClick={() => save("about_features", features.map((f, i) => ({ ...f, display_order: f.display_order ?? i + 1 })))} />
      </Section>

      <Section title="Contact Information">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Lbl>Phone</Lbl><input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={inputCls} /></div>
          <div><Lbl>WhatsApp number (digits only)</Lbl><input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} className={inputCls} /></div>
          <div><Lbl>Email</Lbl><input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={inputCls} /></div>
          <div><Lbl>Address</Lbl><input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className={inputCls} /></div>
        </div>
        <SaveBtn onClick={() => save("contact", contact)} />
      </Section>
    </div>
  );
}

const Section = ({ title, children }: any) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
    <h2 className="mb-4 font-display text-lg font-bold">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);
const Lbl = ({ children }: any) => <span className="mt-3 block text-xs font-bold uppercase tracking-wide text-muted-foreground">{children}</span>;
const SaveBtn = ({ onClick }: any) => (
  <button onClick={onClick} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-soft">
    <Save className="h-4 w-4" /> Save
  </button>
);

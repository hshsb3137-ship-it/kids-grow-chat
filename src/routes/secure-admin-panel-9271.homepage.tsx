import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchSiteContent, upsertSiteContent } from "@/lib/api";
import { Save } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/homepage")({ component: HomepageAdmin });

function HomepageAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const [hero, setHero] = useState<any>({ heading: "", subtitle: "", cta_primary: "Shop Now", cta_secondary: "WhatsApp Order" });
  const [offer, setOffer] = useState<any>({ enabled: true, text: "", link: "/shop" });
  const [about, setAbout] = useState<any>({ heading: "", body: "", stats: [] });
  const [contact, setContact] = useState<any>({ phone: "", whatsapp: "", email: "", address: "", map_url: "" });

  useEffect(() => {
    if (!data) return;
    if (data.hero) setHero({ ...hero, ...data.hero });
    if (data.offer_banner) setOffer({ ...offer, ...data.offer_banner });
    if (data.about) setAbout({ ...about, ...data.about });
    if (data.contact) setContact({ ...contact, ...data.contact });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const save = async (key: string, value: any) => {
    await upsertSiteContent(key, value);
    qc.invalidateQueries({ queryKey: ["site_content"] });
    alert("Saved!");
  };

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

      <Section title="About Section">
        <Lbl>Heading</Lbl><input value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} className={inputCls} />
        <Lbl>Body</Lbl><textarea value={about.body} onChange={(e) => setAbout({ ...about, body: e.target.value })} className={`${inputCls} min-h-[100px]`} />
        <Lbl>Stats (label:value, one per line)</Lbl>
        <textarea value={(about.stats ?? []).map((s: any) => `${s.label}:${s.value}`).join("\n")}
          onChange={(e) => setAbout({ ...about, stats: e.target.value.split("\n").filter(Boolean).map((l) => { const [label, value] = l.split(":"); return { label: (label || "").trim(), value: (value || "").trim() }; }) })}
          className={`${inputCls} min-h-[80px]`} />
        <SaveBtn onClick={() => save("about", about)} />
      </Section>

      <Section title="Contact Information">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Lbl>Phone</Lbl><input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={inputCls} /></div>
          <div><Lbl>WhatsApp number (digits only)</Lbl><input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} className={inputCls} /></div>
          <div><Lbl>Email</Lbl><input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={inputCls} /></div>
          <div><Lbl>Address</Lbl><input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className={inputCls} /></div>
        </div>
        <Lbl>Map embed URL</Lbl><input value={contact.map_url} onChange={(e) => setContact({ ...contact, map_url: e.target.value })} className={inputCls} />
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

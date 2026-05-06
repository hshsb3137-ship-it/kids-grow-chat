import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Infinity Learning Center" },
      { name: "description", content: "Reach Infinity Learning Center via WhatsApp, phone or our contact form." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! My name is ${form.name} (${form.phone}). ${form.message}`;
    window.open(`https://wa.me/918075583203?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Get in <span className="text-gradient">Touch</span></h1>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you. Reach out anytime!</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "+91 80755 83203" },
            { icon: MessageCircle, label: "WhatsApp", value: "+91 80755 83203" },
            { icon: Mail, label: "Email", value: "hello@infinitylearning.in" },
            { icon: MapPin, label: "Address", value: "Infinity Learning Center, Kerala, India" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-primary">{c.label}</div>
                <div className="font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
          <a
            href={whatsappContactUrl()}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-full bg-whatsapp py-3 text-center font-bold text-whatsapp-foreground shadow-soft transition hover:scale-[1.01]"
          >
            Chat on WhatsApp
          </a>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Kerala+India&output=embed"
              width="100%"
              height="240"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Send a Message</h2>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            maxLength={80}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone number"
            maxLength={20}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            rows={5}
            maxLength={500}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-primary py-3 font-bold text-primary-foreground shadow-pop transition hover:scale-[1.01]"
          >
            Send via WhatsApp
          </button>
        </form>
      </section>
    </Layout>
  );
}

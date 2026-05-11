import { Users, GraduationCap, Sparkles, MessageCircle } from "lucide-react";

const badges = [
  { icon: Users, label: "5000+ Happy Parents" },
  { icon: GraduationCap, label: "Teacher Designed" },
  { icon: Sparkles, label: "Fun Visual Learning" },
  { icon: MessageCircle, label: "WhatsApp Support" },
];

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft sm:grid-cols-4 sm:p-5">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-3 rounded-2xl bg-gradient-hero px-3 py-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-card text-primary shadow-soft">
              <b.icon className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold leading-tight sm:text-sm">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

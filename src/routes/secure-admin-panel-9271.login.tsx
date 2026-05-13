import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/login")({
  component: LoginPage,
});

type Mode = "login" | "signup" | "forgot";

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null); setInfo(null);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (error) setErr(error.message);
      else setInfo("If an account exists for this email, a password reset link has been sent.");
      return;
    }

    const fn = mode === "login" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) setErr(error);
    else if (mode === "signup") setInfo("Check your email to confirm your account.");
  };

  const titles: Record<Mode, { title: string; sub: string; cta: string }> = {
    login: { title: "Admin Sign In", sub: "Restricted access", cta: "Sign In" },
    signup: { title: "Admin Setup", sub: "Create the first (and only) admin account", cta: "Create Admin Account" },
    forgot: { title: "Reset password", sub: "We'll email you a secure reset link.", cta: "Send reset link" },
  };
  const t = titles[mode];

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-pop">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>
          <h1 className="mt-3 font-display text-2xl font-bold">{t.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.sub}</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          {mode !== "forgot" && (
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8 chars)"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          )}
          {err && <p className="text-sm text-destructive">{err}</p>}
          {info && <p className="rounded-xl bg-mint/40 p-2 text-sm font-semibold">{info}</p>}
          <button disabled={busy} className="w-full rounded-full bg-gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-soft disabled:opacity-60">
            {busy ? "Please wait…" : t.cta}
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-1.5 text-center text-xs font-semibold text-muted-foreground">
          {mode === "login" && (
            <>
              <button onClick={() => { setMode("forgot"); setErr(null); setInfo(null); }} className="hover:text-primary">
                Forgot password?
              </button>
              <button onClick={() => { setMode("signup"); setErr(null); setInfo(null); }} className="hover:text-primary">
                First time? Set up admin →
              </button>
            </>
          )}
          {mode !== "login" && (
            <button onClick={() => { setMode("login"); setErr(null); setInfo(null); }} className="hover:text-primary">
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

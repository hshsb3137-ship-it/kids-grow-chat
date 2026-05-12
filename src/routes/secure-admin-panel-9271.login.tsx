import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const fn = mode === "login" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) setErr(error);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-pop">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>
          <h1 className="mt-3 font-display text-2xl font-bold">Admin {mode === "login" ? "Sign In" : "Setup"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Restricted access" : "Create the first (and only) admin account"}
          </p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8 chars)"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={busy} className="w-full rounded-full bg-gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-soft disabled:opacity-60">
            {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Create Admin Account"}
          </button>
        </form>
        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(null); }}
          className="mt-4 w-full text-center text-xs font-semibold text-muted-foreground hover:text-primary">
          {mode === "login" ? "First time? Set up admin →" : "← Back to sign in"}
        </button>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // When user lands from the email link, supabase-js parses the recovery
    // tokens in the URL hash and fires a PASSWORD_RECOVERY event.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (password.length < 8) return setErr("Password must be at least 8 characters.");
    if (password !== confirm) return setErr("Passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setErr(error.message);
    setDone(true);
    setTimeout(() => nav({ to: "/secure-admin-panel-9271/login" }), 1500);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-pop">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </span>
          <h1 className="mt-3 font-display text-2xl font-bold">Set a new password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {ready ? "Choose a strong password for your admin account." : "Verifying your reset link…"}
          </p>
        </div>

        {done ? (
          <p className="rounded-xl bg-mint/40 p-3 text-center text-sm font-semibold">
            Password updated! Redirecting to sign in…
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password" required minLength={8} disabled={!ready}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 8 chars)"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50"
            />
            <input
              type="password" required minLength={8} disabled={!ready}
              value={confirm} onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50"
            />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button disabled={!ready || busy} className="w-full rounded-full bg-gradient-primary py-3 text-sm font-bold text-primary-foreground shadow-soft disabled:opacity-60">
              {busy ? "Updating…" : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

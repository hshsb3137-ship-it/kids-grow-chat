import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { inviteAdmin, listAdmins, revokeAdmin } from "@/lib/admin-invites.functions";
import { Mail, Shield, Trash2, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/secure-admin-panel-9271/admins")({
  component: AdminsPage,
});

function AdminsPage() {
  const qc = useQueryClient();
  const invite = useServerFn(inviteAdmin);
  const list = useServerFn(listAdmins);
  const revoke = useServerFn(revokeAdmin);

  const { data: admins = [], isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const result = await list();
      if (!Array.isArray(result)) {
        throw new Error("The admin list returned an invalid response. Please retry.");
      }
      return result;
    },
    retry: 1,
  });

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null); setErr(null);
    try {
      const res = await invite({ data: { email } });
      setMsg(res.message);
      setEmail("");
      qc.invalidateQueries({ queryKey: ["admins"] });
    } catch (e: any) {
      setErr(e?.message ?? "Failed to send invite");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Admins</h1>
        <p className="text-muted-foreground">Invite trusted teammates to manage the store</p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase text-muted-foreground">Invite by email</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="teammate@example.com"
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft disabled:opacity-60">
              <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send invite"}
            </button>
          </div>
        </label>
        {msg && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-mint/40 px-3 py-2 text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4" /> {msg}
          </p>
        )}
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <p className="mt-3 text-xs text-muted-foreground">
          The person will get a secure email invite. Once they accept and set a password, they'll have full admin access.
        </p>
      </form>

      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold">Current admins</h2>
        </div>
        {isLoading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading admins…</p>
        ) : isError ? (
          <div className="p-6">
            <p className="text-sm font-semibold text-destructive">Unable to load admins. Please try again.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {error instanceof Error ? error.message : "The request could not be completed."}
            </p>
            <button onClick={() => refetch()} className="mt-3 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground">
              {isFetching ? "Retrying…" : "Retry"}
            </button>
          </div>
        ) : admins.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No admins yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {admins.map((a) => (
              <li key={a.user_id} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <div className="font-bold">{a.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.confirmed ? "Active" : "Pending invite"} · granted {new Date(a.granted_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (!confirm(`Revoke admin access for ${a.email}?`)) return;
                    try {
                      await revoke({ data: { user_id: a.user_id } });
                      qc.invalidateQueries({ queryKey: ["admins"] });
                    } catch (e: any) {
                      alert(e?.message ?? "Failed to revoke");
                    }
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
                  title="Revoke admin">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

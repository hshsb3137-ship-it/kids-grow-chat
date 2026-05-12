import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Package, Tags, MessageSquareQuote, Home, ShoppingBag, LogOut, Sparkles } from "lucide-react";

const ADMIN_BASE = "/secure-admin-panel-9271";

const items = [
  { to: ADMIN_BASE, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: `${ADMIN_BASE}/products`, label: "Products", icon: Package },
  { to: `${ADMIN_BASE}/categories`, label: "Categories", icon: Tags },
  { to: `${ADMIN_BASE}/testimonials`, label: "Testimonials", icon: MessageSquareQuote },
  { to: `${ADMIN_BASE}/homepage`, label: "Homepage", icon: Home },
  { to: `${ADMIN_BASE}/orders`, label: "Orders", icon: ShoppingBag },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const isLoginPage = loc.pathname.endsWith("/login");

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) nav({ to: `${ADMIN_BASE}/login` });
    if (user && isLoginPage) nav({ to: ADMIN_BASE });
  }, [user, loading, isLoginPage, nav]);

  if (isLoginPage) return <>{children}</>;
  if (loading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-destructive">Access denied</h1>
          <p className="mt-2 text-muted-foreground">This account is not an admin.</p>
          <button onClick={async () => { await signOut(); nav({ to: `${ADMIN_BASE}/login` }); }}
            className="mt-4 rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><Sparkles className="h-4 w-4" /></span>
          <span className="font-display font-bold">Admin Panel</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {items.map((it) => {
            const active = it.exact ? loc.pathname === it.to || loc.pathname === it.to + "/" : loc.pathname.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-foreground/80 hover:bg-accent"
                }`}>
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={async () => { await signOut(); nav({ to: `${ADMIN_BASE}/login` }); }}
          className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Sparkles className="h-4 w-4" /></span>
            <span className="font-display font-bold">Admin</span>
          </Link>
          <button onClick={async () => { await signOut(); nav({ to: `${ADMIN_BASE}/login` }); }} className="text-xs font-bold text-muted-foreground">Sign out</button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden">
          {items.map((it) => {
            const active = it.exact ? loc.pathname === it.to : loc.pathname.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to}
                className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${
                  active ? "bg-gradient-primary text-primary-foreground" : "bg-accent text-foreground"
                }`}>
                <it.icon className="h-3.5 w-3.5" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

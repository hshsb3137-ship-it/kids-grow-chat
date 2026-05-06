import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-background/85 backdrop-blur shadow-soft" : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold leading-none sm:text-xl">
            Infinity <span className="text-gradient">Learning</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-accent hover:text-foreground data-[status=active]:bg-gradient-primary data-[status=active]:text-primary-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/shop"
          className="hidden rounded-full bg-gradient-bubble px-5 py-2.5 text-sm font-bold text-bubble-foreground shadow-soft transition hover:scale-105 md:inline-block"
        >
          Shop Now
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-accent md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-accent data-[status=active]:bg-gradient-primary data-[status=active]:text-primary-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

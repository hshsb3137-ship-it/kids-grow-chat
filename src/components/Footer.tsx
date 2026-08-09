import { Link } from "@tanstack/react-router";
import { Sparkles, Phone, MapPin, Mail } from "lucide-react";
import { whatsappContactUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-16 bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Infinity Learning</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Smart learning materials & classes that make kids fall in love with studying.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base font-bold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/shop" search={{ category: "tuition-materials" }} className="hover:text-primary">Tuition Materials</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-bold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 80755 83203</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@infinitylearning.in</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Kerala, India</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-bold">Order on WhatsApp</h4>
          <p className="mt-3 text-sm text-muted-foreground">Tap below to chat with us instantly.</p>
          <a
            href={whatsappContactUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:scale-105"
          >
            Chat Now
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Infinity Learning Center. Made with ♥ for curious kids.
      </div>
    </footer>
  );
}

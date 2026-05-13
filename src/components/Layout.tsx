import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { CartDrawer } from "./CartDrawer";
import { useRealtimeShop } from "@/hooks/useRealtimeShop";

export function Layout({ children }: { children: React.ReactNode }) {
  useRealtimeShop();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
}


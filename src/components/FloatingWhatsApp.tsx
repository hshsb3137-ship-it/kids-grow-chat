import { whatsappContactUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappContactUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-bold text-whatsapp-foreground shadow-pop transition hover:scale-110"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp-foreground/40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

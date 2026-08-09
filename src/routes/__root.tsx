import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold">Oops! Page not found</h2>
        <p className="mt-2 text-muted-foreground">The page you're looking for took a study break.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-pop">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { name: "description", content: "Educational flashcards, EVS worksheets and tuition materials. Order on WhatsApp." },
      { property: "og:title", content: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { name: "twitter:title", content: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { property: "og:description", content: "Educational flashcards, EVS worksheets and tuition materials. Order on WhatsApp." },
      { name: "twitter:description", content: "Educational flashcards, EVS worksheets and tuition materials. Order on WhatsApp." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d6cb1954-a73d-4000-8795-895b9ed3a0b2/id-preview-2e33726c--84ba8daa-83e9-4b16-a39f-83fd3f1af062.lovable.app-1778587682026.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d6cb1954-a73d-4000-8795-895b9ed3a0b2/id-preview-2e33726c--84ba8daa-83e9-4b16-a39f-83fd3f1af062.lovable.app-1778587682026.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } }));
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <CartProvider>
          <Outlet />
          <Toaster richColors position="top-center" />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

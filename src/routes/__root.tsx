import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

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
      { name: "description", content: "Educational flashcards, EVS worksheets, tuition notes, handwriting & brain exercise books for kids. Order on WhatsApp." },
      { property: "og:title", content: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { property: "og:description", content: "Educational flashcards, EVS worksheets, tuition notes, handwriting & brain exercise books for kids. Order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Infinity Learning Center — Smart Learning for Curious Kids" },
      { name: "twitter:description", content: "Educational flashcards, EVS worksheets, tuition notes, handwriting & brain exercise books for kids. Order on WhatsApp." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/371e5323-933d-477d-ab9a-9abfe6bb33b6/id-preview-e129ce9a--0cb9257d-b1d4-418d-ad33-ec5adbfae0e0.lovable.app-1778073828777.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/371e5323-933d-477d-ab9a-9abfe6bb33b6/id-preview-e129ce9a--0cb9257d-b1d4-418d-ad33-ec5adbfae0e0.lovable.app-1778073828777.png" },
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
  return <Outlet />;
}

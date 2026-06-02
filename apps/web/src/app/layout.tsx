import type { Metadata } from "next";
import { auth } from "../auth";
import { DevtoolsVisibility } from "../components/devtools-visibility";
import { SiteVisitTracker } from "../components/site-visit-tracker";
import { createMetadata, webApplicationJsonLd, websiteJsonLd } from "../lib/seo";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...createMetadata(),
  applicationName: "Фентезі до ЧС-2026",
  keywords: [
    "фентезі футбол",
    "фентезі ЧС 2026",
    "ЧС з футболу 2026",
    "Fantasy World Cup 2026",
    "фентезі футбол Україна",
    "українське фентезі",
  ],
  authors: [{ name: "Fraxler" }],
  creator: "Fraxler",
  publisher: "Fraxler",
  category: "sports",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;

  return (
    <html lang="uk">
      <body data-admin={isAdmin ? "true" : "false"} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd()) }}
        />
        <DevtoolsVisibility isAdmin={isAdmin} />
        {children}
        <SiteVisitTracker />
      </body>
    </html>
  );
}

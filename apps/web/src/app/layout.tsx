import type { Metadata } from "next";
import Script from "next/script";
import { auth } from "../auth";
import { DevtoolsVisibility } from "../components/devtools-visibility";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fantasy 2026 UA",
  description: "Український fantasy-футбол до ЧС-2026",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;

  return (
    <html lang="uk">
      <body data-admin={isAdmin ? "true" : "false"}>
        <DevtoolsVisibility isAdmin={isAdmin} />
        {children}
        <Script src="https://views.fraxler.site/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

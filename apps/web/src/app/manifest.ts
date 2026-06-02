import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Фентезі-футбол, ЧС з футболу 2026",
    short_name: "Фентезі ЧС-2026",
    description: "Українська fantasy-гра до чемпіонату світу з футболу 2026.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7faf4",
    theme_color: "#0e5f42",
    lang: "uk-UA",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/main-photo.png",
        sizes: "1200x630",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

import type { Metadata } from "next";

export const siteUrl = "https://fantasy.fraxler.site";
export const siteName = "Фентезі-футбол, ЧС з футболу 2026";
export const siteTitle = "Фентезі до ЧС-2026 | Fantasy World Cup 2026 UA";
export const siteDescription =
  "Збери команду з гравців ЧС-2026, обери капітана, змагайся з друзями у лігах і глобальному рейтингу.";
export const ogImage = `${siteUrl}/main-photo.png`;

type SeoOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
  imageAlt?: string;
};

export function createMetadata({
  title,
  description = siteDescription,
  path = "/",
  noIndex = false,
  image = ogImage,
  imageAlt = "Фентезі до ЧС-2026",
}: SeoOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteTitle;
  const url = new URL(path, siteUrl).toString();
  const resolvedImage = new URL(image, siteUrl).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        uk: url,
      },
    },
    openGraph: {
      type: "website",
      locale: "uk_UA",
      siteName,
      title: pageTitle,
      description,
      url,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [resolvedImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: "Fantasy World Cup 2026 UA",
    url: siteUrl,
    inLanguage: "uk-UA",
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/leaderboard?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: siteUrl,
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    inLanguage: "uk-UA",
    isAccessibleForFree: true,
    description: siteDescription,
    image: ogImage,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "UAH",
    },
  };
}

import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/rules", "/matches", "/tournament", "/leaderboard", "/leagues", "/petitions", "/guides"],
        disallow: ["/admin", "/login", "/squad", "/onboarding", "/after-login", "/teams", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

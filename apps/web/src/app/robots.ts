import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/rules", "/matches", "/tournament", "/leaderboard", "/leagues", "/forum"],
        disallow: ["/admin", "/login", "/squad", "/onboarding", "/after-login", "/teams", "/guides", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

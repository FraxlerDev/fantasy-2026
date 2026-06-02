import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

const publicRoutes = [
  { path: "/", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/rules", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/calendar", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/tournament", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/leaderboard", priority: 0.8, changeFrequency: "hourly" as const },
  { path: "/leagues", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/petitions", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/guides", priority: 0.6, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

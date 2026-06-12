import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

const publicRoutes = [
  { path: "/", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/rules", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/matches", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/tournament", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/leaderboard", priority: 0.8, changeFrequency: "hourly" as const },
  { path: "/leagues", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/forum", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/players", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/player-rankings", priority: 0.7, changeFrequency: "hourly" as const },
  { path: "/player-points", priority: 0.7, changeFrequency: "hourly" as const },
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

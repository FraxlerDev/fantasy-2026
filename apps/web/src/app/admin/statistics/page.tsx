import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  AdminVisitStats,
  type AdminRawVisit,
  type DailyMetric,
} from "../../../components/admin-visit-stats";
import { AppShell } from "../../../components/shell";
import { requireAdmin } from "../../../lib/admin";
import { prisma } from "../../../lib/prisma";
import { createMetadata } from "../../../lib/seo";
import { isBotUserAgent } from "../../../lib/visit-analytics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Статистика відвідувань",
  path: "/admin/statistics",
  noIndex: true,
});

type SiteVisitRow = {
  id: string;
  user: {
    email: string | null;
    username: string | null;
    fantasyTeam: { id: string; name: string } | null;
  } | null;
  visitorKey: string;
  site: string;
  path: string;
  referrer: string | null;
  ip: string | null;
  countryCity: string | null;
  device: string | null;
  browserOs: string | null;
  userAgent: string | null;
  durationSeconds: number;
  startedAt: Date;
  lastSeenAt: Date;
};

function dailyMetrics(dates: Date[]): DailyMetric[] {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const counts = new Map<string, number>();
  dates.forEach((date) => {
    const key = formatter.format(date);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function pageTitle(path: string) {
  const pathname = path.split("?")[0] || "/";
  if (pathname === "/") return "Головна";
  if (pathname === "/squad") return "Мій склад";
  if (pathname === "/rules") return "Правила";
  if (pathname === "/matches") return "Матч-центр";
  if (pathname === "/tournament") return "Турнір";
  if (pathname === "/leaderboard") return "Рейтинг";
  if (pathname === "/leagues") return "Ліги";
  if (pathname === "/forum") return "Форум";
  if (pathname === "/login") return "Вхід";
  if (pathname === "/admin") return "Адмінка";
  if (pathname === "/admin/statistics") return "Статистика";
  if (pathname.startsWith("/teams/")) return "Сторінка команди";
  if (pathname.startsWith("/api/")) return "API";
  return pathname;
}

export default async function AdminStatisticsPage() {
  await requireAdmin();

  const siteVisit = (prisma as unknown as { siteVisit?: any }).siteVisit;
  const [visits, users, teams] = await Promise.all([
    siteVisit?.findMany({
      include: {
        user: {
          select: {
            email: true,
            username: true,
            fantasyTeam: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { startedAt: "desc" },
    }).catch(() => []) ?? Promise.resolve([]),
    prisma.user.findMany({ select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
    prisma.fantasyTeam.findMany({ select: { createdAt: true }, orderBy: { createdAt: "asc" } }),
  ]);

  const analyticsVisits: AdminRawVisit[] = (visits as SiteVisitRow[])
    .filter((visit) => !isBotUserAgent(visit.userAgent))
    .map((visit) => ({
      id: visit.id,
      teamId: visit.user?.fantasyTeam?.id ?? null,
      teamName: visit.user?.fantasyTeam?.name ?? null,
      managerName: visit.user?.username ?? null,
      email: visit.user?.email ?? null,
      visitorKey: visit.visitorKey,
      site: visit.site,
      ip: visit.ip,
      countryCity: visit.countryCity,
      device: visit.device,
      browserOs: visit.browserOs,
      durationSeconds: visit.durationSeconds,
      startedAt: visit.startedAt.toISOString(),
      lastSeenAt: visit.lastSeenAt.toISOString(),
      path: visit.path,
      pageTitle: pageTitle(visit.path),
      referrer: visit.referrer,
    }));

  return (
    <AppShell active="/admin">
      <div className="topbar admin-heading">
        <div>
          <p className="eyebrow">Адмінка</p>
          <h1>Статистика відвідувань</h1>
          <p className="muted">Аудиторія, джерела переходів, сторінки та активність за днями.</p>
        </div>
        <Link className="button" href="/admin">
          <ArrowLeft size={18} />
          До адмінки
        </Link>
      </div>

      <AdminVisitStats
        visits={analyticsVisits}
        registrations={dailyMetrics(users.map((user) => user.createdAt))}
        teamsCreated={dailyMetrics(teams.map((team) => team.createdAt))}
      />
    </AppShell>
  );
}

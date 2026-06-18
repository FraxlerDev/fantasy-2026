import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

const ONLINE_WINDOW_MS = 15_000;

export async function GET() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  if (!session?.user?.id || session.user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const teams = await prisma.fantasyTeam.findMany({
    select: {
      id: true,
      name: true,
      user: {
        select: {
          username: true,
          image: true,
          siteVisits: {
            select: { lastSeenAt: true },
            orderBy: { lastSeenAt: "desc" },
            take: 1,
          },
        },
      },
      _count: { select: { rosterEntries: true } },
    },
  });

  const now = Date.now();
  const rows = teams
    .filter((team) => team._count.rosterEntries === 15)
    .map((team) => {
      const lastSeenAt = team.user.siteVisits[0]?.lastSeenAt ?? null;
      return {
        id: team.id,
        name: team.name,
        manager: team.user.username?.trim() || "Користувач",
        image: team.user.image,
        lastSeenAt: lastSeenAt?.toISOString() ?? null,
        online: Boolean(lastSeenAt && now - lastSeenAt.getTime() <= ONLINE_WINDOW_MS),
      };
    })
    .sort((a, b) => {
      const activityDifference = new Date(b.lastSeenAt ?? 0).getTime() - new Date(a.lastSeenAt ?? 0).getTime();
      return activityDifference || a.name.localeCompare(b.name, "uk");
    });

  return NextResponse.json(
    {
      teams: rows,
      onlineCount: rows.filter((team) => team.online).length,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

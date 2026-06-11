import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ unreadCount: 0 });

  const userId = session.user.id;
  const leagues = await prisma.league.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { fantasyTeam: { userId } } } },
      ],
    },
    select: { id: true },
  });

  if (leagues.length === 0) return NextResponse.json({ unreadCount: 0 });

  const leagueIds = leagues.map((league) => league.id);
  const reads = await prisma.leagueChatRead.findMany({
    where: { userId, leagueId: { in: leagueIds } },
    select: { leagueId: true, lastReadAt: true },
  });
  const readByLeague = new Map(reads.map((read) => [read.leagueId, read.lastReadAt]));

  const unreadCount = await prisma.leagueChatMessage.count({
    where: {
      isDeleted: false,
      authorId: { not: userId },
      OR: leagueIds.map((leagueId) => ({
        leagueId,
        ...(readByLeague.has(leagueId)
          ? { createdAt: { gt: readByLeague.get(leagueId)! } }
          : {}),
      })),
    },
  });

  return NextResponse.json({ unreadCount });
}

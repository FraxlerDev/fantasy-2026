import type { PlayerPosition } from "@prisma/client";
import { prisma } from "./prisma";

export type PlayerRankingMode = "popularity" | "points";

export type RankedPlayer = {
  id: string;
  name: string;
  position: PlayerPosition;
  price: number;
  photoUrl: string | null;
  value: number;
  pointsByGameweek: Record<number, number>;
  nationalTeam: {
    id: string;
    nameUk: string;
    flagPath: string | null;
  };
};

export async function getPlayerRanking(mode: PlayerRankingMode) {
  const values = new Map<string, number>();
  const pointsByPlayerGameweek = new Map<string, Record<number, number>>();

  if (mode === "popularity") {
    const rows = await prisma.rosterEntry.groupBy({
      by: ["playerId"],
      _count: { playerId: true },
    });
    for (const row of rows) values.set(row.playerId, row._count.playerId);
  } else {
    const rows = await prisma.matchPlayerPoint.findMany({
      select: {
        playerId: true,
        points: true,
        fixture: { select: { gameweek: true } },
      },
    });
    for (const row of rows) {
      const gameweek = row.fixture.gameweek;
      const gameweekPoints = pointsByPlayerGameweek.get(row.playerId) ?? {};
      gameweekPoints[gameweek] = (gameweekPoints[gameweek] ?? 0) + row.points;
      pointsByPlayerGameweek.set(row.playerId, gameweekPoints);
      values.set(row.playerId, (values.get(row.playerId) ?? 0) + row.points);
    }
  }

  if (values.size === 0) return [];

  const players = await prisma.player.findMany({
    where: { id: { in: [...values.keys()] } },
    include: { nationalTeam: true },
  });

  return players
    .map((player) => ({
      id: player.id,
      name: player.name,
      position: player.position,
      price: Number(player.price),
      photoUrl: player.photoUrl,
      value: values.get(player.id) ?? 0,
      pointsByGameweek: pointsByPlayerGameweek.get(player.id) ?? {},
      nationalTeam: {
        id: player.nationalTeam.id,
        nameUk: player.nationalTeam.nameUk,
        flagPath: player.nationalTeam.flagPath,
      },
    }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, "uk"));
}

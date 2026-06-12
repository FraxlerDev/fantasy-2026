import type { PlayerPosition } from "@prisma/client";
import { prisma } from "./prisma";

export type PlayerRankingMode = "popularity" | "points";

export type RankedPlayer = {
  id: string;
  name: string;
  position: PlayerPosition;
  photoUrl: string | null;
  value: number;
  nationalTeam: {
    id: string;
    nameUk: string;
    flagPath: string | null;
  };
};

export async function getPlayerRanking(mode: PlayerRankingMode) {
  const rows =
    mode === "popularity"
      ? await prisma.rosterEntry.groupBy({
          by: ["playerId"],
          _count: { playerId: true },
        })
      : await prisma.matchPlayerPoint.groupBy({
          by: ["playerId"],
          _sum: { points: true },
        });

  if (rows.length === 0) return [];

  const players = await prisma.player.findMany({
    where: { id: { in: rows.map((row) => row.playerId) } },
    include: { nationalTeam: true },
  });
  const values = new Map(
    rows.map((row) => [
      row.playerId,
      mode === "popularity"
        ? "_count" in row
          ? row._count.playerId
          : 0
        : "_sum" in row
          ? row._sum.points ?? 0
          : 0,
    ]),
  );

  return players
    .map((player) => ({
      id: player.id,
      name: player.name,
      position: player.position,
      photoUrl: player.photoUrl,
      value: values.get(player.id) ?? 0,
      nationalTeam: {
        id: player.nationalTeam.id,
        nameUk: player.nationalTeam.nameUk,
        flagPath: player.nationalTeam.flagPath,
      },
    }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, "uk"));
}

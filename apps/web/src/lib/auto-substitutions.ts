import type { PlayerPosition, RosterSlot } from "@prisma/client";
import { prisma } from "./prisma";
import { refreshLeaderboards } from "./rankings";

type SnapshotEntry = {
  playerId: string;
  slot: RosterSlot;
  benchOrder: number | null;
  player: { position: PlayerPosition };
};

type PlayerGameweekPoint = {
  points: number;
  didPlay: boolean;
};

function benchSort(a: SnapshotEntry, b: SnapshotEntry) {
  return (a.benchOrder ?? 99) - (b.benchOrder ?? 99) || a.playerId.localeCompare(b.playerId);
}

export async function calculateAutoSubstitutionRows(gameweek: number) {
  const [snapshots, fixtures] = await Promise.all([
    prisma.lineupSnapshot.findMany({
      where: { gameweek },
      include: {
        entries: {
          include: { player: { select: { position: true } } },
          orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
        },
      },
    }),
    prisma.fixture.findMany({
      where: { gameweek },
      include: { playerPoints: true },
    }),
  ]);

  const pointsByPlayer = new Map<string, PlayerGameweekPoint>();
  for (const fixture of fixtures) {
    for (const point of fixture.playerPoints) {
      const current = pointsByPlayer.get(point.playerId);
      pointsByPlayer.set(point.playerId, {
        points: (current?.points ?? 0) + point.points,
        didPlay: Boolean(current?.didPlay || point.didPlay),
      });
    }
  }

  const rows: Array<{
    fantasyTeamId: string;
    gameweek: number;
    outPlayerId: string;
    inPlayerId: string;
    points: number;
  }> = [];

  for (const snapshot of snapshots) {
    const starters = snapshot.entries.filter((entry) => entry.slot === "STARTER");
    const bench = snapshot.entries.filter((entry) => entry.slot === "BENCH").sort(benchSort);
    const usedBench = new Set<string>();

    for (const starter of starters) {
      const starterPoints = pointsByPlayer.get(starter.playerId);
      if (!starterPoints || starterPoints.didPlay) continue;

      const candidates = bench
        .filter((entry) => {
          if (usedBench.has(entry.playerId)) return false;
          if (entry.player.position !== starter.player.position) return false;
          const points = pointsByPlayer.get(entry.playerId);
          return Boolean(points?.didPlay && points.points !== 0);
        })
        .sort((a, b) => {
          const pointsDiff = (pointsByPlayer.get(b.playerId)?.points ?? 0) - (pointsByPlayer.get(a.playerId)?.points ?? 0);
          return pointsDiff || benchSort(a, b);
        });

      const replacement = candidates[0];
      if (!replacement) continue;

      usedBench.add(replacement.playerId);
      rows.push({
        fantasyTeamId: snapshot.fantasyTeamId,
        gameweek,
        outPlayerId: starter.playerId,
        inPlayerId: replacement.playerId,
        points: pointsByPlayer.get(replacement.playerId)?.points ?? 0,
      });
    }
  }

  return rows;
}

export async function applyAutoSubstitutions(gameweek: number) {
  const rows = await calculateAutoSubstitutionRows(gameweek);

  await prisma.$transaction(async (tx) => {
    await tx.autoSubstitution.deleteMany({ where: { gameweek } });
    if (rows.length > 0) {
      await tx.autoSubstitution.createMany({ data: rows });
    }
  });

  await refreshLeaderboards();
  return { created: rows.length };
}

export async function resetAutoSubstitutions(gameweek: number) {
  const result = await prisma.autoSubstitution.deleteMany({ where: { gameweek } });
  await refreshLeaderboards();
  return { deleted: result.count };
}

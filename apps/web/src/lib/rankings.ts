import type { PlayerPosition, RosterSlot } from "@prisma/client";
import { prisma } from "./prisma";

type RankedInput = { totalPoints: number };
type LineupEntry = {
  playerId: string;
  slot: RosterSlot;
  benchOrder: number | null;
  isCaptain: boolean;
  player: { position: PlayerPosition };
};

function toRankedRows<T extends RankedInput>(rows: T[]) {
  let previousPoints: number | null = null;
  let previousRank = 0;

  return rows.map((row, index) => {
    const rank = previousPoints === row.totalPoints ? previousRank : index + 1;
    previousPoints = row.totalPoints;
    previousRank = rank;
    return { ...row, rank };
  });
}

export async function refreshLeaderboards() {
  const teams = await prisma.fantasyTeam.findMany({
    where: { lineupSnapshots: { some: {} } },
    include: {
      user: true,
      lineupSnapshots: {
        include: {
          entries: {
            include: { player: true },
            orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
          },
        },
        orderBy: { gameweek: "asc" },
      },
    },
  });

  const fixtures = await prisma.fixture.findMany({
    include: { playerPoints: true },
    orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }],
  });

  const gameweeks = [...new Set(fixtures.map((fixture) => fixture.gameweek))];
  const pointsByGameweek = new Map<number, Map<string, number>>();

  for (const fixture of fixtures) {
    const pointMap = pointsByGameweek.get(fixture.gameweek) ?? new Map<string, number>();

    for (const point of fixture.playerPoints) {
      pointMap.set(point.playerId, (pointMap.get(point.playerId) ?? 0) + point.points);
    }

    pointsByGameweek.set(fixture.gameweek, pointMap);
  }

  const totals = new Map<string, number>();

  for (const team of teams) {
    let total = 0;

    for (const gameweek of gameweeks) {
      const snapshot = team.lineupSnapshots.find((item) => item.gameweek === gameweek);
      if (!snapshot?.entries.length) continue;

      const starters: LineupEntry[] = snapshot.entries.filter((entry) => entry.slot === "STARTER");
      const pointByPlayer = pointsByGameweek.get(gameweek) ?? new Map<string, number>();

      for (const entry of starters) {
        total += pointByPlayer.get(entry.playerId) ?? 0;
      }

      const captain = starters.find((entry) => entry.isCaptain);
      if (captain) {
        total += pointByPlayer.get(captain.playerId) ?? 0;
      }
    }

    totals.set(team.id, total);
  }

  await prisma.$transaction(async (tx) => {
    for (const [teamId, totalPoints] of totals.entries()) {
      await tx.fantasyTeam.update({
        where: { id: teamId },
        data: { totalPoints },
      });
    }

    await tx.leaderboardRow.deleteMany();

    const globalRows = toRankedRows(
      teams
        .map((team) => ({
          fantasyTeamId: team.id,
          totalPoints: totals.get(team.id) ?? 0,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints),
    );

    if (globalRows.length > 0) {
      await tx.leaderboardRow.createMany({
        data: globalRows.map((row) => ({
          scope: "GLOBAL",
          leagueId: null,
          fantasyTeamId: row.fantasyTeamId,
          rank: row.rank,
          totalPoints: row.totalPoints,
        })),
      });
    }

    const leagues = await tx.league.findMany({
      include: { members: true },
    });

    for (const league of leagues) {
      const leagueRows = toRankedRows(
        league.members
          .map((member) => ({
            fantasyTeamId: member.fantasyTeamId,
            totalPoints: totals.get(member.fantasyTeamId) ?? 0,
          }))
          .sort((a, b) => b.totalPoints - a.totalPoints),
      );

      if (leagueRows.length > 0) {
        await tx.leaderboardRow.createMany({
          data: leagueRows.map((row) => ({
            scope: "LEAGUE",
            leagueId: league.id,
            fantasyTeamId: row.fantasyTeamId,
            rank: row.rank,
            totalPoints: row.totalPoints,
          })),
        });
      }
    }
  });
}

import type { PlayerPosition, RosterSlot } from "@prisma/client";
import { prisma } from "./prisma";

const positions: PlayerPosition[] = ["GK", "DEF", "MID", "FWD"];
const positionLabels: Record<PlayerPosition, string> = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

type SnapshotEntry = {
  playerId: string;
  slot: RosterSlot;
  isCaptain: boolean;
  player: { id: string; name: string; photoUrl: string | null; position: PlayerPosition; nationalTeam: { flagPath: string | null } };
};

export async function getSeasonReviewData() {
  const [setting, teams, fixtures, autoSubs, usersCount] = await Promise.all([
    prisma.systemSetting.findUnique({ where: { key: "rankingsCurrentGameweek" } }),
    prisma.fantasyTeam.findMany({
      where: { rosterEntries: { some: {} } },
      include: {
        user: { select: { username: true, name: true, image: true } },
        lineupSnapshots: {
          include: { entries: { include: { player: { include: { nationalTeam: true } } } } },
          orderBy: { gameweek: "asc" },
        },
      },
    }),
    prisma.fixture.findMany({ include: { playerPoints: true }, orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }] }),
    prisma.autoSubstitution.findMany({ include: { inPlayer: true }, orderBy: { gameweek: "asc" } }),
    prisma.user.count(),
  ]);

  const inferredCutoff = fixtures.reduce((latest, fixture) => fixture.playerPoints.length ? Math.max(latest, fixture.gameweek) : latest, 0);
  const cutoff = Math.min(7, Math.max(0, Number(setting?.value ?? inferredCutoff)));
  const pointsByGw = new Map<number, Map<string, number>>();
  for (const fixture of fixtures) {
    if (fixture.gameweek > cutoff) continue;
    const map = pointsByGw.get(fixture.gameweek) ?? new Map<string, number>();
    for (const point of fixture.playerPoints) map.set(point.playerId, (map.get(point.playerId) ?? 0) + point.points);
    pointsByGw.set(fixture.gameweek, map);
  }

  const autoByTeamGw = new Map<string, number>();
  for (const sub of autoSubs.filter((item) => item.gameweek <= cutoff)) {
    const key = `${sub.fantasyTeamId}:${sub.gameweek}`;
    autoByTeamGw.set(key, (autoByTeamGw.get(key) ?? 0) + sub.points);
  }

  const teamRows = teams.map((team) => {
    const gwPoints = Array.from({ length: 7 }, () => 0);
    const captainResults: { player: SnapshotEntry["player"]; points: number; gameweek: number }[] = [];
    for (const snapshot of team.lineupSnapshots) {
      if (snapshot.gameweek > cutoff) continue;
      const map = pointsByGw.get(snapshot.gameweek) ?? new Map<string, number>();
      const starters = snapshot.entries.filter((entry) => entry.slot === "STARTER") as SnapshotEntry[];
      let score = starters.reduce((sum, entry) => sum + (map.get(entry.playerId) ?? 0), 0);
      const captain = starters.find((entry) => entry.isCaptain);
      if (captain) {
        const captainPoints = map.get(captain.playerId) ?? 0;
        score += captainPoints;
        captainResults.push({ player: captain.player, points: captainPoints * 2, gameweek: snapshot.gameweek });
      }
      score += autoByTeamGw.get(`${team.id}:${snapshot.gameweek}`) ?? 0;
      gwPoints[snapshot.gameweek - 1] = score;
    }
    return {
      id: team.id,
      name: team.name,
      manager: team.user.username ?? team.user.name ?? "Менеджер",
      photo: team.user.image,
      gwPoints,
      total: gwPoints.slice(0, cutoff).reduce((sum, points) => sum + points, 0),
      snapshots: team.lineupSnapshots,
      captainResults,
    };
  });

  const sortTeams = <T extends { name: string; total: number }>(rows: T[]) => [...rows].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "uk"));
  const ranking = sortTeams(teamRows).map((row, index) => ({ ...row, rank: index + 1 }));
  const gameweekWinners = Array.from({ length: cutoff }, (_, index) => {
    const gameweek = index + 1;
    const rows = teamRows
      .filter((team) => team.snapshots.some((snapshot) => snapshot.gameweek === gameweek))
      .map((team) => ({ ...team, total: team.gwPoints[index] }))
      .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "uk"));
    return rows[0] ? { gameweek, ...rows[0] } : null;
  }).filter(Boolean);

  const rankHistory = new Map<string, number[]>();
  for (let gw = 1; gw <= cutoff; gw += 1) {
    const rows = teamRows.map((team) => ({ ...team, total: team.gwPoints.slice(0, gw).reduce((sum, value) => sum + value, 0) }));
    sortTeams(rows).forEach((team, index) => {
      const history = rankHistory.get(team.id) ?? [];
      history[gw - 1] = index + 1;
      rankHistory.set(team.id, history);
    });
  }
  const chart = ranking.slice(0, 5).map((team) => ({ id: team.id, name: team.name, values: rankHistory.get(team.id) ?? [] }));

  const playerTotals = new Map<string, { id: string; name: string; photoUrl: string | null; position: PlayerPosition; flagPath: string | null; points: number }>();
  for (const snapshot of teams.flatMap((team) => team.lineupSnapshots)) {
    for (const entry of snapshot.entries as SnapshotEntry[]) {
      if (!playerTotals.has(entry.playerId)) playerTotals.set(entry.playerId, {
        id: entry.player.id, name: entry.player.name, photoUrl: entry.player.photoUrl, position: entry.player.position,
        flagPath: entry.player.nationalTeam.flagPath, points: 0,
      });
    }
  }
  for (const player of playerTotals.values()) {
    player.points = Array.from(pointsByGw.values()).reduce((sum, map) => sum + (map.get(player.id) ?? 0), 0);
  }
  const byPosition = (position: PlayerPosition, count: number) => [...playerTotals.values()]
    .filter((player) => player.position === position)
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, "uk"))
    .slice(0, count);
  const dreamTeam = [...byPosition("GK", 1), ...byPosition("DEF", 4), ...byPosition("MID", 3), ...byPosition("FWD", 3)];
  const positionLeaders = positions.map((position) => ({ position, label: positionLabels[position], player: byPosition(position, 1)[0] ?? null }));

  let bestJump: { team: string; jump: number; gameweek: number } | null = null;
  for (const team of teamRows) {
    const history = rankHistory.get(team.id) ?? [];
    for (let index = 1; index < history.length; index += 1) {
      const jump = history[index - 1] - history[index];
      if (jump > (bestJump?.jump ?? 0)) bestJump = { team: team.name, jump, gameweek: index + 1 };
    }
  }
  const bestGw = gameweekWinners.slice().sort((a, b) => (b?.total ?? 0) - (a?.total ?? 0))[0] ?? null;
  const bestCaptain = teamRows.flatMap((team) => team.captainResults.map((result) => ({ ...result, team: team.name })))
    .sort((a, b) => b.points - a.points)[0] ?? null;
  const bestAutoSub = autoSubs.filter((item) => item.gameweek <= cutoff).sort((a, b) => b.points - a.points)[0] ?? null;

  let transferCount = 0;
  for (const team of teamRows) {
    for (let index = 1; index < team.snapshots.length; index += 1) {
      const previous = new Set(team.snapshots[index - 1].entries.map((entry) => entry.playerId));
      transferCount += team.snapshots[index].entries.filter((entry) => !previous.has(entry.playerId)).length;
    }
  }

  return {
    cutoff, ranking, podium: ranking.slice(0, 3), topTen: ranking.slice(0, 10), gameweekWinners, chart,
    dreamTeam, positionLeaders,
    records: { bestGw, bestJump, bestCaptain, bestAutoSub },
    stats: {
      teams: ranking.length, users: usersCount, transfers: transferCount,
      autoSubs: autoSubs.filter((item) => item.gameweek <= cutoff).length,
      points: ranking.reduce((sum, team) => sum + team.total, 0),
    },
  };
}

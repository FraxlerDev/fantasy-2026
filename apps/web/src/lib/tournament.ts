import type { FixtureStatus } from "@prisma/client";
import { annexeC } from "../data/annexe-c";
import { playoffMatches, stadiums } from "../data/match-center";
import { prisma } from "./prisma";

export type TournamentTeam = {
  id: string;
  nameUk: string;
  groupKey: string | null;
  flagPath: string | null;
  teamConductScore: number;
  fifaRank: number | null;
};

export type GroupFixture = {
  id: string;
  matchNo: number | null;
  homeTeamId: string;
  awayTeamId: string;
  gameweek: number;
  groupName: string | null;
  kickoffAt: Date;
  homeScore: number | null;
  awayScore: number | null;
  homeTeam: TournamentTeam;
  awayTeam: TournamentTeam;
};

export type StandingRow = {
  team: TournamentTeam;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  headToHeadPoints: number;
  headToHeadGoalDifference: number;
  headToHeadGoalsFor: number;
};

export type PlayoffScore = {
  id: string;
  matchNo: number;
  stage: string;
  sourceHome: string;
  sourceAway: string;
  loserMatch: boolean;
  label: string | null;
  kickoffAt: Date;
  stadiumId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  status: FixtureStatus;
};

export type PlayoffParticipant =
  | { type: "team"; team: TournamentTeam; slot: string }
  | { type: "slot"; slot: string };

export type ResolvedPlayoffMatch = PlayoffScore & {
  home: PlayoffParticipant;
  away: PlayoffParticipant;
};

function emptyRow(team: TournamentTeam): StandingRow {
  return {
    team,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    headToHeadPoints: 0,
    headToHeadGoalDifference: 0,
    headToHeadGoalsFor: 0,
  };
}

function applyFixture(rowHome: StandingRow, rowAway: StandingRow, homeScore: number, awayScore: number) {
  rowHome.played += 1;
  rowAway.played += 1;
  rowHome.goalsFor += homeScore;
  rowHome.goalsAgainst += awayScore;
  rowAway.goalsFor += awayScore;
  rowAway.goalsAgainst += homeScore;

  if (homeScore > awayScore) {
    rowHome.wins += 1;
    rowAway.losses += 1;
    rowHome.points += 3;
  } else if (homeScore < awayScore) {
    rowAway.wins += 1;
    rowHome.losses += 1;
    rowAway.points += 3;
  } else {
    rowHome.draws += 1;
    rowAway.draws += 1;
    rowHome.points += 1;
    rowAway.points += 1;
  }
}

function compareFinalTiebreak(a: StandingRow, b: StandingRow) {
  return (
    b.team.teamConductScore - a.team.teamConductScore ||
    (a.team.fifaRank ?? Number.MAX_SAFE_INTEGER) - (b.team.fifaRank ?? Number.MAX_SAFE_INTEGER) ||
    a.team.nameUk.localeCompare(b.team.nameUk, "uk")
  );
}

export function buildGroupStandings(groupTeams: TournamentTeam[], fixtures: GroupFixture[]) {
  const rows = new Map(groupTeams.map((team) => [team.id, emptyRow(team)]));
  const completed = fixtures.filter(
    (fixture) => fixture.homeScore !== null && fixture.awayScore !== null,
  );

  for (const fixture of completed) {
    const home = rows.get(fixture.homeTeamId);
    const away = rows.get(fixture.awayTeamId);
    if (!home || !away) continue;
    applyFixture(home, away, fixture.homeScore!, fixture.awayScore!);
  }

  for (const row of rows.values()) {
    row.goalDifference = row.goalsFor - row.goalsAgainst;
  }

  const pointGroups = new Map<number, StandingRow[]>();
  for (const row of rows.values()) {
    pointGroups.set(row.points, [...(pointGroups.get(row.points) ?? []), row]);
  }

  const ranked: StandingRow[] = [];
  for (const points of [...pointGroups.keys()].sort((a, b) => b - a)) {
    const tiedRows = pointGroups.get(points)!;
    const tiedIds = new Set(tiedRows.map((row) => row.team.id));
    const miniRows = new Map(tiedRows.map((row) => [row.team.id, emptyRow(row.team)]));

    for (const fixture of completed) {
      if (!tiedIds.has(fixture.homeTeamId) || !tiedIds.has(fixture.awayTeamId)) continue;
      applyFixture(
        miniRows.get(fixture.homeTeamId)!,
        miniRows.get(fixture.awayTeamId)!,
        fixture.homeScore!,
        fixture.awayScore!,
      );
    }

    for (const row of tiedRows) {
      const mini = miniRows.get(row.team.id)!;
      row.headToHeadPoints = mini.points;
      row.headToHeadGoalsFor = mini.goalsFor;
      row.headToHeadGoalDifference = mini.goalsFor - mini.goalsAgainst;
    }

    tiedRows.sort(
      (a, b) =>
        b.headToHeadPoints - a.headToHeadPoints ||
        b.headToHeadGoalDifference - a.headToHeadGoalDifference ||
        b.headToHeadGoalsFor - a.headToHeadGoalsFor ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        compareFinalTiebreak(a, b),
    );
    ranked.push(...tiedRows);
  }

  return ranked;
}

export function buildAllGroupStandings(teams: TournamentTeam[], fixtures: GroupFixture[]) {
  const result = new Map<string, StandingRow[]>();
  for (const group of "ABCDEFGHIJKL") {
    const groupTeams = teams.filter((team) => team.groupKey === group);
    const groupFixtures = fixtures.filter(
      (fixture) => fixture.groupName === `Група ${group}` || fixture.homeTeam.groupKey === group,
    );
    result.set(group, buildGroupStandings(groupTeams, groupFixtures));
  }
  return result;
}

export function rankThirdPlacedTeams(tables: Map<string, StandingRow[]>) {
  return [...tables.entries()]
    .map(([group, rows]) => ({ group, row: rows[2] }))
    .filter((entry): entry is { group: string; row: StandingRow } => Boolean(entry.row))
    .sort(
      (a, b) =>
        b.row.points - a.row.points ||
        b.row.goalDifference - a.row.goalDifference ||
        b.row.goalsFor - a.row.goalsFor ||
        b.row.team.teamConductScore - a.row.team.teamConductScore ||
        (a.row.team.fifaRank ?? Number.MAX_SAFE_INTEGER) - (b.row.team.fifaRank ?? Number.MAX_SAFE_INTEGER) ||
        a.row.team.nameUk.localeCompare(b.row.team.nameUk, "uk"),
    )
    .map((entry, index) => ({ ...entry, rank: index + 1, qualified: index < 8 }));
}

function dateFromReference(date: string, time: string) {
  const [day, month] = date.split(".").map(Number);
  return new Date(`2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${time}:00+03:00`);
}

export async function ensurePlayoffMatches() {
  await prisma.playoffMatch.createMany({
    data: playoffMatches.map((definition) => {
      const sourceHome = "slotA" in definition ? definition.slotA : definition.fromA;
      const sourceAway = "slotB" in definition ? definition.slotB : definition.fromB;
      return {
        id: definition.id,
        matchNo: definition.matchNo,
        stage: definition.stage,
        sourceHome,
        sourceAway,
        loserMatch: "loserMatch" in definition ? Boolean(definition.loserMatch) : false,
        label: "label" in definition ? definition.label : null,
        kickoffAt: dateFromReference(definition.date, definition.time),
        stadiumId: definition.stadiumId,
      };
    }),
    skipDuplicates: true,
  });
}

function teamParticipant(row: StandingRow | undefined, slot: string): PlayoffParticipant {
  if (!row || row.played < 3) return { type: "slot", slot };
  return { type: "team", team: row.team, slot };
}

function matchWinner(match: ResolvedPlayoffMatch) {
  if (match.home.type !== "team" || match.away.type !== "team") return null;
  if (match.homeScore === null || match.awayScore === null) return null;
  if (match.homeScore > match.awayScore) return match.home;
  if (match.awayScore > match.homeScore) return match.away;
  if (match.homePenalties === null || match.awayPenalties === null) return null;
  if (match.homePenalties === match.awayPenalties) return null;
  return match.homePenalties > match.awayPenalties ? match.home : match.away;
}

function matchLoser(match: ResolvedPlayoffMatch) {
  const winner = matchWinner(match);
  if (!winner || match.home.type !== "team" || match.away.type !== "team") return null;
  return winner.team.id === match.home.team.id ? match.away : match.home;
}

export function resolvePlayoffMatches(
  tables: Map<string, StandingRow[]>,
  scores: PlayoffScore[],
) {
  const scoreById = new Map(scores.map((score) => [score.id, score]));
  const thirds = rankThirdPlacedTeams(tables)
    .filter((entry) => entry.qualified && entry.row.played === 3)
    .slice(0, 8);
  const advancedKey = thirds.map((entry) => entry.group).sort().join("");
  const annexRow = (annexeC as Record<string, Record<string, string>>)[advancedKey];
  const thirdByGroup = new Map(thirds.map((entry) => [entry.group, entry.row]));
  const thirdTargets: Record<string, string> = {
    "r32-11": "1A",
    "r32-15": "1B",
    "r32-7": "1D",
    "r32-1": "1E",
    "r32-8": "1G",
    "r32-2": "1I",
    "r32-16": "1K",
    "r32-12": "1L",
  };
  const resolved = new Map<string, ResolvedPlayoffMatch>();

  const resolveGroupSlot = (slot: string, matchId: string): PlayoffParticipant => {
    if (slot.includes("/")) {
      const winnerSlot = thirdTargets[matchId];
      const thirdGroup = annexRow?.[winnerSlot];
      return thirdGroup
        ? teamParticipant(thirdByGroup.get(thirdGroup), `${thirdGroup}3`)
        : { type: "slot", slot };
    }
    const group = slot[0];
    const place = Number(slot.slice(1));
    return teamParticipant(tables.get(group)?.[place - 1], slot);
  };

  for (const definition of playoffMatches) {
    const score = scoreById.get(definition.id);
    if (!score) continue;
    let home: PlayoffParticipant;
    let away: PlayoffParticipant;

    if ("slotA" in definition) {
      home = resolveGroupSlot(definition.slotA, definition.id);
      away = resolveGroupSlot(definition.slotB, definition.id);
    } else {
      const sourceHome = resolved.get(definition.fromA);
      const sourceAway = resolved.get(definition.fromB);
      const homeResult = sourceHome
        ? ("loserMatch" in definition && definition.loserMatch ? matchLoser(sourceHome) : matchWinner(sourceHome))
        : null;
      const awayResult = sourceAway
        ? ("loserMatch" in definition && definition.loserMatch ? matchLoser(sourceAway) : matchWinner(sourceAway))
        : null;
      home = homeResult ?? {
        type: "slot",
        slot: `${"loserMatch" in definition && definition.loserMatch ? "Програв" : "Переможець"} матчу ${sourceHome?.matchNo ?? definition.fromA}`,
      };
      away = awayResult ?? {
        type: "slot",
        slot: `${"loserMatch" in definition && definition.loserMatch ? "Програв" : "Переможець"} матчу ${sourceAway?.matchNo ?? definition.fromB}`,
      };
    }
    resolved.set(definition.id, { ...score, home, away });
  }

  return playoffMatches.map((definition) => resolved.get(definition.id)).filter(Boolean) as ResolvedPlayoffMatch[];
}

export function stadiumForGroupFixture(fixture: GroupFixture) {
  return stadiums.find((stadium) =>
    stadium.matches.some(
      (match) =>
        match[2] === "Груповий етап" &&
        ((match[3] === fixture.homeTeam.nameUk && match[4] === fixture.awayTeam.nameUk) ||
          (match[3] === fixture.awayTeam.nameUk && match[4] === fixture.homeTeam.nameUk)),
    ),
  );
}

export function playoffScoreText(match: ResolvedPlayoffMatch) {
  if (match.homeScore === null || match.awayScore === null) return "–";
  const main = `${match.homeScore}:${match.awayScore}`;
  if (match.homeScore === match.awayScore && match.homePenalties !== null && match.awayPenalties !== null) {
    return `${main} (${match.homePenalties}:${match.awayPenalties} пен.)`;
  }
  return main;
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MatchCenter } from "../../components/match-center";
import { AppShell } from "../../components/shell";
import { stadiums } from "../../data/match-center";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";
import {
  buildAllGroupStandings,
  ensurePlayoffMatches,
  rankThirdPlacedTeams,
  resolvePlayoffMatches,
} from "../../lib/tournament";

export const metadata: Metadata = createMetadata({
  title: "Матч-центр ЧС-2026",
  description: "Усі 104 матчі ЧС-2026, групові таблиці, сітка плей-оф, календар, результати, стадіони та склади збірних.",
  path: "/matches",
});

const validTabs = new Set(["groups", "playoff", "calendar", "stadiums"]);

export default async function MatchesPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string; stage?: string }>;
}) {
  const query = await searchParams;
  const initialTab = validTabs.has(query?.tab ?? "") ? query?.tab as "groups" | "playoff" | "calendar" | "stadiums" : "playoff";
  await ensurePlayoffMatches();

  const [teams, fixtures, playoffScores] = await Promise.all([
    prisma.nationalTeam.findMany({
      include: {
        players: {
          include: {
            matchPoints: { select: { points: true } },
            _count: { select: { rosterEntries: true } },
          },
          orderBy: [{ position: "asc" }, { name: "asc" }],
        },
      },
      orderBy: [{ groupKey: "asc" }, { nameUk: "asc" }],
    }),
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: [{ kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
    prisma.playoffMatch.findMany({ orderBy: { matchNo: "asc" } }),
  ]);

  const tournamentTeams = teams.map((team) => ({
    id: team.id,
    nameUk: team.nameUk,
    groupKey: team.groupKey,
    flagPath: team.flagPath,
    teamConductScore: team.teamConductScore,
    fifaRank: team.fifaRank,
  }));
  const teamById = new Map(tournamentTeams.map((team) => [team.id, team]));
  const groupFixtures = fixtures.filter((fixture) => fixture.gameweek <= 3).map((fixture) => ({
    ...fixture,
    homeTeam: teamById.get(fixture.homeTeamId)!,
    awayTeam: teamById.get(fixture.awayTeamId)!,
  }));
  const tables = buildAllGroupStandings(tournamentTeams, groupFixtures);
  const resolvedPlayoff = resolvePlayoffMatches(tables, playoffScores);
  const teamProfiles = teams.map((team) => ({
    id: team.id,
    nameUk: team.nameUk,
    groupKey: team.groupKey,
    flagPath: team.flagPath,
    players: team.players.map((player) => ({
      id: player.id,
      name: player.name,
      photoUrl: player.photoUrl,
      position: player.position,
      club: player.club,
      price: Number(player.price),
      status: player.status,
      unavailableReason: player.unavailableReason,
      fantasyPoints: player.matchPoints.reduce((sum, point) => sum + point.points, 0),
      pointMatches: player.matchPoints.length,
      selectedBy: player._count.rosterEntries,
    })),
  }));

  const groupMatches = groupFixtures.map((fixture) => ({
    id: fixture.id,
    matchNo: fixture.matchNo ?? 0,
    stage: "group",
    gameweek: fixture.gameweek,
    groupName: fixture.groupName,
    kickoffAt: fixture.kickoffAt.toISOString(),
    home: fixture.homeTeam,
    away: fixture.awayTeam,
    homeLabel: fixture.homeTeam.nameUk,
    awayLabel: fixture.awayTeam.nameUk,
    homeScore: fixture.homeScore,
    awayScore: fixture.awayScore,
    homePenalties: null,
    awayPenalties: null,
    stadiumId:
      stadiums.find((stadium) =>
        stadium.matches.some(
          (match) =>
            match[2] === "Груповий етап" &&
            ((match[3] === fixture.homeTeam.nameUk && match[4] === fixture.awayTeam.nameUk) ||
              (match[3] === fixture.awayTeam.nameUk && match[4] === fixture.homeTeam.nameUk)),
        ),
      )?.id ?? null,
    city: null,
  }));
  const knockoutMatches = resolvedPlayoff.map((match) => ({
    id: match.id,
    matchNo: match.matchNo,
    stage: match.stage,
    gameweek: null,
    groupName: null,
    kickoffAt: match.kickoffAt.toISOString(),
    home: match.home.type === "team" ? match.home.team : null,
    away: match.away.type === "team" ? match.away.team : null,
    homeLabel: match.home.type === "team" ? match.home.team.nameUk : match.home.slot,
    awayLabel: match.away.type === "team" ? match.away.team.nameUk : match.away.slot,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    homePenalties: match.homePenalties,
    awayPenalties: match.awayPenalties,
    stadiumId: match.stadiumId,
    city: stadiums.find((stadium) => stadium.id === match.stadiumId)?.city ?? null,
  }));
  const allMatches = [...groupMatches, ...knockoutMatches].sort(
    (a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime() || a.matchNo - b.matchNo,
  );
  const calendarStageKeys = ["gw1", "gw2", "gw3", "r32", "r16", "qf", "sf", "third", "final"] as const;
  const stageForMatch = (match: (typeof allMatches)[number]) => {
    if (match.gameweek && match.gameweek <= 3) return `gw${match.gameweek}`;
    if (match.id === "third-1") return "third";
    if (match.id === "final-1") return "final";
    return match.stage;
  };
  const now = new Date();
  const currentCalendarStage = calendarStageKeys.reduce<string>(
    (current, stage) => allMatches.some((match) => stageForMatch(match) === stage && new Date(match.kickoffAt) <= now) ? stage : current,
    "gw1",
  );
  const validCalendarStages = new Set(["all", ...calendarStageKeys]);
  const initialCalendarStage = (
    validCalendarStages.has(query?.stage ?? "") ? query!.stage! : currentCalendarStage
  ) as "all" | (typeof calendarStageKeys)[number];
  if (initialTab === "calendar" && !validCalendarStages.has(query?.stage ?? "")) {
    redirect(`/matches?tab=calendar&stage=${initialCalendarStage}`);
  }

  return (
    <AppShell active="/matches">
      <MatchCenter
        initialTab={initialTab}
        initialCalendarStage={initialCalendarStage}
        groups={[...tables.entries()].map(([key, rows]) => ({ key, rows }))}
        thirds={rankThirdPlacedTeams(tables).map(({ group, row, rank, qualified }) => ({
          ...row,
          group,
          rank,
          qualified,
        }))}
        matches={allMatches}
        stadiums={stadiums.map((stadium) => ({
          id: stadium.id,
          country: stadium.country,
          region: stadium.region,
          city: stadium.city,
          name: stadium.name,
          capacity: stadium.capacity,
          imagePath: stadium.imagePath,
          coordinates: stadium.coordinates,
        }))}
        teamProfiles={teamProfiles}
      />
    </AppShell>
  );
}

import type { PlayerPosition, RosterSlot } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FantasyLayout } from "../../../components/fantasy-layout";
import { AppShell } from "../../../components/shell";
import { prisma } from "../../../lib/prisma";
import { createMetadata } from "../../../lib/seo";

type PublicTeamPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PublicTeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const team = await prisma.fantasyTeam.findUnique({
    where: { id },
    select: {
      name: true,
      totalPoints: true,
      formation: true,
      user: { select: { username: true } },
    },
  });

  if (!team) {
    return createMetadata({
      title: "Команду не знайдено",
      path: `/teams/${id}`,
      noIndex: true,
    });
  }

  const manager = team.user.username?.trim() || "Користувач";

  return createMetadata({
    title: team.name,
    description: `Фентезі-команда «${team.name}». Менеджер: ${manager}. Очки: ${team.totalPoints}. Схема: ${team.formation}.`,
    path: `/teams/${id}`,
    noIndex: true,
  });
}

type LineupEntry = {
  id: string;
  playerId: string;
  slot: RosterSlot;
  benchOrder: number | null;
  isCaptain: boolean;
  player: {
    name: string;
    position: PlayerPosition;
    club: string | null;
    photoUrl: string | null;
    price: { toString(): string };
    status: string;
    unavailableReason: string | null;
    nationalTeam: { nameUk: string; flagPath: string | null };
  };
};

const formationShapes: Record<string, { DEF: number; MID: number; FWD: number }> = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { DEF: 5, MID: 4, FWD: 1 },
};

const positionLabels: Record<PlayerPosition, string> = {
  GK: "ВРТ",
  DEF: "ЗАХ",
  MID: "ПЗХ",
  FWD: "НАП",
};

function pitchRows(formation: string): Array<{ position: PlayerPosition; slots: number }> {
  const shape = formationShapes[formation] ?? formationShapes["4-3-3"];
  return [
    { position: "FWD", slots: shape.FWD },
    { position: "MID", slots: shape.MID },
    { position: "DEF", slots: shape.DEF },
    { position: "GK", slots: 1 },
  ];
}

function teamName(team: { nameUk: string; flagPath: string | null }) {
  return (
    <span className="fixture-line">
      {team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
      {team.nameUk}
    </span>
  );
}

function playerCard(entry: LineupEntry, points: Map<string, number>, label = positionLabels[entry.player.position]) {
  const playerPoints = points.get(entry.playerId) ?? 0;

  return (
    <div className={`fantasy-shirt filled public-team-shirt ${entry.player.status !== "AVAILABLE" ? "unavailable" : ""}`} key={entry.id}>
      <span className="player-photo-wrap">
        {entry.player.photoUrl ? <img alt="" className="player-photo" src={entry.player.photoUrl} /> : <span className="player-photo placeholder" />}
        <span className="player-photo-points">{playerPoints}</span>
        {entry.player.nationalTeam.flagPath ? <img alt="" className="player-photo-flag" src={entry.player.nationalTeam.flagPath} /> : null}
      </span>
      {entry.isCaptain ? <span className="captain-mark">К</span> : null}
      <strong>{entry.player.name}</strong>
      <em>{label} | {entry.player.club ?? "-"}</em>
      <span className="player-price-badge">{Number(entry.player.price).toFixed(1)}</span>
      {entry.player.status !== "AVAILABLE" ? <span className="unavailable-mark">НД</span> : null}
    </div>
  );
}

function gameweekPoints(entries: LineupEntry[], points: Map<string, number>) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  let total = starters.reduce((sum, entry) => sum + (points.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);

  if (captain) {
    total += points.get(captain.playerId) ?? 0;
  }

  return total;
}

export default async function PublicTeamPage({ params }: PublicTeamPageProps) {
  const { id } = await params;
  const team = await prisma.fantasyTeam.findUnique({
    where: { id },
    include: {
      user: true,
      rosterEntries: {
        include: { player: { include: { nationalTeam: true } } },
        orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
      },
      lineupSnapshots: {
        include: {
          entries: {
            include: { player: { include: { nationalTeam: true } } },
            orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
          },
        },
        orderBy: { gameweek: "asc" },
      },
    },
  });

  if (!team) notFound();

  const [rank, fixtures] = await Promise.all([
    prisma.leaderboardRow.findFirst({ where: { scope: "GLOBAL", fantasyTeamId: team.id } }),
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true, playerPoints: true },
      orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
  ]);

  const latestSnapshot = team.lineupSnapshots.at(-1);
  const currentFormation = latestSnapshot?.formation ?? team.formation;
  const currentEntries = (latestSnapshot?.entries.length ? latestSnapshot.entries : team.rosterEntries) as LineupEntry[];
  const starters = currentEntries.filter((entry) => entry.slot === "STARTER");
  const bench = currentEntries.filter((entry) => entry.slot === "BENCH").sort((a, b) => (a.benchOrder ?? 99) - (b.benchOrder ?? 99));
  const playerPointTotals = new Map<string, number>();

  for (const fixture of fixtures) {
    for (const point of fixture.playerPoints) {
      playerPointTotals.set(point.playerId, (playerPointTotals.get(point.playerId) ?? 0) + point.points);
    }
  }

  const gameweekRows = [...new Set(fixtures.map((fixture) => fixture.gameweek))].map((gameweek) => {
    const snapshotEntries =
      (team.lineupSnapshots.find((snapshot) => snapshot.gameweek === gameweek)?.entries as LineupEntry[] | undefined) ??
      (team.rosterEntries as LineupEntry[]);
    const gwFixtures = fixtures.filter((fixture) => fixture.gameweek === gameweek);
    const points = new Map<string, number>();
    for (const fixture of gwFixtures) {
      for (const point of fixture.playerPoints) {
        points.set(point.playerId, (points.get(point.playerId) ?? 0) + point.points);
      }
    }
    return { gameweek, fixtures: gwFixtures.length, points: gameweekPoints(snapshotEntries, points) };
  });

  const selectedTeamCodes = new Set(currentEntries.map((entry) => entry.player.nationalTeam.nameUk));
  const currentFixtures = fixtures
    .filter((fixture) => selectedTeamCodes.has(fixture.homeTeam.nameUk) || selectedTeamCodes.has(fixture.awayTeam.nameUk))
    .slice(0, 18);

  return (
    <AppShell active="/leaderboard">
      <FantasyLayout>
        <section className="team-header panel">
          <p className="eyebrow">Фентезі команда</p>
          <h1>{team.name}</h1>
          <p className="muted">Менеджер: {team.user.username?.trim() || "Користувач"}</p>
          <div className="grid cols-3" style={{ marginTop: 14 }}>
            <div className="card stat"><span className="badge">Очки</span><strong>{team.totalPoints}</strong></div>
            <div className="card stat"><span className="badge">Місце</span><strong>{rank?.rank ?? "-"}</strong></div>
            <div className="card stat"><span className="badge">Схема</span><strong>{currentFormation}</strong></div>
          </div>
        </section>

        <nav className="fantasy-tabs">
          <Link href={`/teams/${team.id}`}>Поле</Link>
          <Link href="/leaderboard">Рейтинг</Link>
          <Link href="/rules">Правила</Link>
          <Link href="/leagues">Ліги</Link>
        </nav>

        <section className="grid cols-2" style={{ marginTop: 16 }}>
          <div className="panel">
            <h2>Склад</h2>
            <div className="fixed-pitch public-fixed-pitch">
              {starters.length > 0 ? (
                pitchRows(currentFormation).map((row) => {
                  const rowPlayers = starters.filter((entry) => entry.player.position === row.position);
                  return (
                    <div className={`fixed-pitch-row slots-${row.slots}`} key={row.position}>
                      {Array.from({ length: row.slots }, (_, index) => {
                        const entry = rowPlayers[index];
                        return entry ? playerCard(entry, playerPointTotals) : <div className="fantasy-shirt empty public-empty-slot" key={`${row.position}-${index}`} />;
                      })}
                    </div>
                  );
                })
              ) : (
                <div className="drop-empty">Команда ще без гравців</div>
              )}
            </div>
            <div className="fixed-bench public-fixed-bench">
              {bench.length > 0 ? (
                Array.from({ length: 4 }, (_, index) => {
                  const entry = bench[index];
                  return entry ? playerCard(entry, playerPointTotals, "Лавка") : <div className="fantasy-shirt empty public-empty-slot" key={`bench-${index}`} />;
                })
              ) : (
                <div className="drop-empty small">Лавка порожня</div>
              )}
            </div>
          </div>

          <div className="panel">
            <h2>Очки по турах</h2>
            <table className="table compact-table">
              <thead><tr><th>GW</th><th>Матчів</th><th>Очки</th></tr></thead>
              <tbody>
                {gameweekRows.map((row) => (
                  <tr key={row.gameweek}>
                    <td>GW{row.gameweek}</td>
                    <td>{row.fixtures}</td>
                    <td><strong>{row.points}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Матчі гравців</h2>
          <table className="table compact-table">
            <thead><tr><th>GW</th><th>Матч</th><th>Статус</th></tr></thead>
            <tbody>
              {currentFixtures.map((fixture) => (
                <tr key={fixture.id}>
                  <td>GW{fixture.gameweek}</td>
                  <td>{teamName(fixture.homeTeam)} - {teamName(fixture.awayTeam)}</td>
                  <td>{fixture.homeScore === null ? "Очікується" : `${fixture.homeScore}:${fixture.awayScore}`}</td>
                </tr>
              ))}
              {currentFixtures.length === 0 ? <tr><td colSpan={3}>Матчів для вибраних гравців ще немає.</td></tr> : null}
            </tbody>
          </table>
        </section>
      </FantasyLayout>
    </AppShell>
  );
}

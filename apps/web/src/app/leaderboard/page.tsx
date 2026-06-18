import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

const PAGE_SIZE = 30;

function compareTeamNames(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name, "uk", { sensitivity: "base" });
}

function compareRankedTeams(
  a: { id: string; name: string; points: number },
  b: { id: string; name: string; points: number },
) {
  return b.points - a.points || compareTeamNames(a, b) || a.id.localeCompare(b.id);
}

export const metadata: Metadata = createMetadata({
  title: "Рейтинг фентезі-команд",
  description: "Глобальний рейтинг команд у фентезі-футболі до ЧС-2026: загальні очки та результати кожного туру.",
  path: "/leaderboard",
});

type ScoringEntry = {
  playerId: string;
  slot: "STARTER" | "BENCH";
  isCaptain: boolean;
};

type RankedTeam = {
  id: string;
  name: string;
  userId: string;
  manager: string;
  image: string | null;
  points: number;
  gameweekPoints: number | null;
  totalPoints: number;
  roundPoints: Array<number | null>;
  rank: number | null;
  previousRank?: number;
};

function teamInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "T";
}

function TeamLink({ id, name, image }: { id: string; name: string; image?: string | null }) {
  return (
    <Link className="leaderboard-team-link" href={`/teams/${id}`}>
      <span className="leaderboard-team-photo">
        {image ? <img src={image} alt="" /> : <span>{teamInitial(name)}</span>}
      </span>
      <span>{name}</span>
    </Link>
  );
}

function assignRanks<T extends { id: string; points: number }>(rows: T[]) {
  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

function scoreEntries(entries: ScoringEntry[], points: Map<string, number>, autoSubPoints = 0) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  const basePoints = starters.reduce((sum, entry) => sum + (points.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);
  return basePoints + (captain ? points.get(captain.playerId) ?? 0 : 0) + autoSubPoints;
}

function leaderboardUrl({
  tab,
  gw,
  page,
  query,
}: {
  tab: "overall" | "gw";
  gw: number;
  page?: number;
  query?: string;
}) {
  const params = new URLSearchParams({ tab });
  if (tab === "gw") params.set("gw", String(gw));
  if (page && page > 1) params.set("page", String(page));
  if (query) params.set("q", query);
  return `/leaderboard?${params.toString()}`;
}

function paginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "ellipsis",
    totalPages,
  ];
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; q?: string; tab?: string; gw?: string }>;
}) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const activeTab = params?.tab === "gw" ? "gw" : "overall";
  const page = Math.max(1, Number(params?.page ?? 1) || 1);
  const query = String(params?.q ?? "").trim();

  const [teams, fixtures, autoSubstitutions, rankingGameweekSetting] = await Promise.all([
    prisma.fantasyTeam.findMany({
      where: { rosterEntries: { some: {} } },
      select: {
        id: true,
        userId: true,
        name: true,
        totalPoints: true,
        createdAt: true,
        user: { select: { username: true, image: true } },
        lineupSnapshots: {
          select: {
            gameweek: true,
            entries: { select: { playerId: true, slot: true, isCaptain: true } },
          },
        },
      },
    }),
    prisma.fixture.findMany({
      select: {
        gameweek: true,
        playerPoints: { select: { playerId: true, points: true, updatedAt: true } },
      },
    }),
    prisma.autoSubstitution.findMany({
      select: { fantasyTeamId: true, gameweek: true, points: true, updatedAt: true },
    }),
    prisma.systemSetting.findUnique({ where: { key: "rankingsCurrentGameweek" } }),
  ]);

  const rankingGameweek = Math.min(7, Math.max(1, Number(rankingGameweekSetting?.value ?? 1) || 1));
  const rankingUpdatedAt = rankingGameweekSetting?.updatedAt ?? null;
  const selectedGameweek = activeTab === "gw"
    ? Math.min(7, Math.max(1, Number(params?.gw ?? rankingGameweek) || rankingGameweek))
    : rankingGameweek;

  const pointsByGameweek = new Map<number, Map<string, number>>();
  const scoredGameweeks = new Set<number>();
  for (const fixture of fixtures) {
    const gameweekPoints = pointsByGameweek.get(fixture.gameweek) ?? new Map<string, number>();
    for (const point of fixture.playerPoints) {
      if (rankingUpdatedAt && point.updatedAt > rankingUpdatedAt) continue;
      scoredGameweeks.add(fixture.gameweek);
      gameweekPoints.set(point.playerId, (gameweekPoints.get(point.playerId) ?? 0) + point.points);
    }
    pointsByGameweek.set(fixture.gameweek, gameweekPoints);
  }

  const autoSubPointsByTeamGameweek = new Map<string, number>();
  for (const autoSubstitution of autoSubstitutions) {
    if (rankingUpdatedAt && autoSubstitution.updatedAt > rankingUpdatedAt) continue;
    scoredGameweeks.add(autoSubstitution.gameweek);
    const key = `${autoSubstitution.fantasyTeamId}:${autoSubstitution.gameweek}`;
    autoSubPointsByTeamGameweek.set(key, (autoSubPointsByTeamGameweek.get(key) ?? 0) + autoSubstitution.points);
  }

  const gameweekPointsForTeam = (team: typeof teams[number], gameweek: number): number | null => {
    const snapshot = team.lineupSnapshots.find((item) => item.gameweek === gameweek);
    if (!snapshot || !scoredGameweeks.has(gameweek)) return null;
    return scoreEntries(
      snapshot.entries as ScoringEntry[],
      pointsByGameweek.get(gameweek) ?? new Map(),
      autoSubPointsByTeamGameweek.get(`${team.id}:${gameweek}`) ?? 0,
    );
  };

  const cumulativePointsForTeam = (team: typeof teams[number], throughGameweek: number) =>
    Array.from({ length: throughGameweek }, (_, index) => index + 1)
      .reduce((sum, gameweek) => sum + (gameweekPointsForTeam(team, gameweek) ?? 0), 0);

  const rawRows = teams.map((team) => {
    const roundPoints = Array.from({ length: 7 }, (_, index) => gameweekPointsForTeam(team, index + 1));
    const gameweekPoints = gameweekPointsForTeam(team, selectedGameweek);
    const totalPoints = cumulativePointsForTeam(team, selectedGameweek);
    return {
      id: team.id,
      userId: team.userId,
      name: team.name,
      manager: team.user.username?.trim() || "Користувач",
      image: team.user.image,
      points: activeTab === "overall" ? totalPoints : gameweekPoints ?? Number.NEGATIVE_INFINITY,
      gameweekPoints,
      totalPoints,
      roundPoints,
      createdAt: team.createdAt,
    };
  });

  const sortedRows = rawRows.sort(compareRankedTeams);
  let rankedPosition = 0;
  const rankedRows = sortedRows.map((row) => ({
    ...row,
    rank: activeTab === "gw" && row.gameweekPoints === null ? null : ++rankedPosition,
  }));
  let previousRankByTeam = new Map<string, number>();

  if (selectedGameweek > 1) {
    const previousRows = teams
      .filter((team) => team.lineupSnapshots.some((snapshot) => snapshot.gameweek <= selectedGameweek - 1))
      .map((team) => ({
        id: team.id,
        name: team.name,
        points: cumulativePointsForTeam(team, selectedGameweek - 1),
      }));
    previousRankByTeam = new Map(
      assignRanks(previousRows.sort(compareRankedTeams))
        .map((row) => [row.id, row.rank]),
    );
  }

  const rows: RankedTeam[] = rankedRows.map((row) => ({
    id: row.id,
    name: row.name,
    userId: row.userId,
    manager: row.manager,
    image: row.image,
    points: row.points,
    gameweekPoints: row.gameweekPoints,
    totalPoints: row.totalPoints,
    roundPoints: row.roundPoints,
    rank: row.rank,
    previousRank: previousRankByTeam.get(row.id),
  }));
  const filteredRows = query
    ? rows.filter(
        (row) =>
          row.name.toLocaleLowerCase("uk").includes(query.toLocaleLowerCase("uk")) ||
          row.manager.toLocaleLowerCase("uk").includes(query.toLocaleLowerCase("uk")),
      )
    : rows;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visibleRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const pageItems = paginationItems(safePage, totalPages);
  const isOverall = activeTab === "overall";

  return (
    <AppShell active="/leaderboard">
      <div className="topbar">
        <div>
          <p className="eyebrow">Глобальний рейтинг</p>
          <h1>Таблиця сезону</h1>
          <p className="muted">У рейтингу показуються команди зі збереженим складом. За однакової кількості очок вище розташовується команда, назва якої йде першою за алфавітом.</p>
        </div>
      </div>

      <nav className="gameweek-switcher leaderboard-tabs" aria-label="Оберіть рейтинг">
        <Link className={activeTab === "overall" ? "active" : ""} href={leaderboardUrl({ tab: "overall", gw: selectedGameweek, query })}>
          Загалом
        </Link>
        {Array.from({ length: 7 }, (_, index) => index + 1).map((gameweek) => (
          <Link
            className={activeTab === "gw" && selectedGameweek === gameweek ? "active" : ""}
            href={leaderboardUrl({ tab: "gw", gw: gameweek, query })}
            key={gameweek}
          >
            GW{gameweek}
          </Link>
        ))}
      </nav>

      <section className="panel">
        <form className="form-inline" action="/leaderboard">
          <input type="hidden" name="tab" value={activeTab} />
          {activeTab === "gw" ? <input type="hidden" name="gw" value={selectedGameweek} /> : null}
          <input className="input" name="q" defaultValue={query} placeholder="Пошук команди або менеджера" />
          <button className="button primary" type="submit">Знайти</button>
          {query ? <Link className="button" href={leaderboardUrl({ tab: activeTab, gw: selectedGameweek })}>Скинути</Link> : null}
        </form>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        {!isOverall && !scoredGameweeks.has(selectedGameweek) ? (
          <p className="leaderboard-empty-round">Очки GW{selectedGameweek} ще не нараховувалися.</p>
        ) : null}
        <table className="table leaderboard-table">
          <thead>
            <tr>
              <th className="leaderboard-rank-column">№</th>
              {isOverall && selectedGameweek > 1 ? <th className="leaderboard-change-column">Зміна</th> : null}
              <th className="leaderboard-team-column">Команда</th>
              <th className="leaderboard-manager-column">Менеджер</th>
              {isOverall ? Array.from({ length: 7 }, (_, index) => index + 1).map((gameweek) => (
                <th
                  className={`leaderboard-round-column ${gameweek === selectedGameweek ? "current-round" : ""}`}
                  key={gameweek}
                >
                  GW{gameweek}
                </th>
              )) : <th className="leaderboard-gameweek-points-column">Очки GW{selectedGameweek}</th>}
              {isOverall ? <th className="leaderboard-total-points-column">Очки загалом</th> : null}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((team) => {
              const isOwnTeam = team.userId === session?.user?.id;
              const rankChange =
                selectedGameweek > 1 && team.previousRank && team.rank !== null
                  ? team.previousRank - team.rank
                  : null;
              return (
                <tr className={isOwnTeam ? "leaderboard-own-row" : ""} key={team.id}>
                  <td className="leaderboard-rank-column">{team.rank ?? "—"}</td>
                  {isOverall && selectedGameweek > 1 ? (
                    <td className="leaderboard-change-column">
                      <span className={`rank-movement ${rankChange === null || rankChange === 0 ? "same" : rankChange > 0 ? "up" : "down"}`}>
                        <i aria-hidden="true" />
                        {rankChange !== null && rankChange !== 0 ? <strong>{Math.abs(rankChange)}</strong> : null}
                      </span>
                    </td>
                  ) : null}
                  <td className="leaderboard-team-column">
                    <span className="leaderboard-team-cell">
                      <span className="leaderboard-team-main">
                        <TeamLink id={team.id} name={team.name} image={team.image} />
                        <small className="leaderboard-mobile-manager">{team.manager}</small>
                      </span>
                      {isOwnTeam ? <span className="badge own-team-badge">Ви</span> : null}
                    </span>
                  </td>
                  <td className="leaderboard-manager-column">{team.manager}</td>
                  {isOverall ? team.roundPoints.map((points, index) => (
                    <td
                      className={`leaderboard-round-column ${index + 1 === selectedGameweek ? "current-round" : ""}`}
                      key={index}
                    >
                      <strong>{points ?? "—"}</strong>
                    </td>
                  )) : (
                    <td className="leaderboard-gameweek-points-column"><strong>{team.gameweekPoints ?? "—"}</strong></td>
                  )}
                  {isOverall ? <td className="leaderboard-total-points-column"><strong>{team.totalPoints}</strong></td> : null}
                </tr>
              );
            })}
            {visibleRows.length === 0 ? (
              <tr><td colSpan={isOverall ? (selectedGameweek > 1 ? 12 : 11) : 4}>Команд у рейтингу ще немає.</td></tr>
            ) : null}
          </tbody>
        </table>
        <nav className="leaderboard-pagination" aria-label="Пагінація рейтингу">
          {safePage > 1 ? (
            <Link className="button" href={leaderboardUrl({ tab: activeTab, gw: selectedGameweek, page: safePage - 1, query })}>Назад</Link>
          ) : <span className="button disabled-link">Назад</span>}
          <span className="leaderboard-page-numbers">
            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span className="leaderboard-page-ellipsis" key={`ellipsis-${index}`}>…</span>
              ) : (
                <Link
                  aria-current={item === safePage ? "page" : undefined}
                  className={`button leaderboard-page-link ${item === safePage ? "active" : ""}`}
                  href={leaderboardUrl({ tab: activeTab, gw: selectedGameweek, page: item, query })}
                  key={item}
                >
                  {item}
                </Link>
              ),
            )}
          </span>
          {safePage < totalPages ? (
            <Link className="button" href={leaderboardUrl({ tab: activeTab, gw: selectedGameweek, page: safePage + 1, query })}>Далі</Link>
          ) : <span className="button disabled-link">Далі</span>}
        </nav>
      </section>
    </AppShell>
  );
}

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
  rank: number;
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

function scoreEntries(entries: ScoringEntry[], points: Map<string, number>) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  const basePoints = starters.reduce((sum, entry) => sum + (points.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);
  return basePoints + (captain ? points.get(captain.playerId) ?? 0 : 0);
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
  const selectedGameweek = Math.min(7, Math.max(1, Number(params?.gw ?? 1) || 1));
  const page = Math.max(1, Number(params?.page ?? 1) || 1);
  const query = String(params?.q ?? "").trim();

  const [teams, fixtures] = await Promise.all([
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
    activeTab === "gw"
      ? prisma.fixture.findMany({
          where: { gameweek: { in: selectedGameweek > 1 ? [selectedGameweek - 1, selectedGameweek] : [1] } },
          select: {
            gameweek: true,
            playerPoints: { select: { playerId: true, points: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const pointsByGameweek = new Map<number, Map<string, number>>();
  for (const fixture of fixtures) {
    const gameweekPoints = pointsByGameweek.get(fixture.gameweek) ?? new Map<string, number>();
    for (const point of fixture.playerPoints) {
      gameweekPoints.set(point.playerId, (gameweekPoints.get(point.playerId) ?? 0) + point.points);
    }
    pointsByGameweek.set(fixture.gameweek, gameweekPoints);
  }

  const rawRows = teams.map((team) => {
    const snapshot = team.lineupSnapshots.find((item) => item.gameweek === selectedGameweek);
    const points =
      activeTab === "overall"
        ? team.totalPoints
        : snapshot
          ? scoreEntries(snapshot.entries as ScoringEntry[], pointsByGameweek.get(selectedGameweek) ?? new Map())
          : 0;

    return {
      id: team.id,
      userId: team.userId,
      name: team.name,
      manager: team.user.username?.trim() || "Користувач",
      image: team.user.image,
      points,
      createdAt: team.createdAt,
    };
  });

  const rankedRows = assignRanks(
    rawRows.sort(compareRankedTeams),
  );
  let previousRankByTeam = new Map<string, number>();

  if (activeTab === "gw" && selectedGameweek > 1) {
    const previousRows = teams.map((team) => {
      const snapshot = team.lineupSnapshots.find((item) => item.gameweek === selectedGameweek - 1);
      return {
        id: team.id,
        name: team.name,
        points: snapshot
          ? scoreEntries(snapshot.entries as ScoringEntry[], pointsByGameweek.get(selectedGameweek - 1) ?? new Map())
          : 0,
      };
    });
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

  return (
    <AppShell active="/leaderboard">
      <div className="topbar">
        <div>
          <p className="eyebrow">Глобальний рейтинг</p>
          <h1>Таблиця сезону</h1>
          <p className="muted">У рейтингу показуються команди зі збереженим складом. За однакової кількості очок вище розташовується команда, назва якої йде першою за алфавітом.</p>
        </div>
      </div>

      <nav className="section-tabs" aria-label="Режим рейтингу">
        <Link className={activeTab === "overall" ? "active" : ""} href={leaderboardUrl({ tab: "overall", gw: selectedGameweek, query })}>
          Загалом
        </Link>
        <Link className={activeTab === "gw" ? "active" : ""} href={leaderboardUrl({ tab: "gw", gw: selectedGameweek, query })}>
          За тур
        </Link>
      </nav>

      {activeTab === "gw" ? (
        <nav className="gameweek-switcher leaderboard-gameweeks" aria-label="Оберіть тур">
          {Array.from({ length: 7 }, (_, index) => index + 1).map((gameweek) => (
            <Link
              className={selectedGameweek === gameweek ? "active" : ""}
              href={leaderboardUrl({ tab: "gw", gw: gameweek, query })}
              key={gameweek}
            >
              GW{gameweek}
            </Link>
          ))}
        </nav>
      ) : null}

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
        <table className="table leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Команда</th>
              <th>Менеджер</th>
              {activeTab === "gw" ? <th>Зміна</th> : null}
              <th>Очки{activeTab === "gw" ? ` GW${selectedGameweek}` : ""}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((team) => {
              const isOwnTeam = team.userId === session?.user?.id;
              const rankChange =
                selectedGameweek > 1 && team.previousRank
                  ? team.previousRank - team.rank
                  : null;
              return (
                <tr className={isOwnTeam ? "leaderboard-own-row" : ""} key={team.id}>
                  <td>{team.rank}</td>
                  <td>
                    <span className="leaderboard-team-cell">
                      <span className="leaderboard-team-main">
                        <TeamLink id={team.id} name={team.name} image={team.image} />
                        <small className="leaderboard-mobile-manager">{team.manager}</small>
                      </span>
                      {isOwnTeam ? <span className="badge own-team-badge">Ви</span> : null}
                    </span>
                  </td>
                  <td>{team.manager}</td>
                  {activeTab === "gw" ? (
                    <td>
                      {rankChange === null || rankChange === 0 ? "—" : rankChange > 0 ? `▲${rankChange}` : `▼${Math.abs(rankChange)}`}
                    </td>
                  ) : null}
                  <td><strong>{team.points}</strong></td>
                </tr>
              );
            })}
            {visibleRows.length === 0 ? (
              <tr><td colSpan={activeTab === "gw" ? 5 : 4}>Команд у рейтингу ще немає.</td></tr>
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

import type { Metadata } from "next";
import { CheckCircle2, Crown, Lock, Trophy, Unlock, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "../../../components/shell";
import { CopyButton } from "../../../components/copy-button";
import { DeleteLeagueButton } from "../../../components/delete-league-button";
import { LeagueChat } from "../../../components/league-chat";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { createMetadata } from "../../../lib/seo";
import { joinLeague, leaveLeague, removeLeagueMember } from "../../actions/league-actions";

type LeaguePageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    joined?: string;
    left?: string;
    removed?: string;
    deleted?: string;
    error?: string;
    tab?: string;
    gw?: string;
    page?: string;
    q?: string;
  }>;
};

const PAGE_SIZE = 30;

type ScoringEntry = {
  playerId: string;
  slot: "STARTER" | "BENCH";
  isCaptain: boolean;
};

const errorMessages: Record<string, string> = {
  invite: "Лігу з таким кодом не знайдено.",
  closed: "Ця ліга закрита. Вступити можна тільки за invite code.",
  limit: "Досягнуто ліміт: можна вступити максимум у 5 запрошених ліг.",
  "owner-leave": "Власник не може вийти зі своєї ліги.",
  owner: "Ця дія доступна тільки власнику ліги.",
};

function teamInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "T";
}

function leagueUrl(leagueId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fantasy.fraxler.site";
  return `${baseUrl.replace(/\/$/, "")}/leagues/${leagueId}`;
}

function compareRankedTeams(
  a: { id: string; name: string; points: number },
  b: { id: string; name: string; points: number },
) {
  return b.points - a.points || a.name.localeCompare(b.name, "uk", { sensitivity: "base" }) || a.id.localeCompare(b.id);
}

function assignRanks<T extends { id: string; points: number }>(rows: T[]) {
  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

function leagueRankingUrl({
  leagueId,
  tab,
  gameweek,
  page,
  query,
}: {
  leagueId: string;
  tab: "overall" | "gw";
  gameweek: number;
  page?: number;
  query?: string;
}) {
  const params = new URLSearchParams({ tab });
  if (tab === "gw") params.set("gw", String(gameweek));
  if (page && page > 1) params.set("page", String(page));
  if (query) params.set("q", query);
  return `/leagues/${leagueId}?${params.toString()}`;
}

function paginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 4) return [1, 2, 3, 4, 5, 6, "ellipsis", totalPages];
  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "ellipsis", totalPages];
}

function scoreSnapshot(
  entries: Array<{ playerId: string; slot: "STARTER" | "BENCH"; isCaptain: boolean }>,
  playerPoints: Map<string, number>,
  autoSubPoints = 0,
) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  const basePoints = starters.reduce((sum, entry) => sum + (playerPoints.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);
  return basePoints + (captain ? playerPoints.get(captain.playerId) ?? 0 : 0) + autoSubPoints;
}

export async function generateMetadata({ params }: LeaguePageProps): Promise<Metadata> {
  const { id } = await params;
  const league = await prisma.league.findUnique({ where: { id }, select: { name: true, description: true } });
  if (!league) return createMetadata({ title: "Лігу не знайдено", path: "/leagues" });

  return createMetadata({
    title: `${league.name} - ліга фентезі до ЧС-2026`,
    description: league.description ?? "Приватна або відкрита ліга у фентезі-футболі до ЧС-2026.",
    path: `/leagues/${id}`,
  });
}

export default async function LeaguePage({ params, searchParams }: LeaguePageProps) {
  const { id } = await params;
  const query = await searchParams;
  const session = await auth();

  const league = await prisma.league.findUnique({
    where: { id },
    include: {
      owner: true,
      members: {
        include: {
          fantasyTeam: {
            include: {
              user: true,
              lineupSnapshots: {
                select: {
                  gameweek: true,
                  entries: { select: { playerId: true, slot: true, isCaptain: true } },
                },
              },
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
    },
  });

  if (!league) notFound();

  const fantasyTeam = session?.user?.id
    ? await prisma.fantasyTeam.findUnique({ where: { userId: session.user.id } })
    : null;

  const isOwner = league.ownerId === session?.user?.id;
  const isMember = fantasyTeam ? league.members.some((member) => member.fantasyTeamId === fantasyTeam.id) : false;

  const activeTab = query?.tab === "gw" ? "gw" : "overall";
  const requestedPage = Math.max(1, Number(query?.page ?? 1) || 1);
  const rankingQuery = String(query?.q ?? "").trim();
  const [rankingFixtures, rankingAutoSubstitutions, rankingGameweekSetting] = await Promise.all([
    prisma.fixture.findMany({
      select: {
        gameweek: true,
        playerPoints: { select: { playerId: true, points: true, updatedAt: true } },
      },
    }),
    prisma.autoSubstitution.findMany({
      where: { fantasyTeam: { leagueMembers: { some: { leagueId: league.id } } } },
      select: { fantasyTeamId: true, gameweek: true, points: true, updatedAt: true },
    }),
    prisma.systemSetting.findUnique({ where: { key: "rankingsCurrentGameweek" } }),
  ]);

  const rankingGameweek = Math.min(7, Math.max(1, Number(rankingGameweekSetting?.value ?? 1) || 1));
  const rankingUpdatedAt = rankingGameweekSetting?.updatedAt ?? null;
  const selectedGameweek = activeTab === "gw"
    ? Math.min(7, Math.max(1, Number(query?.gw ?? rankingGameweek) || rankingGameweek))
    : rankingGameweek;
  const pointsByGameweek = new Map<number, Map<string, number>>();
  const scoredGameweeks = new Set<number>();

  for (const fixture of rankingFixtures) {
    const gameweekPoints = pointsByGameweek.get(fixture.gameweek) ?? new Map<string, number>();
    for (const point of fixture.playerPoints) {
      if (rankingUpdatedAt && point.updatedAt > rankingUpdatedAt) continue;
      scoredGameweeks.add(fixture.gameweek);
      gameweekPoints.set(point.playerId, (gameweekPoints.get(point.playerId) ?? 0) + point.points);
    }
    pointsByGameweek.set(fixture.gameweek, gameweekPoints);
  }

  const autoSubPointsByTeamGameweek = new Map<string, number>();
  for (const autoSubstitution of rankingAutoSubstitutions) {
    if (rankingUpdatedAt && autoSubstitution.updatedAt > rankingUpdatedAt) continue;
    scoredGameweeks.add(autoSubstitution.gameweek);
    const key = `${autoSubstitution.fantasyTeamId}:${autoSubstitution.gameweek}`;
    autoSubPointsByTeamGameweek.set(key, (autoSubPointsByTeamGameweek.get(key) ?? 0) + autoSubstitution.points);
  }

  const leagueTeams = league.members.map((member) => member.fantasyTeam);
  const gameweekPointsForTeam = (team: typeof leagueTeams[number], gameweek: number): number | null => {
    const snapshot = team.lineupSnapshots.find((item) => item.gameweek === gameweek);
    if (!snapshot || !scoredGameweeks.has(gameweek)) return null;
    return scoreSnapshot(
      snapshot.entries as ScoringEntry[],
      pointsByGameweek.get(gameweek) ?? new Map(),
      autoSubPointsByTeamGameweek.get(`${team.id}:${gameweek}`) ?? 0,
    );
  };
  const cumulativePointsForTeam = (team: typeof leagueTeams[number], throughGameweek: number) =>
    Array.from({ length: throughGameweek }, (_, index) => index + 1)
      .reduce((sum, gameweek) => sum + (gameweekPointsForTeam(team, gameweek) ?? 0), 0);

  const sortedRows = leagueTeams
    .map((team) => {
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
      };
    })
    .sort(compareRankedTeams);
  let rankedPosition = 0;
  const rankedRows = sortedRows.map((row) => ({
    ...row,
    rank: activeTab === "gw" && row.gameweekPoints === null ? null : ++rankedPosition,
  }));
  let previousRankByTeam = new Map<string, number>();

  if (selectedGameweek > 1) {
    const previousRows = leagueTeams
      .filter((team) => team.lineupSnapshots.some((snapshot) => snapshot.gameweek <= selectedGameweek - 1))
      .map((team) => ({
        id: team.id,
        name: team.name,
        points: cumulativePointsForTeam(team, selectedGameweek - 1),
      }));
    previousRankByTeam = new Map(
      assignRanks(previousRows.sort(compareRankedTeams)).map((row) => [row.id, row.rank]),
    );
  }

  const rows = rankedRows.map((row) => ({ ...row, previousRank: previousRankByTeam.get(row.id) }));
  const filteredRows = rankingQuery
    ? rows.filter((row) =>
        row.name.toLocaleLowerCase("uk").includes(rankingQuery.toLocaleLowerCase("uk")) ||
        row.manager.toLocaleLowerCase("uk").includes(rankingQuery.toLocaleLowerCase("uk")),
      )
    : rows;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(requestedPage, totalPages);
  const visibleRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const pageItems = paginationItems(safePage, totalPages);
  const isOverall = activeTab === "overall";

  const latestScoredFixture = await prisma.fixture.findFirst({
    where: { status: { in: ["POINTS_SAVED", "RANKINGS_UPDATED"] } },
    orderBy: [{ gameweek: "desc" }, { kickoffAt: "desc" }],
    select: { gameweek: true },
  });
  const leaderGameweek = latestScoredFixture?.gameweek ?? 1;
  const [leaderFixtures, memberSnapshots, autoSubstitutions] = await Promise.all([
    prisma.fixture.findMany({
      where: { gameweek: leaderGameweek },
      select: {
        playerPoints: { select: { playerId: true, points: true } },
      },
    }),
    prisma.lineupSnapshot.findMany({
      where: {
        gameweek: leaderGameweek,
        fantasyTeam: { leagueMembers: { some: { leagueId: league.id } } },
      },
      select: {
        fantasyTeam: { select: { id: true, name: true } },
        entries: {
          select: {
            playerId: true,
            slot: true,
            isCaptain: true,
            player: { select: { name: true } },
          },
        },
      },
    }),
    prisma.autoSubstitution.findMany({
      where: {
        gameweek: leaderGameweek,
        fantasyTeam: { leagueMembers: { some: { leagueId: league.id } } },
      },
      select: { fantasyTeamId: true, points: true },
    }),
  ]);

  const playerPoints = new Map<string, number>();
  for (const fixture of leaderFixtures) {
    for (const point of fixture.playerPoints) {
      playerPoints.set(point.playerId, (playerPoints.get(point.playerId) ?? 0) + point.points);
    }
  }
  const autoSubPointsByTeam = new Map<string, number>();
  for (const autoSubstitution of autoSubstitutions) {
    autoSubPointsByTeam.set(
      autoSubstitution.fantasyTeamId,
      (autoSubPointsByTeam.get(autoSubstitution.fantasyTeamId) ?? 0) + autoSubstitution.points,
    );
  }

  const gameweekLeaders = memberSnapshots
    .map((snapshot) => ({
      id: snapshot.fantasyTeam.id,
      name: snapshot.fantasyTeam.name,
      points: scoreSnapshot(snapshot.entries, playerPoints, autoSubPointsByTeam.get(snapshot.fantasyTeam.id) ?? 0),
    }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, "uk"));
  const bestTeam = gameweekLeaders[0] && gameweekLeaders[0].points > 0 ? gameweekLeaders[0] : null;

  const captainScores = memberSnapshots
    .flatMap((snapshot) =>
      snapshot.entries
        .filter((entry) => entry.slot === "STARTER" && entry.isCaptain)
        .map((entry) => ({
          name: entry.player.name,
          points: playerPoints.get(entry.playerId) ?? 0,
        })),
    )
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, "uk"));
  const bestCaptain = captainScores[0] && captainScores[0].points > 0 ? captainScores[0] : null;

  return (
    <AppShell active="/leagues">
      <div className="topbar">
        <div>
          <p className="eyebrow">Ліга</p>
          <h1>{league.name}</h1>
          <p className="muted">{league.description || "Опис ліги ще не додано."}</p>
        </div>
        <span className="badge">
          {league.isOpen ? <Unlock size={14} /> : <Lock size={14} />}
          {league.isOpen ? "Відкрита" : "Закрита"}
        </span>
      </div>

      {query?.error ? <div className="form-error">Помилка: {errorMessages[query.error] ?? query.error}</div> : null}
      {query?.joined || query?.left || query?.removed || query?.deleted ? <div className="form-success">Зміни збережено.</div> : null}

      <section className="grid cols-2">
        <div className="panel">
          <h2>Інформація</h2>
          <table className="table">
            <tbody>
              <tr><td>Власник</td><td><strong>{league.owner.username?.trim() || "Користувач"}</strong></td></tr>
              <tr><td>Учасники</td><td><strong>{league.members.length}</strong></td></tr>
              {isOwner ? <tr><td>Код запрошення</td><td><strong>{league.inviteCode}</strong></td></tr> : null}
            </tbody>
          </table>
          <div className="toolbar" style={{ marginTop: 14 }}>
            {isOwner ? <CopyButton text={league.inviteCode} label="Скопіювати код" /> : null}
            {isOwner || isMember || league.isOpen ? (
              <CopyButton text={leagueUrl(league.id)} label="Скопіювати посилання" />
            ) : null}
            {isOwner ? <Link className="button" href="/leagues">Редагувати</Link> : null}
          </div>
        </div>

        <div className="panel">
          <h2>Дії</h2>
          {!session?.user?.id ? (
            <p className="muted">Увійди через Google, щоб вступити в лігу.</p>
          ) : !fantasyTeam ? (
            <p className="muted">Спочатку створи і збережи команду на сторінці складу.</p>
          ) : isMember ? (
            <>
              <p className="league-membership-status">
                <CheckCircle2 size={18} />
                Ви вже в лізі
              </p>
              {!isOwner ? (
                <form action={leaveLeague}>
                  <input type="hidden" name="leagueId" value={league.id} />
                  <button className="button" type="submit">Вийти з ліги</button>
                </form>
              ) : null}
            </>
          ) : league.isOpen ? (
            <form action={joinLeague}>
              <input type="hidden" name="leagueId" value={league.id} />
              <button className="button primary" type="submit">Вступити у відкриту лігу</button>
            </form>
          ) : (
            <form action={joinLeague} className="form-stack">
              <label>
                Invite code
                <input className="input" name="inviteCode" placeholder="K7P9XQ" maxLength={12} />
              </label>
              <button className="button primary" type="submit">Вступити за кодом</button>
            </form>
          )}
          {isOwner ? (
            <div style={{ marginTop: 12 }}>
              <DeleteLeagueButton leagueId={league.id} leagueName={league.name} />
            </div>
          ) : null}
        </div>
      </section>

      <section className="league-round-leaders">
        <article className="panel">
          <Trophy size={22} />
          <span>Лідер туру</span>
          <strong>{bestTeam?.name ?? "Ще не визначено"}</strong>
        </article>
        <article className="panel">
          <Crown size={22} />
          <span>Найбільше очок у турі</span>
          <strong>{bestTeam ? bestTeam.points : 0}</strong>
        </article>
        <article className="panel">
          <UserCheck size={22} />
          <span>Найкращий капітан туру</span>
          <strong>{bestCaptain ? `${bestCaptain.name} · ${bestCaptain.points}` : "Ще не визначено"}</strong>
        </article>
      </section>

      <nav className="gameweek-switcher leaderboard-tabs league-ranking-tabs" aria-label="Оберіть рейтинг ліги">
        <Link className={activeTab === "overall" ? "active" : ""} href={leagueRankingUrl({ leagueId: league.id, tab: "overall", gameweek: selectedGameweek, query: rankingQuery })}>
          Загалом
        </Link>
        {Array.from({ length: 7 }, (_, index) => index + 1).map((gameweek) => (
          <Link
            className={activeTab === "gw" && selectedGameweek === gameweek ? "active" : ""}
            href={leagueRankingUrl({ leagueId: league.id, tab: "gw", gameweek, query: rankingQuery })}
            key={gameweek}
          >
            GW{gameweek}
          </Link>
        ))}
      </nav>

      <section className="panel league-ranking-search">
        <form className="form-inline" action={`/leagues/${league.id}`}>
          <input type="hidden" name="tab" value={activeTab} />
          {activeTab === "gw" ? <input type="hidden" name="gw" value={selectedGameweek} /> : null}
          <input className="input" name="q" defaultValue={rankingQuery} placeholder="Пошук команди або менеджера" />
          <button className="button primary" type="submit">Знайти</button>
          {rankingQuery ? <Link className="button" href={leagueRankingUrl({ leagueId: league.id, tab: activeTab, gameweek: selectedGameweek })}>Скинути</Link> : null}
        </form>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="topbar" style={{ marginBottom: 12 }}>
          <h2>Таблиця ліги</h2>
          <span className="badge">
            <Users size={14} />
            {rows.length} команд
          </span>
        </div>
        {!isOverall && !scoredGameweeks.has(selectedGameweek) ? (
          <p className="leaderboard-empty-round">Очки GW{selectedGameweek} ще не нараховувалися.</p>
        ) : null}
        <table className="table leaderboard-table league-ranking-table">
          <thead>
            <tr>
              <th className="leaderboard-rank-column">№</th>
              {isOverall && selectedGameweek > 1 ? (
                <th className="leaderboard-change-column">
                  Зміна
                  <small>від попер. GW</small>
                </th>
              ) : null}
              <th className="leaderboard-team-column">Команда</th>
              <th className="leaderboard-manager-column">Менеджер</th>
              {isOverall ? Array.from({ length: 7 }, (_, index) => index + 1).map((gameweek) => (
                <th className={`leaderboard-round-column ${gameweek === selectedGameweek ? "current-round" : ""}`} key={gameweek}>
                  GW{gameweek}
                </th>
              )) : <th className="leaderboard-gameweek-points-column">Очки GW{selectedGameweek}</th>}
              {isOverall ? <th className="leaderboard-total-points-column">Очки загалом</th> : null}
              {isOwner ? <th className="league-owner-actions-column"></th> : null}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isOwnTeam = row.id === fantasyTeam?.id;
              const rankChange = selectedGameweek > 1 && row.previousRank && row.rank !== null
                ? row.previousRank - row.rank
                : null;
              return (
                <tr className={isOwnTeam ? "leaderboard-own-row" : ""} key={row.id}>
                  <td className="leaderboard-rank-column">{row.rank ?? "—"}</td>
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
                        <Link className="leaderboard-team-link" href={`/teams/${row.id}`}>
                          <span className="leaderboard-team-photo">
                            {row.image ? <img src={row.image} alt="" /> : <span>{teamInitial(row.name)}</span>}
                          </span>
                          <span>{row.name}</span>
                        </Link>
                        <small className="leaderboard-mobile-manager">{row.manager}</small>
                      </span>
                      {isOwnTeam ? <span className="badge own-team-badge">Ви</span> : null}
                    </span>
                  </td>
                  <td className="leaderboard-manager-column">{row.manager}</td>
                  {isOverall ? row.roundPoints.map((points, index) => (
                    <td className={`leaderboard-round-column ${index + 1 === selectedGameweek ? "current-round" : ""}`} key={index}>
                      <strong>{points ?? "—"}</strong>
                    </td>
                  )) : (
                    <td className="leaderboard-gameweek-points-column"><strong>{row.gameweekPoints ?? "—"}</strong></td>
                  )}
                  {isOverall ? <td className="leaderboard-total-points-column"><strong>{row.totalPoints}</strong></td> : null}
                  {isOwner ? (
                    <td className="league-owner-actions-column">
                      {row.id !== fantasyTeam?.id ? (
                        <form action={removeLeagueMember}>
                          <input type="hidden" name="leagueId" value={league.id} />
                          <input type="hidden" name="fantasyTeamId" value={row.id} />
                          <button className="button" type="submit">Видалити</button>
                        </form>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              );
            })}
            {visibleRows.length === 0 ? (
              <tr><td colSpan={(isOverall ? (selectedGameweek > 1 ? 12 : 11) : 3) + Number(isOwner)}>У цій лізі ще немає команд.</td></tr>
            ) : null}
          </tbody>
        </table>
        <nav className="leaderboard-pagination" aria-label="Пагінація рейтингу ліги">
          {safePage > 1 ? (
            <Link className="button" href={leagueRankingUrl({ leagueId: league.id, tab: activeTab, gameweek: selectedGameweek, page: safePage - 1, query: rankingQuery })}>Назад</Link>
          ) : <span className="button disabled-link">Назад</span>}
          <span className="leaderboard-page-numbers">
            {pageItems.map((item, index) => item === "ellipsis" ? (
              <span className="leaderboard-page-ellipsis" key={`ellipsis-${index}`}>…</span>
            ) : (
              <Link
                aria-current={item === safePage ? "page" : undefined}
                className={`button leaderboard-page-link ${item === safePage ? "active" : ""}`}
                href={leagueRankingUrl({ leagueId: league.id, tab: activeTab, gameweek: selectedGameweek, page: item, query: rankingQuery })}
                key={item}
              >
                {item}
              </Link>
            ))}
          </span>
          {safePage < totalPages ? (
            <Link className="button" href={leagueRankingUrl({ leagueId: league.id, tab: activeTab, gameweek: selectedGameweek, page: safePage + 1, query: rankingQuery })}>Далі</Link>
          ) : <span className="button disabled-link">Далі</span>}
        </nav>
      </section>

      {isMember || isOwner ? (
        <div className="league-chat-wrap">
          <LeagueChat leagueId={league.id} leagueName={league.name} />
        </div>
      ) : null}
    </AppShell>
  );
}

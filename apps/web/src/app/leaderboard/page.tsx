import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

const PAGE_SIZE = 50;

export const metadata: Metadata = createMetadata({
  title: "Рейтинг фентезі-команд",
  description: "Глобальний рейтинг команд у фентезі-футболі до ЧС-2026: очки, місця, менеджери та таблиця сезону.",
  path: "/leaderboard",
});

type MaybeRankedTeam = {
  leaderboardRows?: Array<{ rank: number }>;
  computedRank?: number;
};

function teamInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "T";
}

function TeamLink({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image?: string | null;
}) {
  return (
    <Link className="leaderboard-team-link" href={`/teams/${id}`}>
      <span className="leaderboard-team-photo">
        {image ? <img src={image} alt="" /> : <span>{teamInitial(name)}</span>}
      </span>
      <span>{name}</span>
    </Link>
  );
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page ?? 1));
  const query = String(params?.q ?? "").trim();
  const skip = (page - 1) * PAGE_SIZE;
  const savedTeamWhere = { rosterEntries: { some: {} } };
  const searchWhere = query
    ? {
        AND: [
          savedTeamWhere,
          {
            OR: [
              { name: { contains: query, mode: "insensitive" as const } },
              { user: { username: { contains: query, mode: "insensitive" as const } } },
              { user: { email: { contains: query, mode: "insensitive" as const } } },
            ],
          },
        ],
      }
    : savedTeamWhere;

  const [rankedTeams, teams, teamCount] = await Promise.all([
    prisma.fantasyTeam.findMany({
      where: searchWhere,
      select: { id: true, totalPoints: true },
      orderBy: [{ totalPoints: "desc" }, { createdAt: "asc" }],
    }),
    prisma.fantasyTeam.findMany({
      where: searchWhere,
      include: {
        user: true,
        leaderboardRows: { where: { scope: "GLOBAL" }, take: 1 },
      },
      orderBy: [{ totalPoints: "desc" }, { createdAt: "asc" }],
      skip,
      take: PAGE_SIZE,
    }),
    prisma.fantasyTeam.count({ where: searchWhere }),
  ]);

  const rankByTeamId = new Map<string, number>();
  let previousPoints: number | null = null;
  let previousRank = 0;

  rankedTeams.forEach((team, index) => {
    const rank = previousPoints === team.totalPoints ? previousRank : index + 1;
    previousPoints = team.totalPoints;
    previousRank = rank;
    rankByTeamId.set(team.id, rank);
  });

  const visibleTeams = teams.map((team) => ({ ...team, computedRank: rankByTeamId.get(team.id) }));
  const totalItems = teamCount;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const canGoBack = page > 1;
  const canGoForward = page < totalPages;
  const querySuffix = query ? `&q=${encodeURIComponent(query)}` : "";

  return (
    <AppShell active="/leaderboard">
      <div className="topbar">
        <div>
          <p className="eyebrow">Глобальний рейтинг</p>
          <h1>Таблиця сезону</h1>
          <p className="muted">У рейтингу показуються тільки команди зі збереженим складом. Однакові очки дають однакове місце.</p>
        </div>
      </div>

      <section className="panel">
        <form className="form-inline" action="/leaderboard">
          <input className="input" name="q" defaultValue={query} placeholder="Пошук команди або менеджера" />
          <button className="button primary" type="submit">Знайти</button>
          {query ? <Link className="button" href="/leaderboard">Скинути</Link> : <span />}
        </form>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Команда</th>
              <th>Менеджер</th>
              <th>Очки</th>
            </tr>
          </thead>
          <tbody>
            {visibleTeams.map((team, index) => (
              <tr key={team.id}>
                <td>{(team as MaybeRankedTeam).computedRank ?? skip + index + 1}</td>
                <td><TeamLink id={team.id} name={team.name} image={team.user.image} /></td>
                <td>{team.user.username ?? team.user.email}</td>
                <td><strong>{team.totalPoints}</strong></td>
              </tr>
            ))}
            {visibleTeams.length === 0 ? (
              <tr><td colSpan={4}>Команд у рейтингу ще немає.</td></tr>
            ) : null}
          </tbody>
        </table>
        <div className="toolbar" style={{ marginTop: 14 }}>
          {canGoBack ? (
            <Link className="button" href={`/leaderboard?page=${page - 1}${querySuffix}`}>Назад</Link>
          ) : (
            <span className="button disabled-link">Назад</span>
          )}
          <span className="badge">Сторінка {page} з {totalPages}</span>
          {canGoForward ? (
            <Link className="button" href={`/leaderboard?page=${page + 1}${querySuffix}`}>Далі</Link>
          ) : (
            <span className="button disabled-link">Далі</span>
          )}
        </div>
      </section>
    </AppShell>
  );
}

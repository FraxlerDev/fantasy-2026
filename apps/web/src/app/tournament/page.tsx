import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { FantasyLayout } from "../../components/fantasy-layout";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Турнір ЧС-2026",
  description: "Турнірна сторінка ЧС-2026: збірні, групи, календар, таблиці та рейтинг fantasy-команд.",
  path: "/tournament",
});

function formatDate(date: Date) {
  return date.toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TournamentPage() {
  const [teams, playersCount, fixtures, gameweeks, popularPlayerCounts] = await Promise.all([
    prisma.nationalTeam.findMany({ orderBy: [{ groupKey: "asc" }, { nameUk: "asc" }] }),
    prisma.player.count(),
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    prisma.rosterEntry.groupBy({
      by: ["playerId"],
      _count: { playerId: true },
      orderBy: { _count: { playerId: "desc" } },
      take: 20,
    }),
  ]);

  const popularPlayers = popularPlayerCounts.length
    ? await prisma.player.findMany({
        where: { id: { in: popularPlayerCounts.map((row) => row.playerId) } },
        include: { nationalTeam: true },
      })
    : [];
  const popularPlayersById = new Map(popularPlayers.map((player) => [player.id, player]));
  const previewFixtures = fixtures.slice(0, 18);
  return (
    <AppShell active="/tournament">
      <FantasyLayout>
        <div className="tournament-banner">
          <p className="eyebrow">Фентезі Турнір</p>
          <h1>Fantasy World Cup 2026</h1>
          <p>Профіль турніру, дедлайни, групи, календар і рейтинг в одному місці.</p>
          <div className="toolbar">
            <Link className="button primary" href="/squad">Зібрати команду</Link>
            <Link className="button" href="/rules">Правила</Link>
          </div>
        </div>

        <section className="grid cols-3" style={{ marginTop: 16 }}>
          <div className="panel stat"><span className="badge">Збірні</span><strong>{teams.length}</strong></div>
          <div className="panel stat"><span className="badge">Гравці</span><strong>{playersCount}</strong></div>
          <div className="panel stat"><span className="badge">Матчі</span><strong>{fixtures.length + 32}/104</strong></div>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Дедлайни турів</h2>
          <table className="table compact-table">
            <thead>
              <tr><th>Тур</th><th>Дедлайн</th></tr>
            </thead>
            <tbody>
              {gameweeks.map((gameweek) => (
                <tr key={gameweek.id}>
                  <td><strong>GW{gameweek.number}</strong></td>
                  <td>{formatDate(gameweek.deadlineAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Найпопулярніші гравці</h2>
          <p className="muted">ТОП-20 гравців, яких найчастіше обирали у fantasy-команди.</p>
          <table className="table compact-table">
            <thead>
              <tr><th>#</th><th>Гравець</th><th>Поз.</th><th>Збірна</th><th>Клуб</th><th>Виборів</th></tr>
            </thead>
            <tbody>
              {popularPlayerCounts.map((row, index) => {
                const player = popularPlayersById.get(row.playerId);
                if (!player) return null;

                return (
                  <tr key={row.playerId}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="catalog-player">
                        <span className="player-photo-wrap small">
                          {player.photoUrl ? (
                            <img alt="" className="player-photo" src={player.photoUrl} />
                          ) : (
                            <span className="player-photo placeholder"><UserRound size={18} /></span>
                          )}
                          {player.nationalTeam.flagPath ? <img alt="" className="player-photo-flag" src={player.nationalTeam.flagPath} /> : null}
                        </span>
                        <strong>{player.name}</strong>
                      </span>
                    </td>
                    <td>{player.position}</td>
                    <td>
                      <span className="team-with-flag">
                        {player.nationalTeam.flagPath ? <img alt="" className="flag" src={player.nationalTeam.flagPath} /> : null}
                        {player.nationalTeam.nameUk}
                      </span>
                    </td>
                    <td>{player.club ?? "-"}</td>
                    <td><strong>{row._count.playerId}</strong></td>
                  </tr>
                );
              })}
              {popularPlayerCounts.length === 0 ? <tr><td colSpan={6}>Гравців у складах ще немає.</td></tr> : null}
            </tbody>
          </table>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Календар групового етапу</h2>
          <table className="table compact-table">
            <thead>
              <tr><th>#</th><th>GW</th><th>Матч</th><th>Початок</th></tr>
            </thead>
            <tbody>
              {previewFixtures.map((fixture) => (
                <tr key={fixture.id}>
                  <td>{fixture.matchNo}</td>
                  <td>GW{fixture.gameweek}</td>
                  <td className="fixture-line">
                    {fixture.homeTeam.flagPath ? <img alt="" className="flag" src={fixture.homeTeam.flagPath} /> : null}
                    {fixture.homeTeam.nameUk} - {fixture.awayTeam.nameUk}
                    {fixture.awayTeam.flagPath ? <img alt="" className="flag" src={fixture.awayTeam.flagPath} /> : null}
                  </td>
                  <td>{formatDate(fixture.kickoffAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted" style={{ marginTop: 10 }}>
            Показані перші 18 матчів. <Link href="/matches">Відкрити повний розклад і результати.</Link>
          </p>
        </section>
      </FantasyLayout>
    </AppShell>
  );
}

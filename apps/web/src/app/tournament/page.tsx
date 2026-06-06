import type { Metadata } from "next";
import { CalendarDays, MapPin, Trophy, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { DeadlineCountdown } from "../../components/deadline-countdown";
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
  const [teamsCount, playersCount, fixturesCount, gameweeks, popularPlayerCounts] = await Promise.all([
    prisma.nationalTeam.count(),
    prisma.player.count(),
    prisma.fixture.count(),
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
  const nextGameweek = gameweeks.find((gameweek) => gameweek.deadlineAt > new Date()) ?? null;
  const activeGameweek = gameweeks.find((gameweek) => gameweek.transfersOpen) ?? nextGameweek;
  return (
    <AppShell active="/tournament">
      <div className="tournament-page">
        <div className="tournament-banner">
          <p className="eyebrow">Фентезі Турнір</p>
          <h1>Fantasy World Cup 2026</h1>
          <p>Статус фентезі-турніру, найближчий дедлайн і головні переходи до матч-центру.</p>
          <div className="toolbar">
            <Link className="button primary" href="/squad">Зібрати команду</Link>
            <Link className="button" href="/rules">Правила</Link>
          </div>
        </div>

        <section className="grid cols-3" style={{ marginTop: 16 }}>
          <div className="panel stat"><span className="badge">Збірні</span><strong>{teamsCount}</strong></div>
          <div className="panel stat"><span className="badge">Гравці</span><strong>{playersCount}</strong></div>
          <div className="panel stat"><span className="badge">Матчі</span><strong>{fixturesCount + 32}/104</strong></div>
        </section>

        <section className="grid cols-2 tournament-status-grid" style={{ marginTop: 16 }}>
          <div className="panel">
            <p className="eyebrow">Статус турніру</p>
            <h2>{activeGameweek ? `GW${activeGameweek.number} · ${activeGameweek.stage}` : "Турнір завершено"}</h2>
            <p className="muted">
              {activeGameweek?.transfersOpen ? "Трансфери відкриті." : "Трансфери зараз закриті."}
            </p>
          </div>
          <div className="panel">
            <p className="eyebrow">Наступний дедлайн</p>
            {nextGameweek ? (
              <>
                <h2>GW{nextGameweek.number}</h2>
                <p className="muted">{formatDate(nextGameweek.deadlineAt)}</p>
                <DeadlineCountdown deadlineAt={nextGameweek.deadlineAt.toISOString()} />
              </>
            ) : <h2>Дедлайнів більше немає</h2>}
          </div>
        </section>

        <section className="panel tournament-links" style={{ marginTop: 16 }}>
          <h2>Матч-центр</h2>
          <div className="tournament-link-grid">
            <Link href="/matches?tab=groups"><Users size={22} /><strong>Групи</strong><span>Таблиці та матчі групового етапу</span></Link>
            <Link href="/matches?tab=playoff"><Trophy size={22} /><strong>Плей-оф</strong><span>Сітка вирішальних матчів</span></Link>
            <Link href="/matches?tab=calendar"><CalendarDays size={22} /><strong>Календар</strong><span>Усі матчі за датами</span></Link>
            <Link href="/matches?tab=stadiums"><MapPin size={22} /><strong>Стадіони</strong><span>Арени та карта турніру</span></Link>
          </div>
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

      </div>
    </AppShell>
  );
}

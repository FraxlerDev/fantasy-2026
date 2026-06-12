import type { Metadata } from "next";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { PlayerRankingTable } from "../../components/player-ranking-table";
import { AppShell } from "../../components/shell";
import { DeadlineCountdown } from "../../components/deadline-countdown";
import { getPlayerRanking } from "../../lib/player-rankings";
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
  const [teamsCount, playersCount, fixturesCount, gameweeks, popularPlayers, pointsLeaders] = await Promise.all([
    prisma.nationalTeam.count(),
    prisma.player.count(),
    prisma.fixture.count(),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    getPlayerRanking("popularity"),
    getPlayerRanking("points"),
  ]);

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

        <div className="grid cols-2 tournament-player-rankings" style={{ marginTop: 16 }}>
          <section className="panel player-ranking-preview">
            <h2>Найпопулярніші гравці</h2>
            <p className="muted">ТОП-15 гравців, яких найчастіше обирали до фентезі-команд.</p>
            <PlayerRankingTable
              players={popularPlayers.slice(0, 15)}
              valueLabel="Виборів"
              emptyText="Гравців у складах ще немає."
            />
            <Link className="button player-ranking-link" href="/player-rankings">Увесь рейтинг</Link>
          </section>

          <section className="panel player-ranking-preview">
            <h2>ТОП-15 гравців за очками</h2>
            <p className="muted">Особисті очки гравців без капітанського подвоєння.</p>
            <PlayerRankingTable
              players={pointsLeaders.slice(0, 15)}
              valueLabel="Очки"
              emptyText="Очки гравцям ще не нараховані."
            />
            <Link className="button player-ranking-link" href="/player-points">Увесь рейтинг</Link>
          </section>
        </div>

      </div>
    </AppShell>
  );
}

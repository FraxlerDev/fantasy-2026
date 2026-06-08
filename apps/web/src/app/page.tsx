import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListOrdered,
  Shield,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { auth } from "../auth";
import { DeadlineCountdown } from "../components/deadline-countdown";
import { AppShell } from "../components/shell";
import { prisma } from "../lib/prisma";
import { createMetadata } from "../lib/seo";
import { startFromPromo } from "./actions/promo-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Фентезі до ЧС-2026",
  description: "Фентезі-футбол до ЧС-2026 українською: збери склад, обери капітана, грай у лігах з друзями та глобальному рейтингу.",
  path: "/",
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

export default async function HomePage() {
  const [session, rosterCounts, nextGameweek] = await Promise.all([
    auth(),
    prisma.rosterEntry.groupBy({
      by: ["fantasyTeamId"],
      _count: { playerId: true },
    }),
    prisma.gameweek.findFirst({
      where: { deadlineAt: { gt: new Date() } },
      orderBy: { deadlineAt: "asc" },
    }),
  ]);

  const completeTeamIds = rosterCounts
    .filter((row) => row._count.playerId === 15)
    .map((row) => row.fantasyTeamId);

  const [topTeams, popularPlayerCounts] = await Promise.all([
    completeTeamIds.length
      ? prisma.fantasyTeam.findMany({
          where: { id: { in: completeTeamIds } },
          orderBy: [{ totalPoints: "desc" }, { createdAt: "asc" }],
          take: 5,
        })
      : [],
    completeTeamIds.length
      ? prisma.rosterEntry.groupBy({
          by: ["playerId"],
          where: { fantasyTeamId: { in: completeTeamIds } },
          _count: { playerId: true },
          orderBy: { _count: { playerId: "desc" } },
          take: 5,
        })
      : [],
  ]);

  const popularPlayers = popularPlayerCounts.length
    ? await prisma.player.findMany({
        where: { id: { in: popularPlayerCounts.map((row) => row.playerId) } },
        include: { nationalTeam: true },
      })
    : [];
  const popularPlayersById = new Map(popularPlayers.map((player) => [player.id, player]));

  let previousPoints: number | null = null;
  let previousRank = 0;
  const topRows = topTeams.map((team, index) => {
    const rank = previousPoints === team.totalPoints ? previousRank : index + 1;
    previousPoints = team.totalPoints;
    previousRank = rank;
    return { ...team, rank };
  });

  return (
    <AppShell active="/">
      <section className="promo-hero poster-hero">
        <div className="promo-copy">
          <p className="eyebrow">Fantasy World Cup 2026</p>
          <h1>Фентезі-турнір до ЧС-2026 для твоєї футбольної компанії</h1>
          <p>
            Збери команду з 15 гравців, обери стартові 11, постав капітана і
            змагайся у глобальному рейтингу або в лігах з друзями.
          </p>
          {session?.user?.id ? (
            <div className="promo-form promo-form-signed-in">
              <Link className="button primary" href="/squad">
                Перейти до мого складу
              </Link>
            </div>
          ) : (
            <form action={startFromPromo} className="promo-form">
              <input
                className="input"
                name="teamName"
                placeholder="Придумай назву команди"
                maxLength={40}
              />
              <button className="button primary" type="submit">
                Грати
              </button>
            </form>
          )}
          <p className="promo-team-count">
            <Users size={18} />
            Уже створено <strong>{completeTeamIds.length}</strong> фентезі-команд
          </p>
        </div>
        <div className="promo-poster" aria-label="Постер Fantasy World Cup 2026" />
      </section>

      <section className="promo-steps">
        <article>
          <span>1</span>
          <Shield size={28} />
          <h2>Збери команду мрії</h2>
          <p>Використай бюджет 100 монет і склади ростер із 15 гравців.</p>
        </article>
        <article>
          <span>2</span>
          <Users size={28} />
          <h2>Створюй або вступай у ліги</h2>
          <p>Команда може грати без ліги, а приватні та відкриті ліги доступні окремо.</p>
        </article>
        <article>
          <span>3</span>
          <ArrowRight size={28} />
          <h2>Роби трансфери</h2>
          <p>Керуй складом між турами за лімітами кожного GW.</p>
        </article>
        <article>
          <span>4</span>
          <CheckCircle2 size={28} />
          <h2>Змагайся з друзями</h2>
          <p>Після оновлення рейтингів дивись місце у лігах і глобальній таблиці.</p>
        </article>
      </section>

      <section className="home-overview-grid">
        <article className="panel home-deadline-card">
          <div className="home-card-heading">
            <Clock3 size={22} />
            <h2>Найближчий дедлайн</h2>
          </div>
          {nextGameweek ? (
            <>
              <strong className="home-deadline-gw">GW{nextGameweek.number} · {nextGameweek.stage}</strong>
              <span className="muted">{formatDate(nextGameweek.deadlineAt)}</span>
              <DeadlineCountdown deadlineAt={nextGameweek.deadlineAt.toISOString()} />
            </>
          ) : (
            <p className="muted">Усі дедлайни турніру завершено.</p>
          )}
          <Link className="home-card-link" href="/tournament">Усі дедлайни <ArrowRight size={16} /></Link>
        </article>

        <article className="panel">
          <div className="home-card-heading">
            <Trophy size={22} />
            <h2>TOP-5 команд</h2>
          </div>
          <div className="home-ranking-list">
            {topRows.map((team) => (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <span>{team.rank}</span>
                <strong>{team.name}</strong>
                <em>{team.totalPoints}</em>
              </Link>
            ))}
            {topRows.length === 0 ? <p className="muted">Повних складів поки немає.</p> : null}
          </div>
          <Link className="home-card-link" href="/leaderboard">Увесь рейтинг <ArrowRight size={16} /></Link>
        </article>

        <article className="panel">
          <div className="home-card-heading">
            <Users size={22} />
            <h2>Популярні гравці</h2>
          </div>
          <div className="home-popular-list">
            {popularPlayerCounts.map((row, index) => {
              const player = popularPlayersById.get(row.playerId);
              if (!player) return null;

              return (
                <div key={row.playerId}>
                  <span>{index + 1}</span>
                  <span className="player-photo-wrap small">
                    {player.photoUrl ? (
                      <img alt="" className="player-photo" src={player.photoUrl} />
                    ) : (
                      <span className="player-photo placeholder"><UserRound size={17} /></span>
                    )}
                    {player.nationalTeam.flagPath ? (
                      <img alt="" className="player-photo-flag" src={player.nationalTeam.flagPath} />
                    ) : null}
                  </span>
                  <strong>{player.name}</strong>
                  <em>{row._count.playerId}</em>
                </div>
              );
            })}
            {popularPlayerCounts.length === 0 ? <p className="muted">Виборів гравців поки немає.</p> : null}
          </div>
          <Link className="home-card-link" href="/tournament">TOP-20 гравців <ArrowRight size={16} /></Link>
        </article>
      </section>

      <nav className="home-quick-links" aria-label="Швидкі переходи">
        <Link href="/matches"><CalendarDays size={22} /><span><strong>Матч-центр</strong><small>Розклад і результати</small></span></Link>
        <Link href="/rules"><Shield size={22} /><span><strong>Правила</strong><small>Склад, трансфери й очки</small></span></Link>
        <Link href="/leaderboard"><ListOrdered size={22} /><span><strong>Рейтинг</strong><small>Глобальна таблиця</small></span></Link>
        <Link href="/leagues"><Users size={22} /><span><strong>Ліги</strong><small>Грай разом із друзями</small></span></Link>
      </nav>
    </AppShell>
  );
}

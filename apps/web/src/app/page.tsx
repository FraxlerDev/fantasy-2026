import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Eye,
  ListOrdered,
  LogIn,
  Shield,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { auth } from "../auth";
import { HeroDeadlineCountdown } from "../components/hero-deadline-countdown";
import { InviteFriendsBanner } from "../components/invite-friends-banner";
import { AppShell } from "../components/shell";
import { getPlayerRanking } from "../lib/player-rankings";
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

  const [topTeams, popularPlayerCounts, pointsLeaders] = await Promise.all([
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
    getPlayerRanking("points"),
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
          {nextGameweek ? (
            <div className="promo-deadline">
              <div className="promo-deadline-heading">
                <span className="promo-deadline-icon"><Clock3 size={19} /></span>
                <span>
                  <small>Найближчий дедлайн</small>
                  <strong>GW{nextGameweek.number} · {formatDate(nextGameweek.deadlineAt)}</strong>
                </span>
              </div>
              <HeroDeadlineCountdown deadlineAt={nextGameweek.deadlineAt.toISOString()} />
            </div>
          ) : null}
          {session?.user?.id ? (
            <div className="promo-form promo-form-signed-in">
              <Link className="button primary promo-cta" href="/squad">
                Перейти до мого складу
              </Link>
            </div>
          ) : (
            <form action={startFromPromo} className="promo-form">
              <button className="button primary promo-cta" type="submit">
                <LogIn size={18} />
                Увійти та зібрати команду
              </button>
              <Link className="button promo-catalog-link" href="/players">
                <Eye size={18} />
                Переглянути гравців і ціни
              </Link>
            </form>
          )}
          <p className="promo-team-count">
            <Users size={18} />
            Уже створено <strong>{completeTeamIds.length}</strong> фентезі-команд
          </p>
        </div>
        <div className="promo-poster" aria-label="Постер Fantasy World Cup 2026" />
      </section>

      {nextGameweek?.number === 1 ? <InviteFriendsBanner /> : null}

      <section className="promo-steps">
        <article>
          <span>1</span>
          <LogIn size={28} />
          <h2>Увійди через Google</h2>
          <p>Швидкий вхід без окремого пароля та довгої реєстрації.</p>
        </article>
        <article>
          <span>2</span>
          <Shield size={28} />
          <h2>Обери 15 гравців</h2>
          <p>Розподіли бюджет 100 монет, визнач старт і капітана.</p>
        </article>
        <article>
          <span>3</span>
          <Trophy size={28} />
          <h2>Змагайся з друзями</h2>
          <p>Грай у глобальному рейтингу або створи власну лігу.</p>
        </article>
      </section>

      <section className="home-overview-grid">
        <article className="panel">
          <div className="home-card-heading">
            <Trophy size={22} />
            <h2>TOP-5 гравців за очками</h2>
          </div>
          <div className="home-popular-list">
            {pointsLeaders.slice(0, 5).map((player, index) => (
              <div key={player.id}>
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
                <em>{player.value}</em>
              </div>
            ))}
            {pointsLeaders.length === 0 ? <p className="muted">Очки гравцям ще не нараховані.</p> : null}
          </div>
          <Link className="home-card-link" href="/player-points">Увесь рейтинг <ArrowRight size={16} /></Link>
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
          <Link className="home-card-link" href="/player-rankings">Увесь рейтинг <ArrowRight size={16} /></Link>
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

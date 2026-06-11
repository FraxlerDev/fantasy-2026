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
  searchParams?: Promise<{ joined?: string; left?: string; removed?: string; deleted?: string; error?: string }>;
};

type RankingRow = {
  rank: number;
  totalPoints: number;
  fantasyTeam: {
    id: string;
    name: string;
    totalPoints: number;
    user: { username: string | null; email: string | null; image: string | null };
  };
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

function buildFallbackRows(members: Array<{ fantasyTeam: RankingRow["fantasyTeam"] }>): RankingRow[] {
  const sorted = [...members].sort((a, b) => b.fantasyTeam.totalPoints - a.fantasyTeam.totalPoints || a.fantasyTeam.name.localeCompare(b.fantasyTeam.name, "uk"));
  let previousPoints: number | null = null;
  let previousRank = 0;

  return sorted.map((member, index) => {
    const rank = previousPoints === member.fantasyTeam.totalPoints ? previousRank : index + 1;
    previousPoints = member.fantasyTeam.totalPoints;
    previousRank = rank;
    return { rank, totalPoints: member.fantasyTeam.totalPoints, fantasyTeam: member.fantasyTeam };
  });
}

function scoreSnapshot(
  entries: Array<{ playerId: string; slot: "STARTER" | "BENCH"; isCaptain: boolean }>,
  playerPoints: Map<string, number>,
) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  const basePoints = starters.reduce((sum, entry) => sum + (playerPoints.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);
  return basePoints + (captain ? playerPoints.get(captain.playerId) ?? 0 : 0);
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
        include: { fantasyTeam: { include: { user: true } } },
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

  const storedRows = await prisma.leaderboardRow.findMany({
    where: { scope: "LEAGUE", leagueId: league.id },
    include: { fantasyTeam: { include: { user: true } } },
    orderBy: [{ rank: "asc" }, { fantasyTeam: { createdAt: "asc" } }],
  });
  const rows: RankingRow[] = storedRows.length > 0 ? storedRows : buildFallbackRows(league.members);

  const latestScoredFixture = await prisma.fixture.findFirst({
    where: { status: { in: ["POINTS_SAVED", "RANKINGS_UPDATED"] } },
    orderBy: [{ gameweek: "desc" }, { kickoffAt: "desc" }],
    select: { gameweek: true },
  });
  const leaderGameweek = latestScoredFixture?.gameweek ?? 1;
  const [leaderFixtures, memberSnapshots] = await Promise.all([
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
  ]);

  const playerPoints = new Map<string, number>();
  for (const fixture of leaderFixtures) {
    for (const point of fixture.playerPoints) {
      playerPoints.set(point.playerId, (playerPoints.get(point.playerId) ?? 0) + point.points);
    }
  }

  const gameweekLeaders = memberSnapshots
    .map((snapshot) => ({
      id: snapshot.fantasyTeam.id,
      name: snapshot.fantasyTeam.name,
      points: scoreSnapshot(snapshot.entries, playerPoints),
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
          <span>Лідер GW{leaderGameweek}</span>
          <strong>{bestTeam?.name ?? "Ще не визначено"}</strong>
        </article>
        <article className="panel">
          <Crown size={22} />
          <span>Найбільше очок</span>
          <strong>{bestTeam ? bestTeam.points : 0}</strong>
        </article>
        <article className="panel">
          <UserCheck size={22} />
          <span>Найкращий капітан</span>
          <strong>{bestCaptain ? `${bestCaptain.name} · ${bestCaptain.points}` : "Ще не визначено"}</strong>
        </article>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="topbar" style={{ marginBottom: 12 }}>
          <div>
            <h2>Таблиця ліги</h2>
            <p className="muted">Однакові очки дають однакове місце.</p>
          </div>
          <span className="badge">
            <Users size={14} />
            {rows.length} команд
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Команда</th>
              <th>Менеджер</th>
              <th>Очки</th>
              {isOwner ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOwnTeam = row.fantasyTeam.id === fantasyTeam?.id;
              return (
              <tr className={isOwnTeam ? "leaderboard-own-row" : ""} key={row.fantasyTeam.id}>
                <td>{row.rank}</td>
                <td>
                  <Link className="leaderboard-team-link" href={`/teams/${row.fantasyTeam.id}`}>
                    <span className="leaderboard-team-photo">
                      {row.fantasyTeam.user.image ? <img src={row.fantasyTeam.user.image} alt="" /> : <span>{teamInitial(row.fantasyTeam.name)}</span>}
                    </span>
                    <span>{row.fantasyTeam.name}</span>
                    {isOwnTeam ? <span className="own-team-badge">Ви</span> : null}
                  </Link>
                </td>
                <td>{row.fantasyTeam.user.username?.trim() || "Користувач"}</td>
                <td><strong>{row.totalPoints}</strong></td>
                {isOwner ? (
                  <td>
                    {row.fantasyTeam.id !== fantasyTeam?.id ? (
                      <form action={removeLeagueMember}>
                        <input type="hidden" name="leagueId" value={league.id} />
                        <input type="hidden" name="fantasyTeamId" value={row.fantasyTeam.id} />
                        <button className="button" type="submit">Видалити</button>
                      </form>
                    ) : null}
                  </td>
                ) : null}
              </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr><td colSpan={isOwner ? 5 : 4}>У цій лізі ще немає команд.</td></tr>
            ) : null}
          </tbody>
        </table>
      </section>

      {isMember || isOwner ? (
        <div className="league-chat-wrap">
          <LeagueChat leagueId={league.id} leagueName={league.name} />
        </div>
      ) : null}
    </AppShell>
  );
}

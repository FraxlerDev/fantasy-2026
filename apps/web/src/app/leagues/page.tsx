import type { Metadata } from "next";
import { Lock, Plus, Search, Unlock, Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";
import { CopyButton } from "../../components/copy-button";
import { DeleteLeagueButton } from "../../components/delete-league-button";
import {
  createOrRenameLeague,
  joinLeague,
  leaveLeague,
  removeLeagueMember,
} from "../actions/league-actions";

export const metadata: Metadata = createMetadata({
  title: "Ліги фентезі до ЧС-2026",
  description: "Створюй відкриті та приватні ліги, запрошуй друзів і змагайся у фентезі-футболі до ЧС-2026.",
  path: "/leagues",
});

const errorMessages: Record<string, string> = {
  "league-name": "Назва ліги має містити від 2 до 40 символів.",
  "league-description": "Опис ліги має бути не довшим за 240 символів.",
  invite: "Лігу з таким кодом не знайдено.",
  closed: "Ця ліга закрита. Попроси власника надіслати invite code.",
  limit: "Досягнуто ліміт: можна вступити максимум у 5 запрошених ліг.",
  "owner-leave": "Власник не може вийти зі своєї ліги.",
  owner: "Ця дія доступна тільки власнику ліги.",
};

type LeagueSearchParams = {
  error?: string;
  saved?: string;
  joined?: string;
  left?: string;
  removed?: string;
  deleted?: string;
  q?: string;
};

function memberLabel(count: number) {
  if (count === 1) return "1 учасник";
  if (count > 1 && count < 5) return `${count} учасники`;
  return `${count} учасників`;
}

function leagueUrl(leagueId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fantasy.fraxler.site";
  return `${baseUrl.replace(/\/$/, "")}/leagues/${leagueId}`;
}

function fallbackRows(league: {
  members: Array<{
    fantasyTeam: {
      id: string;
      name: string;
      totalPoints: number;
      user: { username: string | null; email: string | null };
    };
  }>;
}) {
  const sorted = [...league.members].sort((a, b) => b.fantasyTeam.totalPoints - a.fantasyTeam.totalPoints || a.fantasyTeam.name.localeCompare(b.fantasyTeam.name, "uk"));
  let previousPoints: number | null = null;
  let previousRank = 0;

  return sorted.map((member, index) => {
    const rank = previousPoints === member.fantasyTeam.totalPoints ? previousRank : index + 1;
    previousPoints = member.fantasyTeam.totalPoints;
    previousRank = rank;
    return { rank, totalPoints: member.fantasyTeam.totalPoints, fantasyTeam: member.fantasyTeam };
  });
}

export default async function LeaguesPage({
  searchParams,
}: {
  searchParams?: Promise<LeagueSearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;
  const query = String(params?.q ?? "").trim();

  const fantasyTeam = session?.user?.id
    ? await prisma.fantasyTeam.findUnique({ where: { userId: session.user.id } })
    : null;

  const ownedLeague = session?.user?.id
    ? await prisma.league.findUnique({
        where: { ownerId: session.user.id },
        include: { members: { include: { fantasyTeam: { include: { user: true } } } } },
      })
    : null;

  const memberships = fantasyTeam
    ? await prisma.leagueMember.findMany({
        where: { fantasyTeamId: fantasyTeam.id },
        include: {
          league: {
            include: {
              owner: true,
              members: { include: { fantasyTeam: { include: { user: true } } } },
            },
          },
        },
        orderBy: { joinedAt: "desc" },
      })
    : [];

  const membershipLeagueIds = new Set(memberships.map((membership) => membership.leagueId));
  const openLeagues = await prisma.league.findMany({
    where: {
      isOpen: true,
      ...(query ? { name: { contains: query, mode: "insensitive" as const } } : {}),
      ...(session?.user?.id ? { ownerId: { not: session.user.id } } : {}),
      ...(membershipLeagueIds.size > 0 ? { id: { notIn: [...membershipLeagueIds] } } : {}),
    },
    include: { owner: true, members: true },
    orderBy: [{ members: { _count: "desc" } }, { createdAt: "desc" }],
    take: 30,
  });

  const leagueIds = memberships.map((membership) => membership.leagueId);
  const leaderboardRows =
    leagueIds.length > 0
      ? await prisma.leaderboardRow.findMany({
          where: { scope: "LEAGUE", leagueId: { in: leagueIds } },
          include: { fantasyTeam: { include: { user: true } } },
          orderBy: [{ leagueId: "asc" }, { rank: "asc" }],
        })
      : [];

  return (
    <AppShell active="/leagues">
      <div className="topbar">
        <div>
          <p className="eyebrow">Ліги</p>
          <h1>Змагайся з друзями</h1>
          <p className="muted">
            Створи одну власну лігу, відкрий її для всіх або запроси друзів кодом. Команда без ліги все одно потрапляє у глобальний рейтинг після збереження складу.
          </p>
        </div>
      </div>

      {params?.error ? <div className="form-error">Помилка: {errorMessages[params.error] ?? params.error}</div> : null}
      {params?.saved || params?.joined || params?.left || params?.removed || params?.deleted ? (
        <div className="form-success">Зміни збережено.</div>
      ) : null}

      <section className="grid cols-2">
        <div className="panel">
          <h2>Моя власна ліга</h2>
          {session?.user?.id ? (
            <>
              <form action={createOrRenameLeague} className="form-stack">
                <label>
                  Назва ліги
                  <input className="input" name="name" defaultValue={ownedLeague?.name ?? "Моя ліга"} minLength={2} maxLength={40} />
                </label>
                <label>
                  Опис
                  <textarea className="input textarea" name="description" defaultValue={ownedLeague?.description ?? ""} maxLength={240} placeholder="Наприклад: ліга друзів, колег або Telegram-спільноти" />
                </label>
                <label>
                  Доступ
                  <select className="input" name="isOpen" defaultValue={ownedLeague?.isOpen ? "open" : "closed"}>
                    <option value="closed">Закрита: вступ тільки за кодом</option>
                    <option value="open">Відкрита: кожен може вступити сам</option>
                  </select>
                </label>
                {ownedLeague ? (
                  <div className="card">
                    <span className="badge">{ownedLeague.isOpen ? "Відкрита ліга" : "Закрита ліга"}</span>
                    <h1 style={{ marginTop: 10 }}>{ownedLeague.inviteCode}</h1>
                    <p className="muted">Код потрібен для закритих ліг і ручного запрошення друзів.</p>
                    <div className="toolbar">
                      <CopyButton text={ownedLeague.inviteCode} label="Скопіювати код" />
                      <CopyButton text={leagueUrl(ownedLeague.id)} label="Скопіювати посилання" />
                      <Link className="button" href={`/leagues/${ownedLeague.id}`}>Відкрити лігу</Link>
                      <span className="button">
                        <Users size={18} />
                        {memberLabel(ownedLeague.members.length)}
                      </span>
                    </div>
                  </div>
                ) : null}
                {!fantasyTeam ? (
                  <p className="muted">Лігу можна створити зараз. Твоя команда додасться в неї автоматично після першого збереження складу.</p>
                ) : null}
                <button className="button primary" type="submit">
                  <Plus size={18} />
                  {ownedLeague ? "Зберегти лігу" : "Створити лігу"}
                </button>
              </form>
              {ownedLeague ? (
                <div style={{ marginTop: 12 }}>
                  <DeleteLeagueButton leagueId={ownedLeague.id} leagueName={ownedLeague.name} />
                </div>
              ) : null}
            </>
          ) : (
            <p className="muted">Увійди через Google, щоб створити власну лігу.</p>
          )}
        </div>

        <div className="panel">
          <h2>Вступити в лігу</h2>
          <form action={joinLeague} className="form-stack">
            <label>
              Invite code для закритої ліги
              <input className="input" name="inviteCode" placeholder="K7P9XQ" maxLength={12} />
            </label>
            <button className="button primary" type="submit">Приєднатися за кодом</button>
            {!fantasyTeam ? <p className="muted">Вступати в ліги можна після створення та збереження команди.</p> : null}
          </form>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="topbar" style={{ marginBottom: 12 }}>
          <div>
            <h2>Відкриті ліги</h2>
            <p className="muted">Знайди лігу та вступи без коду, якщо вона відкрита.</p>
          </div>
        </div>
        <form className="form-inline" action="/leagues">
          <input className="input" name="q" defaultValue={query} placeholder="Пошук відкритої ліги" />
          <button className="button primary" type="submit">
            <Search size={18} />
            Знайти
          </button>
          {query ? <Link className="button" href="/leagues">Скинути</Link> : <span />}
        </form>
        <div className="grid" style={{ marginTop: 16 }}>
          {openLeagues.map((league) => (
            <article className="card" key={league.id}>
              <div className="topbar" style={{ marginBottom: 10 }}>
                <div>
                  <h3><Link href={`/leagues/${league.id}`}>{league.name}</Link></h3>
                  <p className="muted">Власник: {league.owner.username ?? league.owner.email}</p>
                </div>
                <span className="badge">
                  <Unlock size={14} />
                  {memberLabel(league.members.length)}
                </span>
              </div>
              <div className="toolbar">
                <Link className="button" href={`/leagues/${league.id}`}>Переглянути</Link>
                <form action={joinLeague}>
                  <input type="hidden" name="leagueId" value={league.id} />
                  <button className="button primary" type="submit" disabled={!fantasyTeam}>Вступити</button>
                </form>
              </div>
            </article>
          ))}
          {openLeagues.length === 0 ? <p className="muted">Відкритих ліг поки немає.</p> : null}
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Мої ліги</h2>
        <div className="grid">
          {memberships.map((membership) => {
            const leagueRows = leaderboardRows.filter((row) => row.leagueId === membership.leagueId);
            const isOwner = membership.league.ownerId === session?.user?.id;
            const rows = leagueRows.length > 0 ? leagueRows : fallbackRows(membership.league);

            return (
              <article className="card" key={membership.id}>
                <div className="topbar" style={{ marginBottom: 10 }}>
                  <div>
                    <h3><Link href={`/leagues/${membership.league.id}`}>{membership.league.name}</Link></h3>
                    <p className="muted">
                      {membership.league.isOpen ? <Unlock size={14} /> : <Lock size={14} />} Код: {membership.league.inviteCode}
                    </p>
                  </div>
                  {!isOwner ? (
                    <form action={leaveLeague}>
                      <input type="hidden" name="leagueId" value={membership.leagueId} />
                      <button className="button" type="submit">Вийти</button>
                    </form>
                  ) : null}
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Місце</th>
                      <th>Команда</th>
                      <th>Менеджер</th>
                      <th>Очки</th>
                      {isOwner ? <th></th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 10).map((row) => (
                      <tr key={row.fantasyTeam.id}>
                        <td>{row.rank}</td>
                        <td><Link href={`/teams/${row.fantasyTeam.id}`}>{row.fantasyTeam.name}</Link></td>
                        <td>{row.fantasyTeam.user.username ?? row.fantasyTeam.user.email}</td>
                        <td><strong>{row.totalPoints}</strong></td>
                        {isOwner ? (
                          <td>
                            {row.fantasyTeam.id !== fantasyTeam?.id ? (
                              <form action={removeLeagueMember}>
                                <input type="hidden" name="leagueId" value={membership.leagueId} />
                                <input type="hidden" name="fantasyTeamId" value={row.fantasyTeam.id} />
                                <button className="button" type="submit">Видалити</button>
                              </form>
                            ) : null}
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="toolbar" style={{ marginTop: 12 }}>
                  <Link className="button" href={`/leagues/${membership.league.id}`}>Повна таблиця</Link>
                </div>
              </article>
            );
          })}
          {memberships.length === 0 ? <p className="muted">Ти ще не вступив до жодної ліги.</p> : null}
        </div>
      </section>
    </AppShell>
  );
}

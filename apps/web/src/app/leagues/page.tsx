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

const tabs = [
  { id: "mine", label: "Мої ліги" },
  { id: "open", label: "Відкриті" },
  { id: "create", label: "Створити" },
  { id: "join", label: "Вступити за кодом" },
] as const;

type LeagueTab = (typeof tabs)[number]["id"];
type LeagueSearchParams = {
  tab?: string;
  error?: string;
  saved?: string;
  joined?: string;
  left?: string;
  removed?: string;
  deleted?: string;
  q?: string;
};

const errorMessages: Record<string, string> = {
  "league-name": "Назва ліги має містити від 2 до 40 символів.",
  "league-description": "Опис ліги має бути не довшим за 240 символів.",
  invite: "Лігу з таким кодом не знайдено.",
  closed: "Ця ліга закрита. Попроси власника надіслати код запрошення.",
  limit: "Досягнуто ліміт: можна вступити максимум у 5 запрошених ліг.",
  "owner-leave": "Власник не може вийти зі своєї ліги.",
  owner: "Ця дія доступна тільки власнику ліги.",
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

function rankedMembers(
  members: Array<{
    fantasyTeam: {
      id: string;
      name: string;
      totalPoints: number;
      user: { username: string | null };
    };
  }>,
) {
  const sorted = [...members].sort(
    (a, b) =>
      b.fantasyTeam.totalPoints - a.fantasyTeam.totalPoints ||
      a.fantasyTeam.name.localeCompare(b.fantasyTeam.name, "uk"),
  );
  let previousPoints: number | null = null;
  let previousRank = 0;

  return sorted.map((member, index) => {
    const rank = previousPoints === member.fantasyTeam.totalPoints ? previousRank : index + 1;
    previousPoints = member.fantasyTeam.totalPoints;
    previousRank = rank;
    return { rank, ...member.fantasyTeam };
  });
}

export default async function LeaguesPage({
  searchParams,
}: {
  searchParams?: Promise<LeagueSearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;
  const requestedTab = String(params?.tab ?? "");
  const activeTab: LeagueTab = tabs.some((tab) => tab.id === requestedTab)
    ? (requestedTab as LeagueTab)
    : session?.user?.id
      ? "mine"
      : "open";
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
  const joinedMemberships = memberships.filter((membership) => membership.league.ownerId !== session?.user?.id);
  const membershipLeagueIds = new Set(memberships.map((membership) => membership.leagueId));
  const openLeagues =
    activeTab === "open"
      ? await prisma.league.findMany({
          where: {
            isOpen: true,
            ...(query ? { name: { contains: query, mode: "insensitive" as const } } : {}),
            ...(session?.user?.id ? { ownerId: { not: session.user.id } } : {}),
            ...(membershipLeagueIds.size > 0 ? { id: { notIn: [...membershipLeagueIds] } } : {}),
          },
          include: { owner: true, members: true },
          orderBy: [{ members: { _count: "desc" } }, { createdAt: "desc" }],
          take: 30,
        })
      : [];

  return (
    <AppShell active="/leagues">
      <div className="topbar">
        <div>
          <p className="eyebrow">Ліги</p>
          <h1>Змагайся з друзями</h1>
          <p className="muted">
            Керуй власною лігою, приєднуйся до відкритих спільнот або вступай у приватні ліги за кодом.
          </p>
        </div>
      </div>

      <nav className="section-tabs" aria-label="Розділи ліг">
        {tabs.map((tab) => (
          <Link className={activeTab === tab.id ? "active" : ""} href={`/leagues?tab=${tab.id}`} key={tab.id}>
            {tab.label}
          </Link>
        ))}
      </nav>

      {params?.error ? <div className="form-error">{errorMessages[params.error] ?? params.error}</div> : null}
      {params?.saved || params?.joined || params?.left || params?.removed || params?.deleted ? (
        <div className="form-success">Зміни збережено.</div>
      ) : null}

      {activeTab === "mine" ? (
        <section className="panel">
          <h2>Мої ліги</h2>
          {!session?.user?.id ? (
            <p className="muted">Увійди через Google, щоб бачити свої ліги.</p>
          ) : !ownedLeague && joinedMemberships.length === 0 ? (
            <p className="muted">Ти ще не створив лігу і не приєднався до інших.</p>
          ) : (
            <div className="grid">
              {ownedLeague ? (
                <article className="card">
                  <div className="topbar">
                    <div>
                      <span className="badge">Власна ліга</span>
                      <h3><Link href={`/leagues/${ownedLeague.id}`}>{ownedLeague.name}</Link></h3>
                      <p className="muted">
                        {ownedLeague.isOpen ? <Unlock size={14} /> : <Lock size={14} />}{" "}
                        {ownedLeague.isOpen ? "Відкрита" : "Закрита"} · {memberLabel(ownedLeague.members.length)}
                      </p>
                    </div>
                    <Link className="button" href="/leagues?tab=create">Редагувати</Link>
                  </div>
                  <table className="table compact-table league-ranking-table">
                    <thead><tr><th>Місце</th><th>Команда</th><th>Менеджер</th><th>Очки</th><th /></tr></thead>
                    <tbody>
                      {rankedMembers(ownedLeague.members).slice(0, 10).map((row) => (
                        <tr key={row.id}>
                          <td>{row.rank}</td>
                          <td>
                            <Link href={`/teams/${row.id}`}>{row.name}</Link>
                            <small className="league-mobile-manager">{row.user.username?.trim() || "Користувач"}</small>
                          </td>
                          <td>{row.user.username?.trim() || "Користувач"}</td>
                          <td><strong>{row.totalPoints}</strong></td>
                          <td>
                            {row.id !== fantasyTeam?.id ? (
                              <form action={removeLeagueMember}>
                                <input type="hidden" name="leagueId" value={ownedLeague.id} />
                                <input type="hidden" name="fantasyTeamId" value={row.id} />
                                <button className="button" type="submit">Видалити</button>
                              </form>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              ) : null}

              {joinedMemberships.map((membership) => (
                <article className="card" key={membership.id}>
                  <div className="topbar">
                    <div>
                      <h3><Link href={`/leagues/${membership.league.id}`}>{membership.league.name}</Link></h3>
                      <p className="muted">
                        Власник: {membership.league.owner.username?.trim() || "Користувач"} ·{" "}
                        {memberLabel(membership.league.members.length)}
                      </p>
                    </div>
                    <form action={leaveLeague}>
                      <input type="hidden" name="leagueId" value={membership.leagueId} />
                      <button className="button" type="submit">Вийти</button>
                    </form>
                  </div>
                  <table className="table compact-table league-ranking-table">
                    <thead><tr><th>Місце</th><th>Команда</th><th>Менеджер</th><th>Очки</th></tr></thead>
                    <tbody>
                      {rankedMembers(membership.league.members).slice(0, 10).map((row) => (
                        <tr key={row.id}>
                          <td>{row.rank}</td>
                          <td>
                            <Link href={`/teams/${row.id}`}>{row.name}</Link>
                            <small className="league-mobile-manager">{row.user.username?.trim() || "Користувач"}</small>
                          </td>
                          <td>{row.user.username?.trim() || "Користувач"}</td>
                          <td><strong>{row.totalPoints}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {activeTab === "open" ? (
        <section className="panel">
          <h2>Відкриті ліги</h2>
          <form className="form-inline" action="/leagues">
            <input type="hidden" name="tab" value="open" />
            <input className="input" name="q" defaultValue={query} placeholder="Пошук відкритої ліги" />
            <button className="button primary" type="submit"><Search size={18} />Знайти</button>
            {query ? <Link className="button" href="/leagues?tab=open">Скинути</Link> : null}
          </form>
          <div className="grid" style={{ marginTop: 16 }}>
            {openLeagues.map((league) => (
              <article className="card" key={league.id}>
                <div className="topbar">
                  <div>
                    <h3><Link href={`/leagues/${league.id}`}>{league.name}</Link></h3>
                    <p className="muted">Власник: {league.owner.username?.trim() || "Користувач"}</p>
                  </div>
                  <span className="badge"><Users size={14} />{memberLabel(league.members.length)}</span>
                </div>
                <div className="toolbar">
                  <Link className="button" href={`/leagues/${league.id}`}>Переглянути</Link>
                  <form action={joinLeague}>
                    <input type="hidden" name="leagueId" value={league.id} />
                    <input type="hidden" name="returnTab" value="open" />
                    <button className="button primary" type="submit" disabled={!fantasyTeam}>Вступити</button>
                  </form>
                </div>
              </article>
            ))}
            {openLeagues.length === 0 ? <p className="muted">Відкритих ліг за цим запитом немає.</p> : null}
          </div>
        </section>
      ) : null}

      {activeTab === "create" ? (
        <section className="panel">
          <h2>{ownedLeague ? "Налаштування власної ліги" : "Створити лігу"}</h2>
          {session?.user?.id ? (
            <>
              <form action={createOrRenameLeague} className="form-stack">
                <input type="hidden" name="returnTab" value="create" />
                <label>Назва ліги
                  <input className="input" name="name" defaultValue={ownedLeague?.name ?? "Моя ліга"} minLength={2} maxLength={40} />
                </label>
                <label>Опис
                  <textarea className="input textarea" name="description" defaultValue={ownedLeague?.description ?? ""} maxLength={240} />
                </label>
                <label>Доступ
                  <select className="input" name="isOpen" defaultValue={ownedLeague?.isOpen ? "open" : "closed"}>
                    <option value="closed">Закрита: вступ тільки за кодом</option>
                    <option value="open">Відкрита: кожен може вступити сам</option>
                  </select>
                </label>
                {ownedLeague ? (
                  <div className="card">
                    <strong>Код запрошення: {ownedLeague.inviteCode}</strong>
                    <div className="toolbar" style={{ marginTop: 12 }}>
                      <CopyButton text={ownedLeague.inviteCode} label="Скопіювати код" />
                      <CopyButton text={leagueUrl(ownedLeague.id)} label="Скопіювати посилання" />
                      <Link className="button" href={`/leagues/${ownedLeague.id}`}>Відкрити лігу</Link>
                    </div>
                  </div>
                ) : null}
                <button className="button primary" type="submit"><Plus size={18} />{ownedLeague ? "Зберегти" : "Створити"}</button>
              </form>
              {ownedLeague ? <div style={{ marginTop: 12 }}><DeleteLeagueButton leagueId={ownedLeague.id} leagueName={ownedLeague.name} /></div> : null}
            </>
          ) : (
            <p className="muted">Увійди через Google, щоб створити власну лігу.</p>
          )}
        </section>
      ) : null}

      {activeTab === "join" ? (
        <section className="panel">
          <h2>Вступити за кодом</h2>
          <form action={joinLeague} className="form-stack">
            <input type="hidden" name="returnTab" value="join" />
            <label>Код приватної ліги
              <input className="input" name="inviteCode" placeholder="K7P9XQ" maxLength={12} />
            </label>
            <button className="button primary" type="submit" disabled={!fantasyTeam}>Приєднатися</button>
            {!fantasyTeam ? <p className="muted">Для вступу спочатку створи та збережи свою команду.</p> : null}
          </form>
        </section>
      ) : null}
    </AppShell>
  );
}

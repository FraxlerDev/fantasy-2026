import { Lock, Plus, Unlock, Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { CopyButton } from "../../components/copy-button";
import { DeleteLeagueButton } from "../../components/delete-league-button";
import {
  createOrRenameLeague,
  joinLeague,
  leaveLeague,
  removeLeagueMember,
} from "../actions/league-actions";

const errorMessages: Record<string, string> = {
  "league-name": "Назва ліги має містити від 2 до 40 символів.",
  invite: "Лігу з таким кодом не знайдено.",
  closed: "Ця ліга закрита. Попроси власника надіслати invite code.",
  limit: "Досягнуто ліміт: можна вступити максимум у 5 запрошених ліг.",
  "owner-leave": "Власник не може вийти зі своєї ліги.",
  owner: "Ця дія доступна тільки власнику ліги.",
};

export default async function LeaguesPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; saved?: string; joined?: string; left?: string; removed?: string; deleted?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
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
          league: { include: { members: { include: { fantasyTeam: { include: { user: true } } } } } },
        },
        orderBy: { joinedAt: "desc" },
      })
    : [];

  const membershipLeagueIds = new Set(memberships.map((membership) => membership.leagueId));
  const openLeagues = await prisma.league.findMany({
    where: {
      isOpen: true,
      ...(session?.user?.id ? { ownerId: { not: session.user.id } } : {}),
      ...(membershipLeagueIds.size > 0 ? { id: { notIn: [...membershipLeagueIds] } } : {}),
    },
    include: { owner: true, members: true },
    orderBy: [{ createdAt: "desc" }],
    take: 20,
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
            Можна створити одну власну лігу ще до команди. Команда без ліги все одно потрапляє у глобальний рейтинг після збереження складу.
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
                    <CopyButton text={ownedLeague.inviteCode} />
                    <span className="button">
                      <Users size={18} />
                      {ownedLeague.members.length} учасників
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
        <h2>Відкриті ліги</h2>
        <div className="grid">
          {openLeagues.map((league) => (
            <article className="card" key={league.id}>
              <div className="topbar" style={{ marginBottom: 10 }}>
                <div>
                  <h3>{league.name}</h3>
                  <p className="muted">Власник: {league.owner.username ?? league.owner.email}</p>
                </div>
                <span className="badge">
                  <Unlock size={14} />
                  {league.members.length} учасників
                </span>
              </div>
              <form action={joinLeague}>
                <input type="hidden" name="leagueId" value={league.id} />
                <button className="button primary" type="submit" disabled={!fantasyTeam}>Вступити</button>
              </form>
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
            const rows =
              leagueRows.length > 0
                ? leagueRows
                : membership.league.members.map((member, index) => ({
                    rank: index + 1,
                    totalPoints: member.fantasyTeam.totalPoints,
                    fantasyTeam: member.fantasyTeam,
                  }));

            return (
              <article className="card" key={membership.id}>
                <div className="topbar" style={{ marginBottom: 10 }}>
                  <div>
                    <h3>{membership.league.name}</h3>
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
                    {rows.map((row) => (
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
              </article>
            );
          })}
          {memberships.length === 0 ? <p className="muted">Ти ще не вступив до жодної ліги.</p> : null}
        </div>
      </section>
    </AppShell>
  );
}

import type { Metadata } from "next";
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

type Team = {
  id: string;
  nameUk: string;
  groupKey: string | null;
  flagPath: string | null;
};

type Fixture = {
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
};

type StandingRow = {
  team: Team;
  played: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
};

function formatDate(date: Date) {
  return date.toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildStandings(groupTeams: Team[], fixtures: Fixture[]) {
  const rows = new Map<string, StandingRow>();
  for (const team of groupTeams) {
    rows.set(team.id, { team, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0 });
  }

  for (const fixture of fixtures) {
    if (fixture.homeScore === null || fixture.awayScore === null) continue;
    const home = rows.get(fixture.homeTeamId);
    const away = rows.get(fixture.awayTeamId);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += fixture.homeScore;
    home.goalsAgainst += fixture.awayScore;
    away.goalsFor += fixture.awayScore;
    away.goalsAgainst += fixture.homeScore;

    if (fixture.homeScore > fixture.awayScore) {
      home.points += 3;
    } else if (fixture.homeScore < fixture.awayScore) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }
  }

  return [...rows.values()].sort((a, b) => {
    const goalDiffA = a.goalsFor - a.goalsAgainst;
    const goalDiffB = b.goalsFor - b.goalsAgainst;
    return (
      b.points - a.points ||
      goalDiffB - goalDiffA ||
      b.goalsFor - a.goalsFor ||
      a.team.nameUk.localeCompare(b.team.nameUk, "uk")
    );
  });
}

export default async function TournamentPage() {
  const [teams, playersCount, fixtures, gameweeks, leaders, popularPlayerCounts] = await Promise.all([
    prisma.nationalTeam.findMany({ orderBy: [{ groupKey: "asc" }, { nameUk: "asc" }] }),
    prisma.player.count(),
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    prisma.leaderboardRow.findMany({
      where: { scope: "GLOBAL" },
      include: { fantasyTeam: { include: { user: true } } },
      orderBy: { rank: "asc" },
      take: 10,
    }),
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
  const teamsByGroup = teams.reduce<Map<string, Team[]>>((groups, team) => {
    const group = team.groupKey ?? "-";
    groups.set(group, [...(groups.get(group) ?? []), team]);
    return groups;
  }, new Map());

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

        <nav className="fantasy-tabs">
          <Link href="/tournament">Профіль</Link>
          <Link href="/leaderboard">Рейтинги</Link>
          <Link href="/rules">Правила</Link>
          <Link href="/leagues">Ліги</Link>
        </nav>

        <section className="grid cols-3" style={{ marginTop: 16 }}>
          <div className="panel stat"><span className="badge">Збірні</span><strong>{teams.length}</strong></div>
          <div className="panel stat"><span className="badge">Гравці</span><strong>{playersCount}</strong></div>
          <div className="panel stat"><span className="badge">Матчі</span><strong>{fixtures.length}/72</strong></div>
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
                    <td><strong>{player.name}</strong></td>
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
          <h2>Збірні</h2>
          <div className="group-grid">
            {[...teamsByGroup.entries()].map(([group, groupTeams]) => (
              <div className="group-box" key={group}>
                <h3>Група {group}</h3>
                <table className="group-table">
                  <thead>
                    <tr><th></th><th>Команда</th><th>М</th><th>О</th></tr>
                  </thead>
                  <tbody>
                    {buildStandings(groupTeams, fixtures).map((row, index) => (
                      <tr className={index < 2 ? "qualify-main" : index === 2 ? "qualify-soft" : ""} key={row.team.id}>
                        <td className="place-cell">{index + 1}</td>
                        <td>
                          <span className="team-with-flag">
                            {row.team.flagPath ? <img alt="" className="flag" src={row.team.flagPath} /> : null}
                            {row.team.nameUk}
                          </span>
                        </td>
                        <td>{row.played}</td>
                        <td><strong>{row.points}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
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
          <p className="muted" style={{ marginTop: 10 }}>Показані перші 18 матчів. Повний календар доступний в admin і бічному календарі.</p>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Лідери турніру</h2>
          <table className="table compact-table">
            <thead>
              <tr><th>#</th><th>Команда</th><th>Менеджер</th><th>Очки</th></tr>
            </thead>
            <tbody>
              {leaders.map((row) => (
                <tr key={row.id}>
                  <td>{row.rank}</td>
                  <td><Link href={`/teams/${row.fantasyTeam.id}`}>{row.fantasyTeam.name}</Link></td>
                  <td>{row.fantasyTeam.user.username ?? row.fantasyTeam.user.email}</td>
                  <td><strong>{row.totalPoints}</strong></td>
                </tr>
              ))}
              {leaders.length === 0 ? <tr><td colSpan={4}>Рейтинг ще не оновлено.</td></tr> : null}
            </tbody>
          </table>
        </section>
      </FantasyLayout>
    </AppShell>
  );
}

import Link from "next/link";
import { prisma } from "../lib/prisma";

export async function FantasySidebar() {
  const [fixtures, teams, gameweeks, topTeams] = await Promise.all([
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }],
      take: 8,
    }),
    prisma.nationalTeam.findMany({ orderBy: [{ groupKey: "asc" }, { nameUk: "asc" }], take: 48 }),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    prisma.fantasyTeam.findMany({
      where: { rosterEntries: { some: {} } },
      orderBy: [{ totalPoints: "desc" }, { createdAt: "asc" }],
      take: 10,
    }),
  ]);

  let previousPoints: number | null = null;
  let previousRank = 0;
  const topRows = topTeams.map((team, index) => {
    const rank = previousPoints === team.totalPoints ? previousRank : index + 1;
    previousPoints = team.totalPoints;
    previousRank = rank;
    return { id: team.id, rank, name: team.name, totalPoints: team.totalPoints };
  });

  return (
    <aside className="fantasy-sidebar">
      <section className="side-box">
        <h3>Гайди</h3>
        <Link href="/rules">Правила турніру</Link>
        <Link href="/guides">Як зібрати команду</Link>
        <Link href="/tournament">Профіль турніру</Link>
      </section>

      <section className="side-box">
        <h3>Збірні</h3>
        <div className="mini-table">
          {teams.map((team) => (
            <div className="mini-row" key={team.id}>
              <span>{team.groupKey ?? "-"}</span>
              <strong className="team-with-flag">
                {team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
                {team.nameUk}
              </strong>
            </div>
          ))}
        </div>
      </section>

      <section className="side-box">
        <h3>Лідери</h3>
        <div className="mini-table">
          {topRows.length > 0 ? (
            topRows.map((row) => (
              <div className="mini-row" key={row.id}>
                <span>{row.rank}</span>
                <strong>{row.name}</strong>
                <em>{row.totalPoints}</em>
              </div>
            ))
          ) : (
            <p className="muted">Рейтинг з'явиться після оновлення admin.</p>
          )}
        </div>
      </section>

      <section className="side-box">
        <h3>Дедлайни</h3>
        <div className="mini-table">
          {gameweeks.map((gameweek) => (
            <div className="mini-fixture" key={gameweek.id}>
              <strong>GW{gameweek.number}</strong>
              <span>
                {gameweek.deadlineAt.toLocaleString("uk-UA", {
                  timeZone: "Europe/Kyiv",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="side-box">
        <h3>Календар</h3>
        <div className="mini-table">
          {fixtures.map((fixture) => (
            <div className="mini-fixture" key={fixture.id}>
              <strong>GW{fixture.gameweek}</strong>
              <span className="fixture-line">
                {fixture.homeTeam.flagPath ? <img alt="" className="flag" src={fixture.homeTeam.flagPath} /> : null}
                {fixture.homeTeam.nameUk} - {fixture.awayTeam.nameUk}
                {fixture.awayTeam.flagPath ? <img alt="" className="flag" src={fixture.awayTeam.flagPath} /> : null}
              </span>
            </div>
          ))}
          {fixtures.length === 0 ? <p className="muted">Матчі ще не створені.</p> : null}
        </div>
      </section>
    </aside>
  );
}

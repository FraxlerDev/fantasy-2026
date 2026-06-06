import Link from "next/link";
import { prisma } from "../lib/prisma";

export async function FantasySidebar() {
  const [nearestGameweek, topTeams] = await Promise.all([
    prisma.gameweek.findFirst({
      where: { deadlineAt: { gt: new Date() } },
      orderBy: { deadlineAt: "asc" },
    }),
    prisma.fantasyTeam.findMany({
      where: { rosterEntries: { some: {} } },
      orderBy: [{ totalPoints: "desc" }, { createdAt: "asc" }],
      take: 5,
    }),
  ]);

  let previousPoints: number | null = null;
  let previousRank = 0;
  const topRows = topTeams.map((team, index) => {
    const rank = previousPoints === team.totalPoints ? previousRank : index + 1;
    previousPoints = team.totalPoints;
    previousRank = rank;
    return { ...team, rank };
  });

  return (
    <aside className="fantasy-sidebar">
      <section className="side-box">
        <h3>Найближчий дедлайн</h3>
        {nearestGameweek ? (
          <>
            <div className="sidebar-deadline">
              <strong>GW{nearestGameweek.number}</strong>
              <span>{nearestGameweek.name}</span>
              <time dateTime={nearestGameweek.deadlineAt.toISOString()}>
                {nearestGameweek.deadlineAt.toLocaleString("uk-UA", {
                  timeZone: "Europe/Kyiv",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
            <Link className="side-box-more" href="/tournament">
              Переглянути всі дедлайни
            </Link>
          </>
        ) : (
          <p className="muted">Усі дедлайни турніру вже минули.</p>
        )}
      </section>

      <section className="side-box">
        <h3>TOP-5 команд</h3>
        <div className="mini-table">
          {topRows.map((team) => (
            <Link className="mini-row sidebar-ranking-row" href={`/teams/${team.id}`} key={team.id}>
              <span>{team.rank}</span>
              <strong>{team.name}</strong>
              <em>{team.totalPoints}</em>
            </Link>
          ))}
          {topRows.length === 0 ? <p className="muted">У рейтингу ще немає команд.</p> : null}
        </div>
        <Link className="side-box-more" href="/leaderboard">
          Переглянути весь рейтинг
        </Link>
      </section>
    </aside>
  );
}

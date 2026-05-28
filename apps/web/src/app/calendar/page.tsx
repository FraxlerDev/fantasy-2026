import { AppShell } from "../../components/shell";
import { FantasyLayout } from "../../components/fantasy-layout";
import { prisma } from "../../lib/prisma";

function formatKickoff(date: Date) {
  return date.toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scoreText(fixture: { homeScore: number | null; awayScore: number | null }) {
  if (fixture.homeScore === null || fixture.awayScore === null) return "-";
  return `${fixture.homeScore}:${fixture.awayScore}`;
}

export default async function CalendarPage() {
  const fixtures = await prisma.fixture.findMany({
    include: { homeTeam: true, awayTeam: true },
    orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
  });

  const fixturesByGw = fixtures.reduce<Map<number, typeof fixtures>>((groups, fixture) => {
    groups.set(fixture.gameweek, [...(groups.get(fixture.gameweek) ?? []), fixture]);
    return groups;
  }, new Map());

  return (
    <AppShell active="/calendar">
      <FantasyLayout>
        <section className="panel">
          <p className="eyebrow">Календар</p>
          <h1>Матчі групового етапу</h1>
          <p className="muted">Повний календар матчів з прапорами, турами, часом початку і рахунками.</p>
        </section>

        {[...fixturesByGw.entries()].map(([gameweek, gwFixtures]) => (
          <section className="panel" style={{ marginTop: 16 }} key={gameweek}>
            <h2>GW{gameweek}</h2>
            <table className="table compact-table">
              <thead>
                <tr><th>№ матчу</th><th>Група</th><th>Матч</th><th>Рахунок</th><th>Початок</th></tr>
              </thead>
              <tbody>
                {gwFixtures.map((fixture) => (
                  <tr key={fixture.id}>
                    <td>{fixture.matchNo}</td>
                    <td>{fixture.groupName}</td>
                    <td className="fixture-line">
                      {fixture.homeTeam.flagPath ? <img alt="" className="flag" src={fixture.homeTeam.flagPath} /> : null}
                      {fixture.homeTeam.nameUk} - {fixture.awayTeam.nameUk}
                      {fixture.awayTeam.flagPath ? <img alt="" className="flag" src={fixture.awayTeam.flagPath} /> : null}
                    </td>
                    <td><strong>{scoreText(fixture)}</strong></td>
                    <td>{formatKickoff(fixture.kickoffAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </FantasyLayout>
    </AppShell>
  );
}

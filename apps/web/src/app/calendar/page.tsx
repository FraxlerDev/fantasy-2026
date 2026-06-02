import type { Metadata } from "next";
import { AppShell } from "../../components/shell";
import { FantasyLayout } from "../../components/fantasy-layout";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Календар матчів ЧС-2026",
  description: "Календар матчів ЧС-2026 для fantasy-гри: gameweeks, групи, час початку матчів, рахунки та розклад турів.",
  path: "/calendar",
});

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
          <h1>Матчі чемпіонату світу 2026</h1>
          <p className="muted">
            Повний календар матчів з прапорами, групами, часом початку і рахунками.
          </p>
        </section>

        {[...fixturesByGw.entries()].map(([gameweek, gwFixtures]) => (
          <section className="panel calendar-gw-panel" key={gameweek}>
            <div className="calendar-gw-heading">
              <h2>GW{gameweek}</h2>
              <span>{gwFixtures.length} матчів</span>
            </div>

            <div className="calendar-list">
              {gwFixtures.map((fixture) => (
                <article className="calendar-row" key={fixture.id}>
                  <div className="calendar-number">
                    <span>№</span>
                    <strong>{fixture.matchNo}</strong>
                  </div>

                  <div className="calendar-match">
                    <span className="calendar-group">{fixture.groupName}</span>
                    <div className="calendar-teams">
                      <span className="team-with-flag">
                        {fixture.homeTeam.flagPath ? (
                          <img alt="" className="flag" src={fixture.homeTeam.flagPath} />
                        ) : null}
                        {fixture.homeTeam.nameUk}
                      </span>
                      <span className="calendar-dash">-</span>
                      <span className="team-with-flag">
                        {fixture.awayTeam.flagPath ? (
                          <img alt="" className="flag" src={fixture.awayTeam.flagPath} />
                        ) : null}
                        {fixture.awayTeam.nameUk}
                      </span>
                    </div>
                  </div>

                  <div className="calendar-score">
                    <span>Рахунок</span>
                    <strong>{scoreText(fixture)}</strong>
                  </div>

                  <div className="calendar-time">
                    <span>Початок</span>
                    <strong>{formatKickoff(fixture.kickoffAt)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </FantasyLayout>
    </AppShell>
  );
}

import type { PlayerPosition, RosterSlot } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutosubRulesPopover } from "../../../components/autosub-rules-popover";
import { ShareSquadButton } from "../../../components/share-squad-button";
import { AppShell } from "../../../components/shell";
import { prisma } from "../../../lib/prisma";
import { createMetadata } from "../../../lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PublicTeamPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ gw?: string }>;
};

type LineupEntry = {
  id: string;
  playerId: string;
  slot: RosterSlot;
  benchOrder: number | null;
  isCaptain: boolean;
  player: {
    name: string;
    position: PlayerPosition;
    club: string | null;
    photoUrl: string | null;
    price: { toString(): string };
    status: string;
    unavailableReason: string | null;
    nationalTeam: { nameUk: string; flagPath: string | null };
  };
};

type ScoringEntry = {
  playerId: string;
  slot: RosterSlot;
  isCaptain: boolean;
};

type PlayerGameweekStatus = {
  didPlay: boolean;
  redCard: boolean;
};

type AutoSubstitutionDisplay = {
  fantasyTeamId: string;
  gameweek: number;
  outPlayerId: string;
  inPlayerId: string;
  points: number;
  outPlayer: { name: string };
  inPlayer: { name: string };
};

const formationShapes: Record<string, { DEF: number; MID: number; FWD: number }> = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { DEF: 5, MID: 4, FWD: 1 },
};

const positionLabels: Record<PlayerPosition, string> = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

export async function generateMetadata({ params }: PublicTeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const team = await prisma.fantasyTeam.findUnique({
    where: { id },
    select: {
      name: true,
      totalPoints: true,
      formation: true,
      updatedAt: true,
      user: { select: { username: true } },
    },
  });

  if (!team) {
    return createMetadata({
      title: "Команду не знайдено",
      path: `/teams/${id}`,
      noIndex: true,
    });
  }

  const manager = team.user.username?.trim() || "Користувач";
  const image = `/teams/${id}/opengraph-image?v=${team.updatedAt.getTime()}`;

  return createMetadata({
    title: team.name,
    description: `Фентезі-команда «${team.name}». Менеджер: ${manager}. Очки: ${team.totalPoints}. Схема: ${team.formation}.`,
    path: `/teams/${id}`,
    noIndex: true,
    image,
    imageAlt: `Склад команди ${team.name}`,
    imageWidth: 1200,
    imageHeight: 630,
  });
}

function pitchRows(formation: string): Array<{ position: PlayerPosition; slots: number }> {
  const shape = formationShapes[formation] ?? formationShapes["4-3-3"];
  return [
    { position: "FWD", slots: shape.FWD },
    { position: "MID", slots: shape.MID },
    { position: "DEF", slots: shape.DEF },
    { position: "GK", slots: 1 },
  ];
}

function playerSurname(name: string) {
  return name.trim().split(/\s+/).at(-1) || name.trim();
}

function scoreEntries(entries: ScoringEntry[], points: Map<string, number>, autoSubPoints = 0) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  let total = starters.reduce((sum, entry) => sum + (points.get(entry.playerId) ?? 0), 0);
  const captain = starters.find((entry) => entry.isCaptain);
  if (captain) total += points.get(captain.playerId) ?? 0;
  return total + autoSubPoints;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kyiv",
  }).format(date);
}

function matchupTeam(team: { nameUk: string; flagPath: string | null }, side: "home" | "away") {
  return (
    <span className={`public-matchup-team ${side}`}>
      {side === "away" && team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
      <span>{team.nameUk}</span>
      {side === "home" && team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
    </span>
  );
}

function playerCard(
  entry: LineupEntry,
  points: Map<string, number>,
  statuses: Map<string, PlayerGameweekStatus>,
  autoSubOutIds: Set<string>,
  autoSubInByPlayer: Map<string, AutoSubstitutionDisplay>,
  label = positionLabels[entry.player.position],
  isBench = false,
) {
  const basePoints = points.get(entry.playerId) ?? 0;
  const displayedPoints = entry.isCaptain ? basePoints * 2 : basePoints;
  const matchStatus = statuses.get(entry.playerId);
  const hasResult = statuses.has(entry.playerId);
  const autoSubIn = autoSubInByPlayer.get(entry.playerId);

  return (
    <div
      className={`fantasy-shirt filled public-team-shirt ${isBench ? "public-bench-player" : ""} ${entry.player.status !== "AVAILABLE" ? "unavailable" : ""} ${autoSubOutIds.has(entry.playerId) ? "autosub-out" : ""} ${autoSubIn ? "autosub-in" : ""}`}
      key={entry.id}
    >
      <span className="player-photo-wrap">
        {entry.player.photoUrl ? <img alt="" className="player-photo" src={entry.player.photoUrl} /> : <span className="player-photo placeholder" />}
      </span>
      {hasResult ? (
        <span
          className={`player-photo-points ${entry.isCaptain ? "captain-points" : ""}`}
          title={entry.isCaptain ? `Очки подвоєні за капітанство: ${basePoints} × 2 = ${displayedPoints}` : `${displayedPoints} очок`}
        >
          {displayedPoints}
        </span>
      ) : null}
      {entry.isCaptain ? (
        <span className="captain-points-mark" title={`Капітан. Очки подвоєні: ${basePoints} × 2`}>
          <img alt="" src="/fire.png" />
        </span>
      ) : null}
      {matchStatus && !matchStatus.didPlay ? (
        <span className="match-status-mark did-not-play" title="Не грав у цьому GW — 0 очок">
          <img alt="" src="/not-play.png" />
        </span>
      ) : null}
      {matchStatus?.redCard ? (
        <span className="match-status-mark red-card" title="Червона картка — гравець пропустить наступний тур, його доцільно замінити">
          <img alt="" src="/red-card.png" />
        </span>
      ) : null}
      {autoSubIn ? (
        <span className="autosub-mark" title={`Автозаміна: +${autoSubIn.points} очок`}>↔</span>
      ) : null}
      <span className="lineup-player-label" title={entry.player.name}>
        <strong>{playerSurname(entry.player.name)}</strong>
        <span className="player-price-badge">${Number(entry.player.price).toFixed(1)}</span>
      </span>
      <em className="lineup-player-meta">
        {entry.player.nationalTeam.flagPath ? <img alt="" className="flag" src={entry.player.nationalTeam.flagPath} /> : null}
        <span>{label}</span>
      </em>
      {autoSubIn ? <small className="autosub-credit">+{autoSubIn.points} оч.</small> : null}
      {entry.player.status !== "AVAILABLE" ? <span className="unavailable-mark">НД</span> : null}
    </div>
  );
}

export default async function PublicTeamPage({ params, searchParams }: PublicTeamPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const now = new Date();

  const team = await prisma.fantasyTeam.findUnique({
    where: { id },
    include: {
      user: true,
      rosterEntries: {
        include: { player: { include: { nationalTeam: true } } },
        orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
      },
      lineupSnapshots: {
        include: {
          entries: {
            include: { player: { include: { nationalTeam: true } } },
            orderBy: [{ slot: "asc" }, { benchOrder: "asc" }],
          },
        },
        orderBy: { gameweek: "asc" },
      },
    },
  });

  if (!team) notFound();

  const [fixtures, gameweeks, rankedTeams, autoSubstitutions, autoSubstitutionSettings] = await Promise.all([
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true, playerPoints: true },
      orderBy: [{ gameweek: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    prisma.fantasyTeam.findMany({
      where: { rosterEntries: { some: {} } },
      select: {
        id: true,
        name: true,
        lineupSnapshots: {
          select: {
            gameweek: true,
            entries: { select: { playerId: true, slot: true, isCaptain: true } },
          },
        },
      },
    }),
    prisma.autoSubstitution.findMany({
      include: {
        outPlayer: { select: { name: true } },
        inPlayer: { select: { name: true } },
      },
    }),
    prisma.systemSetting.findMany({
      where: { key: { startsWith: "autoSubstitutionsCalculated:" } },
    }),
  ]);

  const currentGameweek =
    [...gameweeks].reverse().find((gameweek) => gameweek.startAt <= now) ??
    gameweeks[0];
  const requestedMode = query?.gw === "overall" ? "overall" : "gameweek";
  const parsedGameweek = Number(query?.gw);
  const requestedGameweek =
    requestedMode === "overall"
      ? currentGameweek?.number ?? 1
      : Number.isInteger(parsedGameweek) && parsedGameweek >= 1 && parsedGameweek <= 7
        ? parsedGameweek
        : currentGameweek?.number ?? 1;
  const selectedGameweek = gameweeks.find((gameweek) => gameweek.number === requestedGameweek);
  const selectedSnapshot = team.lineupSnapshots.find((snapshot) => snapshot.gameweek === requestedGameweek);
  const deadlinePassed = selectedGameweek ? selectedGameweek.deadlineAt <= now : false;
  const isOverall = requestedMode === "overall";
  const isPreview = !isOverall && !selectedSnapshot && !deadlinePassed;
  const didNotParticipate = !isOverall && !selectedSnapshot && deadlinePassed;
  const currentFormation = isOverall
    ? team.formation
    : selectedSnapshot?.formation ?? (isPreview ? team.formation : "-");
  const currentEntries = (
    isOverall
      ? team.rosterEntries
      : selectedSnapshot?.entries ?? (isPreview ? team.rosterEntries : [])
  ) as LineupEntry[];
  const starters = currentEntries.filter((entry) => entry.slot === "STARTER");
  const bench = currentEntries
    .filter((entry) => entry.slot === "BENCH")
    .sort((a, b) => (a.benchOrder ?? 99) - (b.benchOrder ?? 99));

  const pointsByGameweek = new Map<number, Map<string, number>>();
  const statusesByGameweek = new Map<number, Map<string, PlayerGameweekStatus>>();
  const scoredFixturesByGameweek = new Map<number, number>();

  for (const fixture of fixtures) {
    const pointMap = pointsByGameweek.get(fixture.gameweek) ?? new Map<string, number>();
    const statusMap = statusesByGameweek.get(fixture.gameweek) ?? new Map<string, PlayerGameweekStatus>();
    if (fixture.playerPoints.length > 0) {
      scoredFixturesByGameweek.set(fixture.gameweek, (scoredFixturesByGameweek.get(fixture.gameweek) ?? 0) + 1);
    }
    for (const point of fixture.playerPoints) {
      pointMap.set(point.playerId, (pointMap.get(point.playerId) ?? 0) + point.points);
      const currentStatus = statusMap.get(point.playerId);
      statusMap.set(point.playerId, {
        didPlay: Boolean(currentStatus?.didPlay || point.didPlay),
        redCard: Boolean(currentStatus?.redCard || point.redCard),
      });
    }
    pointsByGameweek.set(fixture.gameweek, pointMap);
    statusesByGameweek.set(fixture.gameweek, statusMap);
  }

  const autoSubPointsByTeamGameweek = new Map<string, number>();
  for (const autoSubstitution of autoSubstitutions) {
    const key = `${autoSubstitution.fantasyTeamId}:${autoSubstitution.gameweek}`;
    autoSubPointsByTeamGameweek.set(key, (autoSubPointsByTeamGameweek.get(key) ?? 0) + autoSubstitution.points);
  }
  const selectedAutoSubstitutions = autoSubstitutions.filter(
    (item) => item.fantasyTeamId === team.id && item.gameweek === requestedGameweek,
  ) as AutoSubstitutionDisplay[];
  const selectedAutoSubPoints = selectedAutoSubstitutions.reduce((sum, item) => sum + item.points, 0);
  const selectedAutoSubOutIds = new Set(selectedAutoSubstitutions.map((item) => item.outPlayerId));
  const selectedAutoSubInByPlayer = new Map(selectedAutoSubstitutions.map((item) => [item.inPlayerId, item]));
  const autoSubstitutionCalculatedGameweeks = new Set(
    autoSubstitutionSettings
      .map((setting) => Number(setting.key.replace("autoSubstitutionsCalculated:GW", "")))
      .filter((gameweek) => Number.isFinite(gameweek)),
  );
  for (const autoSubstitution of autoSubstitutions) {
    autoSubstitutionCalculatedGameweeks.add(autoSubstitution.gameweek);
  }
  const selectedAutoSubstitutionsCalculated = autoSubstitutionCalculatedGameweeks.has(requestedGameweek);

  const teamPointsByGameweek = new Map<number, number>();
  for (const snapshot of team.lineupSnapshots) {
    teamPointsByGameweek.set(
      snapshot.gameweek,
      scoreEntries(
        snapshot.entries as ScoringEntry[],
        pointsByGameweek.get(snapshot.gameweek) ?? new Map(),
        autoSubPointsByTeamGameweek.get(`${team.id}:${snapshot.gameweek}`) ?? 0,
      ),
    );
  }

  const rankDataByGameweek = new Map<number, { gameweekRank: number | null; cumulativeRank: number | null }>();
  for (const gameweek of gameweeks) {
    const participants = rankedTeams
      .map((rankedTeam) => {
        const snapshot = rankedTeam.lineupSnapshots.find((item) => item.gameweek === gameweek.number);
        if (!snapshot) return null;
        const gameweekPoints = scoreEntries(
          snapshot.entries as ScoringEntry[],
          pointsByGameweek.get(gameweek.number) ?? new Map(),
          autoSubPointsByTeamGameweek.get(`${rankedTeam.id}:${gameweek.number}`) ?? 0,
        );
        const cumulativePoints = rankedTeam.lineupSnapshots
          .filter((item) => item.gameweek <= gameweek.number)
          .reduce(
            (sum, item) =>
              sum + scoreEntries(
                item.entries as ScoringEntry[],
                pointsByGameweek.get(item.gameweek) ?? new Map(),
                autoSubPointsByTeamGameweek.get(`${rankedTeam.id}:${item.gameweek}`) ?? 0,
              ),
            0,
          );
        return { id: rankedTeam.id, name: rankedTeam.name, gameweekPoints, cumulativePoints };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const gameweekOrder = [...participants].sort(
      (a, b) => b.gameweekPoints - a.gameweekPoints || a.name.localeCompare(b.name, "uk"),
    );
    const cumulativeOrder = [...participants].sort(
      (a, b) => b.cumulativePoints - a.cumulativePoints || a.name.localeCompare(b.name, "uk"),
    );
    rankDataByGameweek.set(gameweek.number, {
      gameweekRank: gameweekOrder.findIndex((item) => item.id === team.id) + 1 || null,
      cumulativeRank: cumulativeOrder.findIndex((item) => item.id === team.id) + 1 || null,
    });
  }

  const selectedPoints = pointsByGameweek.get(requestedGameweek) ?? new Map<string, number>();
  const selectedStatuses = statusesByGameweek.get(requestedGameweek) ?? new Map<string, PlayerGameweekStatus>();
  const selectedGwPoints = selectedSnapshot ? teamPointsByGameweek.get(requestedGameweek) ?? 0 : null;
  const selectedStarterPoints = selectedSnapshot
    ? scoreEntries(selectedSnapshot.entries as ScoringEntry[], selectedPoints, 0)
    : null;
  const cumulativePoints = [...teamPointsByGameweek.entries()]
    .filter(([gameweek]) => gameweek <= requestedGameweek)
    .reduce((sum, [, points]) => sum + points, 0);
  const selectedRanks = rankDataByGameweek.get(requestedGameweek);
  const selectedFixtures = fixtures.filter((fixture) => fixture.gameweek === requestedGameweek);
  const allFixturesScored =
    selectedFixtures.length > 0 &&
    (scoredFixturesByGameweek.get(requestedGameweek) ?? 0) === selectedFixtures.length;
  const selectedStatus = isOverall
    ? "Поточний склад"
    : didNotParticipate
      ? "Не брала участі"
      : isPreview
        ? "Попередній склад"
        : allFixturesScored
          ? "Очки підраховано"
          : "Склад зафіксовано";

  const gameweekRows = gameweeks.map((gameweek) => {
    const snapshot = team.lineupSnapshots.find((item) => item.gameweek === gameweek.number);
    const hasEnteredPoints = (scoredFixturesByGameweek.get(gameweek.number) ?? 0) > 0;
    return {
      gameweek: gameweek.number,
      points: snapshot && hasEnteredPoints ? teamPointsByGameweek.get(gameweek.number) ?? 0 : null,
      status: snapshot
        ? hasEnteredPoints
          ? "Очки нараховуються"
          : "Склад зафіксовано"
        : gameweek.deadlineAt > now
          ? "Очікується"
          : "Не брала участі",
    };
  });

  const selectedTeamCodes = new Set(currentEntries.map((entry) => entry.player.nationalTeam.nameUk));
  const currentFixtures = selectedFixtures
    .filter((fixture) => selectedTeamCodes.has(fixture.homeTeam.nameUk) || selectedTeamCodes.has(fixture.awayTeam.nameUk))
    .slice(0, 18);
  const overallOrder = rankedTeams
    .map((rankedTeam) => ({
      id: rankedTeam.id,
      name: rankedTeam.name,
      points: rankedTeam.lineupSnapshots.reduce(
        (sum, item) =>
          sum + scoreEntries(
            item.entries as ScoringEntry[],
            pointsByGameweek.get(item.gameweek) ?? new Map(),
            autoSubPointsByTeamGameweek.get(`${rankedTeam.id}:${item.gameweek}`) ?? 0,
          ),
        0,
      ),
    }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, "uk"));
  const overallRankIndex = overallOrder.findIndex((item) => item.id === team.id);
  const overallRank = overallRankIndex >= 0 ? overallRankIndex + 1 : null;

  return (
    <AppShell active="/leaderboard">
      <>
        <section className="public-team-main">
          <div className="panel public-team-lineup-panel">
            <div className="public-team-section-heading">
              <h2>{isOverall ? "Поточний склад" : `Склад GW${requestedGameweek}`}</h2>
              <span>Схема: <strong>{currentFormation}</strong></span>
            </div>
            {currentEntries.length > 0 ? (
              <div className="football-lineup-board public-football-lineup-board">
                <div className="fixed-pitch public-fixed-pitch">
                  {pitchRows(currentFormation).map((row) => {
                    const rowPlayers = starters.filter((entry) => entry.player.position === row.position);
                    return (
                      <div className={`fixed-pitch-row slots-${row.slots}`} key={row.position}>
                        {Array.from({ length: row.slots }, (_, index) => {
                          const entry = rowPlayers[index];
                          return entry
                            ? playerCard(entry, selectedPoints, selectedStatuses, selectedAutoSubOutIds, selectedAutoSubInByPlayer)
                            : <div className="fantasy-shirt empty public-empty-slot" key={`${row.position}-${index}`} />;
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="fixed-bench public-fixed-bench">
                  {Array.from({ length: 4 }, (_, index) => {
                    const entry = bench[index];
                    return entry
                      ? playerCard(entry, selectedPoints, selectedStatuses, selectedAutoSubOutIds, selectedAutoSubInByPlayer, positionLabels[entry.player.position], true)
                      : <div className="fantasy-shirt empty public-empty-slot" key={`bench-${index}`} />;
                  })}
                </div>
              </div>
            ) : (
              <div className="snapshot-no-participation">
                {didNotParticipate
                  ? `Команда не брала участі в GW${requestedGameweek}.`
                  : "Склад команди ще не збережено."}
              </div>
            )}
          </div>

          <section className="team-header panel public-team-header">
            <div>
              <p className="eyebrow">Фентезі команда</p>
              <h1>{team.name}</h1>
              <p className="muted">Менеджер: {team.user.username?.trim() || "Користувач"}</p>
            </div>
            <ShareSquadButton teamId={team.id} version={team.updatedAt.getTime()} />
          </section>

          <nav className="gameweek-switcher public-gameweek-switcher" aria-label="Історія складу за турами">
            <Link className={isOverall ? "active" : ""} href={`/teams/${team.id}?gw=overall`} scroll={false}>
              Загалом
            </Link>
            {gameweeks.map((gameweek) => (
              <Link
                className={!isOverall && requestedGameweek === gameweek.number ? "active" : ""}
                href={`/teams/${team.id}?gw=${gameweek.number}`}
                key={gameweek.id}
                scroll={false}
              >
                GW{gameweek.number}
              </Link>
            ))}
          </nav>

          <div className={`public-team-status status-${selectedStatus === "Не брала участі" ? "error" : "ok"}`}>
            <strong>{selectedStatus}</strong>
            {!isOverall && selectedGameweek ? (
              <span>
                {deadlinePassed ? `Дедлайн: ${formatDate(selectedGameweek.deadlineAt)}` : `До дедлайну ${formatDate(selectedGameweek.deadlineAt)}`}
              </span>
            ) : (
              <span>Відображено останній збережений склад команди</span>
            )}
          </div>

          <aside className="panel public-team-points-panel">
            <p className="eyebrow">{isOverall ? "Загальний результат" : `Результат GW${requestedGameweek}`}</p>
            <h2>{isOverall ? "Очки команди" : "Очки та місця"}</h2>
            <div className="public-team-point-grid">
              {isOverall ? (
                <>
                  <div><span>Всього очок</span><strong>{team.totalPoints}</strong></div>
                  <div><span>Поточне місце</span><strong>{overallRank ?? "—"}</strong></div>
                  <div><span>Поточний тур</span><strong>GW{currentGameweek?.number ?? 1}</strong></div>
                  <div><span>Схема</span><strong>{team.formation}</strong></div>
                </>
              ) : (
                <>
                  <div><span>Очки за GW{requestedGameweek}</span><strong>{selectedGwPoints ?? "—"}</strong></div>
                  <div><span>Очки загалом</span><strong>{selectedSnapshot ? cumulativePoints : "—"}</strong></div>
                  <div><span>Місце після GW{requestedGameweek}</span><strong>{selectedSnapshot ? selectedRanks?.cumulativeRank ?? "—" : "—"}</strong></div>
                  <div><span>Поточне місце</span><strong>{overallRank ?? "—"}</strong></div>
                </>
              )}
            </div>
            {!isOverall ? (
              <div className="autosub-result-row">
                <div className="autosub-result-values">
                  <span>Старт: <strong>{selectedStarterPoints ?? "—"}</strong></span>
                  <span>Автозаміни: <strong>+{selectedAutoSubPoints}</strong></span>
                  <span>Разом: <strong>{selectedGwPoints ?? "—"}</strong></span>
                </div>
                <div className="autosub-result-info">
                  <AutosubRulesPopover />
                  {selectedAutoSubstitutions.length > 0 ? (
                    <ul className="autosub-result-list">
                      {selectedAutoSubstitutions.map((item) => (
                        <li key={`${item.outPlayerId}-${item.inPlayerId}`}>
                          <span>{item.outPlayer.name} («Не грав»)</span>
                          <strong>→</strong>
                          <span>{item.inPlayer.name} (+{item.points} оч.)</span>
                        </li>
                      ))}
                    </ul>
                  ) : selectedAutoSubstitutionsCalculated ? (
                    <p>Автозамін в GW{requestedGameweek} не було</p>
                  ) : (
                    <p>Очки з автозамін будуть додані по завершенню GW{requestedGameweek}</p>
                  )}
                </div>
              </div>
            ) : null}
          </aside>

          <section className="panel public-team-history">
            <div className="public-team-section-heading">
              <h2>Очки за турами</h2>
              <span>Лавка не входить у підсумок GW</span>
            </div>
            <div className="public-team-history-grid">
              <Link
                className={isOverall ? "active" : ""}
                href={`/teams/${team.id}?gw=overall`}
                scroll={false}
              >
                <span>Загалом</span>
                <strong>{team.totalPoints}</strong>
                <small>Поточне місце: {overallRank ?? "—"}</small>
              </Link>
              {gameweekRows.map((row) => (
                <Link
                  className={!isOverall && requestedGameweek === row.gameweek ? "active" : ""}
                  href={`/teams/${team.id}?gw=${row.gameweek}`}
                  key={row.gameweek}
                  scroll={false}
                >
                  <span>GW{row.gameweek}</span>
                  <strong>{row.points ?? "—"}</strong>
                  <small>{row.status}</small>
                </Link>
              ))}
            </div>
          </section>
        </section>

        <section className="panel public-team-fixtures">
          <h2>Матчі гравців</h2>
          <table className="table compact-table">
            <thead><tr><th>GW</th><th>Матч</th><th>Статус</th></tr></thead>
            <tbody>
              {currentFixtures.map((fixture) => (
                <tr key={fixture.id}>
                  <td>GW{fixture.gameweek}</td>
                  <td>
                    <div className="public-matchup">
                      {matchupTeam(fixture.homeTeam, "home")}
                      <span className="public-matchup-separator">–</span>
                      {matchupTeam(fixture.awayTeam, "away")}
                    </div>
                  </td>
                  <td>{fixture.homeScore === null ? "Очікується" : `${fixture.homeScore}:${fixture.awayScore}`}</td>
                </tr>
              ))}
              {currentFixtures.length === 0 ? <tr><td colSpan={3}>Матчів для вибраних гравців ще немає.</td></tr> : null}
            </tbody>
          </table>
        </section>
      </>
    </AppShell>
  );
}

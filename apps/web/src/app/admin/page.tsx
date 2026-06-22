import type { Metadata } from "next";
import {
  BarChart3,
  Calculator,
  CalendarClock,
  CirclePlus,
  Goal,
  ListChecks,
  RotateCcw,
  Save,
  Trophy,
  Upload,
  UserRoundCog,
  Users,
  Wrench,
} from "lucide-react";
import { AdminPlayerImport } from "../../components/admin-player-import";
import { AdminPlayerActions } from "../../components/admin-player-actions";
import { AdminPlayerPointInputs } from "../../components/admin-player-point-inputs";
import { DeleteNationalTeamPlayersButton } from "../../components/delete-national-team-players-button";
import { DeletePlayoffFixtureButton } from "../../components/delete-playoff-fixture-button";
import { PlayoffParticipantForm } from "../../components/playoff-participant-form";
import { ResetFixturePointsButton } from "../../components/reset-fixture-points-button";
import { AppShell } from "../../components/shell";
import { SnapshotSubmitButton } from "../../components/snapshot-submit-button";
import { TransferWindowButton } from "../../components/transfer-window-button";
import { requireAdmin } from "../../lib/admin";
import { ensureDefaultGameweeks } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";
import { buildAllGroupStandings, ensurePlayoffMatches, resolvePlayoffMatches } from "../../lib/tournament";
import {
  calculateAutoSubstitutionsAction,
  createFixture,
  refreshRankingsAction,
  resetAutoSubstitutionsAction,
  resetFixtureScore,
  saveFixturePoints,
  saveFixtureScore,
  setMaintenanceModeAction,
  updateTournamentTiebreaks,
  updatePlayerPrice,
} from "../actions/admin-actions";

export const metadata: Metadata = createMetadata({
  title: "Адмінка",
  path: "/admin",
  noIndex: true,
});

type TeamLabel = { nameUk: string; flagPath: string | null };
type FixtureListItem = {
  id: string;
  matchNo: number | null;
  gameweek: number;
  groupName: string | null;
  homeScore: number | null;
  awayScore: number | null;
  homeTeam: TeamLabel;
  awayTeam: TeamLabel;
};
function teamLabel(team: TeamLabel) {
  return (
    <span className="team-with-flag">
      {team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
      {team.nameUk}
    </span>
  );
}

function scoreLabel(fixture: Pick<FixtureListItem, "homeScore" | "awayScore">) {
  if (fixture.homeScore === null || fixture.awayScore === null) return "не зіграно";
  return `${fixture.homeScore}:${fixture.awayScore}`;
}

function groupFixtures(fixtures: FixtureListItem[]) {
  return fixtures.reduce<Map<string, FixtureListItem[]>>((groups, fixture) => {
    const key = fixture.groupName ?? "Без групи";
    groups.set(key, [...(groups.get(key) ?? []), fixture]);
    return groups;
  }, new Map());
}

function transferWindowLabel(gameweek: { transfersOpen: boolean; transferWindowStatus: string; deadlineAt: Date }) {
  if (gameweek.deadlineAt <= new Date() || gameweek.transferWindowStatus === "CLOSED_DEADLINE") return "Закриті дедлайном";
  if (gameweek.transfersOpen) return "Відкриті вручну";
  if (gameweek.transferWindowStatus === "CLOSED_MANUAL") return "Закриті вручну";
  return "Очікують відкриття";
}

function positionLabel(position: string) {
  if (position === "GK") return "Воротар";
  if (position === "DEF") return "Захисник";
  if (position === "MID") return "Півзахисник";
  if (position === "FWD") return "Нападник";
  return position;
}

function rosterDiagnostics(team: {
  formation: string;
  rosterEntries: Array<{
    slot: string;
    isCaptain: boolean;
    player: {
      position: string;
      price: unknown;
      nationalTeam: { nameUk: string };
    };
  }>;
}) {
  const total = team.rosterEntries.length;
  const starters = team.rosterEntries.filter((entry) => entry.slot === "STARTER");
  const budget = team.rosterEntries.reduce((sum, entry) => sum + Number(entry.player.price), 0);
  const counts = {
    GK: team.rosterEntries.filter((entry) => entry.player.position === "GK").length,
    DEF: team.rosterEntries.filter((entry) => entry.player.position === "DEF").length,
    MID: team.rosterEntries.filter((entry) => entry.player.position === "MID").length,
    FWD: team.rosterEntries.filter((entry) => entry.player.position === "FWD").length,
  };
  const starterCounts = {
    GK: starters.filter((entry) => entry.player.position === "GK").length,
    DEF: starters.filter((entry) => entry.player.position === "DEF").length,
    MID: starters.filter((entry) => entry.player.position === "MID").length,
    FWD: starters.filter((entry) => entry.player.position === "FWD").length,
  };
  const nationCounts = team.rosterEntries.reduce<Map<string, number>>((map, entry) => {
    map.set(entry.player.nationalTeam.nameUk, (map.get(entry.player.nationalTeam.nameUk) ?? 0) + 1);
    return map;
  }, new Map());
  const overloadedNations = [...nationCounts.entries()].filter(([, count]) => count > 2);
  const formationParts = team.formation.split("-").map((part) => Number(part));
  const formationOk =
    starterCounts.GK === 1 &&
    starterCounts.DEF === formationParts[0] &&
    starterCounts.MID === formationParts[1] &&
    starterCounts.FWD === formationParts[2];
  const captainOk = starters.some((entry) => entry.isCaptain);

  return [
    { label: "15 гравців у складі", ok: total === 15, value: `${total}/15` },
    { label: "2 GK, 5 DEF, 5 MID, 3 FWD", ok: counts.GK === 2 && counts.DEF === 5 && counts.MID === 5 && counts.FWD === 3, value: `${counts.GK}/${counts.DEF}/${counts.MID}/${counts.FWD}` },
    { label: "Бюджет не більше 100", ok: budget <= 100, value: budget.toFixed(1) },
    { label: "Не більше 2 з однієї збірної", ok: overloadedNations.length === 0, value: overloadedNations.length ? overloadedNations.map(([name, count]) => `${name}: ${count}`).join(", ") : "OK" },
    { label: `Старт відповідає схемі ${team.formation}`, ok: formationOk, value: `${starterCounts.DEF}-${starterCounts.MID}-${starterCounts.FWD}` },
    { label: "Капітан обраний зі старту", ok: captainOk, value: captainOk ? "OK" : "Немає" },
  ];
}

const errorMessages: Record<string, string> = {
  fixture: "Не вдалося створити матч. Перевір номер, дату і збірні.",
  price: "Ціна гравця має бути більшою за 0.",
  "players-csv": "CSV порожній або має неправильний формат.",
  score: "Рахунок матчу має містити цілі невід'ємні числа.",
  "player-in-use": "Гравець уже є у складах користувачів, тому його не можна видалити.",
  "player-delete": "Не вдалося видалити гравця.",
};

errorMessages["team-players-in-use"] = "Склад цієї збірної вже використовується у складах користувачів або snapshot-ах. Видалення заблоковано.";
errorMessages["team-players-delete"] = "Не вдалося видалити склад збірної.";
errorMessages.gameweek = "Не вдалося визначити GW.";
errorMessages["open-gameweek"] = "Не вдалося відкрити трансфери: дедлайн цього GW уже закритий або GW не існує.";
errorMessages["close-gameweek"] = "Не вдалося закрити трансфери для цього GW.";
errorMessages["playoff-score"] = "Для нічиєї після додаткового часу потрібно ввести різний рахунок серії пенальті.";
errorMessages["playoff-participants"] = "Не вдалося зберегти учасників матчу 1/16. Перевір обрані збірні.";
errorMessages["playoff-team-duplicate"] = "Ця збірна вже призначена в іншому матчі 1/16 фіналу.";
errorMessages["playoff-fixture-in-use"] = "Матч або залежний раунд уже має введені очки футболістів. Спочатку скинь ці очки.";
errorMessages["playoff-fixture-delete"] = "Цей матч не можна видалити як матч 1/16 фіналу.";
errorMessages.tiebreak = "Перевір дисциплінарні очки та місце збірної у рейтингу FIFA.";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{
    fixtureId?: string;
    gw?: string;
    error?: string;
    points?: string;
    rankings?: string;
    score?: string;
    players?: string;
    teamPlayers?: string;
    count?: string;
    snapshots?: string;
    snapshotFailed?: string;
    snapshotFinalized?: string;
    openedGw?: string;
    closedGw?: string;
    playoffId?: string;
    playoffScore?: string;
    playoffTeams?: string;
    tiebreak?: string;
  }>;
}) {
  try {
    await requireAdmin();
  } catch {
    return (
      <AppShell active="/admin">
        <section className="auth-layout">
          <div className="panel auth-card">
            <p className="eyebrow">Admin</p>
            <h1>Потрібен admin-доступ</h1>
            <p className="muted">Admin email задається через `ADMIN_EMAIL`.</p>
          </div>
        </section>
      </AppShell>
    );
  }

  await Promise.all([ensureDefaultGameweeks(), ensurePlayoffMatches()]);

  const params = await searchParams;
  const selectedGameweek = params?.gw ? Number(params.gw) : undefined;
  const [teams, players, allFixtures, gameweeks, fantasyTeams, maintenanceSetting] = await Promise.all([
    prisma.nationalTeam.findMany({ orderBy: [{ groupKey: "asc" }, { nameUk: "asc" }] }),
    prisma.player.findMany({
      include: { nationalTeam: true },
      orderBy: [{ nationalTeam: { nameUk: "asc" } }, { position: "asc" }, { name: "asc" }],
    }),
    prisma.fixture.findMany({
      include: { homeTeam: true, awayTeam: true },
      orderBy: [{ gameweek: "asc" }, { groupName: "asc" }, { kickoffAt: "asc" }, { matchNo: "asc" }],
    }),
    prisma.gameweek.findMany({ orderBy: { number: "asc" } }),
    prisma.fantasyTeam.findMany({
      include: {
        user: true,
        rosterEntries: {
          include: {
            player: {
              include: {
                nationalTeam: true,
              },
            },
          },
          orderBy: [{ slot: "desc" }, { player: { position: "asc" } }, { player: { name: "asc" } }],
        },
        lineupSnapshots: { select: { id: true, gameweek: true, createdAt: true, entries: { select: { id: true, playerId: true } } } },
        snapshotFailures: { select: { gameweek: true, reason: true, updatedAt: true } },
      },
      orderBy: [{ createdAt: "asc" }],
    }),
    prisma.systemSetting.findUnique({ where: { key: "maintenanceMode" } }),
  ]);
  const maintenanceEnabled = maintenanceSetting?.value === "on";
  const playoffScores = await prisma.playoffMatch.findMany({ orderBy: { matchNo: "asc" } });
  const tournamentTeams = teams.map((team) => ({
    id: team.id,
    nameUk: team.nameUk,
    groupKey: team.groupKey,
    flagPath: team.flagPath,
    teamConductScore: team.teamConductScore,
    fifaRank: team.fifaRank,
  }));
  const tournamentTeamById = new Map(tournamentTeams.map((team) => [team.id, team]));
  const tournamentFixtures = allFixtures.filter((fixture) => fixture.gameweek <= 3).map((fixture) => ({
    ...fixture,
    homeTeam: tournamentTeamById.get(fixture.homeTeamId)!,
    awayTeam: tournamentTeamById.get(fixture.awayTeamId)!,
  }));
  const tournamentTables = buildAllGroupStandings(tournamentTeams, tournamentFixtures);
  const resolvedPlayoff = resolvePlayoffMatches(tournamentTables, playoffScores);
  const activePlayoffId = params?.playoffId ?? resolvedPlayoff[0]?.id;
  const activePlayoff = resolvedPlayoff.find((match) => match.id === activePlayoffId) ?? resolvedPlayoff[0] ?? null;
  const activePlayoffFixture = activePlayoff
    ? allFixtures.find((fixture) => fixture.playoffMatchId === activePlayoff.id) ?? null
    : null;

  const fixtures = selectedGameweek ? allFixtures.filter((fixture) => fixture.gameweek === selectedGameweek) : allFixtures;
  const activeFixtureId = params?.fixtureId;
  const activeFixture = activeFixtureId
    ? await prisma.fixture.findUnique({
        where: { id: activeFixtureId },
        include: {
          homeTeam: { include: { players: { orderBy: [{ position: "asc" }, { name: "asc" }] } } },
          awayTeam: { include: { players: { orderBy: [{ position: "asc" }, { name: "asc" }] } } },
          playerPoints: true,
        },
      })
    : null;

  const fixturesByGroup = groupFixtures(fixtures);
  const pointMap = new Map(activeFixture?.playerPoints.map((point) => [point.playerId, point]) ?? []);
  const csvPreview = players.slice(0, 5);
  const firstGameweekByTeam = new Map(
    fantasyTeams.map((team) => [
      team.id,
      team.lineupSnapshots.length > 0
        ? Math.min(...team.lineupSnapshots.map((snapshot) => snapshot.gameweek))
        : null,
    ]),
  );
  const snapshotControl = gameweeks.map((gameweek) => {
    const snapshotTeams = fantasyTeams.filter((team) => team.lineupSnapshots.some((snapshot) => snapshot.gameweek === gameweek.number));
    const transferTeams =
      gameweek.transferLimit === null
        ? []
        : fantasyTeams
            .map((team) => {
              const baseSnapshot = team.lineupSnapshots
                .filter((snapshot) => snapshot.gameweek < gameweek.number)
                .sort((a, b) => b.gameweek - a.gameweek)[0];
              if (!baseSnapshot || baseSnapshot.entries.length === 0) return null;
              const baseIds = new Set(baseSnapshot.entries.map((entry) => entry.playerId));
              const used = team.rosterEntries.filter((entry) => !baseIds.has(entry.playerId)).length;
              if (used === 0) return null;
              return {
                id: team.id,
                name: team.name,
                manager: team.user.username ?? team.user.email ?? "Без менеджера",
                used,
                limit: gameweek.transferLimit ?? 0,
                locked: used >= (gameweek.transferLimit ?? 0),
              };
            })
            .filter((team): team is NonNullable<typeof team> => Boolean(team));
    const failedTeams = fantasyTeams
      .map((team) => ({
        id: team.id,
        name: team.name,
        manager: team.user.username ?? team.user.email ?? "Без менеджера",
        formation: team.formation,
        rosterEntries: team.rosterEntries,
        firstGameweek: firstGameweekByTeam.get(team.id) ?? null,
        reason: team.snapshotFailures.find((failure) => failure.gameweek === gameweek.number)?.reason,
      }))
      .filter((team) => team.reason);
    const missingTeams = fantasyTeams
      .filter(
        (team) =>
          team.rosterEntries.length > 0 &&
          !team.lineupSnapshots.some((snapshot) => snapshot.gameweek === gameweek.number) &&
          !team.snapshotFailures.some((failure) => failure.gameweek === gameweek.number),
      )
      .map((team) => ({
        id: team.id,
        name: team.name,
        manager: team.user.username ?? team.user.email ?? "Без менеджера",
        firstGameweek: firstGameweekByTeam.get(team.id) ?? null,
      }));

    return {
      gameweek,
      snapshotCount: snapshotTeams.length,
      failedTeams,
      missingTeams,
      transferTeams,
      readyPercent: fantasyTeams.length ? Math.round((snapshotTeams.length / fantasyTeams.length) * 100) : 0,
    };
  });
  const playersByGroup = teams.reduce<Map<string, typeof teams[number][]>>((groups, team) => {
    const key = team.groupKey ? `Група ${team.groupKey}` : "Без групи";
    groups.set(key, [...(groups.get(key) ?? []), team]);
    return groups;
  }, new Map());

  const teamsWithRoster = fantasyTeams.filter((team) => team.rosterEntries.length > 0);

  return (
    <AppShell active="/admin">
      <div className="topbar admin-heading" id="admin-top">
        <div>
          <p className="eyebrow">Панель керування</p>
          <h1>Адмінка Фентезі</h1>
          <p className="muted">Турнір, склади, результати та системні інструменти в одному місці.</p>
        </div>
        <div className="toolbar">
          <a className="button" href="/admin/statistics">
            <BarChart3 size={18} />
            Статистика
          </a>
          <form action={refreshRankingsAction}>
            <button className="button primary" type="submit">
              <Trophy size={18} />
              Оновити рейтинги
            </button>
          </form>
        </div>
      </div>

      <nav className="admin-navigation" aria-label="Навігація адмінкою">
        <div className="admin-nav-group">
          <span>Турнір</span>
          <a href="#gameweeks"><CalendarClock size={16} />GW і snapshot</a>
          <a href="#matches"><CirclePlus size={16} />Створити матч</a>
          <a href="#points"><Goal size={16} />Рахунки й очки</a>
          <a href="#playoff-scores"><Trophy size={16} />Плей-оф</a>
        </div>
        <div className="admin-nav-group">
          <span>Гравці</span>
          <a href="#players"><Upload size={16} />Імпорт</a>
          <a href="#player-price"><Calculator size={16} />Ціни</a>
          <a href="#players-list"><UserRoundCog size={16} />Редагування</a>
        </div>
        <div className="admin-nav-group">
          <span>Система</span>
          <a href="#rankings"><ListChecks size={16} />Рейтинги</a>
          <a href="/admin/statistics"><BarChart3 size={16} />Відвідування</a>
        </div>
      </nav>

      {params?.error ? <div className="form-error">Помилка: {errorMessages[params.error] ?? params.error}</div> : null}
      {params?.points || params?.rankings || params?.score || params?.players || params?.teamPlayers ? (
        <div className="form-success">
          {params?.points === "reset" ? "Очки матчу скинуто." : "Зміни збережено."}
          {params?.players ? ` Імпортовано рядків: ${params.count ?? "0"}.` : ""}
        </div>
      ) : null}
      {params?.snapshots || params?.openedGw || params?.closedGw ? (
        <div className="form-success">
          {params.openedGw
            ? `Трансфери відкрито для GW${params.openedGw}.`
            : params.closedGw
              ? `Трансфери закрито для GW${params.closedGw}. Snapshot залишився без змін.`
            : `Snapshot оновлено: ${params.snapshots ?? "0"}, невалідних складів: ${params.snapshotFailed ?? "0"}. ${params.snapshotFinalized === "1" ? "Фінальний snapshot зафіксовано." : "Це попередній snapshot; трансфери залишаються відкритими."}`}
        </div>
      ) : null}

      <section className="admin-overview" aria-label="Огляд даних">
        <a href="#gameweeks">
          <CalendarClock size={20} />
          <span>Ігрові тижні</span>
          <strong>{gameweeks.length}</strong>
          <small>дедлайни та snapshot</small>
        </a>
        <a href="#matches">
          <Goal size={20} />
          <span>Матчі</span>
          <strong>{allFixtures.length}</strong>
          <small>груповий етап</small>
        </a>
        <a href="#players-list">
          <Users size={20} />
          <span>Гравці</span>
          <strong>{players.length}</strong>
          <small>{teams.length} збірних</small>
        </a>
        <a href="#gameweeks">
          <ListChecks size={20} />
          <span>Фентезі-команди</span>
          <strong>{fantasyTeams.length}</strong>
          <small>{teamsWithRoster.length} зі складом</small>
        </a>
      </section>

      <section className="panel" id="gameweeks" style={{ marginBottom: 16 }}>
        <h2>Gameweeks, дедлайни і трансфери</h2>
        <p className="muted">До дедлайну snapshot можна оновлювати вручну необмежену кількість разів. У момент дедлайну система примусово перезаписує його поточними складами та фіксує як фінальний. Ручне відкриття або закриття трансферів snapshot не змінює.</p>
        <table className="table compact-table">
          <thead>
            <tr>
              <th>GW</th>
              <th>Етап</th>
              <th>Старт</th>
              <th>Дедлайн</th>
              <th>Трансфери</th>
              <th>Статус</th>
              <th>Snapshot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gameweeks.map((gameweek) => (
              <tr key={gameweek.id}>
                <td><strong>GW{gameweek.number}</strong></td>
                <td>{gameweek.stage ?? gameweek.name}</td>
                <td>{gameweek.startAt.toLocaleString("uk-UA", { timeZone: "Europe/Kyiv", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                <td>{gameweek.deadlineAt.toLocaleString("uk-UA", { timeZone: "Europe/Kyiv", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                <td>{gameweek.transferLimit === null ? "unlimited" : gameweek.transferLimit}</td>
                <td>{transferWindowLabel(gameweek)}</td>
                <td>
                  {gameweek.snapshotsCreatedAt ? (
                    <span>
                      <strong>{gameweek.snapshotsFinalizedAt ? "Фінальний" : "Попередній"}</strong>
                      <br />
                      <small>
                        {gameweek.snapshotsCreatedAt.toLocaleString("uk-UA", {
                          timeZone: "Europe/Kyiv",
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </span>
                  ) : "-"}
                </td>
                <td>
                  <div className="toolbar">
                    <SnapshotSubmitButton
                      gameweek={gameweek.number}
                      label={
                        gameweek.deadlineAt <= new Date()
                          ? "Перезаписати фінальний snapshot"
                          : gameweek.snapshotsCreatedAt
                            ? "Оновити snapshot"
                            : "Snapshot"
                      }
                      confirmMessage={
                        gameweek.deadlineAt <= new Date()
                          ? `Перезаписати фінальний snapshot GW${gameweek.number} поточними складами? Попередні фінальні знімки буде замінено.`
                          : `Snapshot GW${gameweek.number} буде оновлено поточними складами. Стан трансферів не зміниться. Продовжити?`
                      }
                    />
                    <TransferWindowButton
                      gameweek={gameweek.number}
                      mode={gameweek.transfersOpen ? "close" : "open"}
                      disabled={!gameweek.transfersOpen && gameweek.deadlineAt <= new Date()}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="admin-snapshot-control">
          {snapshotControl.map((item) => (
            <details className="admin-snapshot-card" key={item.gameweek.id}>
              <summary>
                <span>
                  <strong>GW{item.gameweek.number}</strong> {item.gameweek.stage ?? item.gameweek.name}
                </span>
                <span className="badge">
                  {item.snapshotCount}/{fantasyTeams.length} snapshot · {item.readyPercent}%
                </span>
                {item.failedTeams.length > 0 ? <span className="badge danger-badge">{item.failedTeams.length} невалідних</span> : null}
                {item.missingTeams.length > 0 ? <span className="badge warning-badge">{item.missingTeams.length} без знімка</span> : null}
              </summary>

              <div className="snapshot-metrics">
                <div className="card stat"><span className="badge">Команд всього</span><strong>{fantasyTeams.length}</strong></div>
                <div className="card stat"><span className="badge">Snapshot</span><strong>{item.snapshotCount}</strong></div>
                <div className="card stat"><span className="badge">Невалідні</span><strong>{item.failedTeams.length}</strong></div>
                <div className="card stat"><span className="badge">Без знімка</span><strong>{item.missingTeams.length}</strong></div>
                <div className="card stat"><span className="badge">Трансфери</span><strong>{item.transferTeams.length}</strong></div>
              </div>

              {item.transferTeams.length > 0 ? (
                <div className="snapshot-list">
                  <h3>Використані трансфери GW{item.gameweek.number}</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Команда</th><th>Менеджер</th><th>Використано</th><th>Статус</th></tr></thead>
                    <tbody>
                      {item.transferTeams.map((team) => (
                        <tr key={team.id}>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.name}</a></td>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.manager}</a></td>
                          <td>{team.used}/{team.limit}</td>
                          <td>{team.locked ? "Ліміт використано" : "Ще можна робити трансфери"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {item.failedTeams.length > 0 ? (
                <div className="snapshot-list">
                  <h3>Невалідні склади</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Команда</th><th>Менеджер</th><th>Перший GW</th><th>Причина</th></tr></thead>
                    <tbody>
                      {item.failedTeams.map((team) => (
                        <tr key={team.id}>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.name}</a></td>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.manager}</a></td>
                          <td>{team.firstGameweek ? `GW${team.firstGameweek}` : "Ще не бере участі"}</td>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.reason}</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {item.missingTeams.length > 0 ? (
                <div className="snapshot-list">
                  <h3>Команди зі збереженим складом, але без snapshot/помилки</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Команда</th><th>Менеджер</th><th>Перший GW</th></tr></thead>
                    <tbody>
                      {item.missingTeams.map((team) => (
                        <tr key={team.id}>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.name}</a></td>
                          <td><a className="snapshot-team-link" href={`#admin-team-${team.id}`}>{team.manager}</a></td>
                          <td>{team.firstGameweek ? `GW${team.firstGameweek}` : "Ще не бере участі"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </details>
          ))}
        </div>
      </section>

      <section className="panel" id="autosubs" style={{ marginBottom: 16 }}>
        <h2>Автозаміни</h2>
        <p className="muted">
          Підрахунок автозамін перезаписує автозаміни вибраного GW, додає їх до очок команд і одразу оновлює рейтинг.
          Скидання прибирає автозаміни цього GW і також перераховує рейтинг без них.
        </p>
        <div className="admin-action-grid">
          {gameweeks.map((gameweek) => (
            <div className="card stat" key={`autosub-${gameweek.id}`}>
              <span className="badge">GW{gameweek.number}</span>
              <strong>{gameweek.stage ?? gameweek.name}</strong>
              <div className="toolbar" style={{ marginTop: 12 }}>
                <form action={calculateAutoSubstitutionsAction}>
                  <input type="hidden" name="gameweek" value={gameweek.number} />
                  <button className="button primary" type="submit">
                    <Calculator size={16} />
                    Підрахунок автозамін GW{gameweek.number}
                  </button>
                </form>
                <form action={resetAutoSubstitutionsAction}>
                  <input type="hidden" name="gameweek" value={gameweek.number} />
                  <button className="button" type="submit">
                    <RotateCcw size={16} />
                    Скинути GW{gameweek.number}
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" id="maintenance" style={{ marginBottom: 16 }}>
        <h2>Технічні роботи</h2>
        <p className="muted">
          Поточний статус: <strong>{maintenanceEnabled ? "увімкнено" : "вимкнено"}</strong>. Для адміна адмінка і логін залишаються доступними.
        </p>
        <div className="toolbar">
          <form action={setMaintenanceModeAction}>
            <input type="hidden" name="enabled" value="1" />
            <button className="button" type="submit">
              <Wrench size={16} />
              Технічні роботи
            </button>
          </form>
          <form action={setMaintenanceModeAction}>
            <input type="hidden" name="enabled" value="0" />
            <button className="button primary" type="submit">
              Завершити технічні роботи
            </button>
          </form>
        </div>
      </section>

      {teamsWithRoster.map((team) => {
        const diagnostics = rosterDiagnostics(team);
        const starters = team.rosterEntries.filter((entry) => entry.slot === "STARTER");
        const bench = team.rosterEntries.filter((entry) => entry.slot !== "STARTER");

        return (
          <section className="admin-modal" id={`admin-team-${team.id}`} aria-label={`Склад ${team.name}`} key={team.id}>
            <a className="admin-modal-backdrop" href="#gameweeks" aria-label="Закрити склад" />
            <div className="admin-modal-content admin-team-modal-content">
              <div className="admin-modal-heading">
                <div>
                  <p className="eyebrow">Перегляд складу</p>
                  <h2>{team.name}</h2>
                  <p className="muted">
                    Менеджер: {team.user.username ?? team.user.email ?? "Без менеджера"} · Схема: {team.formation} · Перший GW:{" "}
                    {firstGameweekByTeam.get(team.id) ? `GW${firstGameweekByTeam.get(team.id)}` : "ще не бере участі"}
                  </p>
                </div>
                <a className="button" href="#gameweeks">Закрити</a>
              </div>

              <div className="snapshot-metrics admin-team-checks">
                {diagnostics.map((item) => (
                  <div className={`card stat ${item.ok ? "check-ok" : "check-bad"}`} key={item.label}>
                    <span className="badge">{item.ok ? "OK" : "!"}</span>
                    <strong>{item.value}</strong>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>

              <div className="admin-team-roster-grid">
                <section>
                  <h3>Старт</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Гравець</th><th>Поз.</th><th>Збірна</th><th>Ціна</th><th></th></tr></thead>
                    <tbody>
                      {starters.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.player.name}</td>
                          <td>{positionLabel(entry.player.position)}</td>
                          <td>{teamLabel(entry.player.nationalTeam)}</td>
                          <td>{Number(entry.player.price).toFixed(1)}</td>
                          <td>{entry.isCaptain ? "К" : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <section>
                  <h3>Лавка</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Гравець</th><th>Поз.</th><th>Збірна</th><th>Ціна</th></tr></thead>
                    <tbody>
                      {bench.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.player.name}</td>
                          <td>{positionLabel(entry.player.position)}</td>
                          <td>{teamLabel(entry.player.nationalTeam)}</td>
                          <td>{Number(entry.player.price).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          </section>
        );
      })}

      <section className="grid cols-2" id="matches">
        <div className="panel">
          <h2>Створити матч</h2>
          <form action={createFixture} className="form-stack">
            <label>
              Gameweek
              <select className="input" name="gameweek" defaultValue={gameweeks[0]?.number ?? 1}>
                {gameweeks.map((gameweek) => (
                  <option key={gameweek.id} value={gameweek.number}>GW{gameweek.number}</option>
                ))}
              </select>
            </label>
            <label>
              Номер матчу
              <input className="input" name="matchNo" type="number" min={1} step={1} placeholder="73" />
            </label>
            <label>
              Група
              <input className="input" name="groupName" placeholder="Група A" />
            </label>
            <label>
              Дата і час
              <input className="input" name="kickoffAt" type="datetime-local" required />
            </label>
            <label>
              Господарі
              <select className="input" name="homeTeamId" required>
                <option value="">Обери збірну</option>
                {teams.map((team) => <option key={team.id} value={team.id}>{team.nameUk}</option>)}
              </select>
            </label>
            <label>
              Гості
              <select className="input" name="awayTeamId" required>
                <option value="">Обери збірну</option>
                {teams.map((team) => <option key={team.id} value={team.id}>{team.nameUk}</option>)}
              </select>
            </label>
            <button className="button primary" type="submit">Створити матч</button>
          </form>
        </div>

        <div className="panel" id="players">
          <h2>Імпорт гравців CSV</h2>
          <AdminPlayerImport />
          <table className="table compact-table" style={{ marginTop: 14 }}>
            <thead><tr><th>Приклад з бази</th><th>Збірна</th><th>Поз.</th><th>Клуб</th><th>Ціна</th></tr></thead>
            <tbody>
              {csvPreview.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.nationalTeam.nameUk}</td>
                  <td>{player.position}</td>
                  <td>{player.club ?? "-"}</td>
                  <td>{Number(player.price).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="player-price">
        <h2>Редагувати ціну гравця</h2>
        <form action={updatePlayerPrice} className="form-inline">
          <select className="input" name="playerId" required>
            <option value="">Обери гравця</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name} | {player.nationalTeam.nameUk} | {player.position} | {player.club ?? "-"} | {Number(player.price).toFixed(1)}
              </option>
            ))}
          </select>
          <input className="input points-input" name="price" type="number" step="0.1" min="0.1" required />
          <button className="button primary" type="submit" disabled={players.length === 0}>
            <Save size={18} />
            Зберегти ціну
          </button>
        </form>
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="players-list">
        <h2>Редагувати гравців</h2>
        <p className="muted">Гравці згруповані за групами і збірними. Фото: JPG, PNG або WebP до 200 КБ.</p>
        <div className="admin-player-groups">
          {[...playersByGroup.entries()].map(([groupName, groupTeams]) => (
            <details className="admin-player-group" key={groupName}>
              <summary>
                <strong>{groupName}</strong>
                <span className="badge">{groupTeams.length} збірні</span>
              </summary>
              <div className="admin-player-group-content">
                {groupTeams.map((team) => {
                  const teamPlayers = players.filter((player) => player.nationalTeamId === team.id);
                  return (
                    <details className="admin-team-players" key={team.id}>
                      <summary>
                        {teamLabel(team)}
                        <span className="badge">{teamPlayers.length}</span>
                      </summary>
                      <div className="admin-team-actions">
                        <DeleteNationalTeamPlayersButton nationalTeamId={team.id} teamName={team.nameUk} playerCount={teamPlayers.length} />
                      </div>
                      <table className="table compact-table">
                        <thead>
                          <tr>
                            <th>Гравець</th>
                            <th>Поз.</th>
                            <th>Клуб</th>
                            <th>Ціна</th>
                            <th>Статус</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamPlayers.map((player) => (
                            <tr key={player.id}>
                              <td>{player.name}</td>
                              <td>{player.position}</td>
                              <td>{player.club ?? "-"}</td>
                              <td>{Number(player.price).toFixed(1)}</td>
                              <td>{player.status}</td>
                              <td>
                                <AdminPlayerActions
                                  player={{
                                    id: player.id,
                                    name: player.name,
                                    nameOriginal: player.nameOriginal,
                                    position: player.position,
                                    price: Number(player.price),
                                    club: player.club,
                                    clubOriginal: player.clubOriginal,
                                    status: player.status,
                                    unavailableReason: player.unavailableReason,
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="points">
        <div className="topbar" style={{ marginBottom: 12 }}>
          <div>
            <h2>Ручні очки матчу</h2>
            <p className="muted">Обери GW, групу і матч. Потім введи fantasy-очки гравців та окремо онови рейтинги.</p>
          </div>
        </div>

        <div className="toolbar" style={{ marginBottom: 14 }}>
          <a className={`button ${!selectedGameweek ? "primary" : ""}`} href="/admin#points">Усі GW</a>
          {gameweeks.map((gameweek) => (
            <a
              className={`button ${selectedGameweek === gameweek.number ? "primary" : ""}`}
              href={`/admin?gw=${gameweek.number}#points`}
              key={gameweek.id}
            >
              GW{gameweek.number}
            </a>
          ))}
        </div>

        <div className="admin-match-browser">
          {[...fixturesByGroup.entries()].map(([groupName, groupFixtures]) => (
            <section className="admin-match-group" key={groupName}>
              <h3>{groupName}</h3>
              <div className="admin-match-list">
                {groupFixtures.map((fixture) => (
                  <a
                    className={`admin-match-link ${fixture.id === activeFixture?.id ? "active" : ""}`}
                    href={`/admin?fixtureId=${fixture.id}${selectedGameweek ? `&gw=${selectedGameweek}` : ""}#fixture-points-modal`}
                    key={fixture.id}
                  >
                    <span className="match-meta">#{fixture.matchNo ?? "-"} · GW{fixture.gameweek}</span>
                    <span className="admin-match-teams">
                      {teamLabel(fixture.homeTeam)}
                      <strong>{scoreLabel(fixture)}</strong>
                      {teamLabel(fixture.awayTeam)}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {activeFixture ? (
          <section className="admin-modal fixture-points-modal" id="fixture-points-modal" aria-label="Ручні очки матчу">
            <a
              className="admin-modal-backdrop"
              href={`/admin${selectedGameweek ? `?gw=${selectedGameweek}` : ""}#points`}
              aria-label="Закрити матч"
            />
            <div className="admin-modal-content fixture-points-content">
              <div className="admin-modal-heading">
                <div>
                  <p className="eyebrow">#{activeFixture.matchNo ?? "-"} · GW{activeFixture.gameweek} · {activeFixture.groupName ?? "Без групи"}</p>
                  <h2>{teamLabel(activeFixture.homeTeam)} <span className="fixture-score-label">{scoreLabel(activeFixture)}</span> {teamLabel(activeFixture.awayTeam)}</h2>
                </div>
                <a className="button" href={`/admin${selectedGameweek ? `?gw=${selectedGameweek}` : ""}#points`}>Закрити</a>
              </div>

              <div className="fixture-modal-score">
                <form action={saveFixtureScore} className="score-form">
                  <input type="hidden" name="fixtureId" value={activeFixture.id} />
                  <label>
                    {activeFixture.homeTeam.nameUk}
                    <input className="input points-input" name="homeScore" type="number" min={0} step={1} defaultValue={activeFixture.homeScore ?? ""} required />
                  </label>
                  <span>:</span>
                  <label>
                    {activeFixture.awayTeam.nameUk}
                    <input className="input points-input" name="awayScore" type="number" min={0} step={1} defaultValue={activeFixture.awayScore ?? ""} required />
                  </label>
                  {activeFixture.playoffMatchId ? (
                    <>
                      <label>
                        Пенальті {activeFixture.homeTeam.nameUk}
                        <input className="input points-input" name="homePenalties" type="number" min={0} step={1} defaultValue={activeFixture.homePenalties ?? ""} />
                      </label>
                      <label>
                        Пенальті {activeFixture.awayTeam.nameUk}
                        <input className="input points-input" name="awayPenalties" type="number" min={0} step={1} defaultValue={activeFixture.awayPenalties ?? ""} />
                      </label>
                    </>
                  ) : null}
                  <button className="button primary" type="submit">Зберегти рахунок</button>
                </form>
                <form action={resetFixtureScore}>
                  <input type="hidden" name="fixtureId" value={activeFixture.id} />
                  <button className="button warning" type="submit">
                    <RotateCcw size={16} />
                    Скинути
                  </button>
                </form>
                {activeFixture.playoffMatchId && activeFixture.gameweek === 4 ? (
                  <DeletePlayoffFixtureButton fixtureId={activeFixture.id} />
                ) : null}
              </div>

              {activeFixture.homeTeam.players.length + activeFixture.awayTeam.players.length > 0 ? (
                <>
                  <form action={saveFixturePoints} className="fixture-points-form" id="fixture-points-form">
                    <input type="hidden" name="fixtureId" value={activeFixture.id} />
                    <div className="fixture-squads-grid">
                      {[
                        { team: activeFixture.homeTeam, players: activeFixture.homeTeam.players },
                        { team: activeFixture.awayTeam, players: activeFixture.awayTeam.players },
                      ].map(({ team, players: squadPlayers }) => (
                        <section className="fixture-squad-column" key={team.id}>
                          <h3>{teamLabel(team)}</h3>
                          <table className="table fixture-points-table">
                            <thead>
                              <tr><th>Гравець</th><th>Поз.</th><th>Очки</th><th>Не грав</th><th>ЧК</th></tr>
                            </thead>
                            <tbody>
                              {squadPlayers.map((player) => (
                                <tr key={player.id}>
                                  <td title={player.name}>{player.name}</td>
                                  <td>{player.position}</td>
                                  <AdminPlayerPointInputs
                                    playerId={player.id}
                                    initialPoints={pointMap.get(player.id)?.points ?? 0}
                                    initialDidPlay={pointMap.get(player.id)?.didPlay ?? true}
                                    initialRedCard={pointMap.get(player.id)?.redCard ?? false}
                                    compact
                                  />
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </section>
                      ))}
                    </div>
                  </form>
                  <div className="fixture-points-submit">
                    <ResetFixturePointsButton fixtureId={activeFixture.id} />
                    <button className="button primary" type="submit" form="fixture-points-form">
                      <Calculator size={18} />
                      Зберегти очки матчу
                    </button>
                  </div>
                </>
              ) : (
                <p className="muted">Для цих збірних ще немає гравців. Імпортуй склади через CSV вище.</p>
              )}
            </div>
          </section>
        ) : null}
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="playoff-scores">
        <div className="topbar" style={{ marginBottom: 12 }}>
          <div>
            <h2>Результати плей-оф</h2>
            <p className="muted">
              Учасників 1/16 підтверджує адміністратор вручну. Наступні раунди формуються автоматично за результатами. Якщо після додаткового часу нічия, введи також рахунок серії пенальті.
            </p>
          </div>
        </div>

        <div className="admin-match-browser">
          {[
            ["r32", "1/16 фіналу"],
            ["r16", "1/8 фіналу"],
            ["qf", "Чвертьфінали"],
            ["sf", "Півфінали"],
            ["final", "Фінал / 3-тє місце"],
          ].map(([stage, title]) => (
            <section className="admin-match-group" key={stage}>
              <h3>{title}</h3>
              <div className="admin-match-list">
                {resolvedPlayoff.filter((match) => match.stage === stage).map((match) => (
                  <a
                    className={`admin-match-link ${match.id === activePlayoff?.id ? "active" : ""}`}
                    href={`/admin?playoffId=${match.id}#playoff-scores`}
                    key={match.id}
                  >
                    <span className="match-meta">Матч #{match.matchNo}</span>
                    <span className="admin-match-teams">
                      <span>
                        {match.home.type === "team" ? teamLabel(match.home.team) : match.home.slot}
                      </span>
                      <strong>
                        {match.homeScore === null || match.awayScore === null
                          ? "не зіграно"
                          : `${match.homeScore}:${match.awayScore}`}
                      </strong>
                      <span>
                        {match.away.type === "team" ? teamLabel(match.away.team) : match.away.slot}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {activePlayoff ? (
          <div className="active-fixture-panel">
            <p className="eyebrow">Матч #{activePlayoff.matchNo}</p>
            <h3>
              {activePlayoff.home.type === "team" ? teamLabel(activePlayoff.home.team) : activePlayoff.home.slot}
              <span> · </span>
              {activePlayoff.away.type === "team" ? teamLabel(activePlayoff.away.team) : activePlayoff.away.slot}
            </h3>
            {activePlayoff.stage === "r32" ? (
              <PlayoffParticipantForm
                matchId={activePlayoff.id}
                teams={teams.map((team) => ({
                  id: team.id,
                  code: team.code,
                  nameUk: team.nameUk,
                  groupKey: team.groupKey,
                  flagPath: team.flagPath,
                }))}
                confirmedHomeTeamId={activePlayoff.confirmedHomeTeamId}
                confirmedAwayTeamId={activePlayoff.confirmedAwayTeamId}
                hasResult={activePlayoff.homeScore !== null || activePlayoff.awayScore !== null}
              />
            ) : null}
            {activePlayoffFixture ? (
              <a className="button primary" href={`/admin?fixtureId=${activePlayoffFixture.id}&gw=${activePlayoffFixture.gameweek}#fixture-points-modal`}>
                Відкрити матч у GW{activePlayoffFixture.gameweek}
              </a>
            ) : (
              <p className="muted">Звичайний матч GW буде створено після визначення обох збірних.</p>
            )}
          </div>
        ) : null}

        <details className="admin-tiebreak-panel">
          <summary>Критерії FIFA: дисциплінарні очки та світовий рейтинг</summary>
          <p className="muted">
            Заповнюй лише якщо команди залишаються рівними після очних матчів, загальної різниці та забитих м’ячів. Вище значення conduct score краще; жовта картка дає −1.
          </p>
          <div className="admin-tiebreak-grid">
            {teams.map((team) => (
              <form action={updateTournamentTiebreaks} className="admin-tiebreak-row" key={team.id}>
                <input type="hidden" name="teamId" value={team.id} />
                <span>{teamLabel(team)}</span>
                <label>
                  Conduct
                  <input className="input points-input" name="teamConductScore" type="number" step={1} defaultValue={team.teamConductScore} />
                </label>
                <label>
                  Рейтинг FIFA
                  <input className="input points-input" name="fifaRank" type="number" min={1} step={1} defaultValue={team.fifaRank ?? ""} />
                </label>
                <button className="button" type="submit">Зберегти</button>
              </form>
            ))}
          </div>
        </details>
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="rankings">
        <h2>Рейтинги</h2>
        <p className="muted">Після введення очок натисни “Оновити рейтинги”, щоб перерахувати глобальну таблицю і приватні ліги.</p>
      </section>
    </AppShell>
  );
}

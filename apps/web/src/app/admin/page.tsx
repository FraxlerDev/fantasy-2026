import { Calculator, RotateCcw, Save, Trophy } from "lucide-react";
import { AdminPlayerImport } from "../../components/admin-player-import";
import { AdminPlayerActions } from "../../components/admin-player-actions";
import { DeleteNationalTeamPlayersButton } from "../../components/delete-national-team-players-button";
import { AppShell } from "../../components/shell";
import { requireAdmin } from "../../lib/admin";
import { ensureDefaultGameweeks } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import {
  createGameweekSnapshotsAction,
  createFixture,
  openGameweekTransfersAction,
  refreshRankingsAction,
  resetFixtureScore,
  saveFixturePoints,
  saveFixtureScore,
  updatePlayerPrice,
} from "../actions/admin-actions";

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
    snapshotSkipped?: string;
    openedGw?: string;
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

  await ensureDefaultGameweeks();

  const params = await searchParams;
  const selectedGameweek = params?.gw ? Number(params.gw) : undefined;
  const [teams, players, allFixtures, gameweeks, fantasyTeams] = await Promise.all([
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
        rosterEntries: true,
        lineupSnapshots: { select: { id: true, gameweek: true, createdAt: true, entries: { select: { id: true } } } },
        snapshotFailures: { select: { gameweek: true, reason: true, updatedAt: true } },
      },
      orderBy: [{ createdAt: "asc" }],
    }),
  ]);

  const fixtures = selectedGameweek ? allFixtures.filter((fixture) => fixture.gameweek === selectedGameweek) : allFixtures;
  const activeFixtureId = params?.fixtureId ?? fixtures[0]?.id;
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
  const pointMap = new Map(activeFixture?.playerPoints.map((point) => [point.playerId, point.points]) ?? []);
  const fixturePlayers = activeFixture ? [...activeFixture.homeTeam.players, ...activeFixture.awayTeam.players] : [];
  const csvPreview = players.slice(0, 5);
  const snapshotControl = gameweeks.map((gameweek) => {
    const snapshotTeams = fantasyTeams.filter((team) => team.lineupSnapshots.some((snapshot) => snapshot.gameweek === gameweek.number));
    const failedTeams = fantasyTeams
      .map((team) => ({
        id: team.id,
        name: team.name,
        manager: team.user.username ?? team.user.email ?? "Без менеджера",
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
      .map((team) => ({ id: team.id, name: team.name, manager: team.user.username ?? team.user.email ?? "Без менеджера" }));

    return {
      gameweek,
      snapshotCount: snapshotTeams.length,
      failedTeams,
      missingTeams,
      readyPercent: fantasyTeams.length ? Math.round((snapshotTeams.length / fantasyTeams.length) * 100) : 0,
    };
  });
  const playersByGroup = teams.reduce<Map<string, typeof teams[number][]>>((groups, team) => {
    const key = team.groupKey ? `Група ${team.groupKey}` : "Без групи";
    groups.set(key, [...(groups.get(key) ?? []), team]);
    return groups;
  }, new Map());

  return (
    <AppShell active="/admin">
      <div className="topbar">
        <div>
          <p className="eyebrow">Backoffice</p>
          <h1>Admin Console</h1>
          <p className="muted">Керування матчами, гравцями, ручними очками й рейтингами.</p>
        </div>
        <form action={refreshRankingsAction}>
          <button className="button primary" type="submit">
            <Trophy size={18} />
            Оновити рейтинги
          </button>
        </form>
      </div>

      <nav className="admin-tabs">
        <a href="#gameweeks">GW / Snapshot</a>
        <a href="#matches">Матчі</a>
        <a href="#players">Гравці</a>
        <a href="#points">Очки</a>
        <a href="#rankings">Рейтинги</a>
      </nav>

      {params?.error ? <div className="form-error">Помилка: {errorMessages[params.error] ?? params.error}</div> : null}
      {params?.points || params?.rankings || params?.score || params?.players || params?.teamPlayers ? (
        <div className="form-success">
          Зміни збережено.{params?.players ? ` Імпортовано рядків: ${params.count ?? "0"}.` : ""}
        </div>
      ) : null}
      {params?.snapshots || params?.openedGw ? (
        <div className="form-success">
          {params.openedGw
            ? `Трансфери відкрито для GW${params.openedGw}.`
            : `Snapshot створено: ${params.snapshots ?? "0"}, невалідних складів: ${params.snapshotFailed ?? "0"}${params.snapshotSkipped === "1" ? " (snapshot уже існував)." : "."}`}
        </div>
      ) : null}

      <section className="panel" id="gameweeks" style={{ marginBottom: 16 }}>
        <h2>Gameweeks, дедлайни і трансфери</h2>
        <p className="muted">Snapshot створюється автоматично після дедлайну через cron, але тут можна створити його вручну або відкрити трансфери наступного GW.</p>
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
                <td>{gameweek.transfersOpen ? "OPEN" : gameweek.status}</td>
                <td>{gameweek.snapshotsCreatedAt ? "створено" : "-"}</td>
                <td>
                  <div className="toolbar">
                    <form action={createGameweekSnapshotsAction}>
                      <input type="hidden" name="gameweek" value={gameweek.number} />
                      <button className="button" type="submit" disabled={Boolean(gameweek.snapshotsCreatedAt)}>
                        Snapshot
                      </button>
                    </form>
                    <form action={openGameweekTransfersAction}>
                      <input type="hidden" name="gameweek" value={gameweek.number} />
                      <button className="button primary" type="submit" disabled={gameweek.deadlineAt <= new Date() || gameweek.transfersOpen}>
                        Відкрити
                      </button>
                    </form>
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
              </div>

              {item.failedTeams.length > 0 ? (
                <div className="snapshot-list">
                  <h3>Невалідні склади</h3>
                  <table className="table compact-table">
                    <thead><tr><th>Команда</th><th>Менеджер</th><th>Причина</th></tr></thead>
                    <tbody>
                      {item.failedTeams.map((team) => (
                        <tr key={team.id}>
                          <td>{team.name}</td>
                          <td>{team.manager}</td>
                          <td>{team.reason}</td>
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
                    <thead><tr><th>Команда</th><th>Менеджер</th></tr></thead>
                    <tbody>
                      {item.missingTeams.map((team) => (
                        <tr key={team.id}>
                          <td>{team.name}</td>
                          <td>{team.manager}</td>
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

      <section className="panel" style={{ marginTop: 16 }}>
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
            <section className="admin-player-group" key={groupName}>
              <h3>{groupName}</h3>
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
            </section>
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
                    href={`/admin?fixtureId=${fixture.id}${selectedGameweek ? `&gw=${selectedGameweek}` : ""}#points`}
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
          <div className="active-fixture-panel">
            <div className="active-fixture-title">
              <div>
                <p className="eyebrow">#{activeFixture.matchNo ?? "-"} · GW{activeFixture.gameweek} · {activeFixture.groupName ?? "Без групи"}</p>
                <h3>{teamLabel(activeFixture.homeTeam)} <span>{scoreLabel(activeFixture)}</span> {teamLabel(activeFixture.awayTeam)}</h3>
              </div>
            </div>

            <div className="score-actions">
              <form action={saveFixtureScore} className="score-form">
                <input type="hidden" name="fixtureId" value={activeFixture.id} />
                <label>
                  Голи господарів
                  <input className="input points-input" name="homeScore" type="number" min={0} step={1} defaultValue={activeFixture.homeScore ?? ""} required />
                </label>
                <label>
                  Голи гостей
                  <input className="input points-input" name="awayScore" type="number" min={0} step={1} defaultValue={activeFixture.awayScore ?? ""} required />
                </label>
                <button className="button primary" type="submit">Зберегти рахунок</button>
              </form>

              <form action={resetFixtureScore}>
                <input type="hidden" name="fixtureId" value={activeFixture.id} />
                <button className="button warning" type="submit">
                  <RotateCcw size={18} />
                  Скинути рахунок
                </button>
              </form>
            </div>

            {fixturePlayers.length > 0 ? (
              <form action={saveFixturePoints} style={{ marginTop: 14 }}>
                <input type="hidden" name="fixtureId" value={activeFixture.id} />
                <table className="table">
                  <thead>
                    <tr><th>Гравець</th><th>Збірна</th><th>Позиція</th><th>Очки</th></tr>
                  </thead>
                  <tbody>
                    {fixturePlayers.map((player) => (
                      <tr key={player.id}>
                        <td>{player.name}</td>
                        <td>{player.nationalTeamId === activeFixture.homeTeamId ? teamLabel(activeFixture.homeTeam) : teamLabel(activeFixture.awayTeam)}</td>
                        <td>{player.position}</td>
                        <td>
                          <input className="input points-input" name={`points:${player.id}`} type="number" step={1} defaultValue={pointMap.get(player.id) ?? 0} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="button primary" type="submit" style={{ marginTop: 14 }}>
                  <Calculator size={18} />
                  Зберегти очки матчу
                </button>
              </form>
            ) : (
              <p className="muted" style={{ marginTop: 14 }}>Для цих збірних ще немає гравців. Імпортуй склади через CSV вище.</p>
            )}
          </div>
        ) : (
          <p className="muted">Спочатку створи матч.</p>
        )}
      </section>

      <section className="panel" style={{ marginTop: 16 }} id="rankings">
        <h2>Рейтинги</h2>
        <p className="muted">Після введення очок натисни “Оновити рейтинги”, щоб перерахувати глобальну таблицю і приватні ліги.</p>
      </section>
    </AppShell>
  );
}

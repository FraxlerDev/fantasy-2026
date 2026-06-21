import type { PlayerPosition } from "@prisma/client";
import Link from "next/link";
import { AppShell } from "./shell";
import { PlayerRankingTable } from "./player-ranking-table";
import type { PlayerRankingMode, RankedPlayer } from "../lib/player-rankings";

const positionLabels: Record<PlayerPosition, string> = {
  GK: "Воротарі",
  DEF: "Захисники",
  MID: "Півзахисники",
  FWD: "Нападники",
};

export function PlayerRankingPage({
  mode,
  players,
  query,
  position,
  nation,
  sortGameweek = null,
  sortDirection = null,
}: {
  mode: PlayerRankingMode;
  players: RankedPlayer[];
  query: string;
  position: string;
  nation: string;
  sortGameweek?: number | null;
  sortDirection?: "asc" | "desc" | null;
}) {
  const nations = [...new Map(players.map((player) => [player.nationalTeam.id, player.nationalTeam])).values()]
    .sort((a, b) => a.nameUk.localeCompare(b.nameUk, "uk"));
  const normalizedQuery = query.trim().toLocaleLowerCase("uk");
  const matchingPlayers = players.filter((player) => {
    const matchesQuery = !normalizedQuery || player.name.toLocaleLowerCase("uk").includes(normalizedQuery);
    const matchesPosition = !position || player.position === position;
    const matchesNation = !nation || player.nationalTeam.id === nation;
    return matchesQuery && matchesPosition && matchesNation;
  });
  const isPopularity = mode === "popularity";
  const activeGameweeks = isPopularity
    ? []
    : [...new Set(players.flatMap((player) => Object.keys(player.pointsByGameweek).map(Number)))]
        .filter((gameweek) => gameweek >= 1 && gameweek <= 7)
        .sort((a, b) => a - b);
  const activeSortGameweek = !isPopularity && sortGameweek && activeGameweeks.includes(sortGameweek)
    ? sortGameweek
    : null;
  const activeSortDirection = activeSortGameweek && sortDirection ? sortDirection : null;
  const filteredPlayers = activeSortGameweek && activeSortDirection
    ? [...matchingPlayers].sort((a, b) => {
        const aHasPoints = Object.prototype.hasOwnProperty.call(a.pointsByGameweek, activeSortGameweek);
        const bHasPoints = Object.prototype.hasOwnProperty.call(b.pointsByGameweek, activeSortGameweek);
        if (aHasPoints !== bHasPoints) return aHasPoints ? -1 : 1;
        if (!aHasPoints) return a.name.localeCompare(b.name, "uk");
        const difference = (a.pointsByGameweek[activeSortGameweek] ?? 0) - (b.pointsByGameweek[activeSortGameweek] ?? 0);
        return (activeSortDirection === "asc" ? difference : -difference) || a.name.localeCompare(b.name, "uk");
      })
    : matchingPlayers;
  const basePath = isPopularity ? "/player-rankings" : "/player-points";
  const gameweekSortLinks = Object.fromEntries(activeGameweeks.map((gameweek) => {
    const nextDirection = activeSortGameweek !== gameweek
      ? "desc"
      : activeSortDirection === "desc"
        ? "asc"
        : null;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (position) params.set("position", position);
    if (nation) params.set("nation", nation);
    if (nextDirection) {
      params.set("sort", `gw${gameweek}`);
      params.set("order", nextDirection);
    }
    const search = params.toString();
    return [gameweek, search ? `${basePath}?${search}` : basePath];
  }));

  return (
    <AppShell active="/tournament">
      <div className="player-ranking-page">
        <nav className="breadcrumbs" aria-label="Хлібні крихти">
          <Link href="/tournament">Турнір</Link>
          <span aria-hidden="true">›</span>
          <strong>{isPopularity ? "Рейтинг популярності" : "Рейтинг за очками"}</strong>
        </nav>
        <p className="eyebrow">Статистика гравців</p>
        <h1>{isPopularity ? "Рейтинг популярності" : "Рейтинг за очками"}</h1>
        <p className="muted">
          {isPopularity
            ? "Гравці, яких найчастіше обирали до поточних фентезі-складів."
            : "Особисті очки футболістів за всі зіграні матчі без капітанського подвоєння."}
        </p>

        <form className="panel player-ranking-filters">
          {activeSortGameweek && activeSortDirection ? (
            <>
              <input type="hidden" name="sort" value={`gw${activeSortGameweek}`} />
              <input type="hidden" name="order" value={activeSortDirection} />
            </>
          ) : null}
          <input className="input" name="q" defaultValue={query} placeholder="Пошук гравця" />
          <select className="input" name="position" defaultValue={position}>
            <option value="">Усі позиції</option>
            {Object.entries(positionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <select className="input" name="nation" defaultValue={nation}>
            <option value="">Усі збірні</option>
            {nations.map((team) => <option key={team.id} value={team.id}>{team.nameUk}</option>)}
          </select>
          <button className="button primary" type="submit">Знайти</button>
          <Link className="button" href={isPopularity ? "/player-rankings" : "/player-points"}>Скинути</Link>
        </form>

        <section className="panel">
          <div className="section-heading-row">
            <h2>{isPopularity ? "Увесь рейтинг популярності" : "Увесь рейтинг за очками"}</h2>
            <span className="badge">Знайдено: {filteredPlayers.length}</span>
          </div>
          <PlayerRankingTable
            players={filteredPlayers}
            valueLabel={isPopularity ? "Виборів" : "Очки"}
            showPosition
            showPrice={!isPopularity}
            activeGameweeks={activeGameweeks}
            gameweekSortLinks={gameweekSortLinks}
            sortGameweek={activeSortGameweek}
            sortDirection={activeSortDirection}
            emptyText="За вибраними фільтрами гравців не знайдено."
          />
        </section>
      </div>
    </AppShell>
  );
}

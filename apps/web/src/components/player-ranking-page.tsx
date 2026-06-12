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
}: {
  mode: PlayerRankingMode;
  players: RankedPlayer[];
  query: string;
  position: string;
  nation: string;
}) {
  const nations = [...new Map(players.map((player) => [player.nationalTeam.id, player.nationalTeam])).values()]
    .sort((a, b) => a.nameUk.localeCompare(b.nameUk, "uk"));
  const normalizedQuery = query.trim().toLocaleLowerCase("uk");
  const filteredPlayers = players.filter((player) => {
    const matchesQuery = !normalizedQuery || player.name.toLocaleLowerCase("uk").includes(normalizedQuery);
    const matchesPosition = !position || player.position === position;
    const matchesNation = !nation || player.nationalTeam.id === nation;
    return matchesQuery && matchesPosition && matchesNation;
  });
  const isPopularity = mode === "popularity";

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
            emptyText="За вибраними фільтрами гравців не знайдено."
          />
        </section>
      </div>
    </AppShell>
  );
}

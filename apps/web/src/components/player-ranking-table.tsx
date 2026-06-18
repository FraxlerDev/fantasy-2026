import { UserRound } from "lucide-react";
import type { PlayerPosition } from "@prisma/client";
import type { RankedPlayer } from "../lib/player-rankings";

const positionLabels: Record<PlayerPosition, { full: string; short: string }> = {
  GK: { full: "Воротар", short: "ВРТ" },
  DEF: { full: "Захисник", short: "ЗАХ" },
  MID: { full: "Півзахисник", short: "ПІВ" },
  FWD: { full: "Нападник", short: "НАП" },
};

export function PlayerRankingTable({
  players,
  valueLabel,
  emptyText,
  showPosition = false,
  showPrice = false,
  activeGameweeks = [],
}: {
  players: RankedPlayer[];
  valueLabel: string;
  emptyText: string;
  showPosition?: boolean;
  showPrice?: boolean;
  activeGameweeks?: number[];
}) {
  const columnCount = 4 + Number(showPosition) + Number(showPrice) + activeGameweeks.length;
  const tableClasses = [
    "table compact-table player-ranking-table",
    showPosition ? "has-position" : "",
    showPrice ? "has-price" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className="table-scroll">
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>#</th>
            <th>Гравець</th>
            {showPosition ? <th>Позиція</th> : null}
            <th>Збірна</th>
            {showPrice ? <th>Ціна</th> : null}
            {activeGameweeks.map((gameweek) => (
              <th className="player-ranking-gameweek-column" key={gameweek}>GW{gameweek}</th>
            ))}
            <th>{valueLabel}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>
                <span className="catalog-player">
                  <span className="player-photo-wrap small">
                    {player.photoUrl ? (
                      <img alt="" className="player-photo" src={player.photoUrl} />
                    ) : (
                      <span className="player-photo placeholder"><UserRound size={18} /></span>
                    )}
                    {player.nationalTeam.flagPath ? (
                      <img alt="" className="player-photo-flag" src={player.nationalTeam.flagPath} />
                    ) : null}
                  </span>
                  <span className="player-ranking-name">
                    <strong>{player.name}</strong>
                    <small>{player.nationalTeam.nameUk}</small>
                    {activeGameweeks.length > 0 ? (
                      <span className="player-gameweek-mobile">
                        {activeGameweeks.map((gameweek) => (
                          <span key={gameweek}>GW{gameweek}: <strong>{player.pointsByGameweek[gameweek] ?? "—"}</strong></span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                </span>
              </td>
              {showPosition ? (
                <td className="player-ranking-position">
                  <span className="position-full">{positionLabels[player.position].full}</span>
                  <span className="position-short">{positionLabels[player.position].short}</span>
                </td>
              ) : null}
              <td>
                <span className="team-with-flag">
                  {player.nationalTeam.flagPath ? <img alt="" className="flag" src={player.nationalTeam.flagPath} /> : null}
                  {player.nationalTeam.nameUk}
                </span>
              </td>
              {showPrice ? <td className="player-ranking-price">{player.price.toFixed(1)}</td> : null}
              {activeGameweeks.map((gameweek) => (
                <td className="player-ranking-gameweek-column" key={gameweek}>
                  <strong>{player.pointsByGameweek[gameweek] ?? "—"}</strong>
                </td>
              ))}
              <td><strong>{player.value}</strong></td>
            </tr>
          ))}
          {players.length === 0 ? <tr><td colSpan={columnCount}>{emptyText}</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}

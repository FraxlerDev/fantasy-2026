import { UserRound } from "lucide-react";
import type { RankedPlayer } from "../lib/player-rankings";

export function PlayerRankingTable({
  players,
  valueLabel,
  emptyText,
}: {
  players: RankedPlayer[];
  valueLabel: string;
  emptyText: string;
}) {
  return (
    <div className="table-scroll">
      <table className="table compact-table player-ranking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Гравець</th>
            <th>Збірна</th>
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
                  </span>
                </span>
              </td>
              <td>
                <span className="team-with-flag">
                  {player.nationalTeam.flagPath ? <img alt="" className="flag" src={player.nationalTeam.flagPath} /> : null}
                  {player.nationalTeam.nameUk}
                </span>
              </td>
              <td><strong>{player.value}</strong></td>
            </tr>
          ))}
          {players.length === 0 ? <tr><td colSpan={4}>{emptyText}</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}

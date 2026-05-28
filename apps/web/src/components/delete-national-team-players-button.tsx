"use client";

import { deleteNationalTeamPlayers } from "../app/actions/admin-actions";

export function DeleteNationalTeamPlayersButton({
  nationalTeamId,
  teamName,
  playerCount,
}: {
  nationalTeamId: string;
  teamName: string;
  playerCount: number;
}) {
  return (
    <form
      action={deleteNationalTeamPlayers}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Видалити весь склад збірної ${teamName} (${playerCount} гравців)? Якщо хтось із них уже є у складах користувачів, система не дозволить видалення.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="nationalTeamId" value={nationalTeamId} />
      <button className="button warning" type="submit" disabled={playerCount === 0}>
        Видалити склад збірної
      </button>
    </form>
  );
}

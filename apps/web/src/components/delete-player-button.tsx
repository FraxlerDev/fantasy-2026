"use client";

import { deletePlayer } from "../app/actions/admin-actions";

export function DeletePlayerButton({ playerId, playerName }: { playerId: string; playerName: string }) {
  return (
    <form
      action={deletePlayer}
      onSubmit={(event) => {
        if (!window.confirm(`Видалити гравця ${playerName}? Якщо він є у складах користувачів, система не дозволить видалення.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="playerId" value={playerId} />
      <button className="button warning" type="submit">Видалити</button>
    </form>
  );
}

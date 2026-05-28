"use client";

import { deleteOwnedLeague } from "../app/actions/league-actions";

export function DeleteLeagueButton({ leagueId, leagueName }: { leagueId: string; leagueName: string }) {
  return (
    <form
      action={deleteOwnedLeague}
      onSubmit={(event) => {
        if (!window.confirm(`Видалити лігу "${leagueName}"? Команди користувачів залишаться, але сама ліга і список учасників будуть видалені.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="leagueId" value={leagueId} />
      <button className="button warning" type="submit">Видалити лігу</button>
    </form>
  );
}

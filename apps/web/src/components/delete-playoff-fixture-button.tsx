"use client";

import { Trash2 } from "lucide-react";
import { deletePlayoffFixture } from "../app/actions/admin-actions";

export function DeletePlayoffFixtureButton({ fixtureId }: { fixtureId: string }) {
  return (
    <form
      action={deletePlayoffFixture}
      onSubmit={(event) => {
        if (!window.confirm("Видалити матч із GW4? Пара 1/16 також буде скинута. Цю дію не можна скасувати.")) {
          event.preventDefault();
        }
      }}
    >
      <input name="fixtureId" type="hidden" value={fixtureId} />
      <button className="button warning" type="submit"><Trash2 size={16} />Видалити матч GW4</button>
    </form>
  );
}

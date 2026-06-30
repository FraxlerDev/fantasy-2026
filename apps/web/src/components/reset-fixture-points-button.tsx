"use client";

import { Trash2 } from "lucide-react";
import { resetFixturePoints } from "../app/actions/admin-actions";

export function ResetFixturePointsButton({ fixtureId }: { fixtureId: string }) {
  return (
    <form
      action={resetFixturePoints}
      data-confirm="Скинути всі очки гравців цього матчу? Цю дію не можна скасувати"
    >
      <input type="hidden" name="fixtureId" value={fixtureId} />
      <button className="button danger" type="submit">
        <Trash2 size={17} />
        Скинути очки
      </button>
    </form>
  );
}

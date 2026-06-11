"use client";

import { createGameweekSnapshotsAction } from "../app/actions/admin-actions";

export function SnapshotSubmitButton({
  gameweek,
  label,
  confirmMessage,
}: {
  gameweek: number;
  label: string;
  confirmMessage: string;
}) {
  return (
    <form
      action={createGameweekSnapshotsAction}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      <input type="hidden" name="gameweek" value={gameweek} />
      <button className="button" type="submit">
        {label}
      </button>
    </form>
  );
}

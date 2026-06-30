"use client";

import { closeGameweekTransfersAction, openGameweekTransfersAction } from "../app/actions/admin-actions";

export function TransferWindowButton({
  gameweek,
  mode,
  disabled = false,
}: {
  gameweek: number;
  mode: "open" | "close";
  disabled?: boolean;
}) {
  const isOpenAction = mode === "open";
  const label = isOpenAction ? "Відкрити трансфери" : "Закрити трансфери";
  const confirmMessage = isOpenAction
    ? `Відкрити трансфери для GW${gameweek}? Інші відкриті GW будуть закриті вручну. Snapshot залишиться без змін.`
    : `Закрити трансфери для GW${gameweek}? Snapshot залишиться без змін.`;

  return (
    <form
      action={isOpenAction ? openGameweekTransfersAction : closeGameweekTransfersAction}
      data-confirm={confirmMessage}
    >
      <input type="hidden" name="gameweek" value={gameweek} />
      <button className={isOpenAction ? "button primary" : "button"} type="submit" disabled={disabled}>
        {label}
      </button>
    </form>
  );
}

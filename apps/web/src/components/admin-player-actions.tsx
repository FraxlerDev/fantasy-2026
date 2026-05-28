"use client";

import { useState } from "react";
import { AdminPlayerEditForm } from "./admin-player-edit-form";
import { DeletePlayerButton } from "./delete-player-button";

type AdminPlayerActionsProps = {
  player: {
    id: string;
    name: string;
    nameOriginal: string | null;
    position: string;
    price: number;
    club: string | null;
    clubOriginal: string | null;
    status: string;
    unavailableReason: string | null;
  };
};

export function AdminPlayerActions({ player }: AdminPlayerActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-player-actions">
      <button className="button" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? "Закрити" : "Редагувати"}
      </button>
      {open ? (
        <div className="admin-player-editor">
          <AdminPlayerEditForm player={player} />
          <DeletePlayerButton playerId={player.id} playerName={player.name} />
        </div>
      ) : null}
    </div>
  );
}

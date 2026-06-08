"use client";

import { MessagesSquare } from "lucide-react";

const CHAT_TOGGLE_EVENT = "fantasy:chat-toggle";

export function OpenFanSectorButton() {
  return (
    <button
      className="button primary dashboard-chat-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(CHAT_TOGGLE_EVENT))}
    >
      <MessagesSquare size={18} />
      Долучитися до обговорення
    </button>
  );
}

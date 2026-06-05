"use client";

import { MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";

const CHAT_OPEN_EVENT = "fantasy:chat-open";
const CHAT_UNREAD_EVENT = "fantasy:chat-unread";

export function FanSectorNavButton() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    function updateUnread(event: Event) {
      const customEvent = event as CustomEvent<number>;
      setUnreadCount(customEvent.detail ?? 0);
    }

    window.addEventListener(CHAT_UNREAD_EVENT, updateUnread);
    return () => window.removeEventListener(CHAT_UNREAD_EVENT, updateUnread);
  }, []);

  function openChat() {
    window.dispatchEvent(new Event(CHAT_OPEN_EVENT));
    const mobileToggle = document.getElementById("mobile-nav-toggle") as HTMLInputElement | null;
    if (mobileToggle) mobileToggle.checked = false;
  }

  return (
    <button className="nav-chat-button" type="button" onClick={openChat}>
      <MessagesSquare size={18} />
      <span>Фан-сектор</span>
      {unreadCount > 0 ? <strong>{unreadCount > 99 ? "99+" : unreadCount}</strong> : null}
    </button>
  );
}

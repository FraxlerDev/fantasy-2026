"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const CHAT_UNREAD_EVENT = "fantasy:chat-unread";
const CHAT_UNREAD_REQUEST_EVENT = "fantasy:chat-unread-request";

export function ChatMessagesHeading() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    function updateUnread(event: Event) {
      const customEvent = event as CustomEvent<number>;
      setUnreadCount(customEvent.detail ?? 0);
    }

    window.addEventListener(CHAT_UNREAD_EVENT, updateUnread);
    window.dispatchEvent(new Event(CHAT_UNREAD_REQUEST_EVENT));

    return () => window.removeEventListener(CHAT_UNREAD_EVENT, updateUnread);
  }, []);

  return (
    <div className="dashboard-section-title">
      <h2>
        <span className="dashboard-messages-title-desktop">Останні повідомлення в чаті</span>
        <span className="dashboard-messages-title-mobile">Останні повідомлення</span>
      </h2>
      <div className="dashboard-messages-heading-meta">
        <strong
          className={`dashboard-unread-badge ${unreadCount === 0 ? "is-empty" : ""}`}
          aria-label={`Непрочитаних повідомлень: ${unreadCount}`}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </strong>
        <Bell className="dashboard-messages-bell" size={20} />
      </div>
    </div>
  );
}

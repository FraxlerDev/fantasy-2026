"use client";

import { useEffect, useState } from "react";

const FORUM_UNREAD_EVENT = "fantasy:forum-unread";

export function ForumUnreadBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadUnread() {
      const response = await fetch("/api/forum/unread", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { unreadCount: number };
      setCount(data.unreadCount);
    }

    function update(event: Event) {
      setCount((event as CustomEvent<number>).detail ?? 0);
    }

    void loadUnread();
    const interval = window.setInterval(loadUnread, 5000);
    window.addEventListener(FORUM_UNREAD_EVENT, update);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener(FORUM_UNREAD_EVENT, update);
    };
  }, []);

  return count > 0 ? <strong className="forum-nav-badge">{count > 99 ? "99+" : count}</strong> : null;
}

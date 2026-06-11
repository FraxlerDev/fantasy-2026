"use client";

import { useEffect, useState } from "react";

export const LEAGUE_UNREAD_EVENT = "fantasy:league-unread";

export function LeagueUnreadBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadUnread() {
      const response = await fetch("/api/leagues/unread", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { unreadCount: number };
      setCount(data.unreadCount);
    }

    function update() {
      void loadUnread();
    }

    void loadUnread();
    const interval = window.setInterval(loadUnread, 5000);
    window.addEventListener(LEAGUE_UNREAD_EVENT, update);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener(LEAGUE_UNREAD_EVENT, update);
    };
  }, []);

  return count > 0 ? <strong className="forum-nav-badge">{count > 99 ? "99+" : count}</strong> : null;
}

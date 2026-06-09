"use client";

import { useEffect } from "react";

export function ForumReadMarker() {
  useEffect(() => {
    void fetch("/api/forum/unread", { method: "PATCH" }).then(() => {
      window.dispatchEvent(new CustomEvent("fantasy:forum-unread", { detail: 0 }));
    });
  }, []);

  return null;
}

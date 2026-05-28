"use client";

import { useEffect } from "react";

const VISITOR_KEY = "fantasy_2026_visitor_key";

function getVisitorKey() {
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const value = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, value);
  return value;
}

function postVisit(payload: Record<string, unknown>, useBeacon = false) {
  const body = JSON.stringify(payload);

  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/visits", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => null);
}

export function SiteVisitTracker() {
  useEffect(() => {
    const startedAt = Date.now();
    const visitorKey = getVisitorKey();
    const path = `${window.location.pathname}${window.location.search}`;
    const referrer = document.referrer || null;
    let visitId: string | null = null;

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", visitorKey, path, referrer }),
      keepalive: true,
    })
      .then((response) => response.json())
      .then((data: { visitId?: string }) => {
        visitId = data.visitId ?? null;
      })
      .catch(() => null);

    const heartbeat = window.setInterval(() => {
      if (!visitId) return;
      postVisit({
        action: "update",
        visitId,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      });
    }, 15000);

    const finish = () => {
      if (!visitId) return;
      postVisit(
        {
          action: "update",
          visitId,
          durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        },
        true,
      );
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") finish();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", finish);

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", finish);
      finish();
    };
  }, []);

  return null;
}

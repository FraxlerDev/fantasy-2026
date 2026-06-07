"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const visitorKey = getVisitorKey();
    const path = `${pathname}${window.location.search}`;
    const referrer = (previousUrlRef.current ?? document.referrer) || null;
    previousUrlRef.current = window.location.href;
    let visitId: string | null = null;
    let activeSeconds = 0;
    let lastTickAt = Date.now();
    let lastActivityAt = Date.now();
    const activityTimeoutMs = 60_000;

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", visitorKey, path, referrer }),
      keepalive: true,
    })
      .then((response) => response.json())
      .then((data: { visitId?: string | null }) => {
        visitId = data.visitId ?? null;
      })
      .catch(() => null);

    const recordActivity = () => {
      lastActivityAt = Date.now();
    };

    const countActiveTime = () => {
      const now = Date.now();
      const elapsedSeconds = Math.max(0, Math.min(15, (now - lastTickAt) / 1000));
      const isActive =
        document.visibilityState === "visible" &&
        now - lastActivityAt <= activityTimeoutMs;

      if (isActive) activeSeconds += elapsedSeconds;
      lastTickAt = now;
    };

    const updateVisit = (useBeacon = false) => {
      countActiveTime();
      if (!visitId) return;
      postVisit(
        {
          action: "update",
          visitId,
          durationSeconds: Math.max(0, Math.round(activeSeconds)),
        },
        useBeacon,
      );
    };

    const heartbeat = window.setInterval(() => {
      updateVisit();
    }, 15000);

    const finish = () => {
      updateVisit(true);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        finish();
      } else {
        lastTickAt = Date.now();
        recordActivity();
      }
    };

    const activityEvents = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"] as const;
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, recordActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", finish);

    return () => {
      window.clearInterval(heartbeat);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, recordActivity);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", finish);
      finish();
    };
  }, [pathname]);

  return null;
}

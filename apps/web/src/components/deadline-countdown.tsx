"use client";

import { useEffect, useMemo, useState } from "react";

function formatRemaining(ms: number) {
  if (ms <= 0) return "дедлайн настав";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} дн. ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function DeadlineCountdown({ deadlineAt }: { deadlineAt: string }) {
  const deadline = useMemo(() => new Date(deadlineAt).getTime(), [deadlineAt]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="deadline-countdown">
      До дедлайну: <strong>{now === null ? "-- дн. --:--:--" : formatRemaining(deadline - now)}</strong>
    </span>
  );
}

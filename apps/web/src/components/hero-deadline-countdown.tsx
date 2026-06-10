"use client";

import { useEffect, useMemo, useState } from "react";

function remainingParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function HeroDeadlineCountdown({ deadlineAt }: { deadlineAt: string }) {
  const deadline = useMemo(() => new Date(deadlineAt).getTime(), [deadlineAt]);
  const [now, setNow] = useState<number | null>(null);
  const parts = remainingParts(deadline - (now ?? deadline));

  useEffect(() => {
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="hero-deadline-timer" aria-label="Зворотний відлік до дедлайну">
      <span><strong>{now === null ? "--" : parts.days}</strong><small>дні</small></span>
      <i>:</i>
      <span><strong>{now === null ? "--" : String(parts.hours).padStart(2, "0")}</strong><small>год</small></span>
      <i>:</i>
      <span><strong>{now === null ? "--" : String(parts.minutes).padStart(2, "0")}</strong><small>хв</small></span>
      <i>:</i>
      <span><strong>{now === null ? "--" : String(parts.seconds).padStart(2, "0")}</strong><small>сек</small></span>
    </div>
  );
}

"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { SystemStateShell } from "../components/system-state-shell";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SystemStateShell>
      <div className="system-state-page">
        <section className="system-state-card" role="alert">
          <AlertTriangle size={38} aria-hidden="true" />
          <h1>Не вдалося завантажити сторінку</h1>
          <p>Спробуй повторити запит. Створені команди та збережені склади від цієї помилки не змінюються.</p>
          <button className="button primary" type="button" onClick={reset}>
            <RotateCcw size={18} />
            Спробувати ще раз
          </button>
        </section>
      </div>
    </SystemStateShell>
  );
}

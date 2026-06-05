"use client";

import { RotateCcw } from "lucide-react";
import { SystemStateShell } from "../components/system-state-shell";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uk">
      <body>
        <SystemStateShell>
          <div className="system-state-page">
            <section className="system-state-card" role="alert">
              <h1>Сайт тимчасово недоступний</h1>
              <p>Сталася системна помилка. Дані команд залишаються у базі, тож можна безпечно повторити запит.</p>
              <button className="button primary" type="button" onClick={reset}>
                <RotateCcw size={18} />
                Перезавантажити
              </button>
            </section>
          </div>
        </SystemStateShell>
      </body>
    </html>
  );
}

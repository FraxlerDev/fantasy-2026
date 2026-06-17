"use client";

import { useState } from "react";

export function AutosubRulesPopover({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`autosub-info-popover ${compact ? "autosub-info-popover-compact" : ""}`}>
      <button
        aria-expanded={open}
        className="autosub-info-summary"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {compact ? null : <span>Автозаміни</span>}
        <img className="autosub-info-icon" src="/info_circle_icon.png" alt="" />
      </button>
      {open ? (
        <div className="autosub-rules-popover">
          <div className="autosub-rules-heading">
            <strong>Як рахуються автозаміни</strong>
            <button className="autosub-rules-close" onClick={() => setOpen(false)} type="button">
              Закрити
            </button>
          </div>
          <ol>
            <li>Заміна виконується лише для гравця старту з позначкою «Не грав».</li>
            <li>Якщо футболіст зіграв і отримав 0 очок, автозаміни немає.</li>
            <li>Воротар міняє воротаря, захисник — захисника, півзахисник — півзахисника, нападник — нападника.</li>
            <li>Якщо є кілька відповідних запасних, береться той, хто набрав найбільше очок.</li>
            <li>За рівності очок обирається перший гравець на лавці.</li>
            <li>Негативні очки запасного також зараховуються.</li>
            <li>Автозаміни виконуються після завершення всіх матчів GW.</li>
          </ol>
        </div>
      ) : null}
    </div>
  );
}

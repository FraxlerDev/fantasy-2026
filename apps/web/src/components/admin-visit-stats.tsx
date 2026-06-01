"use client";

import { useMemo, useState } from "react";

type VisitPage = {
  id: string;
  path: string;
  title: string;
  referrer: string | null;
  startedAt: string;
  durationSeconds: number;
};

export type AdminVisitRow = {
  key: string;
  site: string;
  ip: string | null;
  countryCity: string | null;
  device: string | null;
  browserOs: string | null;
  durationSeconds: number;
  startedAt: string;
  lastSeenAt: string;
  path: string;
  pageTitle: string;
  referrer: string | null;
  visitCount: number;
  pages: VisitPage[];
};

type Props = {
  rows: AdminVisitRow[];
  todayVisitors: number;
  todayDurationSeconds: number;
  allVisitors: number;
  allDurationSeconds: number;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = seconds % 60;

  if (hours > 0) return `${hours} год ${minutes} хв`;
  if (minutes > 0) return `${minutes} хв ${restSeconds} с`;
  return `${restSeconds} с`;
}

function visitStatus(lastSeenAt: string) {
  return Date.now() - new Date(lastSeenAt).getTime() < 120_000 ? "Online" : "Offline";
}

export function AdminVisitStats({
  rows,
  todayVisitors,
  todayDurationSeconds,
  allVisitors,
  allDurationSeconds,
}: Props) {
  const [selectedKey, setSelectedKey] = useState(rows[0]?.key ?? null);
  const selectedVisit = useMemo(
    () => rows.find((row) => row.key === selectedKey) ?? rows[0] ?? null,
    [rows, selectedKey],
  );

  return (
    <div className="admin-visits">
      <div className="visit-stat-grid">
        <div className="visit-stat-card">
          <span>Користувачів сьогодні</span>
          <strong>{todayVisitors}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Тривалість сьогодні</span>
          <strong>{formatDuration(todayDurationSeconds)}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Користувачів за весь час</span>
          <strong>{allVisitors}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Тривалість за весь час</span>
          <strong>{formatDuration(allDurationSeconds)}</strong>
        </div>
      </div>

      <div className="visit-split">
        <div className="visit-table-panel">
          <div className="visit-table-heading">
            <h2>Статистика користувачів сайту</h2>
            <span className="muted">Унікальних IP: {rows.length}</span>
          </div>
          <table className="table compact-table visit-table">
            <thead>
              <tr>
                <th>Час входу</th>
                <th>Статус</th>
                <th>Сайт</th>
                <th>IP</th>
                <th>Країна / місто</th>
                <th>Пристрій</th>
                <th>Браузер / ОС</th>
                <th>Тривалість</th>
                <th>Сторінка</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((visit) => {
                const status = visitStatus(visit.lastSeenAt);
                return (
                  <tr
                    className="visit-click-row"
                    data-active={selectedVisit?.key === visit.key}
                    key={visit.key}
                    onClick={() => setSelectedKey(visit.key)}
                  >
                    <td>{formatDate(visit.startedAt)}</td>
                    <td>
                      <span className={`visit-status ${status === "Online" ? "online" : "offline"}`}>
                        {status}
                      </span>
                    </td>
                    <td>{visit.site}</td>
                    <td>{visit.ip ?? "-"}</td>
                    <td>{visit.countryCity ?? "-"}</td>
                    <td>{visit.device ?? "-"}</td>
                    <td>{visit.browserOs ?? "-"}</td>
                    <td>{formatDuration(visit.durationSeconds)}</td>
                    <td>
                      <span>{visit.pageTitle}</span>
                      <small>{visit.path}</small>
                    </td>
                    <td>{visit.referrer ?? "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="visit-detail-panel">
          {selectedVisit ? (
            <>
              <div className="visit-detail-heading">
                <span className="badge">{selectedVisit.ip ?? "Без IP"}</span>
                <h3>{selectedVisit.countryCity ?? "Країна / місто не передані"}</h3>
                <p className="muted">
                  {selectedVisit.visitCount} візитів · {formatDuration(selectedVisit.durationSeconds)}
                </p>
              </div>
              <div className="visit-page-list">
                {selectedVisit.pages.map((page) => (
                  <article className="visit-page-item" key={page.id}>
                    <div>
                      <strong>{page.title}</strong>
                      <span>{page.path}</span>
                    </div>
                    <div>
                      <small>{formatDate(page.startedAt)}</small>
                      <small>{formatDuration(page.durationSeconds)}</small>
                    </div>
                    {page.referrer ? <p>Referrer: {page.referrer}</p> : null}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="muted">Візитів ще немає.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

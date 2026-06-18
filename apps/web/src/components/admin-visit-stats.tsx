"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterX } from "lucide-react";

export type AdminRawVisit = {
  id: string;
  teamName: string | null;
  managerName: string | null;
  email: string | null;
  visitorKey: string;
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
};

export type DailyMetric = {
  date: string;
  count: number;
};

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
  teamName: string | null;
  managerName: string | null;
  email: string | null;
  visitorKey: string;
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
  visits: AdminRawVisit[];
  registrations: DailyMetric[];
  teamsCreated: DailyMetric[];
};

type DateRange = "today" | "7d" | "30d" | "all";

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

function formatShortDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
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

function visitStatus(lastSeenAt: string, now: number | null) {
  return now !== null && now - new Date(lastSeenAt).getTime() < 120_000 ? "Online" : "Offline";
}

function pathname(path: string) {
  return path.split("?")[0] || "/";
}

function countryFrom(value: string | null) {
  return value?.split("/")[0]?.trim() || "Не визначено";
}

function browserFrom(value: string | null) {
  return value?.split(" ")[0] || "Невідомо";
}

function referrerLabel(value: string | null) {
  if (!value) return "Прямий перехід";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

function rangeStart(range: DateRange) {
  if (range === "all") return null;

  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (range === "7d") start.setDate(start.getDate() - 6);
  if (range === "30d") start.setDate(start.getDate() - 29);
  return start;
}

function countBy<T>(items: T[], label: (item: T) => string) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const key = label(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "uk"));
}

function aggregateVisits(visits: AdminRawVisit[]) {
  const groups = new Map<string, AdminVisitRow>();

  visits.forEach((visit) => {
    const key = visit.ip ?? `visitor:${visit.visitorKey}`;
    const page: VisitPage = {
      id: visit.id,
      path: visit.path,
      title: visit.pageTitle,
      referrer: visit.referrer,
      startedAt: visit.startedAt,
      durationSeconds: visit.durationSeconds,
    };
    const existing = groups.get(key);

    if (!existing) {
      groups.set(key, {
        key,
        teamName: visit.teamName,
        managerName: visit.managerName,
        email: visit.email,
        visitorKey: visit.visitorKey,
        site: visit.site,
        ip: visit.ip,
        countryCity: visit.countryCity,
        device: visit.device,
        browserOs: visit.browserOs,
        durationSeconds: visit.durationSeconds,
        startedAt: visit.startedAt,
        lastSeenAt: visit.lastSeenAt,
        path: visit.path,
        pageTitle: visit.pageTitle,
        referrer: visit.referrer,
        visitCount: 1,
        pages: [page],
      });
      return;
    }

    existing.durationSeconds += visit.durationSeconds;
    existing.visitCount += 1;
    existing.pages.push(page);
    if (new Date(visit.lastSeenAt) > new Date(existing.lastSeenAt)) {
      existing.lastSeenAt = visit.lastSeenAt;
      existing.path = visit.path;
      existing.pageTitle = visit.pageTitle;
      existing.referrer = visit.referrer;
      existing.countryCity = visit.countryCity ?? existing.countryCity;
      existing.teamName = visit.teamName ?? existing.teamName;
      existing.managerName = visit.managerName ?? existing.managerName;
      existing.email = visit.email ?? existing.email;
    }
  });

  return [...groups.values()]
    .map((visit) => ({
      ...visit,
      pages: visit.pages.sort(
        (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
      ),
    }))
    .sort((a, b) => new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime());
}

function MetricList({ title, items }: { title: string; items: { name: string; count: number }[] }) {
  const maximum = Math.max(1, ...items.map((item) => item.count));
  return (
    <section className="visit-ranking-card">
      <h3>{title}</h3>
      {items.length ? (
        <div className="visit-ranking-list">
          {items.slice(0, 7).map((item) => (
            <div className="visit-ranking-row" key={item.name}>
              <span>{item.name}</span>
              <div>
                <i style={{ width: `${Math.max(6, (item.count / maximum) * 100)}%` }} />
              </div>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">Даних ще немає.</p>
      )}
    </section>
  );
}

export function AdminVisitStats({ visits, registrations, teamsCreated }: Props) {
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [country, setCountry] = useState("all");
  const [device, setDevice] = useState("all");
  const [page, setPage] = useState("all");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const countryOptions = useMemo(
    () => [...new Set(visits.map((visit) => countryFrom(visit.countryCity)))].sort((a, b) => a.localeCompare(b, "uk")),
    [visits],
  );
  const deviceOptions = useMemo(
    () => [...new Set(visits.map((visit) => visit.device ?? "Невідомо"))].sort(),
    [visits],
  );
  const pageOptions = useMemo(() => {
    const titles = new Map<string, string>();
    visits.forEach((visit) => titles.set(pathname(visit.path), visit.pageTitle));
    return [...titles.entries()].sort((a, b) => a[1].localeCompare(b[1], "uk"));
  }, [visits]);

  const filteredVisits = useMemo(() => {
    const start = rangeStart(dateRange);
    return visits.filter((visit) => {
      if (start && new Date(visit.startedAt) < start) return false;
      if (country !== "all" && countryFrom(visit.countryCity) !== country) return false;
      if (device !== "all" && (visit.device ?? "Невідомо") !== device) return false;
      if (page !== "all" && pathname(visit.path) !== page) return false;
      return true;
    });
  }, [visits, dateRange, country, device, page]);

  const rows = useMemo(() => aggregateVisits(filteredVisits), [filteredVisits]);
  const selectedVisit = useMemo(
    () => rows.find((row) => row.key === selectedKey) ?? rows[0] ?? null,
    [rows, selectedKey],
  );

  const todayStart = rangeStart("today")!;
  const todayVisits = filteredVisits.filter((visit) => new Date(visit.startedAt) >= todayStart);
  const todayRows = aggregateVisits(todayVisits);
  const totalDuration = filteredVisits.reduce((sum, visit) => sum + visit.durationSeconds, 0);
  const todayDuration = todayVisits.reduce((sum, visit) => sum + visit.durationSeconds, 0);

  const topPages = countBy(filteredVisits, (visit) => visit.pageTitle);
  const topReferrers = countBy(filteredVisits, (visit) => referrerLabel(visit.referrer));
  const topCountries = countBy(filteredVisits, (visit) => countryFrom(visit.countryCity));
  const topCities = countBy(filteredVisits, (visit) => visit.countryCity?.split("/")[1]?.trim() || "Не визначено");
  const topDevices = countBy(filteredVisits, (visit) => visit.device ?? "Невідомо");
  const topBrowsers = countBy(filteredVisits, (visit) => browserFrom(visit.browserOs));

  const funnel = useMemo(() => {
    const visitors = new Map<string, Set<string>>();
    filteredVisits.forEach((visit) => {
      const key = visit.visitorKey || visit.ip || visit.id;
      const paths = visitors.get(key) ?? new Set<string>();
      paths.add(visit.path);
      visitors.set(key, paths);
    });
    const stages = [
      { label: "Головна", matches: (path: string) => pathname(path) === "/" },
      { label: "Вхід", matches: (path: string) => pathname(path) === "/login" },
      { label: "Склад", matches: (path: string) => pathname(path) === "/squad" },
      { label: "Склад збережено", matches: (path: string) => pathname(path) === "/squad" && path.includes("saved=1") },
    ];
    return stages.map((stage, stageIndex) => ({
      label: stage.label,
      count: [...visitors.values()].filter((paths) =>
        stages
          .slice(0, stageIndex + 1)
          .every((requiredStage) => [...paths].some(requiredStage.matches)),
      ).length,
    }));
  }, [filteredVisits]);

  const selectedStart = rangeStart(dateRange);
  const filterDaily = (metrics: DailyMetric[]) =>
    metrics.filter((metric) => !selectedStart || new Date(`${metric.date}T23:59:59Z`) >= selectedStart);
  const dailyRegistrations = filterDaily(registrations);
  const dailyTeams = filterDaily(teamsCreated);
  const dailyTraffic = useMemo(() => {
    if (now === null) return [];

    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Kyiv",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const metrics = new Map<string, { sessions: number; pageViews: number }>();
    const lastVisitByVisitor = new Map<string, number>();
    const sessionTimeoutMs = 30 * 60 * 1000;
    [...visits]
      .sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())
      .forEach((visit) => {
        const date = formatter.format(new Date(visit.startedAt));
        const item = metrics.get(date) ?? { sessions: 0, pageViews: 0 };
        const visitor = visit.visitorKey || visit.ip || visit.id;
        const startedAt = new Date(visit.startedAt).getTime();
        const sessionKey = `${date}:${visitor}`;
        const previousVisitAt = lastVisitByVisitor.get(sessionKey);
        if (previousVisitAt === undefined || startedAt - previousVisitAt > sessionTimeoutMs) {
          item.sessions += 1;
        }
        lastVisitByVisitor.set(sessionKey, startedAt);
        item.pageViews += 1;
        metrics.set(date, item);
      });
    return Array.from({ length: 14 }, (_, index) => {
      const offsetDays = 13 - index;
      const date = formatter.format(new Date(now - offsetDays * 24 * 60 * 60 * 1000));
      const item = metrics.get(date);
      return {
        date,
        sessions: item?.sessions ?? 0,
        pageViews: item?.pageViews ?? 0,
      };
    });
  }, [now, visits]);
  const dailyDates = [...new Set([...dailyRegistrations, ...dailyTeams].map((item) => item.date))]
    .sort()
    .slice(-14);

  const resetFilters = () => {
    setDateRange("all");
    setCountry("all");
    setDevice("all");
    setPage("all");
  };

  return (
    <div className="admin-visits">
      <div className="visit-filter-bar">
        <label>
          Період
          <select value={dateRange} onChange={(event) => setDateRange(event.target.value as DateRange)}>
            <option value="today">Сьогодні</option>
            <option value="7d">7 днів</option>
            <option value="30d">30 днів</option>
            <option value="all">Увесь час</option>
          </select>
        </label>
        <label>
          Країна
          <select value={country} onChange={(event) => setCountry(event.target.value)}>
            <option value="all">Усі країни</option>
            {countryOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Пристрій
          <select value={device} onChange={(event) => setDevice(event.target.value)}>
            <option value="all">Усі пристрої</option>
            {deviceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Сторінка
          <select value={page} onChange={(event) => setPage(event.target.value)}>
            <option value="all">Усі сторінки</option>
            {pageOptions.map(([path, title]) => <option value={path} key={path}>{title}</option>)}
          </select>
        </label>
        <button className="button" type="button" onClick={resetFilters}>
          <FilterX size={17} />
          Скинути
        </button>
      </div>

      <div className="visit-stat-grid">
        <div className="visit-stat-card">
          <span>Користувачів сьогодні</span>
          <strong>{todayRows.length}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Активний час сьогодні</span>
          <strong>{formatDuration(todayDuration)}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Унікальних користувачів</span>
          <strong>{rows.length}</strong>
        </div>
        <div className="visit-stat-card">
          <span>Активний час за період</span>
          <strong>{formatDuration(totalDuration)}</strong>
        </div>
      </div>

      <div className="visit-analytics-grid">
        <MetricList title="Популярні сторінки" items={topPages} />
        <MetricList title="Джерела переходів" items={topReferrers} />
        <MetricList title="Країни" items={topCountries} />
        <MetricList title="Міста" items={topCities} />
        <MetricList title="Пристрої" items={topDevices} />
        <MetricList title="Браузери" items={topBrowsers} />
      </div>

      <div className="visit-secondary-grid">
        <section className="visit-ranking-card">
          <h3>Відвідування за останні 14 днів</h3>
          {dailyTraffic.length ? (
            <div className="table-wrap">
              <table className="table compact-table visit-daily-traffic">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Сесії</th>
                    <th>Перегляди сторінок</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTraffic.map((metric) => (
                    <tr key={metric.date}>
                      <td>{formatShortDate(metric.date)}</td>
                      <td><strong>{metric.sessions}</strong></td>
                      <td><strong>{metric.pageViews}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="muted">Даних за цей період немає.</p>}
        </section>

        <section className="visit-ranking-card">
          <h3>Воронка користувача</h3>
          <div className="visit-funnel">
            {funnel.map((stage, index) => {
              const previous = index === 0 ? stage.count : funnel[index - 1]?.count ?? 0;
              const conversion = previous ? Math.round((stage.count / previous) * 100) : 0;
              return (
                <div key={stage.label}>
                  <span>{stage.label}</span>
                  <strong>{stage.count}</strong>
                  {index > 0 ? <small>{conversion}% від попереднього кроку</small> : <small>відвідувачів</small>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="visit-ranking-card">
          <h3>Реєстрації та створені команди</h3>
          <div className="visit-daily-list">
            <div className="visit-daily-head"><span>Дата</span><span>Реєстрації</span><span>Команди</span></div>
            {dailyDates.length ? dailyDates.map((date) => (
              <div key={date}>
                <span>{formatShortDate(date)}</span>
                <strong>{dailyRegistrations.find((item) => item.date === date)?.count ?? 0}</strong>
                <strong>{dailyTeams.find((item) => item.date === date)?.count ?? 0}</strong>
              </div>
            )) : <p className="muted">Даних за цей період немає.</p>}
          </div>
        </section>
      </div>

      <div className="visit-split">
        <div className="visit-table-panel">
          <div className="visit-table-heading">
            <h2>Відвідувачі сайту</h2>
            <span className="muted">Унікальних IP: {rows.length}</span>
          </div>
          <table className="table compact-table visit-table">
            <thead>
              <tr>
                <th>Час входу</th>
                <th>Статус</th>
                <th>IP</th>
                <th>Команда</th>
                <th>Менеджер</th>
                <th>Email</th>
                <th>Країна / місто</th>
                <th>Пристрій</th>
                <th>Браузер / ОС</th>
                <th>Активний час</th>
                <th>Сторінка</th>
                <th>Джерело</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((visit) => {
                const status = visitStatus(visit.lastSeenAt, now);
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
                    <td>{visit.ip ?? "-"}</td>
                    <td>{visit.teamName ?? "-"}</td>
                    <td>{visit.managerName ?? "-"}</td>
                    <td>{visit.email ?? "-"}</td>
                    <td>{visit.countryCity ?? "-"}</td>
                    <td>{visit.device ?? "-"}</td>
                    <td>{visit.browserOs ?? "-"}</td>
                    <td>{formatDuration(visit.durationSeconds)}</td>
                    <td>
                      <span>{visit.pageTitle}</span>
                      <small>{visit.path}</small>
                    </td>
                    <td>{referrerLabel(visit.referrer)}</td>
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
                {selectedVisit.teamName ? <h3>{selectedVisit.teamName}</h3> : null}
                {selectedVisit.managerName || selectedVisit.email ? (
                  <p className="muted">
                    {[selectedVisit.managerName, selectedVisit.email].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
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
                    {page.referrer ? <p>Джерело: {page.referrer}</p> : null}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="muted">Візитів за вибраними фільтрами немає.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

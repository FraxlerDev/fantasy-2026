"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type TeamPresence = {
  id: string;
  name: string;
  manager: string;
  image: string | null;
  lastSeenAt: string | null;
  online: boolean;
};

type PresenceResponse = {
  teams?: TeamPresence[];
  onlineCount?: number;
};

function activityLabel(team: TeamPresence, now: number) {
  if (team.online) return "у мережі";
  if (!team.lastSeenAt) return "активність невідома";

  const minutes = Math.max(1, Math.floor((now - new Date(team.lastSeenAt).getTime()) / 60_000));
  if (minutes < 60) return `активність — ${minutes} хв тому`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `активність — ${hours} год тому`;

  const days = Math.floor(hours / 24);
  return `активність — ${days} дн тому`;
}

export function AdminTeamPresence() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState<TeamPresence[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const response = await fetch("/api/admin/team-presence", { cache: "no-store" }).catch(() => null);
      if (!response?.ok) return;
      const data = await response.json() as PresenceResponse;
      if (cancelled) return;
      setTeams(data.teams ?? []);
      setOnlineCount(data.onlineCount ?? 0);
      setNow(Date.now());
    };

    void load();
    const timer = window.setInterval(load, 5_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const filteredTeams = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("uk");
    if (!normalized) return teams;
    return teams.filter((team) =>
      `${team.name} ${team.manager}`.toLocaleLowerCase("uk").includes(normalized),
    );
  }, [query, teams]);

  return (
    <div className="admin-team-presence" ref={rootRef}>
      {open ? (
        <section className="admin-team-presence-panel" aria-label="Команди користувачів">
          <header>
            <div>
              <h2>Команди</h2>
              <span>{onlineCount} онлайн · {teams.length} повних складів</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Закрити список команд">
              <X size={20} />
            </button>
          </header>

          <label className="admin-team-presence-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Пошук команди або менеджера"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="admin-team-presence-list">
            {filteredTeams.map((team) => (
              <a href={`/teams/${team.id}`} target="_blank" rel="noreferrer" key={team.id}>
                <span className="admin-team-presence-avatar">
                  <img src={team.image || "/user.png"} alt="" />
                  {team.online ? <i aria-label="Онлайн" /> : null}
                </span>
                <span>
                  <strong>{team.name} <small>({team.manager})</small></strong>
                  <em className={team.online ? "online" : ""}>{activityLabel(team, now)}</em>
                </span>
              </a>
            ))}
            {!filteredTeams.length ? <p>Команд не знайдено.</p> : null}
          </div>
        </section>
      ) : null}

      <button
        className="admin-team-presence-trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Команди користувачів: ${onlineCount} онлайн`}
        aria-expanded={open}
      >
        <img src="/user.png" alt="" />
        <span>{onlineCount}</span>
      </button>
    </div>
  );
}

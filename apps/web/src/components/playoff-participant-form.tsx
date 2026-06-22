"use client";

import { RotateCcw, Save, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  resetConfirmedPlayoffTeams,
  saveConfirmedPlayoffTeams,
} from "../app/actions/admin-actions";

type TeamOption = {
  id: string;
  code: string;
  nameUk: string;
  groupKey: string | null;
  flagPath: string | null;
};

function TeamPicker({
  label,
  name,
  teams,
  defaultValue,
}: {
  label: string;
  name: string;
  teams: TeamOption[];
  defaultValue: string | null;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("uk");
    if (!normalized) return teams;
    return teams.filter((team) =>
      team.id === defaultValue ||
      `${team.nameUk} ${team.code} ${team.groupKey ?? ""}`.toLocaleLowerCase("uk").includes(normalized),
    );
  }, [defaultValue, query, teams]);

  return (
    <label className="playoff-team-picker">
      <span>{label}</span>
      <span className="playoff-team-search">
        <Search size={15} />
        <input
          aria-label={`Пошук: ${label}`}
          className="input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Пошук збірної"
          type="search"
          value={query}
        />
      </span>
      <select className="input" defaultValue={defaultValue ?? ""} name={name}>
        <option value="">Ще не визначено</option>
        {filtered.map((team) => (
          <option key={team.id} value={team.id}>
            {team.groupKey ? `Група ${team.groupKey} · ` : ""}{team.nameUk} ({team.code})
          </option>
        ))}
      </select>
    </label>
  );
}

export function PlayoffParticipantForm({
  matchId,
  teams,
  confirmedHomeTeamId,
  confirmedAwayTeamId,
  hasResult,
}: {
  matchId: string;
  teams: TeamOption[];
  confirmedHomeTeamId: string | null;
  confirmedAwayTeamId: string | null;
  hasResult: boolean;
}) {
  return (
    <div className="playoff-participant-editor">
      <div>
        <p className="eyebrow">Підтверджені учасники 1/16</p>
        <h3>Призначити збірні вручну</h3>
        <p className="muted">Можна підтвердити одну збірну зараз, а другу додати пізніше.</p>
      </div>
      <form
        action={saveConfirmedPlayoffTeams}
        className="playoff-participant-form"
        onSubmit={(event) => {
          if (hasResult && !window.confirm("Зміна учасників скине результат цього матчу та залежних матчів. Продовжити?")) {
            event.preventDefault();
          }
        }}
      >
        <input name="matchId" type="hidden" value={matchId} />
        <div className="playoff-participant-pickers">
          <TeamPicker label="Перша збірна" name="confirmedHomeTeamId" teams={teams} defaultValue={confirmedHomeTeamId} />
          <TeamPicker label="Друга збірна" name="confirmedAwayTeamId" teams={teams} defaultValue={confirmedAwayTeamId} />
        </div>
        <button className="button primary" type="submit"><Save size={17} />Зберегти пару</button>
      </form>
      <form
        action={resetConfirmedPlayoffTeams}
        onSubmit={(event) => {
          if (!window.confirm("Скинути обидві збірні, результат матчу та всі залежні результати?")) event.preventDefault();
        }}
      >
        <input name="matchId" type="hidden" value={matchId} />
        <button className="button warning" type="submit"><RotateCcw size={17} />Скинути пару цього матчу</button>
      </form>
    </div>
  );
}

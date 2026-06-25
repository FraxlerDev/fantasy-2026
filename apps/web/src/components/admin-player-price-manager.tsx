"use client";

import { Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { updatePlayerPricesBatch } from "../app/actions/admin-actions";

type PricePlayer = {
  id: string;
  name: string;
  position: string;
  price: number;
  nationalTeamId: string;
  nationalTeamName: string;
  groupKey: string | null;
};

type TeamOption = {
  id: string;
  name: string;
  groupKey: string | null;
  players: PricePlayer[];
};

function positionLabel(position: string) {
  if (position === "GK") return "Воротар";
  if (position === "DEF") return "Захисник";
  if (position === "MID") return "Півзахисник";
  if (position === "FWD") return "Нападник";
  return position;
}

function formatPrice(price: number) {
  return Number(price).toFixed(1);
}

function buildPriceMap(players: PricePlayer[]) {
  return Object.fromEntries(players.map((player) => [player.id, formatPrice(player.price)]));
}

export function AdminPlayerPriceManager({ players }: { players: PricePlayer[] }) {
  const [teamQuery, setTeamQuery] = useState("");
  const [playerQuery, setPlayerQuery] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [localPlayers, setLocalPlayers] = useState(players);

  const teams = useMemo<TeamOption[]>(() => {
    const map = new Map<string, TeamOption>();
    for (const player of localPlayers) {
      const existing = map.get(player.nationalTeamId);
      if (existing) {
        existing.players.push(player);
      } else {
        map.set(player.nationalTeamId, {
          id: player.nationalTeamId,
          name: player.nationalTeamName,
          groupKey: player.groupKey,
          players: [player],
        });
      }
    }
    return [...map.values()].sort((a, b) => {
      const groupCompare = (a.groupKey ?? "").localeCompare(b.groupKey ?? "", "uk");
      return groupCompare || a.name.localeCompare(b.name, "uk");
    });
  }, [localPlayers]);

  const [selectedTeamId, setSelectedTeamId] = useState(() => teams[0]?.id ?? "");
  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? teams[0] ?? null;
  const [prices, setPrices] = useState<Record<string, string>>(() => buildPriceMap(selectedTeam?.players ?? []));

  function selectTeam(team: TeamOption) {
    setSelectedTeamId(team.id);
    setPlayerQuery("");
    setMessage("");
    setError("");
    setPrices(buildPriceMap(team.players));
  }

  const filteredTeams = teams.filter((team) => {
    const query = teamQuery.trim().toLowerCase();
    if (!query) return true;
    return team.name.toLowerCase().includes(query) || (team.groupKey ?? "").toLowerCase().includes(query);
  });

  const visiblePlayers = (selectedTeam?.players ?? []).filter((player) => {
    const query = playerQuery.trim().toLowerCase();
    if (!query) return true;
    return player.name.toLowerCase().includes(query) || positionLabel(player.position).toLowerCase().includes(query);
  });

  function resetPrices() {
    if (!selectedTeam) return;
    if (!window.confirm(`Очистити поля нової ціни для збірної ${selectedTeam.name}?`)) return;
    setPrices(Object.fromEntries(selectedTeam.players.map((player) => [player.id, ""])));
    setMessage("");
    setError("");
  }

  function savePrices() {
    if (!selectedTeam) return;
    if (!window.confirm(`Зберегти нові ціни для всіх гравців збірної ${selectedTeam.name}?`)) return;

    const updates = selectedTeam.players.map((player) => ({
      id: player.id,
      price: String(prices[player.id] ?? "").trim(),
    }));

    if (updates.some((update) => update.price === "" || Number.isNaN(Number(update.price.replace(",", "."))))) {
      setMessage("");
      setError("Заповни коректну нову ціну для кожного гравця обраної збірної.");
      return;
    }

    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await updatePlayerPricesBatch(updates);
      if (!result.ok) {
        setError("Не вдалося зберегти ціни.");
        return;
      }

      const priceById = new Map(updates.map((update) => [update.id, Number(update.price.replace(",", "."))]));
      setLocalPlayers((current) =>
        current.map((player) => (priceById.has(player.id) ? { ...player, price: priceById.get(player.id)! } : player)),
      );
      setPrices((current) => ({ ...current, ...Object.fromEntries(updates.map((update) => [update.id, formatPrice(Number(update.price.replace(",", ".")))])) }));
      setMessage("Ціни збережено");
    });
  }

  if (teams.length === 0) {
    return <p className="muted">Гравців ще немає. Спочатку імпортуй склади.</p>;
  }

  return (
    <div className="admin-price-manager">
      <div className="admin-price-team-panel">
        <label className="search-input">
          <Search size={17} />
          <input
            className="input"
            value={teamQuery}
            onChange={(event) => setTeamQuery(event.target.value)}
            placeholder="Пошук збірної"
          />
        </label>
        <div className="admin-price-team-list">
          {filteredTeams.map((team) => (
            <button
              className={team.id === selectedTeam?.id ? "active" : ""}
              key={team.id}
              type="button"
              onClick={() => selectTeam(team)}
            >
              <span>{team.groupKey ? `Група ${team.groupKey}` : "Без групи"}</span>
              <strong>{team.name}</strong>
              <small>{team.players.length} гравців</small>
            </button>
          ))}
        </div>
      </div>

      <div className="admin-price-editor">
        <div className="section-heading-row">
          <div>
            <h3>{selectedTeam?.name}</h3>
            <p className="muted">Відредагуй ціни потрібних гравців і збережи всю збірну одним натисканням.</p>
          </div>
          <label className="search-input compact">
            <Search size={17} />
            <input
              className="input"
              value={playerQuery}
              onChange={(event) => setPlayerQuery(event.target.value)}
              placeholder="Пошук гравця"
            />
          </label>
        </div>

        <div className="table-wrap">
          <table className="table compact-table admin-price-table">
            <thead>
              <tr>
                <th>Гравець</th>
                <th>Позиція</th>
                <th>Поточна ціна</th>
                <th>Нова ціна</th>
              </tr>
            </thead>
            <tbody>
              {visiblePlayers.map((player) => (
                <tr key={player.id}>
                  <td><strong>{player.name}</strong></td>
                  <td>{positionLabel(player.position)}</td>
                  <td>{formatPrice(player.price)}</td>
                  <td>
                    <input
                      className="input points-input"
                      inputMode="decimal"
                      step="0.5"
                      type="number"
                      value={prices[player.id] ?? ""}
                      onChange={(event) => setPrices((current) => ({ ...current, [player.id]: event.target.value }))}
                    />
                  </td>
                </tr>
              ))}
              {visiblePlayers.length === 0 ? <tr><td colSpan={4}>За пошуком гравців не знайдено.</td></tr> : null}
            </tbody>
          </table>
        </div>

        <div className="toolbar admin-price-actions">
          <button className="button" type="button" onClick={resetPrices} disabled={isPending}>
            Скинути всім ціну
          </button>
          <button className="button primary" type="button" onClick={savePrices} disabled={isPending}>
            {isPending ? "Зберігаю..." : "Зберегти всім ціну"}
          </button>
        </div>
        {message ? <div className="form-success">{message}</div> : null}
        {error ? <div className="form-error">{error}</div> : null}
      </div>
    </div>
  );
}

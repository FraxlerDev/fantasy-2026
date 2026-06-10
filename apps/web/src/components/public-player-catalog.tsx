"use client";

import { RotateCcw, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type PublicPlayer = {
  id: string;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  price: number;
  club: string | null;
  photoUrl: string | null;
  status: string;
  nationName: string;
  nationFlagPath: string | null;
};

const positionLabels = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

const pageSize = 50;

export function PublicPlayerCatalog({ players }: { players: PublicPlayer[] }) {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("");
  const [nation, setNation] = useState("");
  const [club, setClub] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [page, setPage] = useState(1);

  const nations = useMemo(
    () => [...new Set(players.map((player) => player.nationName))].sort((a, b) => a.localeCompare(b, "uk")),
    [players],
  );
  const clubs = useMemo(
    () => [...new Set(players.map((player) => player.club).filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b, "uk")),
    [players],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("uk");
    const normalizedNation = nation.trim().toLocaleLowerCase("uk");
    const normalizedClub = club.trim().toLocaleLowerCase("uk");
    const maxPrice = price ? Number(price) : null;

    return players.filter((player) => {
      if (normalizedQuery && !player.name.toLocaleLowerCase("uk").includes(normalizedQuery)) return false;
      if (position && player.position !== position) return false;
      if (normalizedNation && !player.nationName.toLocaleLowerCase("uk").includes(normalizedNation)) return false;
      if (normalizedClub && !(player.club ?? "").toLocaleLowerCase("uk").includes(normalizedClub)) return false;
      if (maxPrice !== null && player.price > maxPrice) return false;
      if (availability === "AVAILABLE" && player.status !== "AVAILABLE") return false;
      if (availability === "UNAVAILABLE" && player.status === "AVAILABLE") return false;
      return true;
    });
  }, [availability, club, nation, players, position, price, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visiblePlayers = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function resetFilters() {
    setQuery("");
    setPosition("");
    setNation("");
    setClub("");
    setPrice("");
    setAvailability("");
    setPage(1);
  }

  return (
    <section className="panel public-player-catalog">
      <div className="public-catalog-heading">
        <div>
          <h2>Каталог гравців</h2>
          <p className="muted">Знайдено: {filtered.length}</p>
        </div>
        <button className="button" type="button" onClick={resetFilters}>
          <RotateCcw size={17} />
          Скинути фільтри
        </button>
      </div>

      <div className="public-catalog-filters">
        <label className="public-catalog-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(1); }}
            placeholder="Пошук гравця"
          />
        </label>
        <select value={position} onChange={(event) => { setPosition(event.target.value); setPage(1); }}>
          <option value="">Усі позиції</option>
          <option value="GK">Воротарі</option>
          <option value="DEF">Захисники</option>
          <option value="MID">Півзахисники</option>
          <option value="FWD">Нападники</option>
        </select>
        <input
          list="public-nations"
          value={nation}
          onChange={(event) => { setNation(event.target.value); setPage(1); }}
          placeholder="Збірна"
        />
        <datalist id="public-nations">
          {nations.map((item) => <option value={item} key={item} />)}
        </datalist>
        <input
          list="public-clubs"
          value={club}
          onChange={(event) => { setClub(event.target.value); setPage(1); }}
          placeholder="Клуб"
        />
        <datalist id="public-clubs">
          {clubs.map((item) => <option value={item} key={item} />)}
        </datalist>
        <select value={price} onChange={(event) => { setPrice(event.target.value); setPage(1); }}>
          <option value="">Будь-яка ціна</option>
          <option value="10">До 10.0</option>
          <option value="9">До 9.0</option>
          <option value="8">До 8.0</option>
          <option value="7">До 7.0</option>
          <option value="6">До 6.0</option>
          <option value="5">До 5.0</option>
        </select>
        <select value={availability} onChange={(event) => { setAvailability(event.target.value); setPage(1); }}>
          <option value="">Усі статуси</option>
          <option value="AVAILABLE">Доступні</option>
          <option value="UNAVAILABLE">Недоступні</option>
        </select>
      </div>

      <div className="public-player-list">
        <div className="public-player-row public-player-header">
          <span>Гравець</span>
          <span>Позиція</span>
          <span>Збірна</span>
          <span>Клуб</span>
          <span>Ціна</span>
          <span />
        </div>
        {visiblePlayers.map((player) => (
          <article className="public-player-row" key={player.id}>
            <span className="catalog-player">
              <span className="player-photo-wrap small">
                {player.photoUrl ? <img className="player-photo" src={player.photoUrl} alt="" /> : <span className="player-photo placeholder"><UserRound size={18} /></span>}
                {player.nationFlagPath ? <img className="player-photo-flag" src={player.nationFlagPath} alt="" /> : null}
              </span>
              <strong>{player.name}</strong>
            </span>
            <span>{positionLabels[player.position]}</span>
            <span className="team-with-flag">
              {player.nationFlagPath ? <img className="flag" src={player.nationFlagPath} alt="" /> : null}
              {player.nationName}
            </span>
            <span>{player.club ?? "-"}</span>
            <strong>{player.price.toFixed(1)}</strong>
            {player.status === "AVAILABLE" ? (
              <Link className="button" href="/login">Додати</Link>
            ) : (
              <span className="public-player-unavailable">Недоступний</span>
            )}
          </article>
        ))}
        {visiblePlayers.length === 0 ? <p className="muted">За вибраними фільтрами гравців не знайдено.</p> : null}
      </div>

      {pageCount > 1 ? (
        <div className="catalog-pagination">
          <button className="button" type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Назад</button>
          <span className="badge">Сторінка {currentPage} з {pageCount}</span>
          <button className="button" type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Далі</button>
        </div>
      ) : null}
    </section>
  );
}

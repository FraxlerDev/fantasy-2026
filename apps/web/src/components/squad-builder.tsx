"use client";

import type { PlayerPosition } from "@fantasy/shared";
import { AlertTriangle, Pencil, RotateCcw, Save, Search, UserRound, X } from "lucide-react";
import Link from "next/link";
import type { DragEvent, FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveSquad } from "../app/actions/squad-actions";
import { ShareSquadButton } from "./share-squad-button";

export interface SquadPlayer {
  id: string;
  name: string;
  position: PlayerPosition;
  nationCode: string;
  nationName: string;
  nationFlagPath?: string | null;
  club?: string | null;
  clubOriginal?: string | null;
  squadStatus?: string | null;
  photoUrl?: string | null;
  unavailableReason?: string | null;
  price: number;
  status: string;
}

export interface SavedRosterEntry {
  playerId: string;
  slot: "STARTER" | "BENCH";
  benchOrder?: number | null;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export interface SquadFixture {
  id: string;
  matchNo: number | null;
  gameweek: number;
  kickoffAt: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeam: { code: string; nameUk: string; flagPath: string | null };
  awayTeam: { code: string; nameUk: string; flagPath: string | null };
}

export interface SquadUserProfile {
  username?: string | null;
  email?: string | null;
  image?: string | null;
}

const formations: Record<string, { DEF: number; MID: number; FWD: number }> = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { DEF: 5, MID: 4, FWD: 1 },
};

const CATALOG_PAGE_SIZE = 50;

const positionLabels: Record<PlayerPosition, string> = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

const shortPositionLabels: Record<PlayerPosition, string> = {
  GK: "ВРТ",
  DEF: "ЗАХ",
  MID: "ПЗХ",
  FWD: "НАП",
};

const errorMessages: Record<string, string> = {
  "team-name": "Назва команди має містити від 2 до 40 символів.",
  "roster-size": "Потрібно обрати рівно 15 різних футболістів.",
  "lineup-size": "У старті має бути 11 гравців, на лавці - 4.",
  captain: "Оберіть різних капітана і віце-капітана зі стартового складу.",
  players: "Частину гравців не знайдено в базі.",
  formation: "Оберіть доступну схему гри.",
  "formation-shape": "Стартовий склад не відповідає обраній схемі.",
  "deadline-closed": "Дедлайн найближчого туру вже закрито.",
  "transfer-limit": "Після першого збереження можна замінити максимум 3 гравців на тур.",
  "create-team-first": "Спочатку збережіть fantasy-команду.",
  "max-players-per-nation": "Не можна взяти більше 2 футболістів однієї збірної.",
  "budget-exceeded": "Загальна вартість команди не може перевищувати 100 монет.",
};

function pitchRows(formation: string): Array<{ position: PlayerPosition; label: string; slots: number }> {
  const shape = formations[formation] ?? formations["4-3-3"];
  return [
    { position: "FWD", label: positionLabels.FWD, slots: shape.FWD },
    { position: "MID", label: positionLabels.MID, slots: shape.MID },
    { position: "DEF", label: positionLabels.DEF, slots: shape.DEF },
    { position: "GK", label: positionLabels.GK, slots: 1 },
  ];
}

function starterLimits(formation: string) {
  const shape = formations[formation] ?? formations["4-3-3"];
  return { GK: 1, DEF: shape.DEF, MID: shape.MID, FWD: shape.FWD };
}

function byPositionOrder(a: SquadPlayer, b: SquadPlayer) {
  const order: Record<PlayerPosition, number> = { GK: 0, DEF: 1, MID: 2, FWD: 3 };
  return order[a.position] - order[b.position] || a.price - b.price || a.name.localeCompare(b.name, "uk");
}

function formatKickoff(value: string) {
  return new Date(value).toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scoreText(fixture: SquadFixture) {
  if (fixture.homeScore === null || fixture.awayScore === null) return "-";
  return `${fixture.homeScore}:${fixture.awayScore}`;
}

function initials(profile?: SquadUserProfile) {
  const base = profile?.username || profile?.email || "U";
  return base.slice(0, 1).toUpperCase();
}

export function SquadBuilder({
  players,
  fixtures,
  currentGameweek,
  currentDeadline,
  currentStart,
  transferLimit,
  userProfile,
  initialTeamName,
  initialTeamId,
  initialTeamVersion,
  publicTeamUrl,
  initialFormation,
  initialRoster,
  isSignedIn,
  hasProfile,
  error,
  saved,
}: {
  players: SquadPlayer[];
  fixtures: SquadFixture[];
  currentGameweek?: number;
  currentDeadline?: string;
  currentStart?: string;
  transferLimit?: number | null;
  userProfile?: SquadUserProfile;
  initialTeamName?: string;
  initialTeamId?: string;
  initialTeamVersion?: string | number;
  publicTeamUrl?: string;
  initialFormation?: string;
  initialRoster: SavedRosterEntry[];
  isSignedIn: boolean;
  hasProfile: boolean;
  error?: string;
  saved?: boolean;
}) {
  const initialStarters = initialRoster.filter((entry) => entry.slot === "STARTER").map((entry) => entry.playerId);
  const initialBench = initialRoster
    .filter((entry) => entry.slot === "BENCH")
    .sort((a, b) => (a.benchOrder ?? 99) - (b.benchOrder ?? 99))
    .map((entry) => entry.playerId);
  const [teamName, setTeamName] = useState(initialTeamName ?? "Моя команда");
  const [formation, setFormation] = useState(initialFormation ?? "4-3-3");
  const [starters, setStarters] = useState<string[]>(initialStarters);
  const [bench, setBench] = useState<string[]>(initialBench);
  const [captainId, setCaptainId] = useState(initialRoster.find((entry) => entry.isCaptain)?.playerId ?? "");
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("");
  const [nation, setNation] = useState("");
  const [club, setClub] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [catalogPage, setCatalogPage] = useState(1);
  const [view, setView] = useState<"field" | "table">("field");
  const [clientError, setClientError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const allowNavigationRef = useRef(false);

  const initialSquadSignature = useMemo(
    () =>
      JSON.stringify({
        teamName: initialTeamName ?? "Моя команда",
        formation: initialFormation ?? "4-3-3",
        starters: initialStarters,
        bench: initialBench,
        captainId: initialRoster.find((entry) => entry.isCaptain)?.playerId ?? "",
      }),
    [initialBench, initialFormation, initialRoster, initialStarters, initialTeamName],
  );
  const currentSquadSignature = JSON.stringify({ teamName, formation, starters, bench, captainId });
  const hasUnsavedChanges = currentSquadSignature !== initialSquadSignature;

  const playerById = useMemo(() => new Map(players.map((player) => [player.id, player])), [players]);
  const selectedIds = useMemo(() => new Set([...starters, ...bench]), [starters, bench]);
  const selectedPlayers = players.filter((player) => selectedIds.has(player.id));
  const starterPlayers = players.filter((player) => starters.includes(player.id)).sort(byPositionOrder);
  const benchPlayers = bench.map((id) => playerById.get(id)).filter(Boolean) as SquadPlayer[];
  const budgetUsed = selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  const balance = 100 - budgetUsed;
  const selectedNationCodes = new Set(selectedPlayers.map((player) => player.nationCode));
  const hasUnlimitedTransfers = transferLimit === null;
  const nationCounts = selectedPlayers.reduce<Map<string, number>>((counts, player) => {
    counts.set(player.nationCode, (counts.get(player.nationCode) ?? 0) + 1);
    return counts;
  }, new Map());
  const { counts: currentStarterCounts, limits: currentStarterLimits } = countStarters();
  const starterShapeOk =
    currentStarterCounts.GK === currentStarterLimits.GK &&
    currentStarterCounts.DEF === currentStarterLimits.DEF &&
    currentStarterCounts.MID === currentStarterLimits.MID &&
    currentStarterCounts.FWD === currentStarterLimits.FWD;
  const validationItems = [
    { label: "15 гравців у складі", ok: selectedIds.size === 15 },
    { label: `Старт під схему ${formation}: 1 воротар, ${currentStarterLimits.DEF} захисники, ${currentStarterLimits.MID} півзахисники, ${currentStarterLimits.FWD} нападники`, ok: starterShapeOk },
    { label: "Бюджет не більше 100 монет", ok: budgetUsed <= 100 },
    { label: "Не більше 2 гравців з однієї збірної", ok: [...nationCounts.values()].every((count) => count <= 2) },
    { label: "Капітан обраний зі старту", ok: Boolean(captainId && starters.includes(captainId)) },
  ];
  const canSubmit = isSignedIn && hasProfile && validationItems.every((item) => item.ok);
  const selectedFixtures = fixtures.filter(
    (fixture) => selectedNationCodes.has(fixture.homeTeam.code) || selectedNationCodes.has(fixture.awayTeam.code),
  );
  const filteredPlayers = players.filter((player) => {
    const q = query.trim().toLowerCase();
    const selectedNation = nation.trim().toLowerCase();
    const selectedClub = club.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : 0;
    return (
      (!q || player.name.toLowerCase().includes(q)) &&
      (!position || player.position === position) &&
      (!selectedNation || player.nationName.toLowerCase() === selectedNation || player.nationCode.toLowerCase() === selectedNation) &&
      (!selectedClub || (player.club ?? player.clubOriginal ?? "").toLowerCase() === selectedClub) &&
      (!availability || player.status === availability) &&
      (!min || player.price <= min)
    );
  }).sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, "uk"));
  const catalogPageCount = Math.max(1, Math.ceil(filteredPlayers.length / CATALOG_PAGE_SIZE));
  const visiblePlayers = filteredPlayers.slice((catalogPage - 1) * CATALOG_PAGE_SIZE, catalogPage * CATALOG_PAGE_SIZE);
  const nations = [...new Set(players.map((player) => player.nationName))].sort((a, b) => a.localeCompare(b, "uk"));
  const clubs = [...new Set(players.map((player) => player.club ?? player.clubOriginal).filter(Boolean) as string[])].sort((a, b) =>
    a.localeCompare(b, "uk"),
  );

  useEffect(() => {
    setCatalogPage(1);
  }, [availability, club, minPrice, nation, position, query]);

  useEffect(() => {
    if (!hasUnsavedChanges || isSubmitting) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (allowNavigationRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (allowNavigationRef.current) return;
      if (!link || link.target === "_blank" || link.href.startsWith("javascript:")) return;
      if (!window.confirm("Є незбережені зміни складу. Вийти зі сторінки без збереження?")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const onPopState = () => {
      if (allowNavigationRef.current) return;
      if (window.confirm("Є незбережені зміни складу. Вийти зі сторінки без збереження?")) {
        allowNavigationRef.current = true;
        window.history.back();
        return;
      }
      window.history.pushState({ squadGuard: true }, "", window.location.href);
    };

    window.history.pushState({ squadGuard: true }, "", window.location.href);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onDocumentClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onDocumentClick, true);
    };
  }, [hasUnsavedChanges, isSubmitting]);

  function countStarters(ids = starters, currentFormation = formation) {
    const limits = starterLimits(currentFormation);
    const counts: Record<PlayerPosition, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    for (const id of ids) {
      const player = playerById.get(id);
      if (player) counts[player.position] += 1;
    }
    return { counts, limits };
  }

  function canStart(player: SquadPlayer, ids = starters, currentFormation = formation) {
    const { counts, limits } = countStarters(ids, currentFormation);
    return counts[player.position] < limits[player.position] && ids.length < 11;
  }

  function addPlayer(playerId: string) {
    const player = playerById.get(playerId);
    if (!player || selectedIds.has(playerId) || selectedIds.size >= 15) return;
    if (player.status !== "AVAILABLE") {
      setPopupMessage(`${player.name} зараз недоступний: ${player.unavailableReason ?? "травма / дискваліфікація"}. Його не можна додати у склад.`);
      return;
    }
    setClientError("");

    if (budgetUsed + player.price > 100) {
      setPopupMessage(`Ви не можете поставити в склад ${player.name}: команда вийде за межу 100 монет. Видаліть інших гравців або змініть вибір.`);
      return;
    }

    const currentNationCount = selectedPlayers.filter((selectedPlayer) => selectedPlayer.nationCode === player.nationCode).length;
    if (currentNationCount >= 2) {
      setPopupMessage(`Не можна взяти більше 2 гравців зі збірної ${player.nationName}.`);
      return;
    }

    if (canStart(player)) {
      setStarters((current) => [...current, playerId]);
      return;
    }

    if (bench.length < 4) {
      setBench((current) => [...current, playerId]);
      return;
    }

    setClientError("У складі вже 15 гравців. Вилучи когось перед додаванням нового.");
  }

  function removePlayer(playerId: string) {
    setClientError("");
    const initialIds = new Set(initialRoster.map((entry) => entry.playerId));
    const removedInitialCount = initialRoster.filter((entry) => !selectedIds.has(entry.playerId)).length;
    if (!hasUnlimitedTransfers && initialIds.has(playerId) && selectedIds.has(playerId) && removedInitialCount >= (transferLimit ?? 0)) {
      setPopupMessage(`У трансферному вікні можна прибрати максимум ${transferLimit ?? 0} гравців зі збереженого складу.`);
      return;
    }
    setStarters((current) => current.filter((id) => id !== playerId));
    setBench((current) => current.filter((id) => id !== playerId));
    if (captainId === playerId) setCaptainId("");
  }

  function movePlayer(playerId: string, target: "STARTER" | "BENCH") {
    const player = playerById.get(playerId);
    if (!player) return;
    setClientError("");

    if (!selectedIds.has(playerId)) {
      addPlayer(playerId);
      return;
    }

    if (target === "STARTER") {
      if (starters.includes(playerId)) return;
      const nextStarters = [...starters, playerId];
      if (!canStart(player, starters)) {
        setClientError(`У схемі ${formation} вже заповнено позицію ${positionLabels[player.position]}.`);
        return;
      }
      setBench((current) => current.filter((id) => id !== playerId));
      setStarters(nextStarters);
      return;
    }

    if (bench.includes(playerId)) return;
    if (bench.length >= 4) {
      setClientError("Лавка вже заповнена: потрібно 4 запасних.");
      return;
    }
    setStarters((current) => current.filter((id) => id !== playerId));
    setBench((current) => [...current, playerId]);
    if (captainId === playerId) setCaptainId("");
  }

  function applyFormation(nextFormation: string) {
    const limits = starterLimits(nextFormation);
    const nextStarters: string[] = [];
    const overflow: string[] = [];
    const counts: Record<PlayerPosition, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };

    for (const playerId of starters) {
      const player = playerById.get(playerId);
      if (!player) continue;
      if (counts[player.position] < limits[player.position]) {
        counts[player.position] += 1;
        nextStarters.push(playerId);
      } else {
        overflow.push(playerId);
      }
    }

    if (bench.length + overflow.length > 4) {
      setClientError("Щоб змінити схему, спочатку звільни місце на лавці для зайвих гравців старту.");
      return;
    }

    setFormation(nextFormation);
    setStarters(nextStarters);
    setBench((current) => [...current, ...overflow]);
    if (captainId && !nextStarters.includes(captainId)) setCaptainId("");
    setClientError("");
  }

  function onDrop(event: DragEvent<HTMLElement>, target: "STARTER" | "BENCH") {
    event.preventDefault();
    const playerId = event.dataTransfer.getData("text/plain");
    if (playerId) movePlayer(playerId, target);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!isSignedIn || !hasProfile) return;

    const failedItems = validationItems.filter((item) => !item.ok);
    if (failedItems.length === 0 && currentGameweek) {
      allowNavigationRef.current = true;
      setIsSubmitting(true);
      return;
    }

    event.preventDefault();
    setIsSubmitting(false);
    if (!currentGameweek) {
      setPopupMessage("Трансфери зараз закриті. Дочекайся відкриття наступного GW адміністратором.");
      return;
    }
    setPopupMessage(`Щоб зберегти склад, виправ ці пункти:\n${failedItems.map((item) => `• ${item.label}`).join("\n")}`);
  }

  function playerChip(player: SquadPlayer, label?: string) {
    return (
      <div
        className={`fantasy-shirt filled ${player.status !== "AVAILABLE" ? "unavailable" : ""}`}
        draggable
        key={player.id}
        onDragStart={(event) => event.dataTransfer.setData("text/plain", player.id)}
        title={player.status !== "AVAILABLE" ? `Недоступний: ${player.unavailableReason ?? "потрібна заміна"}` : "Гравець у складі"}
      >
        <button className="remove-player-button" type="button" onClick={() => removePlayer(player.id)} aria-label={`Вилучити ${player.name}`}>
          <X size={13} />
        </button>
        <span
          className="player-photo-wrap"
        >
          {player.photoUrl ? <img alt="" className="player-photo" src={player.photoUrl} /> : <span className="player-photo placeholder"><UserRound size={24} /></span>}
          {player.nationFlagPath ? <img alt="" className="player-photo-flag" src={player.nationFlagPath} /> : null}
        </span>
        {player.id === captainId ? <span className="captain-mark">К</span> : null}
        <strong>{player.name}</strong>
        <em>{label ?? shortPositionLabels[player.position]}</em>
        <span className="player-price-badge">{player.price.toFixed(1)}</span>
        {player.status !== "AVAILABLE" ? <span className="unavailable-mark"><AlertTriangle size={12} />{player.unavailableReason?.toLowerCase().includes("черв") ? "ЧК" : "ТР"}</span> : null}
      </div>
    );
  }

  function emptySlot(key: string, label: string, target: "STARTER" | "BENCH") {
    return (
      <div className="fantasy-shirt empty" key={key} onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, target)}>
        <span className="shirt-icon" />
        <strong>{label}</strong>
      </div>
    );
  }

  function visualSquad() {
    return (
      <>
        <section className="fixed-pitch" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, "STARTER")}>
          {pitchRows(formation).map((row) => {
            const rowPlayers = starterPlayers.filter((player) => player.position === row.position);
            return (
              <div className={`fixed-pitch-row slots-${row.slots}`} key={row.position}>
                {Array.from({ length: row.slots }, (_, index) => {
                  const player = rowPlayers[index];
                  return player ? playerChip(player, row.label) : emptySlot(`${row.position}-${index}`, row.label, "STARTER");
                })}
              </div>
            );
          })}
        </section>

        <div className="fixed-bench" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, "BENCH")}>
          {Array.from({ length: 4 }, (_, index) => {
            const player = benchPlayers[index];
            return player ? playerChip(player, "Лавка") : emptySlot(`bench-${index}`, "Лавка", "BENCH");
          })}
        </div>
      </>
    );
  }

  return (
    <form action={saveSquad} onSubmit={onSubmit}>
      {popupMessage ? (
        <div className="modal-backdrop" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="squad-popup-title">
            <h2 id="squad-popup-title">Обмеження складу</h2>
            <p>{popupMessage}</p>
            <button className="button primary" type="button" onClick={() => setPopupMessage("")}>
              Закрити
            </button>
          </div>
        </div>
      ) : null}

      <input type="hidden" name="starters" value={starters.join(",")} />
      <input type="hidden" name="bench" value={bench.join(",")} />
      <input type="hidden" name="captainId" value={captainId} />
      <input type="hidden" name="formation" value={formation} />
      <input type="hidden" name="teamName" value={teamName} />

      <div className="squad-top-row">
      <section className="squad-profile panel">
        <div className="squad-profile-header">
          <div>
            <p className="eyebrow">Фентезі Команда</p>
            <div className="squad-profile-row">
              <div className="squad-avatar">
                {userProfile?.image ? <img alt="" src={userProfile.image} /> : <span>{initials(userProfile)}</span>}
              </div>
              <div>
                <div className="team-title-row">
                  <h1>{teamName}</h1>
                  <button className="icon-button" type="button" onClick={() => setIsEditingTeam((value) => !value)} aria-label="Редагувати команду">
                    <Pencil size={16} />
                  </button>
                </div>
                <p className="muted">
                  Менеджер: <strong>{userProfile?.username ?? "Гість"}</strong>
                  {userProfile?.email ? ` · ${userProfile.email}` : ""}
                </p>
              </div>
            </div>
          </div>
          {publicTeamUrl ? <Link className="button" href={publicTeamUrl}>Публічна сторінка</Link> : null}
        </div>
        {isEditingTeam ? (
          <div className="team-edit-panel">
            <div className="team-edit-grid">
              <label>Назва команди<input className="input" value={teamName} onChange={(event) => setTeamName(event.target.value)} minLength={2} maxLength={40} /></label>
              <label>Нік менеджера<input className="input" name="username" defaultValue={userProfile?.username ?? ""} minLength={3} maxLength={24} /></label>
              <label className="file-field">Фото до 200 КБ<input className="input" name="avatar" type="file" accept="image/png,image/jpeg,image/webp" /></label>
            </div>
            <div className="team-edit-actions">
              <button className="button primary" type="submit" disabled={!isSignedIn || !hasProfile || !currentGameweek}>
                <Save size={18} />
                Зберегти дані
              </button>
              <button className="button" type="button" onClick={() => setIsEditingTeam(false)}>Скасувати</button>
            </div>
          </div>
        ) : null}
      </section>

      </div>

      <div className="topbar">
        <div>
          <h1>Склад команди</h1>
          <p className="muted">Додавай гравців кнопкою або перетягуй їх на поле чи лавку.</p>
        </div>
        <div className="toolbar">
          {hasUnsavedChanges ? <span className="unsaved-indicator"><AlertTriangle size={16} />Є незбережені зміни</span> : null}
          {initialTeamId ? <ShareSquadButton teamId={initialTeamId} version={initialTeamVersion} /> : null}
            <button
              className="button primary"
              type="submit"
              disabled={!isSignedIn || !hasProfile || !currentGameweek || Boolean(initialTeamId && !hasUnsavedChanges)}
            >
            <Save size={18} />
            {initialTeamId && !hasUnsavedChanges ? "Збережено" : "Зберегти зміни"}
          </button>
        </div>
      </div>

      {!isSignedIn ? <div className="form-error">Увійди через Google, щоб зберегти команду.</div> : null}
      {isSignedIn && !hasProfile ? <div className="form-error">Заверши onboarding, щоб зберегти команду.</div> : null}
      {error ? <div className="form-error">Помилка збереження: {errorMessages[error] ?? error}</div> : null}
      {clientError ? <div className="form-error">{clientError}</div> : null}
      {saved ? <div className="form-success">Команду збережено.</div> : null}

      <div className="squad-workspace">
        <div className="squad-workspace-main">
          <section className="panel squad-field-panel">
          <nav className="squad-tabs" aria-label="Вигляд складу">
            <button className={view === "field" ? "active" : ""} type="button" onClick={() => setView("field")}>Поле</button>
            <button className={view === "table" ? "active" : ""} type="button" onClick={() => setView("table")}>Таблиця</button>
            <label className="formation-control">
              <span>Схема:</span>
              <select className="input" value={formation} onChange={(event) => applyFormation(event.target.value)} aria-label="Схема гри">
                {Object.keys(formations).map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))}
              </select>
            </label>
          </nav>

          {view === "field" ? (
            visualSquad()
          ) : (
            <table className="table compact-table">
              <thead><tr><th>Гравець</th><th>Позиція</th><th>Збірна</th><th>Клуб</th><th>Ціна</th><th>Слот</th></tr></thead>
              <tbody>
                {[...starterPlayers, ...benchPlayers].map((player) => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{positionLabels[player.position]}</td>
                    <td>{player.nationName}</td>
                    <td>{player.club ?? player.clubOriginal ?? "-"}</td>
                    <td>{player.price.toFixed(1)}</td>
                    <td>{starters.includes(player.id) ? "Старт" : "Лавка"}</td>
                  </tr>
                ))}
                {selectedPlayers.length === 0 ? <tr><td colSpan={6}>Гравців ще не вибрано.</td></tr> : null}
              </tbody>
            </table>
          )}

          </section>

        <section className="squad-summary panel" style={{ marginTop: 16 }}>
          <h2>Інформація</h2>
          <dl className="squad-meta">
            <dt>Поточний тур</dt><dd>{currentGameweek ? `GW${currentGameweek}` : "-"}</dd>
            <dt>Старт GW</dt><dd>{currentStart ? formatKickoff(currentStart) : "-"}</dd>
            <dt>Дедлайн</dt><dd>{currentDeadline ? formatKickoff(currentDeadline) : "-"}</dd>
            <dt>Обрано</dt><dd>{selectedIds.size}/15</dd>
            <dt>Старт</dt><dd>{starters.length}/11</dd>
            <dt>Лавка</dt><dd>{bench.length}/4</dd>
            <dt>Вартість</dt><dd>{budgetUsed.toFixed(1)}</dd>
            <dt>Баланс</dt><dd>{balance.toFixed(1)}</dd>
            <dt>Трансфери</dt><dd>{hasUnlimitedTransfers ? "Безліміт" : transferLimit ?? "-"}</dd>
            <dt>Схема</dt><dd>{formation}</dd>
          </dl>

          <div className="captain-grid">
            <label>
              Капітан
              <select className="input" value={captainId} onChange={(event) => setCaptainId(event.target.value)}>
                <option value="">Обери</option>
                {starterPlayers.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
              </select>
            </label>
          </div>

          <ul className="validation-list">
            {validationItems.map((item) => (
              <li className={item.ok ? "ok" : "bad"} key={item.label}>
                <span>{item.ok ? "✓" : "!"}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Матчі туру</h2>
        <table className="table compact-table">
          <thead><tr><th>Дата</th><th>Господарі</th><th>Рахунок</th><th>Гості</th></tr></thead>
          <tbody>
            {selectedFixtures.map((fixture) => (
              <tr key={fixture.id}>
                <td>{formatKickoff(fixture.kickoffAt)}</td>
                <td>{fixture.homeTeam.nameUk}</td>
                <td><strong>{scoreText(fixture)}</strong></td>
                <td>{fixture.awayTeam.nameUk}</td>
              </tr>
            ))}
            {selectedFixtures.length === 0 ? <tr><td colSpan={4}>Матчі з'являться після вибору гравців поточного туру.</td></tr> : null}
          </tbody>
        </table>
      </section>
        </div>

      <section className="panel player-catalog-panel">
        <h2>Каталог гравців</h2>
        <div className="catalog-summary">
          <strong>Знайдено: {filteredPlayers.length}</strong>
          <button
            className="button"
            type="button"
            onClick={() => {
              setQuery("");
              setPosition("");
              setNation("");
              setClub("");
              setMinPrice("");
              setAvailability("");
            }}
          >
            <RotateCcw size={16} />
            Скинути фільтри
          </button>
        </div>
        <div className="catalog-table-panel">
        <div className="filters">
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 10, top: 12 }} />
            <input className="input" style={{ width: "100%", paddingLeft: 34 }} placeholder="Пошук гравця" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <select className="input" value={position} onChange={(event) => setPosition(event.target.value)}>
            <option value="">Позиція</option>
            <option value="GK">Воротар</option>
            <option value="DEF">Захисник</option>
            <option value="MID">Півзахисник</option>
            <option value="FWD">Нападник</option>
          </select>
          <input className="input" list="nation-filter-list" value={nation} onChange={(event) => setNation(event.target.value)} placeholder="Збірна" />
          <datalist id="nation-filter-list">
            {nations.map((item) => <option value={item} key={item} />)}
          </datalist>
          <input className="input" list="club-filter-list" value={club} onChange={(event) => setClub(event.target.value)} placeholder="Клуб" />
          <datalist id="club-filter-list">
            {clubs.map((item) => <option value={item} key={item} />)}
          </datalist>
          <select className="input" value={minPrice} onChange={(event) => setMinPrice(event.target.value)}>
            <option value="">Ціна</option>
            <option value="10">10-</option>
            <option value="9">9-</option>
            <option value="8">8-</option>
            <option value="7">7-</option>
            <option value="6">6-</option>
            <option value="5">5-</option>
          </select>
          <select className="input" value={availability} onChange={(event) => setAvailability(event.target.value)}>
            <option value="">Усі статуси</option>
            <option value="AVAILABLE">Доступні</option>
            <option value="DOUBTFUL">Під питанням</option>
            <option value="OUT">Недоступні</option>
            <option value="ELIMINATED">Вибули з турніру</option>
          </select>
        </div>
        <table className="table">
          <thead><tr><th>Гравець</th><th>Поз.</th><th>Збірна</th><th>Клуб</th><th>Ціна</th><th></th></tr></thead>
          <tbody>
            {visiblePlayers.map((player) => (
              <tr key={player.id} draggable={player.status === "AVAILABLE" || selectedIds.has(player.id)} onDragStart={(event) => event.dataTransfer.setData("text/plain", player.id)}>
                <td>
                  <span className="catalog-player">
                    <span className="player-photo-wrap small">
                      {player.photoUrl ? <img alt="" className="player-photo" src={player.photoUrl} /> : <span className="player-photo placeholder"><UserRound size={18} /></span>}
                      {player.nationFlagPath ? <img alt="" className="player-photo-flag" src={player.nationFlagPath} /> : null}
                    </span>
                    {player.name}
                    {player.status !== "AVAILABLE" ? (
                      <span className="unavailable-mark inline"><AlertTriangle size={12} />{player.unavailableReason?.toLowerCase().includes("черв") ? "ЧК" : "ТР"}</span>
                    ) : null}
                  </span>
                </td>
                <td>{positionLabels[player.position]}</td>
                <td className="team-with-flag">
                  {player.nationFlagPath ? <img alt="" className="flag" src={player.nationFlagPath} /> : null}
                  {player.nationName}
                </td>
                <td>{player.club ?? player.clubOriginal ?? "-"}</td>
                <td>{player.price.toFixed(1)}</td>
                <td>
                  <button
                    className={selectedIds.has(player.id) ? "button selected-player-button" : "button"}
                    type="button"
                    disabled={selectedIds.has(player.id) || player.status !== "AVAILABLE"}
                    onClick={() => addPlayer(player.id)}
                  >
                    {selectedIds.has(player.id) ? "Вже у складі" : player.status !== "AVAILABLE" ? "Недоступний" : "Додати"}
                  </button>
                </td>
              </tr>
            ))}
            {visiblePlayers.length === 0 ? <tr><td colSpan={6}>За вибраними фільтрами гравців не знайдено.</td></tr> : null}
          </tbody>
        </table>
        {catalogPageCount > 1 ? (
          <div className="catalog-pagination">
            <button className="button" type="button" disabled={catalogPage === 1} onClick={() => setCatalogPage((page) => Math.max(1, page - 1))}>Назад</button>
            <span className="badge">Сторінка {catalogPage} з {catalogPageCount}</span>
            <button className="button" type="button" disabled={catalogPage === catalogPageCount} onClick={() => setCatalogPage((page) => Math.min(catalogPageCount, page + 1))}>Далі</button>
          </div>
        ) : null}
        </div>
      </section>
      </div>
    </form>
  );
}

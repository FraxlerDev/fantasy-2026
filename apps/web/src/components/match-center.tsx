"use client";

import { CalendarDays, MapPin, Trophy, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Team = {
  id: string;
  nameUk: string;
  groupKey: string | null;
  flagPath: string | null;
};

type Standing = {
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

type Match = {
  id: string;
  matchNo: number;
  stage: string;
  gameweek: number | null;
  groupName: string | null;
  kickoffAt: string;
  home: Team | null;
  away: Team | null;
  homeLabel: string;
  awayLabel: string;
  homeScore: number | null;
  awayScore: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  stadiumId: string | null;
  city: string | null;
};

type PlayerStat = {
  id: string;
  name: string;
  photoUrl: string | null;
  position: string;
  club: string | null;
  price: number;
  status: string;
  unavailableReason: string | null;
  fantasyPoints: number;
  pointMatches: number;
  selectedBy: number;
};

type TeamProfile = Team & {
  players: PlayerStat[];
};

type Stadium = {
  id: string;
  country: string;
  region: string;
  city: string;
  name: string;
  capacity: number;
  imagePath: string;
  coordinates: { lat: number; lng: number };
};

type ThirdRow = Standing & {
  group: string;
  rank: number;
  qualified: boolean;
};

type Props = {
  groups: Array<{ key: string; rows: Standing[] }>;
  thirds: ThirdRow[];
  matches: Match[];
  teamProfiles: TeamProfile[];
  stadiums: Stadium[];
  initialTab?: (typeof tabs)[number]["id"];
  initialCalendarStage?: CalendarStage;
};

const tabs = [
  { id: "playoff", label: "Плей-оф", icon: Trophy },
  { id: "groups", label: "Групи", icon: Users },
  { id: "calendar", label: "Календар", icon: CalendarDays },
  { id: "stadiums", label: "Стадіони", icon: MapPin },
] as const;

const calendarStageTabs = [
  { id: "all", label: "Усі матчі" },
  { id: "gw1", label: "1 тур" },
  { id: "gw2", label: "2 тур" },
  { id: "gw3", label: "3 тур" },
  { id: "r32", label: "1/16 фіналу" },
  { id: "r16", label: "1/8 фіналу" },
  { id: "qf", label: "1/4 фіналу" },
  { id: "sf", label: "1/2 фіналу" },
  { id: "third", label: "Матч за 3-тє місце" },
  { id: "final", label: "Фінал" },
] as const;

type CalendarStage = (typeof calendarStageTabs)[number]["id"];

function calendarStageForMatch(match: Match): CalendarStage | null {
  if (match.gameweek && match.gameweek >= 1 && match.gameweek <= 3) return `gw${match.gameweek}` as CalendarStage;
  if (match.id === "third-1") return "third";
  if (match.id === "final-1") return "final";
  if (["r32", "r16", "qf", "sf"].includes(match.stage)) return match.stage as CalendarStage;
  return null;
}

const stageTitles: Record<string, string> = {
  r32: "1/16 фіналу",
  r16: "1/8 фіналу",
  qf: "Чвертьфінали",
  sf: "Півфінали",
  final: "Фінал і матч за 3-тє місце",
};

const positionLabels: Record<string, string> = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

function formatKickoff(value: string) {
  return new Date(value).toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function compactKickoff(value: string) {
  const date = new Date(value);
  return {
    date: date.toLocaleDateString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
    }),
    time: date.toLocaleTimeString("uk-UA", {
      timeZone: "Europe/Kyiv",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function scoreText(match: Match) {
  if (match.homeScore === null || match.awayScore === null) return "–";
  const score = `${match.homeScore}:${match.awayScore}`;
  if (match.homeScore === match.awayScore && match.homePenalties !== null && match.awayPenalties !== null) {
    return `${score} (${match.homePenalties}:${match.awayPenalties} пен.)`;
  }
  return score;
}

function compactSlot(label: string) {
  const matchNumber = label.match(/(\d+)\s*$/)?.[1];
  if (matchNumber && /РџРµСЂРµРјРѕР¶|Перемож/i.test(label)) return `П${matchNumber}`;
  if (matchNumber && /РџСЂРѕРіСЂР°РІ|Програв/i.test(label)) return `ПР${matchNumber}`;
  return label.replaceAll("/", "·");
}

function PlayoffTeam({ team, fallback, score }: { team: Team | null; fallback: string; score: number | null }) {
  return (
    <span className="bracket-team">
      <span className="bracket-team-name">
        {team?.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : <i className="bracket-placeholder" />}
        <span>{team?.nameUk ?? compactSlot(fallback)}</span>
      </span>
      <strong>{score ?? "–"}</strong>
    </span>
  );
}

function PlayoffCard({ match, className, onOpen }: { match: Match; className: string; onOpen: (id: string) => void }) {
  const kickoff = compactKickoff(match.kickoffAt);
  const specialLabel = className.includes("final-match")
    ? "Фінал"
    : className.includes("third-match")
      ? "Матч за 3-тє місце"
      : null;
  return (
    <button className={`bracket-match ${className}`} type="button" onClick={() => onOpen(match.id)}>
      {specialLabel ? <span className="bracket-special-label">{specialLabel}</span> : null}
      <PlayoffTeam team={match.home} fallback={match.homeLabel} score={match.homeScore} />
      <PlayoffTeam team={match.away} fallback={match.awayLabel} score={match.awayScore} />
      <small>{kickoff.date} · {kickoff.time}</small>
      {match.homePenalties !== null && match.awayPenalties !== null ? <em>пен. {match.homePenalties}:{match.awayPenalties}</em> : null}
    </button>
  );
}

function PlayoffBracket({ matches, onOpen }: { matches: Match[]; onOpen: (id: string) => void }) {
  const byId = new Map(matches.map((match) => [match.id, match]));
  const cards: Array<{ id: string; className: string }> = [];
  for (let index = 1; index <= 8; index += 1) cards.push({ id: `r32-${index}`, className: `r32 left slot-${index}` });
  for (let index = 1; index <= 4; index += 1) cards.push({ id: `r16-${index}`, className: `r16 left slot-${index}` });
  for (let index = 1; index <= 2; index += 1) cards.push({ id: `qf-${index}`, className: `qf left slot-${index}` });
  cards.push({ id: "sf-1", className: "sf left slot-1" });
  for (let index = 9; index <= 16; index += 1) cards.push({ id: `r32-${index}`, className: `r32 right slot-${index - 8}` });
  for (let index = 5; index <= 8; index += 1) cards.push({ id: `r16-${index}`, className: `r16 right slot-${index - 4}` });
  for (let index = 3; index <= 4; index += 1) cards.push({ id: `qf-${index}`, className: `qf right slot-${index - 2}` });
  cards.push({ id: "sf-2", className: "sf right slot-1" });
  cards.push({ id: "final-1", className: "final-match" }, { id: "third-1", className: "third-match" });

  return (
    <div className="playoff-bracket-scroll" aria-label="Турнірна сітка плей-оф">
      <div className="playoff-tree">
        <svg className="playoff-connectors" viewBox="0 0 1560 900" aria-hidden="true">
          {[0, 1, 2, 3].map((pair) => { const y1 = 70 + pair * 210; const y2 = y1 + 105; const parent = (y1 + y2) / 2; return <path key={`l1-${pair}`} d={`M155 ${y1}H180V${y2}M180 ${parent}H205M155 ${y2}H180`} />; })}
          {[0, 1].map((pair) => { const y1 = 122.5 + pair * 420; const y2 = y1 + 210; const parent = (y1 + y2) / 2; return <path key={`l2-${pair}`} d={`M340 ${y1}H365V${y2}M365 ${parent}H390M340 ${y2}H365`} />; })}
          <path d="M525 227.5H550V647.5M550 437.5H575M525 647.5H550" />
          {[0, 1, 2, 3].map((pair) => { const y1 = 70 + pair * 210; const y2 = y1 + 105; const parent = (y1 + y2) / 2; return <path key={`r1-${pair}`} d={`M1405 ${y1}H1380V${y2}M1380 ${parent}H1355M1405 ${y2}H1380`} />; })}
          {[0, 1].map((pair) => { const y1 = 122.5 + pair * 420; const y2 = y1 + 210; const parent = (y1 + y2) / 2; return <path key={`r2-${pair}`} d={`M1220 ${y1}H1195V${y2}M1195 ${parent}H1170M1220 ${y2}H1195`} />; })}
          <path d="M1035 227.5H1010V647.5M1010 437.5H985M1035 647.5H1010" />
          <path d="M710 437.5H740V345H705M850 437.5H820V345H855M710 437.5H740V605H705M850 437.5H820V605H855" />
        </svg>
        {cards.map(({ id, className }) => { const match = byId.get(id); return match ? <PlayoffCard key={id} match={match} className={className} onOpen={onOpen} /> : null; })}
        <div className="bracket-champion"><Trophy size={42} /><strong>ПЕРЕМОЖЕЦЬ</strong></div>
        {(["r32", "r16", "qf", "sf"] as const).flatMap((stage) => ["left", "right"].map((side) => (
          <span className={`bracket-round-label ${side} ${stage}-label`} key={`${side}-${stage}`}>
            {stage === "r32" ? "1/16 фіналу" : stage === "r16" ? "1/8 фіналу" : stage === "qf" ? "1/4 фіналу" : "1/2 фіналу"}
          </span>
        )))}
      </div>
    </div>
  );
}

function TeamButton({ team, fallback, onSelect }: { team: Team | null; fallback: string; onSelect: (id: string) => void }) {
  if (!team) return <span className="match-team unresolved">{fallback}</span>;
  return (
    <button className="match-team" type="button" onClick={() => onSelect(team.id)}>
      {team.flagPath ? <img alt="" className="flag" src={team.flagPath} /> : null}
      <span>{team.nameUk}</span>
    </button>
  );
}

function GroupMatchCard({
  groupKey,
  standings,
  matches,
  onSelectTeam,
  onSelectStadium,
}: {
  groupKey: string;
  standings: Standing[];
  matches: Match[];
  onSelectTeam: (id: string) => void;
  onSelectStadium: (id: string) => void;
}) {
  const [activeView, setActiveView] = useState<"table" | 1 | 2 | 3>("table");

  return (
    <article className="reference-group-card">
      <header className="reference-group-header">
        <h3>Група {groupKey}</h3>
        <div className="reference-rounds" aria-label={`Таблиця і тури групи ${groupKey}`}>
          <button
            className={activeView === "table" ? "active" : ""}
            onClick={() => setActiveView("table")}
            type="button"
          >
            Таблиця
          </button>
          {[1, 2, 3].map((round) => (
            <button
              className={activeView === round ? "active" : ""}
              key={round}
              onClick={() => setActiveView(round as 1 | 2 | 3)}
              type="button"
            >
              {round} тур
            </button>
          ))}
        </div>
      </header>
      {activeView === "table" ? (
        <div className="reference-group-table">
          <div className="reference-group-table-head">
            <span>#</span><span>Збірна</span><span>І</span><span>В</span><span>Н</span>
            <span>П</span><span>М</span><span>РМ</span><span>О</span>
          </div>
          {standings.map((row, index) => (
            <button
              className={index < 2 ? "qualified" : index === 2 ? "third" : ""}
              key={row.team.id}
              onClick={() => onSelectTeam(row.team.id)}
              type="button"
            >
              <strong>{index + 1}</strong>
              <span className="reference-standing-team">
                {row.team.flagPath ? <img alt="" className="flag" src={row.team.flagPath} /> : null}
                <b>{row.team.nameUk}</b>
              </span>
              <span>{row.played}</span>
              <span>{row.wins}</span>
              <span>{row.draws}</span>
              <span>{row.losses}</span>
              <span>{row.goalsFor}-{row.goalsAgainst}</span>
              <span>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</span>
              <strong>{row.points}</strong>
            </button>
          ))}
        </div>
      ) : (
        <div className="reference-group-matches">
          {matches.map((match) => {
            const kickoff = compactKickoff(match.kickoffAt);
            return (
              <div
                className={`reference-match-row ${match.gameweek === activeView ? "active-round" : ""}`}
                key={match.id}
              >
                <time>
                  <span>{kickoff.date}</span>
                  <strong>{kickoff.time}</strong>
                </time>
                {match.stadiumId ? (
                  <button
                    className="reference-stadium-button"
                    title="Відкрити стадіон"
                    type="button"
                    onClick={() => onSelectStadium(match.stadiumId!)}
                  >
                    <MapPin size={15} />
                  </button>
                ) : <span className="reference-stadium-spacer" />}
                <TeamButton team={match.home} fallback={match.homeLabel} onSelect={onSelectTeam} />
                <div className="reference-score" aria-label={`Рахунок ${match.homeLabel} — ${match.awayLabel}`}>
                  <span>{match.homeScore ?? ""}</span>
                  <b>:</b>
                  <span>{match.awayScore ?? ""}</span>
                </div>
                <TeamButton team={match.away} fallback={match.awayLabel} onSelect={onSelectTeam} />
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

function loadExternalScript(src: string, globalName: string) {
  const browserWindow = window as unknown as Record<string, unknown>;
  if (browserWindow[globalName]) return Promise.resolve(browserWindow[globalName]);
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(browserWindow[globalName]), { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(browserWindow[globalName]);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function ReferenceStadiumMap({
  stadiums,
  onSelect,
}: {
  stadiums: Stadium[];
  onSelect: (id: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
  const mapApiRef = useRef<{ zoomIn: () => void; zoomOut: () => void; reset: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const renderMap = async () => {
      try {
        await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", "d3");
        await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js", "topojson");
        if (cancelled || !svgRef.current) return;

        const globals = window as unknown as { d3: any; topojson: any };
        const { d3, topojson } = globals;
        const [world, usAtlas] = await Promise.all([
          fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json").then((response) => response.json()),
          fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then((response) => response.json()),
        ]);
        if (cancelled || !svgRef.current) return;

        const width = 960;
        const height = 580;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const projection = d3.geoConicConformal()
          .parallels([29.5, 70.5])
          .rotate([100, 0])
          .center([0, 40])
          .scale(660)
          .translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);
        const mapGroup = svg.append("g");
        const zoom = d3.zoom().scaleExtent([0.8, 8]).on("zoom", (event: any) => {
          mapGroup.attr("transform", event.transform);
        });
        svg.call(zoom);
        mapApiRef.current = {
          zoomIn: () => svg.transition().duration(240).call(zoom.scaleBy, 1.45),
          zoomOut: () => svg.transition().duration(240).call(zoom.scaleBy, 0.7),
          reset: () => svg.transition().duration(280).call(zoom.transform, d3.zoomIdentity),
        };

        const countries = topojson.feature(world, world.objects.countries).features;
        const hostIds = ["840", "124", "484"];
        mapGroup.append("rect").attr("width", width).attr("height", height).attr("fill", "#dce8ee");
        mapGroup.append("g").selectAll("path")
          .data(countries.filter((country: any) => !hostIds.includes(String(country.id))))
          .enter().append("path")
          .attr("d", path)
          .attr("fill", "#f4f8fa")
          .attr("stroke", "#c6d4db")
          .attr("stroke-width", 0.35);
        mapGroup.append("g").selectAll("path")
          .data(countries.filter((country: any) => hostIds.includes(String(country.id))))
          .enter().append("path")
          .attr("d", path)
          .attr("fill", (country: any) => ({ "840": "#e5eef2", "124": "#e7f2ed", "484": "#e7f1ec" }[String(country.id)]))
          .attr("stroke", "#9db0bb")
          .attr("stroke-width", 0.75);

        const usStates = topojson.feature(usAtlas, usAtlas.objects.states).features;
        mapGroup.append("g").selectAll("path")
          .data(usStates)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "rgba(38,53,65,0.2)")
          .attr("stroke-width", 0.65)
          .attr("vector-effect", "non-scaling-stroke");

        mapGroup.append("path")
          .datum(topojson.mesh(world, world.objects.countries, (a: any, b: any) => a !== b))
          .attr("fill", "none")
          .attr("stroke", "rgba(38,53,65,0.18)")
          .attr("stroke-width", 0.65)
          .attr("d", path);

        const colors: Record<string, string> = { США: "#c8102e", Канада: "#2454a6", Мексика: "#006847" };
        const markerGroup = mapGroup.append("g");
        stadiums.forEach((stadium, index) => {
          const position = projection([stadium.coordinates.lng, stadium.coordinates.lat]);
          if (!position) return;
          const color = colors[stadium.country] ?? "#15583e";
          const marker = markerGroup.append("g")
            .attr("transform", `translate(${position[0]},${position[1]})`)
            .attr("cursor", "pointer");
          marker.append("circle").attr("r", 13).attr("fill", color).attr("opacity", 0.18);
          marker.append("circle").attr("class", "reference-map-dot").attr("r", 6).attr("fill", color).attr("stroke", "#fff").attr("stroke-width", 1.5);
          marker.append("text").attr("text-anchor", "middle").attr("dy", "0.34em").attr("font-size", 7).attr("font-weight", 900).attr("fill", "#fff").attr("pointer-events", "none").text(index + 1);
          marker
            .on("mouseenter", (event: MouseEvent) => {
              const tooltip = tooltipRef.current;
              if (!tooltip) return;
              tooltip.innerHTML = `<strong style="color:${color}">${String(index + 1).padStart(2, "0")}</strong><span>${stadium.name}</span><small>${stadium.region} / ${stadium.city} · ${stadium.country}</small>`;
              tooltip.classList.add("visible");
              const panel = svgRef.current!.parentElement!.getBoundingClientRect();
              tooltip.style.left = `${Math.min(event.clientX - panel.left + 14, panel.width - 245)}px`;
              tooltip.style.top = `${Math.max(event.clientY - panel.top - 20, 8)}px`;
              marker.select(".reference-map-dot").transition().duration(100).attr("r", 9);
            })
            .on("mouseleave", () => {
              tooltipRef.current?.classList.remove("visible");
              marker.select(".reference-map-dot").transition().duration(100).attr("r", 6);
            })
            .on("click", () => onSelect(stadium.id));
        });
        setMapStatus("ready");
      } catch {
        if (!cancelled) setMapStatus("error");
      }
    };
    renderMap();
    return () => {
      cancelled = true;
    };
  }, [onSelect, stadiums]);

  return (
    <div className="reference-stadium-map">
      {mapStatus === "loading" ? <div className="reference-map-message">Завантаження карти…</div> : null}
      {mapStatus === "error" ? <div className="reference-map-message">Не вдалося завантажити геодані карти.</div> : null}
      <svg ref={svgRef} viewBox="0 0 960 580" preserveAspectRatio="xMidYMid meet" />
      <div className="reference-map-tooltip" ref={tooltipRef} />
      <div className="reference-map-controls">
        <button aria-label="Збільшити" type="button" onClick={() => mapApiRef.current?.zoomIn()}>+</button>
        <button aria-label="Зменшити" type="button" onClick={() => mapApiRef.current?.zoomOut()}>−</button>
        <button aria-label="Скинути масштаб" type="button" onClick={() => mapApiRef.current?.reset()}>⌂</button>
      </div>
      <div className="reference-map-legend">
        <span><i style={{ background: "#c8102e" }} />США</span>
        <span><i style={{ background: "#2454a6" }} />Канада</span>
        <span><i style={{ background: "#006847" }} />Мексика</span>
      </div>
    </div>
  );
}

export function MatchCenter({
  groups,
  thirds,
  matches,
  teamProfiles,
  stadiums,
  initialTab = "playoff",
  initialCalendarStage = "all",
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(initialTab);
  const [calendarStage, setCalendarStage] = useState<CalendarStage>(initialCalendarStage);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedStadiumId, setSelectedStadiumId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setCalendarStage(initialCalendarStage);
  }, [initialCalendarStage]);

  const selectedTeam = teamProfiles.find((team) => team.id === selectedTeamId) ?? null;
  const selectedStadium = stadiums.find((stadium) => stadium.id === selectedStadiumId) ?? null;
  const selectedMatch = matches.find((match) => match.id === selectedMatchId) ?? null;
  const selectedMatchStadium = selectedMatch?.stadiumId
    ? stadiums.find((stadium) => stadium.id === selectedMatch.stadiumId) ?? null
    : null;
  const teamMatches = selectedTeam
    ? matches.filter((match) => match.home?.id === selectedTeam.id || match.away?.id === selectedTeam.id)
    : [];
  const teamStanding = selectedTeam
    ? groups.find((group) => group.key === selectedTeam.groupKey)?.rows.find((row) => row.team.id === selectedTeam.id)
    : null;
  const stadiumMatches = selectedStadium ? matches.filter((match) => match.stadiumId === selectedStadium.id) : [];

  const calendarDays = useMemo(() => {
    const map = new Map<string, Match[]>();
    const calendarMatches = calendarStage === "all"
      ? matches
      : matches.filter((match) => calendarStageForMatch(match) === calendarStage);
    for (const match of calendarMatches) {
      const day = new Date(match.kickoffAt).toLocaleDateString("uk-UA", {
        timeZone: "Europe/Kyiv",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      map.set(day, [...(map.get(day) ?? []), match]);
    }
    return [...map.entries()];
  }, [calendarStage, matches]);

  return (
    <>
      <section className="match-center-hero">
        <div>
          <p className="eyebrow">Чемпіонат світу 2026</p>
          <h1>Матч-центр</h1>
          <p>104 матчі, турнірні таблиці, плей-оф і всі 16 арен в одному розділі.</p>
        </div>
        <div className="match-center-summary">
          <span><strong>48</strong> збірних</span>
          <span><strong>12</strong> груп</span>
          <span><strong>104</strong> матчі</span>
        </div>
      </section>

      <nav className="match-center-tabs" aria-label="Розділи матч-центру">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "active" : ""}
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              router.replace(
                tab.id === "calendar" ? `/matches?tab=calendar&stage=${calendarStage}` : `/matches?tab=${tab.id}`,
                { scroll: false },
              );
            }}
            type="button"
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "groups" ? (
        <div className="match-center-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Груповий етап</p>
              <h2>Матчі групового етапу</h2>
            </div>
            <p>Перші дві збірні та вісім найкращих третіх місць проходять у плей-оф.</p>
          </div>
          <div className="reference-groups-grid">
            {groups.map((group) => (
              <GroupMatchCard
                groupKey={group.key}
                key={group.key}
                matches={matches.filter((match) => match.groupName === `Група ${group.key}`)}
                onSelectStadium={setSelectedStadiumId}
                onSelectTeam={setSelectedTeamId}
                standings={group.rows}
              />
            ))}
          </div>

          <section className="third-place-panel">
            <div className="section-heading compact">
              <div><p className="eyebrow">Додаткова кваліфікація</p><h2>Рейтинг третіх місць</h2></div>
            </div>
            <div className="match-table-scroll">
              <table>
                <thead><tr><th>#</th><th>Збірна</th><th>Група</th><th>І</th><th>Г</th><th>РМ</th><th>О</th></tr></thead>
                <tbody>
                  {thirds.map((row) => (
                    <tr className={row.qualified ? "qualified" : ""} key={row.team.id}>
                      <td>{row.rank}</td>
                      <td><button className="table-team-button" type="button" onClick={() => setSelectedTeamId(row.team.id)}>
                        {row.team.flagPath ? <img alt="" className="flag" src={row.team.flagPath} /> : null}{row.team.nameUk}
                      </button></td>
                      <td>{row.group}</td><td>{row.played}</td><td>{row.goalsFor}:{row.goalsAgainst}</td>
                      <td>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</td><td><strong>{row.points}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <details className="ranking-rules">
            <summary>Як FIFA визначає місця при рівності очок</summary>
            <ol>
              <li>Очки, різниця м’ячів і забиті м’ячі в очних матчах рівних команд.</li>
              <li>Загальна різниця м’ячів і загальна кількість забитих м’ячів.</li>
              <li>
                Командний дисциплінарний рейтинг: жовта картка −1, друга жовта з вилученням −3,
                пряма червона −4, жовта плюс пряма червона −5. Для однієї людини в одному матчі
                застосовується лише одне відрахування.
              </li>
              <li>Останній опублікований чоловічий рейтинг FIFA.</li>
            </ol>
            <p>
              Треті місця порівнюються за очками, різницею м’ячів, забитими м’ячами,
              дисциплінарним рейтингом і рейтингом FIFA.
            </p>
          </details>
        </div>
      ) : null}

      {activeTab === "playoff" ? (
        <div className="match-center-section">
          <div className="section-heading">
            <div><p className="eyebrow">32 збірні</p><h2>Сітка плей-оф</h2></div>
          </div>
          <PlayoffBracket matches={matches.filter((match) => match.stage !== "group")} onOpen={setSelectedMatchId} />
        </div>
      ) : null}

      {activeTab === "calendar" ? (
        <div className="match-center-section">
          <div className="section-heading">
            <div><p className="eyebrow">11 червня – 19 липня</p><h2>Календар 104 матчів</h2></div>
          </div>
          <nav className="calendar-stage-tabs" aria-label="Етапи календаря">
            {calendarStageTabs.map((stage) => (
              <button
                className={calendarStage === stage.id ? "active" : ""}
                key={stage.id}
                onClick={() => {
                  setCalendarStage(stage.id);
                  router.replace(`/matches?tab=calendar&stage=${stage.id}`, { scroll: false });
                }}
                type="button"
              >
                {stage.label}
              </button>
            ))}
          </nav>
          {calendarDays.length > 0 ? <div className="match-calendar">
            {calendarDays.map(([day, dayMatches]) => (
              <section className="calendar-day" key={day}>
                <h3>{day}</h3>
                {dayMatches.map((match) => (
                  <article className="match-list-row" key={match.id}>
                    <span className="match-stage">{match.groupName ?? stageTitles[match.stage] ?? match.stage}</span>
                    <div className="match-list-teams">
                      <TeamButton team={match.home} fallback={match.homeLabel} onSelect={setSelectedTeamId} />
                      <strong>{scoreText(match)}</strong>
                      <TeamButton team={match.away} fallback={match.awayLabel} onSelect={setSelectedTeamId} />
                    </div>
                    <time>{formatKickoff(match.kickoffAt).split(", ").at(-1)}</time>
                    {match.stadiumId ? (
                      <button className="stadium-inline-button" type="button" onClick={() => setSelectedStadiumId(match.stadiumId)}>
                        <MapPin size={16} />
                      </button>
                    ) : null}
                  </article>
                ))}
              </section>
            ))}
          </div> : <div className="calendar-empty-stage">Матчі цього етапу ще не визначено.</div>}
        </div>
      ) : null}

      {activeTab === "stadiums" ? (
        <div className="match-center-section">
          <div className="section-heading">
            <div><p className="eyebrow">Канада · Мексика · США</p><h2>16 стадіонів ЧС-2026</h2></div>
            <p>Натисни на маркер або картку, щоб відкрити арену та її матчі.</p>
          </div>
          <div className="stadium-layout">
            <div className="stadium-list">
              {stadiums.map((stadium, index) => (
                <button className="stadium-list-card" key={stadium.id} type="button" onClick={() => setSelectedStadiumId(stadium.id)}>
                  <img alt="" src={stadium.imagePath} />
                  <span><strong>{stadium.name}</strong><small>{stadium.city}, {stadium.country}</small></span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </button>
              ))}
            </div>
            <ReferenceStadiumMap stadiums={stadiums} onSelect={setSelectedStadiumId} />
          </div>
        </div>
      ) : null}

      {selectedTeam ? (
        <div className="match-modal" role="dialog" aria-modal="true">
          <button className="match-modal-backdrop" aria-label="Закрити" onClick={() => setSelectedTeamId(null)} type="button" />
          <section className="match-modal-card">
            <header>
              <div className="team-profile-heading">
                {selectedTeam.flagPath ? <img alt="" src={selectedTeam.flagPath} /> : null}
                <div><p>Група {selectedTeam.groupKey}</p><h2>{selectedTeam.nameUk}</h2></div>
              </div>
              <button className="icon-button" aria-label="Закрити" onClick={() => setSelectedTeamId(null)} type="button"><X /></button>
            </header>
            {teamStanding ? (
              <div className="team-profile-stats">
                <span><strong>{teamStanding.points}</strong> очок</span>
                <span><strong>{teamStanding.goalsFor}:{teamStanding.goalsAgainst}</strong> м’ячі</span>
                <span><strong>{teamStanding.played}</strong> матчів</span>
              </div>
            ) : null}
            <h3>Матчі збірної</h3>
            <div className="team-match-list">
              {teamMatches.map((match) => (
                <div key={match.id}><time>{formatKickoff(match.kickoffAt)}</time><span>{match.homeLabel} <strong>{scoreText(match)}</strong> {match.awayLabel}</span></div>
              ))}
            </div>
            <h3>Гравці та fantasy-статистика</h3>
            <div className="match-table-scroll">
              <table>
                <thead><tr><th>Гравець</th><th>Позиція</th><th>Клуб</th><th>Ціна</th><th>Очки</th><th>Вибрано</th></tr></thead>
                <tbody>
                  {selectedTeam.players.map((player) => (
                    <tr key={player.id}>
                      <td><span className="profile-player">{player.photoUrl ? <img alt="" src={player.photoUrl} /> : <span />}<strong>{player.name}</strong></span></td>
                      <td>{positionLabels[player.position] ?? player.position}</td><td>{player.club ?? "–"}</td>
                      <td>{player.price.toFixed(1)}</td><td>{player.fantasyPoints}</td><td>{player.selectedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : null}

      {selectedMatch ? (
        <div className="match-modal" role="dialog" aria-modal="true" aria-labelledby="playoff-match-title">
          <button className="match-modal-backdrop" aria-label="Закрити" onClick={() => setSelectedMatchId(null)} type="button" />
          <section className="match-modal-card playoff-match-dialog">
            <header>
              <div><p className="eyebrow">Матч #{selectedMatch.matchNo} · {stageTitles[selectedMatch.stage]}</p><h2 id="playoff-match-title">Деталі матчу</h2></div>
              <button className="icon-button" aria-label="Закрити" onClick={() => setSelectedMatchId(null)} type="button"><X /></button>
            </header>
            <div className="playoff-dialog-score">
              <PlayoffTeam team={selectedMatch.home} fallback={selectedMatch.homeLabel} score={selectedMatch.homeScore} />
              <strong>{scoreText(selectedMatch)}</strong>
              <PlayoffTeam team={selectedMatch.away} fallback={selectedMatch.awayLabel} score={selectedMatch.awayScore} />
            </div>
            <dl className="playoff-dialog-details">
              <div><dt>Дата і час</dt><dd>{formatKickoff(selectedMatch.kickoffAt)}</dd></div>
              <div><dt>Місто</dt><dd>{selectedMatch.city ?? selectedMatchStadium?.city ?? "Буде визначено"}</dd></div>
              <div><dt>Стадіон</dt><dd>{selectedMatchStadium?.name ?? "Буде визначено"}</dd></div>
              {selectedMatch.homePenalties !== null && selectedMatch.awayPenalties !== null ? (
                <div><dt>Серія пенальті</dt><dd>{selectedMatch.homePenalties}:{selectedMatch.awayPenalties}</dd></div>
              ) : null}
            </dl>
          </section>
        </div>
      ) : null}

      {selectedStadium ? (
        <div className="match-modal" role="dialog" aria-modal="true">
          <button className="match-modal-backdrop" aria-label="Закрити" onClick={() => setSelectedStadiumId(null)} type="button" />
          <section className="match-modal-card stadium-profile">
            <header>
              <div><p className="eyebrow">{selectedStadium.country} · {selectedStadium.region}</p><h2>{selectedStadium.name}</h2><p>{selectedStadium.city}</p></div>
              <button className="icon-button" aria-label="Закрити" onClick={() => setSelectedStadiumId(null)} type="button"><X /></button>
            </header>
            <img className="stadium-profile-photo" alt={selectedStadium.name} src={selectedStadium.imagePath} />
            <div className="team-profile-stats">
              <span><strong>{selectedStadium.capacity.toLocaleString("uk-UA")}</strong> місць</span>
              <span><strong>{stadiumMatches.length}</strong> матчів</span>
            </div>
            <div className="team-match-list">
              {stadiumMatches.map((match) => (
                <div key={match.id}><time>{formatKickoff(match.kickoffAt)}</time><span>{match.homeLabel} <strong>{scoreText(match)}</strong> {match.awayLabel}</span></div>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

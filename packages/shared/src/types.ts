export type PlayerPosition = "GK" | "DEF" | "MID" | "FWD";

export type StageKey =
  | "PRE_TOURNAMENT"
  | "GROUP_MD1"
  | "GROUP_MD2"
  | "GROUP_MD3"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTER_FINALS"
  | "SEMI_FINALS"
  | "FINALS";

export interface StageRule {
  key: StageKey;
  label: string;
  freeTransfers: number | "UNLIMITED";
  maxPlayersPerNation: number;
}

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  nationCode: string;
  nationName: string;
  price: number;
  status: "AVAILABLE" | "DOUBTFUL" | "OUT" | "ELIMINATED";
}

export interface RosterPlayer extends Player {
  purchasePrice: number;
}

export interface LineupSelection {
  starters: string[];
  bench: string[];
  captainId: string;
  viceCaptainId: string;
}

export interface PlayerMatchStats {
  playerId: string;
  position: PlayerPosition;
  minutes: number;
  goals: number;
  assists: number;
  teamGoalsConceded: number;
  cleanSheet: boolean;
  saves: number;
  penaltiesSaved: number;
  penaltiesMissed: number;
  yellowCards: number;
  redCards: number;
  ownGoals: number;
  playerOfTheMatch: boolean;
}

export interface ScoreBreakdownItem {
  key: string;
  label: string;
  points: number;
}

export interface PlayerScore {
  playerId: string;
  points: number;
  breakdown: ScoreBreakdownItem[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

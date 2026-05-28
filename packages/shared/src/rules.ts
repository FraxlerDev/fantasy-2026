import type { PlayerPosition, StageRule } from "./types";

export const BRAND_NAME = "Fantasy 2026 UA";
export const STARTING_BUDGET = 100;
export const MAX_TRANSFERS_PER_GAMEWEEK = 3;

export const ROSTER_LIMITS: Record<PlayerPosition, number> = {
  GK: 2,
  DEF: 5,
  MID: 5,
  FWD: 3,
};

export const STARTER_LIMITS = {
  total: 11,
  minGoalkeepers: 1,
  maxGoalkeepers: 1,
  minDefenders: 3,
  maxDefenders: 5,
  minMidfielders: 2,
  maxMidfielders: 5,
  minForwards: 1,
  maxForwards: 3,
};

export const STAGE_RULES: StageRule[] = [
  {
    key: "PRE_TOURNAMENT",
    label: "До старту турніру",
    freeTransfers: 3,
    maxPlayersPerNation: 2,
  },
  {
    key: "GROUP_MD1",
    label: "Груповий етап, тур 1",
    freeTransfers: 3,
    maxPlayersPerNation: 2,
  },
  {
    key: "GROUP_MD2",
    label: "Груповий етап, тур 2",
    freeTransfers: 2,
    maxPlayersPerNation: 2,
  },
  {
    key: "GROUP_MD3",
    label: "Груповий етап, тур 3",
    freeTransfers: 2,
    maxPlayersPerNation: 2,
  },
  {
    key: "ROUND_OF_32",
    label: "1/16 фіналу",
    freeTransfers: 3,
    maxPlayersPerNation: 3,
  },
  {
    key: "ROUND_OF_16",
    label: "1/8 фіналу",
    freeTransfers: 3,
    maxPlayersPerNation: 4,
  },
  {
    key: "QUARTER_FINALS",
    label: "Чвертьфінали",
    freeTransfers: 3,
    maxPlayersPerNation: 4,
  },
  {
    key: "SEMI_FINALS",
    label: "Півфінали",
    freeTransfers: 3,
    maxPlayersPerNation: 5,
  },
  {
    key: "FINALS",
    label: "Фінальна стадія",
    freeTransfers: 3,
    maxPlayersPerNation: 8,
  },
];

export const BALANCED_SCORING = {
  appearanceUnder60: 1,
  appearance60Plus: 2,
  goal: {
    GK: 10,
    DEF: 10,
    MID: 6,
    FWD: 4,
  },
  assist: 3,
  cleanSheet: {
    GK: 4,
    DEF: 4,
    MID: 1,
    FWD: 0,
  },
  concededEveryTwo: -1,
  saveEveryThree: 1,
  penaltySaved: 5,
  penaltyMissed: -2,
  yellowCard: -1,
  redCard: -3,
  ownGoal: -2,
  playerOfTheMatch: 3,
  extraTransferHit: 0,
} as const;

export function getStageRule(key: StageRule["key"]): StageRule {
  const rule = STAGE_RULES.find((item) => item.key === key);
  if (!rule) {
    throw new Error(`Unknown stage rule: ${key}`);
  }

  return rule;
}

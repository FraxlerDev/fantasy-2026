import { ROSTER_LIMITS, STARTER_LIMITS, STARTING_BUDGET } from "./rules";
import type { LineupSelection, Player, RosterPlayer, StageRule, ValidationResult } from "./types";

function baseResult(): ValidationResult {
  return {
    valid: true,
    errors: [],
    warnings: [],
  };
}

function invalidate(result: ValidationResult, message: string) {
  result.valid = false;
  result.errors.push(message);
}

export function validateRoster(roster: RosterPlayer[], stageRule: StageRule): ValidationResult {
  const result = baseResult();
  const totalCost = roster.reduce((sum, player) => sum + player.purchasePrice, 0);

  if (roster.length !== 15) {
    invalidate(result, "Склад має містити рівно 15 гравців.");
  }

  for (const [position, limit] of Object.entries(ROSTER_LIMITS)) {
    const count = roster.filter((player) => player.position === position).length;
    if (count !== limit) {
      invalidate(result, `Позиція ${position}: потрібно ${limit}, зараз ${count}.`);
    }
  }

  if (totalCost > STARTING_BUDGET) {
    invalidate(result, `Бюджет перевищено: ${totalCost.toFixed(1)} з ${STARTING_BUDGET}.`);
  }

  const nationCounts = new Map<string, number>();
  for (const player of roster) {
    nationCounts.set(player.nationCode, (nationCounts.get(player.nationCode) ?? 0) + 1);
  }

  for (const [nationCode, count] of nationCounts.entries()) {
    if (count > stageRule.maxPlayersPerNation) {
      invalidate(
        result,
        `Забагато гравців зі збірної ${nationCode}: максимум ${stageRule.maxPlayersPerNation}, зараз ${count}.`,
      );
    }
  }

  return result;
}

export function validateLineup(roster: Player[], lineup: LineupSelection): ValidationResult {
  const result = baseResult();
  const rosterIds = new Set(roster.map((player) => player.id));
  const selectedIds = new Set([...lineup.starters, ...lineup.bench]);

  if (lineup.starters.length !== STARTER_LIMITS.total) {
    invalidate(result, "Стартовий склад має містити 11 гравців.");
  }

  if (selectedIds.size !== roster.length) {
    invalidate(result, "Кожен гравець складу має бути або в старті, або на лавці.");
  }

  for (const playerId of selectedIds) {
    if (!rosterIds.has(playerId)) {
      invalidate(result, "У lineup є гравець, якого немає у складі.");
      break;
    }
  }

  if (!lineup.starters.includes(lineup.captainId)) {
    invalidate(result, "Капітан має бути у стартовому складі.");
  }

  if (!lineup.starters.includes(lineup.viceCaptainId)) {
    invalidate(result, "Віце-капітан має бути у стартовому складі.");
  }

  if (lineup.captainId === lineup.viceCaptainId) {
    invalidate(result, "Капітан і віце-капітан мають бути різними гравцями.");
  }

  const starters = roster.filter((player) => lineup.starters.includes(player.id));
  const counts = {
    GK: starters.filter((player) => player.position === "GK").length,
    DEF: starters.filter((player) => player.position === "DEF").length,
    MID: starters.filter((player) => player.position === "MID").length,
    FWD: starters.filter((player) => player.position === "FWD").length,
  };

  if (counts.GK !== 1) {
    invalidate(result, "У старті має бути рівно 1 воротар.");
  }

  if (counts.DEF < STARTER_LIMITS.minDefenders || counts.DEF > STARTER_LIMITS.maxDefenders) {
    invalidate(result, "У старті має бути від 3 до 5 захисників.");
  }

  if (counts.MID < STARTER_LIMITS.minMidfielders || counts.MID > STARTER_LIMITS.maxMidfielders) {
    invalidate(result, "У старті має бути від 2 до 5 півзахисників.");
  }

  if (counts.FWD < STARTER_LIMITS.minForwards || counts.FWD > STARTER_LIMITS.maxForwards) {
    invalidate(result, "У старті має бути від 1 до 3 нападників.");
  }

  return result;
}

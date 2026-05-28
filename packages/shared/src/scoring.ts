import { BALANCED_SCORING } from "./rules";
import type { PlayerMatchStats, PlayerScore, ScoreBreakdownItem } from "./types";

function pushBreakdown(
  breakdown: ScoreBreakdownItem[],
  key: string,
  label: string,
  points: number,
) {
  if (points !== 0) {
    breakdown.push({ key, label, points });
  }
}

export function scorePlayer(stats: PlayerMatchStats): PlayerScore {
  const breakdown: ScoreBreakdownItem[] = [];

  if (stats.minutes > 0 && stats.minutes < 60) {
    pushBreakdown(breakdown, "appearance_under_60", "Вихід на поле", BALANCED_SCORING.appearanceUnder60);
  }

  if (stats.minutes >= 60) {
    pushBreakdown(breakdown, "appearance_60_plus", "60+ хвилин", BALANCED_SCORING.appearance60Plus);
  }

  pushBreakdown(
    breakdown,
    "goals",
    "Голи",
    stats.goals * BALANCED_SCORING.goal[stats.position],
  );
  pushBreakdown(breakdown, "assists", "Асисти", stats.assists * BALANCED_SCORING.assist);

  const cleanSheetPoints = stats.cleanSheet ? BALANCED_SCORING.cleanSheet[stats.position] : 0;
  if (stats.minutes >= 60) {
    pushBreakdown(breakdown, "clean_sheet", "Сухий матч", cleanSheetPoints);
  }

  if (stats.position === "GK" || stats.position === "DEF") {
    pushBreakdown(
      breakdown,
      "goals_conceded",
      "Пропущені голи",
      Math.floor(stats.teamGoalsConceded / 2) * BALANCED_SCORING.concededEveryTwo,
    );
  }

  if (stats.position === "GK") {
    pushBreakdown(
      breakdown,
      "saves",
      "Сейви",
      Math.floor(stats.saves / 3) * BALANCED_SCORING.saveEveryThree,
    );
    pushBreakdown(
      breakdown,
      "penalties_saved",
      "Відбиті пенальті",
      stats.penaltiesSaved * BALANCED_SCORING.penaltySaved,
    );
  }

  pushBreakdown(
    breakdown,
    "penalties_missed",
    "Нереалізовані пенальті",
    stats.penaltiesMissed * BALANCED_SCORING.penaltyMissed,
  );
  pushBreakdown(
    breakdown,
    "yellow_cards",
    "Жовті картки",
    stats.yellowCards * BALANCED_SCORING.yellowCard,
  );
  pushBreakdown(
    breakdown,
    "red_cards",
    "Червоні картки",
    stats.redCards * BALANCED_SCORING.redCard,
  );
  pushBreakdown(
    breakdown,
    "own_goals",
    "Автоголи",
    stats.ownGoals * BALANCED_SCORING.ownGoal,
  );
  pushBreakdown(
    breakdown,
    "player_of_the_match",
    "Гравець матчу",
    stats.playerOfTheMatch ? BALANCED_SCORING.playerOfTheMatch : 0,
  );

  return {
    playerId: stats.playerId,
    points: breakdown.reduce((sum, item) => sum + item.points, 0),
    breakdown,
  };
}

import { describe, expect, it } from "vitest";
import { scorePlayer } from "../src/scoring";

describe("scorePlayer", () => {
  it("scores a balanced midfielder performance", () => {
    const result = scorePlayer({
      playerId: "modric",
      position: "MID",
      minutes: 88,
      goals: 1,
      assists: 1,
      teamGoalsConceded: 0,
      cleanSheet: true,
      saves: 0,
      penaltiesSaved: 0,
      penaltiesMissed: 0,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      playerOfTheMatch: true,
    });

    expect(result.points).toBe(14);
  });
});

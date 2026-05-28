import { Injectable } from "@nestjs/common";
import { scorePlayer } from "@fantasy/shared";
import type { PlayerMatchStats } from "@fantasy/shared";

@Injectable()
export class ScoringService {
  scoreFixture(stats: PlayerMatchStats[]) {
    const playerScores = stats.map((item) => scorePlayer(item));

    return {
      status: "PREVIEW",
      playerScores,
      totalPlayerPoints: playerScores.reduce((sum, score) => sum + score.points, 0),
    };
  }
}

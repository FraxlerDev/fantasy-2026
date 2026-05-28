import { Body, Controller, Post } from "@nestjs/common";
import type { PlayerMatchStats } from "@fantasy/shared";
import { ScoringService } from "./scoring.service";

@Controller("scoring")
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Post("preview")
  preview(@Body() stats: PlayerMatchStats[]) {
    return this.scoringService.scoreFixture(stats);
  }
}

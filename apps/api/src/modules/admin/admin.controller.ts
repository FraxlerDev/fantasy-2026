import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { PlayerMatchStats } from "@fantasy/shared";
import { sampleMatchStats } from "../../seeds/sample-data";
import { ScoringService } from "../scoring/scoring.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly scoringService: ScoringService) {}

  @Get("queue")
  getOpsQueue() {
    return [
      {
        id: "fixture-ukr-fra",
        type: "MATCH_STATS_REQUIRED",
        title: "Україна - Франція",
        status: "WAITING_FOR_ADMIN",
      },
      {
        id: "complaint-1",
        type: "COMPLAINT",
        title: "Скарга на назву команди",
        status: "REVIEW",
      },
    ];
  }

  @Post("fixtures/:fixtureId/stats")
  saveFixtureStats(@Param("fixtureId") fixtureId: string, @Body() stats: PlayerMatchStats[]) {
    return {
      fixtureId,
      saved: true,
      statsCount: stats.length,
      nextAction: "POST /v1/admin/fixtures/:fixtureId/settle",
    };
  }

  @Post("fixtures/:fixtureId/settle")
  settleFixture(@Param("fixtureId") fixtureId: string) {
    return {
      fixtureId,
      settled: true,
      auditLogId: "audit-preview",
      scoring: this.scoringService.scoreFixture(sampleMatchStats),
    };
  }
}

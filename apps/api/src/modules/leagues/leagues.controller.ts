import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { sampleLeaderboard } from "../../seeds/sample-data";

@Controller("leagues")
export class LeaguesController {
  @Post()
  createLeague(@Body() body: { name: string }) {
    return {
      id: "league-preview",
      name: body.name,
      inviteCode: "F26-UA-42",
      visibility: "PRIVATE",
    };
  }

  @Post("join")
  joinLeague(@Body() body: { inviteCode: string }) {
    return {
      joined: true,
      inviteCode: body.inviteCode,
      leagueId: "league-preview",
    };
  }

  @Get(":id/leaderboard")
  getLeaderboard(@Param("id") id: string) {
    return {
      leagueId: id,
      rows: sampleLeaderboard,
      generatedAt: new Date().toISOString(),
    };
  }
}

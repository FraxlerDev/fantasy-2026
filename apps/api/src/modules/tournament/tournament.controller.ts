import { Controller, Get } from "@nestjs/common";
import { STAGE_RULES } from "@fantasy/shared";

@Controller("tournament")
export class TournamentController {
  @Get("stages")
  getStages() {
    return STAGE_RULES;
  }

  @Get("rules")
  getRules() {
    return {
      roster: "15 players: 2 GK, 5 DEF, 5 MID, 3 FWD",
      budget: 100,
      captain: "x2 points",
      dataMode: "manual post-match stat entry",
      language: "uk",
    };
  }
}

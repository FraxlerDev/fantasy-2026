import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { FantasyModule } from "./fantasy/fantasy.module";
import { HealthController } from "./health.controller";
import { LeaguesModule } from "./leagues/leagues.module";
import { PlayersModule } from "./players/players.module";
import { ScoringModule } from "./scoring/scoring.module";
import { TournamentModule } from "./tournament/tournament.module";

@Module({
  imports: [TournamentModule, PlayersModule, FantasyModule, LeaguesModule, ScoringModule, AdminModule],
  controllers: [HealthController],
})
export class AppModule {}

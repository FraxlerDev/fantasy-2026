import { Controller, Get, Query } from "@nestjs/common";
import { samplePlayers } from "../../seeds/sample-data";

@Controller("players")
export class PlayersController {
  @Get()
  getPlayers(
    @Query("position") position?: string,
    @Query("nation") nation?: string,
    @Query("q") q?: string,
  ) {
    return samplePlayers.filter((player) => {
      const matchesPosition = position ? player.position === position : true;
      const matchesNation = nation ? player.nationCode === nation : true;
      const matchesQuery = q ? player.name.toLowerCase().includes(q.toLowerCase()) : true;

      return matchesPosition && matchesNation && matchesQuery;
    });
  }
}

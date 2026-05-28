import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateFantasyTeamDto } from "./dto/create-fantasy-team.dto";
import { FantasyService } from "./fantasy.service";

@Controller("fantasy-team")
export class FantasyController {
  constructor(private readonly fantasyService: FantasyService) {}

  @Get("me")
  getMyTeam() {
    return this.fantasyService.getMyTeam();
  }

  @Post()
  createTeam(@Body() dto: CreateFantasyTeamDto) {
    return this.fantasyService.createTeam(dto);
  }
}

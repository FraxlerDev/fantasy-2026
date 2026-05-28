import { Injectable } from "@nestjs/common";
import { getStageRule, validateRoster } from "@fantasy/shared";
import { samplePlayers } from "../../seeds/sample-data";
import type { CreateFantasyTeamDto } from "./dto/create-fantasy-team.dto";

@Injectable()
export class FantasyService {
  createTeam(dto: CreateFantasyTeamDto) {
    const roster = dto.rosterPlayerIds
      .map((id) => samplePlayers.find((player) => player.id === id))
      .filter(Boolean)
      .map((player) => ({
        ...player!,
        purchasePrice: player!.price,
      }));

    const validation = validateRoster(roster, getStageRule("GROUP_MD1"));

    return {
      id: "team-preview",
      name: dto.name,
      validation,
      roster,
      budgetUsed: roster.reduce((sum, player) => sum + player.purchasePrice, 0),
    };
  }

  getMyTeam() {
    return {
      id: "team-preview",
      name: "Лівий Фланг",
      totalPoints: 184,
      stagePoints: 42,
      budget: 100,
      nextDeadline: "2026-06-11T19:00:00.000Z",
    };
  }
}

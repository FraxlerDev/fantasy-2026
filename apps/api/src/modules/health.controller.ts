import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      ok: true,
      service: "fantasy-2026-api",
      mode: "manual-stats-mvp",
    };
  }
}

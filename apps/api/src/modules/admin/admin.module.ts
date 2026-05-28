import { Module } from "@nestjs/common";
import { ScoringModule } from "../scoring/scoring.module";
import { AdminController } from "./admin.controller";

@Module({
  imports: [ScoringModule],
  controllers: [AdminController],
})
export class AdminModule {}

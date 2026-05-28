import { IsArray, IsString, Length } from "class-validator";

export class CreateFantasyTeamDto {
  @IsString()
  @Length(2, 40)
  name!: string;

  @IsArray()
  rosterPlayerIds!: string[];
}

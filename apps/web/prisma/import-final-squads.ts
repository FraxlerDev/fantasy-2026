import { PrismaClient, PlayerPosition } from "@prisma/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");
const finalSquadsPath = path.join(repoRoot, "data", "final_squads_2026.json");

type FinalSquadsFile = {
  source: string;
  fetchedAt: string;
  squads: Array<{
    countryUk: string;
    code: string;
    status: "FINAL";
    players: Array<{
      name: string;
      nameOriginal: string;
      position: "GK" | "DEF" | "MID" | "FWD";
      club: string;
      clubOriginal?: string;
    }>;
  }>;
};

async function main() {
  const payload = JSON.parse(await readFile(finalSquadsPath, "utf8")) as FinalSquadsFile;
  let importedPlayers = 0;

  for (const squad of payload.squads) {
    const nationalTeam = await prisma.nationalTeam.findFirst({
      where: {
        OR: [
          { code: squad.code },
          { code: squad.code.toLowerCase() },
          { nameUk: squad.countryUk },
        ],
      },
    });

    if (!nationalTeam) {
      console.warn(`Skipping ${squad.countryUk}: national team not found`);
      continue;
    }

    await prisma.$transaction(async (tx) => {
      await tx.nationalTeam.update({
        where: { id: nationalTeam.id },
        data: { squadStatus: "FINAL" },
      });

      await tx.player.deleteMany({
        where: { nationalTeamId: nationalTeam.id },
      });

      await tx.player.createMany({
        data: squad.players.map((player) => ({
          nationalTeamId: nationalTeam.id,
          name: player.name,
          nameOriginal: player.nameOriginal,
          position: player.position as PlayerPosition,
          club: player.club,
          clubOriginal: player.clubOriginal ?? player.club,
          squadStatus: "FINAL",
          price: 5.0,
          status: "AVAILABLE",
        })),
      });
    });

    importedPlayers += squad.players.length;
    console.log(`${squad.countryUk}: ${squad.players.length} final-squad players`);
  }

  console.log(`Imported ${importedPlayers} players from ${payload.squads.length} final squads.`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

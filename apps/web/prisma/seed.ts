import { PlayerPosition, PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");
const matchesPath = path.join(repoRoot, "data", "matches_group_rounds_export.csv");
const flagsManifestPath = path.join(repoRoot, "data", "flags_manifest.csv");
const finalSquadsPath = path.join(repoRoot, "data", "final_squads_2026.json");

const monthByName: Record<string, string> = {
  червня: "06",
  липня: "07",
};

type MatchCsvRow = {
  matchNo: number;
  groupName: string;
  round: number;
  date: string;
  time: string;
  home: string;
  away: string;
};

type FlagCsvRow = {
  countryUk: string;
  code: string;
  filename: string;
};

type FinalSquadsFile = {
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

const testPlayers: Array<{ nation: string; name: string; position: PlayerPosition; price: number }> = [
  { nation: "Іспанія", name: "Унаї Сімон", position: PlayerPosition.GK, price: 5.5 },
  { nation: "Іспанія", name: "Дані Карвахаль", position: PlayerPosition.DEF, price: 6.0 },
  { nation: "Іспанія", name: "Родрі", position: PlayerPosition.MID, price: 8.5 },
  { nation: "Іспанія", name: "Педрі", position: PlayerPosition.MID, price: 7.5 },
  { nation: "Іспанія", name: "Альваро Мората", position: PlayerPosition.FWD, price: 8.0 },

  { nation: "Франція", name: "Майк Меньян", position: PlayerPosition.GK, price: 5.5 },
  { nation: "Франція", name: "Вільям Саліба", position: PlayerPosition.DEF, price: 6.5 },
  { nation: "Франція", name: "Тео Ернандес", position: PlayerPosition.DEF, price: 6.5 },
  { nation: "Франція", name: "Антуан Грізманн", position: PlayerPosition.MID, price: 9.0 },
  { nation: "Франція", name: "Кіліан Мбаппе", position: PlayerPosition.FWD, price: 12.0 },

  { nation: "Бразилія", name: "Аліссон", position: PlayerPosition.GK, price: 6.0 },
  { nation: "Бразилія", name: "Маркіньйос", position: PlayerPosition.DEF, price: 6.0 },
  { nation: "Бразилія", name: "Бруно Гімарайнс", position: PlayerPosition.MID, price: 7.0 },
  { nation: "Бразилія", name: "Вінісіус Жуніор", position: PlayerPosition.MID, price: 10.5 },
  { nation: "Бразилія", name: "Родріго", position: PlayerPosition.FWD, price: 9.0 },

  { nation: "Англія", name: "Джордан Пікфорд", position: PlayerPosition.GK, price: 5.0 },
  { nation: "Англія", name: "Джон Стоунз", position: PlayerPosition.DEF, price: 5.5 },
  { nation: "Англія", name: "Букайо Сака", position: PlayerPosition.MID, price: 9.5 },
  { nation: "Англія", name: "Джуд Беллінгем", position: PlayerPosition.MID, price: 10.0 },
  { nation: "Англія", name: "Гаррі Кейн", position: PlayerPosition.FWD, price: 11.0 },

  { nation: "Аргентина", name: "Еміліано Мартінес", position: PlayerPosition.GK, price: 5.5 },
  { nation: "Аргентина", name: "Крістіан Ромеро", position: PlayerPosition.DEF, price: 5.5 },
  { nation: "Аргентина", name: "Енцо Фернандес", position: PlayerPosition.MID, price: 7.5 },
  { nation: "Аргентина", name: "Ліонель Мессі", position: PlayerPosition.MID, price: 10.5 },
  { nation: "Аргентина", name: "Лаутаро Мартінес", position: PlayerPosition.FWD, price: 9.0 },

  { nation: "Португалія", name: "Діогу Кошта", position: PlayerPosition.GK, price: 5.5 },
  { nation: "Португалія", name: "Рубен Діаш", position: PlayerPosition.DEF, price: 6.5 },
  { nation: "Португалія", name: "Бруну Фернандеш", position: PlayerPosition.MID, price: 9.5 },
  { nation: "Португалія", name: "Бернарду Сілва", position: PlayerPosition.MID, price: 8.5 },
  { nation: "Португалія", name: "Кріштіану Роналду", position: PlayerPosition.FWD, price: 9.5 },

  { nation: "Німеччина", name: "Марк-Андре тер Штеген", position: PlayerPosition.GK, price: 5.5 },
  { nation: "Німеччина", name: "Антоніо Рюдігер", position: PlayerPosition.DEF, price: 6.0 },
  { nation: "Німеччина", name: "Джамал Мусіала", position: PlayerPosition.MID, price: 9.5 },
  { nation: "Німеччина", name: "Флоріан Вірц", position: PlayerPosition.MID, price: 9.0 },
  { nation: "Німеччина", name: "Кай Гаверц", position: PlayerPosition.FWD, price: 8.0 },

  { nation: "Нідерланди", name: "Барт Вербрюгген", position: PlayerPosition.GK, price: 5.0 },
  { nation: "Нідерланди", name: "Вірджил ван Дейк", position: PlayerPosition.DEF, price: 6.5 },
  { nation: "Нідерланди", name: "Френкі де Йонг", position: PlayerPosition.MID, price: 8.0 },
  { nation: "Нідерланди", name: "Коді Гакпо", position: PlayerPosition.MID, price: 8.0 },
  { nation: "Нідерланди", name: "Мемфіс Депай", position: PlayerPosition.FWD, price: 8.0 },
];

const gameweekConfig: Record<number, { name: string; stage: string; startAt: Date; deadlineAt: Date; transferLimit: number | null; transfersOpen: boolean }> = {
  1: {
    name: "GW1",
    stage: "1 тур групового етапу",
    startAt: new Date("2026-06-11T22:00:00+03:00"),
    deadlineAt: new Date("2026-06-11T20:30:00+03:00"),
    transferLimit: null,
    transfersOpen: true,
  },
  2: {
    name: "GW2",
    stage: "2 тур групового етапу",
    startAt: new Date("2026-06-18T19:00:00+03:00"),
    deadlineAt: new Date("2026-06-18T17:30:00+03:00"),
    transferLimit: 3,
    transfersOpen: false,
  },
  3: {
    name: "GW3",
    stage: "3 тур групового етапу",
    startAt: new Date("2026-06-24T22:00:00+03:00"),
    deadlineAt: new Date("2026-06-24T20:30:00+03:00"),
    transferLimit: 3,
    transfersOpen: false,
  },
  4: {
    name: "GW4",
    stage: "1/16 фіналу",
    startAt: new Date("2026-06-28T22:00:00+03:00"),
    deadlineAt: new Date("2026-06-28T20:30:00+03:00"),
    transferLimit: null,
    transfersOpen: false,
  },
  5: {
    name: "GW5",
    stage: "1/8 фіналу",
    startAt: new Date("2026-07-04T20:00:00+03:00"),
    deadlineAt: new Date("2026-07-04T18:30:00+03:00"),
    transferLimit: 5,
    transfersOpen: false,
  },
  6: {
    name: "GW6",
    stage: "1/4 фіналу",
    startAt: new Date("2026-07-09T23:00:00+03:00"),
    deadlineAt: new Date("2026-07-09T21:30:00+03:00"),
    transferLimit: 5,
    transfersOpen: false,
  },
  7: {
    name: "GW7",
    stage: "1/2 фіналу, фінал і матч за 3 місце",
    startAt: new Date("2026-07-14T22:00:00+03:00"),
    deadlineAt: new Date("2026-07-14T20:30:00+03:00"),
    transferLimit: null,
    transfersOpen: false,
  },
};

function parseSemicolonCsv(content: string): MatchCsvRow[] {
  return content
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [matchNo, groupName, round, date, time, home, away] = line.split(";");
      return { matchNo: Number(matchNo), groupName, round: Number(round), date, time, home, away };
    });
}

function parseFlagManifest(content: string): FlagCsvRow[] {
  return content
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [, countryUk, , code, filename] = line.split(",");
      return { countryUk, code: code.toUpperCase(), filename };
    });
}

function kickoffAt(dateUk: string, time: string) {
  const [dayRaw, monthUk] = dateUk.trim().split(/\s+/);
  const month = monthByName[monthUk];
  if (!month) throw new Error(`Unknown Ukrainian month in CSV: ${dateUk}`);
  return new Date(`2026-${month}-${dayRaw.padStart(2, "0")}T${time}:00+03:00`);
}

function formatKyiv(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function main() {
  const [matchesContent, flagsContent, finalSquadsContent] = await Promise.all([
    readFile(matchesPath, "utf8"),
    readFile(flagsManifestPath, "utf8"),
    readFile(finalSquadsPath, "utf8"),
  ]);

  const matches = parseSemicolonCsv(matchesContent);
  const flags = parseFlagManifest(flagsContent);
  const finalSquads = JSON.parse(finalSquadsContent) as FinalSquadsFile;
  const finalSquadByCountry = new Map(finalSquads.squads.map((squad) => [squad.countryUk, squad]));
  const groupByCountry = new Map<string, string>();

  for (const match of matches) {
    groupByCountry.set(match.home, match.groupName.replace("Група ", ""));
    groupByCountry.set(match.away, match.groupName.replace("Група ", ""));
  }

  await prisma.$transaction([
    prisma.leaderboardRow.deleteMany(),
    prisma.matchPlayerPoint.deleteMany(),
    prisma.petitionVote.deleteMany(),
    prisma.petition.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.lineupSnapshotEntry.deleteMany(),
    prisma.lineupSnapshot.deleteMany(),
    prisma.fixture.deleteMany(),
    prisma.gameweek.deleteMany(),
    prisma.rosterEntry.deleteMany(),
    prisma.player.deleteMany(),
    prisma.nationalTeam.deleteMany(),
  ]);

  const createdTeams = new Map<string, { id: string }>();
  for (const flag of flags) {
    const team = await prisma.nationalTeam.create({
      data: {
        code: flag.code,
        nameUk: flag.countryUk,
        groupKey: groupByCountry.get(flag.countryUk) ?? null,
        flagPath: `/flags/${flag.filename}`,
        squadStatus: finalSquadByCountry.has(flag.countryUk) ? "FINAL" : "UNKNOWN",
      },
      select: { id: true },
    });
    createdTeams.set(flag.countryUk, team);
  }

  const matchesWithDates = matches.map((match) => ({ ...match, kickoffAt: kickoffAt(match.date, match.time) }));
  const gameweeks = new Map<number, { id: string }>();
  for (const [number, config] of Object.entries(gameweekConfig).map(([number, config]) => [Number(number), config] as const)) {
    const gameweek = await prisma.gameweek.create({
      data: {
        number,
        name: config.name,
        stage: config.stage,
        startAt: config.startAt,
        deadlineAt: config.deadlineAt,
        transferLimit: config.transferLimit,
        transfersOpen: config.transfersOpen,
        status: config.transfersOpen ? "OPEN" : "UPCOMING",
      },
      select: { id: true },
    });
    gameweeks.set(number, gameweek);
  }

  for (const match of matchesWithDates) {
    const homeTeam = createdTeams.get(match.home);
    const awayTeam = createdTeams.get(match.away);
    const gameweek = gameweeks.get(match.round);
    if (!homeTeam || !awayTeam || !gameweek) {
      throw new Error(`Cannot map fixture #${match.matchNo}: ${match.home} - ${match.away}`);
    }

    await prisma.fixture.create({
      data: {
        matchNo: match.matchNo,
        groupName: match.groupName,
        gameweek: match.round,
        gameweekId: gameweek.id,
        kickoffAt: match.kickoffAt,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      },
    });
  }

  for (const player of testPlayers) {
    if (finalSquadByCountry.has(player.nation)) continue;
    const nationalTeam = createdTeams.get(player.nation);
    if (!nationalTeam) throw new Error(`Cannot map test player nation: ${player.nation}`);

    await prisma.player.create({
      data: {
        nationalTeamId: nationalTeam.id,
        name: player.name,
        position: player.position,
        price: player.price,
        squadStatus: "TEST",
      },
    });
  }

  for (const squad of finalSquads.squads) {
    const nationalTeam = createdTeams.get(squad.countryUk);
    if (!nationalTeam) throw new Error(`Cannot map final squad nation: ${squad.countryUk}`);

    await prisma.player.createMany({
      data: squad.players.map((player) => ({
        nationalTeamId: nationalTeam.id,
        name: player.name,
        nameOriginal: player.nameOriginal,
        position: player.position as PlayerPosition,
        club: player.club,
        clubOriginal: player.clubOriginal ?? player.club,
        price: 5.0,
        squadStatus: "FINAL",
      })),
    });
  }

  console.log(
    `Seeded ${flags.length} national teams, ${matches.length} fixtures, ${finalSquads.squads.length} final squads and ${testPlayers.length} fallback test players.`,
  );
  console.table(
    Object.entries(gameweekConfig).map(([round, config]) => ({
      gameweek: `GW${round}`,
      startKyiv: formatKyiv(config.startAt),
      deadlineKyiv: formatKyiv(config.deadlineAt),
      transfers: config.transferLimit ?? "unlimited",
    })),
  );
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

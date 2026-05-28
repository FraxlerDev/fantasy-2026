import type { Prisma, RosterSlot } from "@prisma/client";
import { prisma } from "./prisma";

const formations: Record<string, { DEF: number; MID: number; FWD: number }> = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { DEF: 5, MID: 4, FWD: 1 },
};

export const defaultGameweeks = [
  { number: 1, name: "GW1", stage: "1 тур групового етапу", startAt: "2026-06-11T22:00:00+03:00", deadlineAt: "2026-06-11T20:30:00+03:00", transferLimit: null, transfersOpen: true },
  { number: 2, name: "GW2", stage: "2 тур групового етапу", startAt: "2026-06-18T19:00:00+03:00", deadlineAt: "2026-06-18T17:30:00+03:00", transferLimit: 3, transfersOpen: false },
  { number: 3, name: "GW3", stage: "3 тур групового етапу", startAt: "2026-06-24T22:00:00+03:00", deadlineAt: "2026-06-24T20:30:00+03:00", transferLimit: 3, transfersOpen: false },
  { number: 4, name: "GW4", stage: "1/16 фіналу", startAt: "2026-06-28T22:00:00+03:00", deadlineAt: "2026-06-28T20:30:00+03:00", transferLimit: null, transfersOpen: false },
  { number: 5, name: "GW5", stage: "1/8 фіналу", startAt: "2026-07-04T20:00:00+03:00", deadlineAt: "2026-07-04T18:30:00+03:00", transferLimit: 5, transfersOpen: false },
  { number: 6, name: "GW6", stage: "1/4 фіналу", startAt: "2026-07-09T23:00:00+03:00", deadlineAt: "2026-07-09T21:30:00+03:00", transferLimit: 5, transfersOpen: false },
  { number: 7, name: "GW7", stage: "1/2 фіналу, фінал і матч за 3 місце", startAt: "2026-07-14T22:00:00+03:00", deadlineAt: "2026-07-14T20:30:00+03:00", transferLimit: null, transfersOpen: false },
] as const;

type RosterEntryForValidation = {
  playerId: string;
  slot: RosterSlot;
  benchOrder: number | null;
  isCaptain: boolean;
  player: {
    position: "GK" | "DEF" | "MID" | "FWD";
    price: Prisma.Decimal;
    nationalTeamId: string;
  };
};

export async function ensureDefaultGameweeks() {
  for (const gameweek of defaultGameweeks) {
    await prisma.gameweek.upsert({
      where: { number: gameweek.number },
      update: {
        name: gameweek.name,
        stage: gameweek.stage,
        startAt: new Date(gameweek.startAt),
        deadlineAt: new Date(gameweek.deadlineAt),
        transferLimit: gameweek.transferLimit,
      },
      create: {
        number: gameweek.number,
        name: gameweek.name,
        stage: gameweek.stage,
        startAt: new Date(gameweek.startAt),
        deadlineAt: new Date(gameweek.deadlineAt),
        transferLimit: gameweek.transferLimit,
        transfersOpen: gameweek.transfersOpen,
        status: gameweek.transfersOpen ? "OPEN" : "UPCOMING",
      },
    });
  }
}

export function validateRosterForSnapshot(entries: RosterEntryForValidation[], formation: string) {
  const starters = entries.filter((entry) => entry.slot === "STARTER");
  const bench = entries.filter((entry) => entry.slot === "BENCH");
  const selectedIds = new Set(entries.map((entry) => entry.playerId));
  const shape = formations[formation];

  if (!shape) return "Невідома схема складу.";
  if (entries.length !== 15 || selectedIds.size !== 15) return "У складі має бути 15 різних гравців.";
  if (starters.length !== 11 || bench.length !== 4) return "У старті має бути 11 гравців, на лавці - 4.";

  const totalPrice = entries.reduce((sum, entry) => sum + Number(entry.player.price), 0);
  if (totalPrice > 100) return "Бюджет перевищує 100 монет.";

  const nationCounts = new Map<string, number>();
  for (const entry of entries) {
    nationCounts.set(entry.player.nationalTeamId, (nationCounts.get(entry.player.nationalTeamId) ?? 0) + 1);
  }
  if ([...nationCounts.values()].some((count) => count > 2)) return "У складі більше 2 гравців з однієї збірної.";

  const starterCounts = {
    GK: starters.filter((entry) => entry.player.position === "GK").length,
    DEF: starters.filter((entry) => entry.player.position === "DEF").length,
    MID: starters.filter((entry) => entry.player.position === "MID").length,
    FWD: starters.filter((entry) => entry.player.position === "FWD").length,
  };
  if (starterCounts.GK !== 1 || starterCounts.DEF !== shape.DEF || starterCounts.MID !== shape.MID || starterCounts.FWD !== shape.FWD) {
    return `Старт не відповідає схемі ${formation}.`;
  }

  const captain = starters.find((entry) => entry.isCaptain);
  if (!captain) return "Капітан має бути обраний зі стартового складу.";

  return null;
}

export async function createGameweekSnapshots(gameweekNumber: number) {
  await ensureDefaultGameweeks();

  const gameweek = await prisma.gameweek.findUnique({ where: { number: gameweekNumber } });
  if (!gameweek) throw new Error(`GW${gameweekNumber} not found`);
  if (gameweek.snapshotsCreatedAt) {
    return { created: 0, failed: 0, skipped: true };
  }

  const teams = await prisma.fantasyTeam.findMany({
    include: {
      rosterEntries: {
        include: { player: true },
        orderBy: [{ slot: "asc" }, { benchOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  let created = 0;
  let failed = 0;

  await prisma.$transaction(async (tx) => {
    await tx.gameweek.update({
      where: { id: gameweek.id },
      data: { status: "SNAPSHOTTING", transfersOpen: false },
    });

    for (const team of teams) {
      const reason = validateRosterForSnapshot(team.rosterEntries, team.formation);

      if (reason) {
        failed += 1;
        await tx.lineupSnapshotFailure.upsert({
          where: { fantasyTeamId_gameweek: { fantasyTeamId: team.id, gameweek: gameweekNumber } },
          update: { reason },
          create: { fantasyTeamId: team.id, gameweek: gameweekNumber, reason },
        });
        continue;
      }

      const snapshot = await tx.lineupSnapshot.upsert({
        where: { fantasyTeamId_gameweek: { fantasyTeamId: team.id, gameweek: gameweekNumber } },
        update: { formation: team.formation },
        create: { fantasyTeamId: team.id, gameweek: gameweekNumber, formation: team.formation },
      });

      await tx.lineupSnapshotEntry.deleteMany({ where: { snapshotId: snapshot.id } });
      await tx.lineupSnapshotEntry.createMany({
        data: team.rosterEntries.map((entry) => ({
          snapshotId: snapshot.id,
          playerId: entry.playerId,
          slot: entry.slot,
          benchOrder: entry.benchOrder,
          isCaptain: entry.isCaptain,
          isViceCaptain: false,
        })),
      });
      await tx.lineupSnapshotFailure.deleteMany({ where: { fantasyTeamId: team.id, gameweek: gameweekNumber } });
      created += 1;
    }

    await tx.gameweek.update({
      where: { id: gameweek.id },
      data: { status: "LOCKED", snapshotsCreatedAt: new Date(), transfersOpen: false },
    });
  });

  return { created, failed, skipped: false };
}

export async function processDueGameweekSnapshots(now = new Date()) {
  await ensureDefaultGameweeks();

  const dueGameweeks = await prisma.gameweek.findMany({
    where: {
      deadlineAt: { lte: now },
      snapshotsCreatedAt: null,
    },
    orderBy: { number: "asc" },
  });

  const results = [];
  for (const gameweek of dueGameweeks) {
    results.push({ gameweek: gameweek.number, ...(await createGameweekSnapshots(gameweek.number)) });
  }

  return results;
}

export async function openGameweekTransfers(gameweekNumber: number) {
  await ensureDefaultGameweeks();

  const gameweek = await prisma.gameweek.findUnique({ where: { number: gameweekNumber } });
  if (!gameweek) throw new Error(`GW${gameweekNumber} not found`);
  if (gameweek.deadlineAt <= new Date()) throw new Error(`GW${gameweekNumber} deadline is closed`);

  await prisma.gameweek.updateMany({
    where: { number: { not: gameweekNumber }, transfersOpen: true },
    data: { transfersOpen: false },
  });

  return prisma.gameweek.update({
    where: { number: gameweekNumber },
    data: { transfersOpen: true, status: "OPEN" },
  });
}

export async function getEditableGameweek() {
  await ensureDefaultGameweeks();
  await processDueGameweekSnapshots();

  return prisma.gameweek.findFirst({
    where: {
      transfersOpen: true,
      deadlineAt: { gt: new Date() },
    },
    orderBy: { number: "asc" },
  });
}

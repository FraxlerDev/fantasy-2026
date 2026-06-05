"use server";

import { PlayerPosition, PlayerStatus } from "@prisma/client";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { playoffMatches } from "../../data/match-center";
import { requireAdmin } from "../../lib/admin";
import { createGameweekSnapshots, openGameweekTransfers } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { refreshLeaderboards } from "../../lib/rankings";

const playerPositions = new Set(["GK", "DEF", "MID", "FWD"]);
const playerStatuses = new Set(["AVAILABLE", "DOUBTFUL", "OUT", "ELIMINATED"]);
const maxPlayerPhotoSize = 200 * 1024;
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function downstreamPlayoffIds(matchId: string) {
  const result = new Set<string>();
  const queue = [matchId];
  while (queue.length) {
    const current = queue.shift()!;
    for (const definition of playoffMatches) {
      if (!("fromA" in definition) || (definition.fromA !== current && definition.fromB !== current)) continue;
      if (!result.has(definition.id)) {
        result.add(definition.id);
        queue.push(definition.id);
      }
    }
  }
  return [...result];
}

function splitCsvLine(line: string) {
  return line.includes(";") ? line.split(";") : line.split(",");
}

export async function createFixture(formData: FormData) {
  await requireAdmin();
  const homeTeamId = String(formData.get("homeTeamId") ?? "");
  const awayTeamId = String(formData.get("awayTeamId") ?? "");
  const gameweek = Number(formData.get("gameweek") ?? 1);
  const matchNoRaw = String(formData.get("matchNo") ?? "").trim();
  const groupNameRaw = String(formData.get("groupName") ?? "").trim();
  const parsedMatchNo = matchNoRaw ? Number.parseInt(matchNoRaw, 10) : null;
  const kickoffAt = new Date(String(formData.get("kickoffAt") ?? ""));

  if (
    !homeTeamId ||
    !awayTeamId ||
    homeTeamId === awayTeamId ||
    Number.isNaN(kickoffAt.getTime()) ||
    (parsedMatchNo !== null && (Number.isNaN(parsedMatchNo) || parsedMatchNo <= 0))
  ) {
    redirect("/admin?error=fixture");
  }

  const [gameweekRef, homeTeam] = await Promise.all([
    prisma.gameweek.findUnique({ where: { number: gameweek } }),
    prisma.nationalTeam.findUnique({ where: { id: homeTeamId } }),
  ]);
  await prisma.fixture.create({
    data: {
      matchNo: parsedMatchNo,
      groupName: groupNameRaw || (homeTeam?.groupKey ? `Група ${homeTeam.groupKey}` : null),
      homeTeamId,
      awayTeamId,
      gameweek,
      gameweekId: gameweekRef?.id,
      kickoffAt,
    },
  });
  revalidatePath("/admin");
  redirect("/admin?fixture=created");
}

export async function updatePlayerPrice(formData: FormData) {
  await requireAdmin();
  const playerId = String(formData.get("playerId") ?? "");
  const price = Number(formData.get("price") ?? 0);
  if (!playerId || price <= 0) redirect("/admin?error=price");

  await prisma.player.update({ where: { id: playerId }, data: { price } });
  revalidatePath("/admin");
  redirect("/admin?price=updated");
}

export async function deletePlayer(formData: FormData) {
  await requireAdmin();
  const playerId = String(formData.get("playerId") ?? "");
  if (!playerId) redirect("/admin?error=player-delete");

  const [rosterCount, snapshotCount] = await Promise.all([
    prisma.rosterEntry.count({ where: { playerId } }),
    prisma.lineupSnapshotEntry.count({ where: { playerId } }),
  ]);

  if (rosterCount > 0 || snapshotCount > 0) {
    redirect("/admin?error=player-in-use#players-list");
  }

  await prisma.player.delete({ where: { id: playerId } });
  revalidatePath("/admin");
  revalidatePath("/squad");
  redirect("/admin?player=deleted#players-list");
}

export async function deleteNationalTeamPlayers(formData: FormData) {
  await requireAdmin();
  const nationalTeamId = String(formData.get("nationalTeamId") ?? "");
  if (!nationalTeamId) redirect("/admin?error=team-players-delete#players-list");

  const players = await prisma.player.findMany({
    where: { nationalTeamId },
    select: { id: true },
  });
  const playerIds = players.map((player) => player.id);

  if (playerIds.length === 0) {
    redirect("/admin?teamPlayers=deleted&count=0#players-list");
  }

  const [rosterCount, snapshotCount] = await Promise.all([
    prisma.rosterEntry.count({ where: { playerId: { in: playerIds } } }),
    prisma.lineupSnapshotEntry.count({ where: { playerId: { in: playerIds } } }),
  ]);

  if (rosterCount > 0 || snapshotCount > 0) {
    redirect("/admin?error=team-players-in-use#players-list");
  }

  const result = await prisma.player.deleteMany({ where: { id: { in: playerIds } } });

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/teams");
  redirect(`/admin?teamPlayers=deleted&count=${result.count}#players-list`);
}

export async function updatePlayer(formData: FormData) {
  await requireAdmin();
  const playerId = String(formData.get("playerId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const nameOriginal = String(formData.get("nameOriginal") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim().toUpperCase();
  const price = Number(formData.get("price") ?? 0);
  const club = String(formData.get("club") ?? "").trim();
  const clubOriginal = String(formData.get("clubOriginal") ?? "").trim();
  const status = String(formData.get("status") ?? "AVAILABLE").trim().toUpperCase();
  const unavailableReason = String(formData.get("unavailableReason") ?? "").trim();
  const photo = formData.get("photo");

  if (!playerId || name.length < 2 || !playerPositions.has(position) || price <= 0 || !playerStatuses.has(status)) {
    redirect("/admin?error=player-edit");
  }

  let photoUrl: string | undefined;
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > maxPlayerPhotoSize || !allowedPhotoTypes.has(photo.type)) {
      redirect("/admin?error=photo");
    }

    const ext = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
    const dir = path.join(process.cwd(), "public", "player-photos");
    await mkdir(dir, { recursive: true });
    const fileName = `${playerId}.${ext}`;
    await writeFile(path.join(dir, fileName), Buffer.from(await photo.arrayBuffer()));
    photoUrl = `/player-photos/${fileName}`;
  }

  await prisma.player.update({
    where: { id: playerId },
    data: {
      name,
      nameOriginal: nameOriginal || null,
      position: position as PlayerPosition,
      price,
      club: club || null,
      clubOriginal: clubOriginal || null,
      status: status as PlayerStatus,
      unavailableReason: status === "AVAILABLE" ? null : unavailableReason || null,
      ...(photoUrl ? { photoUrl } : {}),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/teams");
  redirect("/admin?player=updated#players-list");
}

export async function importPlayersCsv(formData: FormData) {
  await requireAdmin();
  const rawCsv = String(formData.get("playersCsv") ?? "").trim();
  if (!rawCsv) redirect("/admin?error=players-csv");

  const lines = rawCsv.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const dataLines = lines[0]?.toLowerCase().includes("team") || lines[0]?.toLowerCase().includes("збірна")
    ? lines.slice(1)
    : lines;

  const parsedRows: Array<{
    teamName: string;
    playerName: string;
    position: string;
    price: number;
    status: string;
    club: string | null;
  }> = [];
  for (const [index, line] of dataLines.entries()) {
    const [teamNameRaw, playerNameRaw, positionRaw, priceRaw, statusRaw, clubRaw] = splitCsvLine(line).map((value) => value.trim());
    const teamName = teamNameRaw;
    const playerName = playerNameRaw;
    const position = positionRaw?.toUpperCase();
    const status = statusRaw?.toUpperCase() || "AVAILABLE";
    const price = Number.parseFloat(String(priceRaw).replace(",", "."));

    if (!teamName || !playerName || !playerPositions.has(position) || Number.isNaN(price) || price <= 0 || !playerStatuses.has(status)) {
      redirect(`/admin?error=players-csv-row-${index + 1}`);
    }

    parsedRows.push({ teamName, playerName, position, price, status, club: clubRaw || null });
  }

  let imported = 0;
  await prisma.$transaction(async (tx) => {
    for (const row of parsedRows) {
      const { teamName, playerName, position, price, status, club } = row;

      const nationalTeam = await tx.nationalTeam.findFirst({
        where: { OR: [{ nameUk: teamName }, { code: teamName.toUpperCase() }] },
      });
      if (!nationalTeam) {
        redirect(`/admin?error=players-team-${encodeURIComponent(teamName)}`);
      }

      const existing = await tx.player.findFirst({
        where: { nationalTeamId: nationalTeam.id, name: playerName },
      });

      if (existing) {
        await tx.player.update({
          where: { id: existing.id },
          data: { position: position as PlayerPosition, price, status: status as PlayerStatus, club, clubOriginal: club, squadStatus: "FINAL" },
        });
      } else {
        await tx.player.create({
          data: {
            nationalTeamId: nationalTeam.id,
            name: playerName,
            position: position as PlayerPosition,
            price,
            status: status as PlayerStatus,
            club,
            clubOriginal: club,
            squadStatus: "FINAL",
          },
        });
      }
      imported += 1;
    }
  });

  revalidatePath("/admin");
  revalidatePath("/squad");
  redirect(`/admin?players=imported&count=${imported}`);
}

export async function saveFixturePoints(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  const fixture = await prisma.fixture.findUnique({
    where: { id: fixtureId },
    include: {
      homeTeam: { include: { players: true } },
      awayTeam: { include: { players: true } },
    },
  });
  if (!fixture) redirect("/admin?error=fixture");

  const players = [...fixture.homeTeam.players, ...fixture.awayTeam.players];
  await prisma.$transaction(async (tx) => {
    for (const player of players) {
      const raw = String(formData.get(`points:${player.id}`) ?? "0").trim();
      const points = raw === "" ? 0 : Number.parseInt(raw, 10);
      await tx.matchPlayerPoint.upsert({
        where: { fixtureId_playerId: { fixtureId, playerId: player.id } },
        update: { points: Number.isNaN(points) ? 0 : points },
        create: { fixtureId, playerId: player.id, points: Number.isNaN(points) ? 0 : points },
      });
    }

    await tx.fixture.update({ where: { id: fixtureId }, data: { status: "POINTS_SAVED" } });
  });

  revalidatePath("/admin");
  redirect(`/admin?fixtureId=${fixtureId}&points=saved`);
}

export async function saveFixtureScore(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  const homeScoreRaw = String(formData.get("homeScore") ?? "").trim();
  const awayScoreRaw = String(formData.get("awayScore") ?? "").trim();
  const homeScore = Number.parseInt(homeScoreRaw, 10);
  const awayScore = Number.parseInt(awayScoreRaw, 10);

  if (!fixtureId || Number.isNaN(homeScore) || Number.isNaN(awayScore) || homeScore < 0 || awayScore < 0) {
    redirect("/admin?error=score");
  }

  await prisma.fixture.update({
    where: { id: fixtureId },
    data: { homeScore, awayScore },
  });

  revalidatePath("/admin");
  revalidatePath("/tournament");
  revalidatePath("/matches");
  redirect(`/admin?fixtureId=${fixtureId}&score=saved`);
}

export async function resetFixtureScore(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  if (!fixtureId) redirect("/admin?error=score");

  await prisma.fixture.update({
    where: { id: fixtureId },
    data: { homeScore: null, awayScore: null },
  });

  revalidatePath("/admin");
  revalidatePath("/tournament");
  revalidatePath("/matches");
  redirect(`/admin?fixtureId=${fixtureId}&score=reset`);
}

export async function savePlayoffScore(formData: FormData) {
  await requireAdmin();
  const matchId = String(formData.get("matchId") ?? "");
  const homeScore = Number.parseInt(String(formData.get("homeScore") ?? ""), 10);
  const awayScore = Number.parseInt(String(formData.get("awayScore") ?? ""), 10);
  const homePenaltiesRaw = String(formData.get("homePenalties") ?? "").trim();
  const awayPenaltiesRaw = String(formData.get("awayPenalties") ?? "").trim();
  const homePenalties = homePenaltiesRaw === "" ? null : Number.parseInt(homePenaltiesRaw, 10);
  const awayPenalties = awayPenaltiesRaw === "" ? null : Number.parseInt(awayPenaltiesRaw, 10);

  const invalidMain =
    !matchId ||
    Number.isNaN(homeScore) ||
    Number.isNaN(awayScore) ||
    homeScore < 0 ||
    awayScore < 0;
  const invalidPenalties =
    homeScore === awayScore &&
    (homePenalties === null ||
      awayPenalties === null ||
      Number.isNaN(homePenalties) ||
      Number.isNaN(awayPenalties) ||
      homePenalties < 0 ||
      awayPenalties < 0 ||
      homePenalties === awayPenalties);

  if (invalidMain || invalidPenalties) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-score#playoff-scores`);
  }

  const downstreamIds = downstreamPlayoffIds(matchId);
  await prisma.$transaction([
    prisma.playoffMatch.update({
      where: { id: matchId },
      data: {
        homeScore,
        awayScore,
        homePenalties: homeScore === awayScore ? homePenalties : null,
        awayPenalties: homeScore === awayScore ? awayPenalties : null,
      },
    }),
    ...(downstreamIds.length
      ? [
          prisma.playoffMatch.updateMany({
            where: { id: { in: downstreamIds } },
            data: { homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null },
          }),
        ]
      : []),
  ]);

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffScore=saved#playoff-scores`);
}

export async function resetPlayoffScore(formData: FormData) {
  await requireAdmin();
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) redirect("/admin?error=playoff-score#playoff-scores");

  const affectedIds = [matchId, ...downstreamPlayoffIds(matchId)];
  await prisma.playoffMatch.updateMany({
    where: { id: { in: affectedIds } },
    data: {
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffScore=reset#playoff-scores`);
}

export async function updateTournamentTiebreaks(formData: FormData) {
  await requireAdmin();
  const teamId = String(formData.get("teamId") ?? "");
  const conduct = Number.parseInt(String(formData.get("teamConductScore") ?? "0"), 10);
  const fifaRankRaw = String(formData.get("fifaRank") ?? "").trim();
  const fifaRank = fifaRankRaw === "" ? null : Number.parseInt(fifaRankRaw, 10);

  if (!teamId || Number.isNaN(conduct) || (fifaRank !== null && (Number.isNaN(fifaRank) || fifaRank < 1))) {
    redirect("/admin?error=tiebreak#playoff-scores");
  }

  await prisma.nationalTeam.update({
    where: { id: teamId },
    data: { teamConductScore: conduct, fifaRank },
  });

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect("/admin?tiebreak=saved#playoff-scores");
}

export async function refreshRankingsAction() {
  await requireAdmin();
  await refreshLeaderboards();
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  revalidatePath("/admin");
  redirect("/admin?rankings=updated");
}

export async function createGameweekSnapshotsAction(formData: FormData) {
  await requireAdmin();
  const gameweek = Number(formData.get("gameweek") ?? 0);
  if (!gameweek) redirect("/admin?error=gameweek#gameweeks");

  const result = await createGameweekSnapshots(gameweek);

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/leaderboard");
  redirect(`/admin?snapshots=${result.created}&snapshotFailed=${result.failed}&snapshotSkipped=${result.skipped ? "1" : "0"}#gameweeks`);
}

export async function openGameweekTransfersAction(formData: FormData) {
  await requireAdmin();
  const gameweek = Number(formData.get("gameweek") ?? 0);
  if (!gameweek) redirect("/admin?error=gameweek#gameweeks");

  try {
    await openGameweekTransfers(gameweek);
  } catch {
    redirect("/admin?error=open-gameweek#gameweeks");
  }

  revalidatePath("/admin");
  revalidatePath("/squad");
  redirect(`/admin?openedGw=${gameweek}#gameweeks`);
}

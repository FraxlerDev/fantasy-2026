"use server";

import { PlayerPosition, PlayerStatus } from "@prisma/client";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { playoffMatches } from "../../data/match-center";
import { requireAdmin } from "../../lib/admin";
import { applyAutoSubstitutions, resetAutoSubstitutions } from "../../lib/auto-substitutions";
import { closeGameweekTransfers, createGameweekSnapshots, openGameweekTransfers } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { refreshLeaderboards } from "../../lib/rankings";
import { buildAllGroupStandings, resolvePlayoffMatches } from "../../lib/tournament";

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

function playoffGameweek(stage: string) {
  if (stage === "r32") return 4;
  if (stage === "r16") return 5;
  if (stage === "qf") return 6;
  return 7;
}

function playoffStageName(stage: string, label: string | null) {
  if (label) return label;
  if (stage === "r32") return "1/16 фіналу";
  if (stage === "r16") return "1/8 фіналу";
  if (stage === "qf") return "1/4 фіналу";
  if (stage === "sf") return "1/2 фіналу";
  return "Фінал";
}

async function resolvedPlayoffFromDatabase() {
  const [teams, groupFixtures, scores] = await Promise.all([
    prisma.nationalTeam.findMany(),
    prisma.fixture.findMany({ where: { gameweek: { lte: 3 } } }),
    prisma.playoffMatch.findMany({ orderBy: { matchNo: "asc" } }),
  ]);
  const tournamentTeams = teams.map((team) => ({
    id: team.id,
    nameUk: team.nameUk,
    groupKey: team.groupKey,
    flagPath: team.flagPath,
    teamConductScore: team.teamConductScore,
    fifaRank: team.fifaRank,
  }));
  const teamById = new Map(tournamentTeams.map((team) => [team.id, team]));
  const standingsFixtures = groupFixtures.flatMap((fixture) => {
    const homeTeam = teamById.get(fixture.homeTeamId);
    const awayTeam = teamById.get(fixture.awayTeamId);
    return homeTeam && awayTeam ? [{ ...fixture, homeTeam, awayTeam }] : [];
  });
  return resolvePlayoffMatches(buildAllGroupStandings(tournamentTeams, standingsFixtures), scores);
}

async function playoffFixturesWithPoints(playoffIds: string[]) {
  if (!playoffIds.length) return 0;
  return prisma.fixture.count({
    where: {
      playoffMatchId: { in: playoffIds },
      playerPoints: { some: {} },
    },
  });
}

async function syncPlayoffFixtures(playoffIds?: string[]) {
  const resolved = await resolvedPlayoffFromDatabase();
  const targetIds = playoffIds ? new Set(playoffIds) : null;
  const gameweeks = await prisma.gameweek.findMany({ where: { number: { in: [4, 5, 6, 7] } } });
  const gameweekByNumber = new Map(gameweeks.map((gameweek) => [gameweek.number, gameweek.id]));
  const definitionById = new Map<string, (typeof playoffMatches)[number]>(
    playoffMatches.map((definition) => [definition.id, definition]),
  );

  for (const match of resolved) {
    if (targetIds && !targetIds.has(match.id)) continue;
    const existing = await prisma.fixture.findFirst({
      where: { OR: [{ playoffMatchId: match.id }, { matchNo: match.matchNo }] },
      include: { _count: { select: { playerPoints: true } } },
    });
    if (match.home.type !== "team" || match.away.type !== "team") {
      if (existing?.playoffMatchId === match.id && existing._count.playerPoints === 0) {
        await prisma.fixture.delete({ where: { id: existing.id } });
      }
      continue;
    }

    const definition = definitionById.get(match.id);
    const gameweek = playoffGameweek(match.stage);
    const data = {
      playoffMatchId: match.id,
      matchNo: match.matchNo,
      homeTeamId: match.home.team.id,
      awayTeamId: match.away.team.id,
      gameweek,
      gameweekId: gameweekByNumber.get(gameweek) ?? null,
      groupName: playoffStageName(match.stage, match.label),
      kickoffAt: match.kickoffAt,
      city: definition?.city ?? null,
      stadiumId: match.stadiumId,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homePenalties: match.homePenalties,
      awayPenalties: match.awayPenalties,
    };
    if (existing) await prisma.fixture.update({ where: { id: existing.id }, data });
    else await prisma.fixture.create({ data });
  }
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

export async function updatePlayerPricesBatch(updates: Array<{ id: string; price: string }>) {
  await requireAdmin();
  const normalized = updates.map((update) => ({
    id: update.id,
    price: Number(String(update.price).replace(",", ".")),
  }));

  if (normalized.some((update) => !update.id || Number.isNaN(update.price))) {
    return { ok: false, error: "price" };
  }

  await prisma.$transaction(
    normalized.map((update) =>
      prisma.player.update({
        where: { id: update.id },
        data: { price: update.price },
      }),
    ),
  );

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/player-points");
  revalidatePath("/player-rankings");
  revalidatePath("/tournament");
  return { ok: true };
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
      const didNotPlay = formData.get(`didNotPlay:${player.id}`) === "on";
      const redCard = !didNotPlay && formData.get(`redCard:${player.id}`) === "on";
      const raw = String(formData.get(`points:${player.id}`) ?? "0").trim();
      const parsedPoints = raw === "" ? 0 : Number.parseInt(raw, 10);
      const points = didNotPlay || Number.isNaN(parsedPoints) ? 0 : parsedPoints;
      await tx.matchPlayerPoint.upsert({
        where: { fixtureId_playerId: { fixtureId, playerId: player.id } },
        update: { points, didPlay: !didNotPlay, redCard },
        create: { fixtureId, playerId: player.id, points, didPlay: !didNotPlay, redCard },
      });

      if (redCard) {
        await tx.player.update({
          where: { id: player.id },
          data: {
            status: "OUT",
            unavailableReason: "Червона картка",
            suspendedUntilGameweek: fixture.gameweek + 1,
          },
        });
      } else if (player.suspendedUntilGameweek === fixture.gameweek + 1) {
        const otherActiveRedCards = await tx.matchPlayerPoint.count({
          where: {
            playerId: player.id,
            fixtureId: { not: fixtureId },
            redCard: true,
            fixture: { gameweek: fixture.gameweek },
          },
        });
        if (otherActiveRedCards === 0) {
          await tx.player.update({
            where: { id: player.id },
            data: {
              status: "AVAILABLE",
              unavailableReason: null,
              suspendedUntilGameweek: null,
            },
          });
        }
      }
    }

    await tx.fixture.update({ where: { id: fixtureId }, data: { status: "POINTS_SAVED" } });
  });

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/teams");
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  redirect(`/admin?fixtureId=${fixtureId}&points=saved#fixture-points-modal`);
}

export async function resetFixturePoints(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  const fixture = await prisma.fixture.findUnique({
    where: { id: fixtureId },
    select: {
      gameweek: true,
      playerPoints: {
        where: { redCard: true },
        select: { playerId: true },
      },
    },
  });
  if (!fixture) redirect("/admin?error=fixture");

  const redCardPlayerIds = [...new Set(fixture.playerPoints.map((point) => point.playerId))];
  await prisma.$transaction(async (tx) => {
    await tx.matchPlayerPoint.deleteMany({ where: { fixtureId } });
    await tx.fixture.update({
      where: { id: fixtureId },
      data: { status: "SCHEDULED" },
    });

    for (const playerId of redCardPlayerIds) {
      const otherRedCards = await tx.matchPlayerPoint.count({
        where: {
          playerId,
          redCard: true,
          fixture: { gameweek: fixture.gameweek },
        },
      });
      if (otherRedCards === 0) {
        await tx.player.updateMany({
          where: {
            id: playerId,
            suspendedUntilGameweek: fixture.gameweek + 1,
          },
          data: {
            status: "AVAILABLE",
            unavailableReason: null,
            suspendedUntilGameweek: null,
          },
        });
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/teams");
  redirect(`/admin?fixtureId=${fixtureId}&points=reset#fixture-points-modal`);
}

export async function saveFixtureScore(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  const homeScoreRaw = String(formData.get("homeScore") ?? "").trim();
  const awayScoreRaw = String(formData.get("awayScore") ?? "").trim();
  const homeScore = Number.parseInt(homeScoreRaw, 10);
  const awayScore = Number.parseInt(awayScoreRaw, 10);
  const homePenaltiesRaw = String(formData.get("homePenalties") ?? "").trim();
  const awayPenaltiesRaw = String(formData.get("awayPenalties") ?? "").trim();
  const homePenalties = homePenaltiesRaw === "" ? null : Number.parseInt(homePenaltiesRaw, 10);
  const awayPenalties = awayPenaltiesRaw === "" ? null : Number.parseInt(awayPenaltiesRaw, 10);

  if (!fixtureId || Number.isNaN(homeScore) || Number.isNaN(awayScore) || homeScore < 0 || awayScore < 0) {
    redirect("/admin?error=score");
  }

  const fixture = await prisma.fixture.findUnique({ where: { id: fixtureId } });
  if (!fixture) redirect("/admin?error=score");

  if (fixture.playoffMatchId) {
    const invalidPenalties =
      homeScore === awayScore &&
      (homePenalties === null ||
        awayPenalties === null ||
        Number.isNaN(homePenalties) ||
        Number.isNaN(awayPenalties) ||
        homePenalties < 0 ||
        awayPenalties < 0 ||
        homePenalties === awayPenalties);
    if (invalidPenalties) {
      redirect(`/admin?fixtureId=${fixtureId}&error=playoff-score#fixture-points-modal`);
    }
    const downstreamIds = downstreamPlayoffIds(fixture.playoffMatchId);
    if (await playoffFixturesWithPoints(downstreamIds)) {
      redirect(`/admin?fixtureId=${fixtureId}&error=playoff-fixture-in-use#fixture-points-modal`);
    }
    await prisma.$transaction([
      prisma.fixture.update({
        where: { id: fixtureId },
        data: {
          homeScore,
          awayScore,
          homePenalties: homeScore === awayScore ? homePenalties : null,
          awayPenalties: homeScore === awayScore ? awayPenalties : null,
        },
      }),
      prisma.playoffMatch.update({
        where: { id: fixture.playoffMatchId },
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
    await syncPlayoffFixtures([fixture.playoffMatchId, ...downstreamIds]);
  } else {
    await prisma.fixture.update({ where: { id: fixtureId }, data: { homeScore, awayScore } });
  }

  revalidatePath("/admin");
  revalidatePath("/tournament");
  revalidatePath("/matches");
  redirect(`/admin?fixtureId=${fixtureId}&score=saved#fixture-points-modal`);
}

export async function resetFixtureScore(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  if (!fixtureId) redirect("/admin?error=score");

  const fixture = await prisma.fixture.findUnique({ where: { id: fixtureId } });
  if (!fixture) redirect("/admin?error=score");

  if (fixture.playoffMatchId) {
    const downstreamIds = downstreamPlayoffIds(fixture.playoffMatchId);
    if (await playoffFixturesWithPoints(downstreamIds)) {
      redirect(`/admin?fixtureId=${fixtureId}&error=playoff-fixture-in-use#fixture-points-modal`);
    }
    await prisma.$transaction([
      prisma.fixture.update({
        where: { id: fixtureId },
        data: { homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null },
      }),
      prisma.playoffMatch.updateMany({
        where: { id: { in: [fixture.playoffMatchId, ...downstreamIds] } },
        data: { homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null },
      }),
    ]);
    await syncPlayoffFixtures([fixture.playoffMatchId, ...downstreamIds]);
  } else {
    await prisma.fixture.update({ where: { id: fixtureId }, data: { homeScore: null, awayScore: null } });
  }

  revalidatePath("/admin");
  revalidatePath("/tournament");
  revalidatePath("/matches");
  redirect(`/admin?fixtureId=${fixtureId}&score=reset#fixture-points-modal`);
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
  const affectedIds = [matchId, ...downstreamIds];
  if (await playoffFixturesWithPoints(affectedIds)) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-fixture-in-use#playoff-scores`);
  }
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
  await syncPlayoffFixtures(affectedIds);

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffScore=saved#playoff-scores`);
}

export async function resetPlayoffScore(formData: FormData) {
  await requireAdmin();
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) redirect("/admin?error=playoff-score#playoff-scores");

  const affectedIds = [matchId, ...downstreamPlayoffIds(matchId)];
  if (await playoffFixturesWithPoints(affectedIds)) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-fixture-in-use#playoff-scores`);
  }
  await prisma.playoffMatch.updateMany({
    where: { id: { in: affectedIds } },
    data: {
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
    },
  });
  await syncPlayoffFixtures(affectedIds);

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffScore=reset#playoff-scores`);
}

export async function saveConfirmedPlayoffTeams(formData: FormData) {
  await requireAdmin();
  const matchId = String(formData.get("matchId") ?? "");
  const confirmedHomeTeamId = String(formData.get("confirmedHomeTeamId") ?? "").trim() || null;
  const confirmedAwayTeamId = String(formData.get("confirmedAwayTeamId") ?? "").trim() || null;

  const match = await prisma.playoffMatch.findUnique({ where: { id: matchId } });
  if (!match || match.stage !== "r32") {
    redirect(`/admin?playoffId=${matchId}&error=playoff-participants#playoff-scores`);
  }
  if (confirmedHomeTeamId && confirmedHomeTeamId === confirmedAwayTeamId) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-team-duplicate#playoff-scores`);
  }

  const selectedIds = [confirmedHomeTeamId, confirmedAwayTeamId].filter((id): id is string => Boolean(id));
  if (selectedIds.length) {
    const [existingTeams, duplicateMatch] = await Promise.all([
      prisma.nationalTeam.count({ where: { id: { in: selectedIds } } }),
      prisma.playoffMatch.findFirst({
        where: {
          stage: "r32",
          id: { not: matchId },
          OR: [
            { confirmedHomeTeamId: { in: selectedIds } },
            { confirmedAwayTeamId: { in: selectedIds } },
          ],
        },
      }),
    ]);
    if (existingTeams !== selectedIds.length) {
      redirect(`/admin?playoffId=${matchId}&error=playoff-participants#playoff-scores`);
    }
    if (duplicateMatch) {
      redirect(`/admin?playoffId=${matchId}&error=playoff-team-duplicate#playoff-scores`);
    }
  }

  if (
    match.confirmedHomeTeamId === confirmedHomeTeamId &&
    match.confirmedAwayTeamId === confirmedAwayTeamId
  ) {
    await syncPlayoffFixtures([matchId]);
    revalidatePath("/admin");
    revalidatePath("/matches");
    redirect(`/admin?playoffId=${matchId}&playoffTeams=saved#playoff-scores`);
  }

  const downstreamIds = downstreamPlayoffIds(matchId);
  const affectedIds = [matchId, ...downstreamIds];
  if (await playoffFixturesWithPoints(affectedIds)) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-fixture-in-use#playoff-scores`);
  }
  await prisma.$transaction([
    prisma.playoffMatch.update({
      where: { id: matchId },
      data: {
        confirmedHomeTeamId,
        confirmedAwayTeamId,
        homeScore: null,
        awayScore: null,
        homePenalties: null,
        awayPenalties: null,
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
  await syncPlayoffFixtures(affectedIds);

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffTeams=saved#playoff-scores`);
}

export async function resetConfirmedPlayoffTeams(formData: FormData) {
  await requireAdmin();
  const matchId = String(formData.get("matchId") ?? "");
  const match = await prisma.playoffMatch.findUnique({ where: { id: matchId } });
  if (!match || match.stage !== "r32") {
    redirect(`/admin?playoffId=${matchId}&error=playoff-participants#playoff-scores`);
  }

  const affectedIds = [matchId, ...downstreamPlayoffIds(matchId)];
  if (await playoffFixturesWithPoints(affectedIds)) {
    redirect(`/admin?playoffId=${matchId}&error=playoff-fixture-in-use#playoff-scores`);
  }
  await prisma.$transaction([
    prisma.playoffMatch.update({
      where: { id: matchId },
      data: {
        confirmedHomeTeamId: null,
        confirmedAwayTeamId: null,
        homeScore: null,
        awayScore: null,
        homePenalties: null,
        awayPenalties: null,
      },
    }),
    ...(affectedIds.length > 1
      ? [
          prisma.playoffMatch.updateMany({
            where: { id: { in: affectedIds.slice(1) } },
            data: { homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null },
          }),
        ]
      : []),
  ]);
  await syncPlayoffFixtures(affectedIds);

  revalidatePath("/admin");
  revalidatePath("/matches");
  redirect(`/admin?playoffId=${matchId}&playoffTeams=reset#playoff-scores`);
}

export async function deletePlayoffFixture(formData: FormData) {
  await requireAdmin();
  const fixtureId = String(formData.get("fixtureId") ?? "");
  const fixture = await prisma.fixture.findUnique({
    where: { id: fixtureId },
    include: { _count: { select: { playerPoints: true } } },
  });
  if (!fixture?.playoffMatchId || fixture.gameweek !== 4) {
    redirect(`/admin?fixtureId=${fixtureId}&error=playoff-fixture-delete#fixture-points-modal`);
  }

  const affectedPlayoffIds = [fixture.playoffMatchId, ...downstreamPlayoffIds(fixture.playoffMatchId)];
  if (await playoffFixturesWithPoints(affectedPlayoffIds)) {
    redirect(`/admin?fixtureId=${fixtureId}&error=playoff-fixture-in-use#fixture-points-modal`);
  }

  await prisma.$transaction([
    prisma.fixture.deleteMany({ where: { playoffMatchId: { in: affectedPlayoffIds } } }),
    prisma.playoffMatch.update({
      where: { id: fixture.playoffMatchId },
      data: {
        confirmedHomeTeamId: null,
        confirmedAwayTeamId: null,
        homeScore: null,
        awayScore: null,
        homePenalties: null,
        awayPenalties: null,
      },
    }),
    prisma.playoffMatch.updateMany({
      where: { id: { in: affectedPlayoffIds.slice(1) } },
      data: { homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/matches");
  revalidatePath("/squad");
  redirect("/admin?gw=4&playoffFixture=deleted#points");
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

  const gameweekRecord = await prisma.gameweek.findUnique({
    where: { number: gameweek },
    select: { deadlineAt: true },
  });
  if (!gameweekRecord) redirect("/admin?error=gameweek#gameweeks");

  const result = await createGameweekSnapshots(gameweek, {
    finalize: gameweekRecord.deadlineAt <= new Date(),
  });

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/leaderboard");
  redirect(`/admin?snapshots=${result.created}&snapshotFailed=${result.failed}&snapshotFinalized=${result.finalized ? "1" : "0"}#gameweeks`);
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

export async function closeGameweekTransfersAction(formData: FormData) {
  await requireAdmin();
  const gameweek = Number(formData.get("gameweek") ?? 0);
  if (!gameweek) redirect("/admin?error=gameweek#gameweeks");

  try {
    await closeGameweekTransfers(gameweek);
  } catch {
    redirect("/admin?error=close-gameweek#gameweeks");
  }

  revalidatePath("/admin");
  revalidatePath("/squad");
  redirect(`/admin?closedGw=${gameweek}#gameweeks`);
}

export async function calculateAutoSubstitutionsAction(formData: FormData) {
  await requireAdmin();
  const gameweek = Number(formData.get("gameweek") ?? 0);
  if (!gameweek) redirect("/admin?error=gameweek#autosubs");

  const result = await applyAutoSubstitutions(gameweek);

  revalidatePath("/admin");
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  revalidatePath("/teams/[id]", "page");
  redirect(`/admin?autosubsGw=${gameweek}&autosubs=${result.created}#autosubs`);
}

export async function resetAutoSubstitutionsAction(formData: FormData) {
  await requireAdmin();
  const gameweek = Number(formData.get("gameweek") ?? 0);
  if (!gameweek) redirect("/admin?error=gameweek#autosubs");

  const result = await resetAutoSubstitutions(gameweek);

  revalidatePath("/admin");
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  revalidatePath("/teams/[id]", "page");
  redirect(`/admin?autosubsResetGw=${gameweek}&autosubsReset=${result.deleted}#autosubs`);
}

export async function setMaintenanceModeAction(formData: FormData) {
  await requireAdmin();
  const enabled = String(formData.get("enabled") ?? "") === "1";

  await prisma.systemSetting.upsert({
    where: { key: "maintenanceMode" },
    create: { key: "maintenanceMode", value: enabled ? "on" : "off" },
    update: { value: enabled ? "on" : "off" },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  redirect(`/admin?maintenance=${enabled ? "on" : "off"}#maintenance`);
}

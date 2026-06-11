"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "../../auth";
import { getEditableGameweek } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { isValidUsername } from "../../lib/username";

const formations: Record<string, { DEF: number; MID: number; FWD: number }> = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { DEF: 5, MID: 4, FWD: 1 },
};

const maxAvatarSize = 200 * 1024;
const allowedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

async function saveAvatar(userId: string, avatar: FormDataEntryValue | null) {
  if (!(avatar instanceof File) || avatar.size === 0) return undefined;
  if (avatar.size > maxAvatarSize || !allowedAvatarTypes.has(avatar.type)) {
    redirect("/squad?profileError=avatar");
  }

  const ext = avatar.type === "image/png" ? "png" : avatar.type === "image/webp" ? "webp" : "jpg";
  const dir = path.join(process.cwd(), "public", "user-photos");
  await mkdir(dir, { recursive: true });
  const fileName = `${userId}.${ext}`;
  await writeFile(path.join(dir, fileName), Buffer.from(await avatar.arrayBuffer()));
  return `/user-photos/${fileName}`;
}

export async function updateSquadProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const teamName = String(formData.get("teamName") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const avatar = formData.get("avatar");

  if (teamName.length < 2 || teamName.length > 40) {
    redirect("/squad?profileError=team-name");
  }

  const [currentUser, existingTeam] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    }),
    prisma.fantasyTeam.findUnique({
      where: { userId: session.user.id },
      select: { id: true, name: true },
    }),
  ]);

  const usernameChanged = Boolean(username && username !== currentUser?.username);
  if (usernameChanged && !isValidUsername(username)) {
    redirect("/squad?profileError=username");
  }
  if (usernameChanged) {
    const duplicate = await prisma.user.findFirst({
      where: { username, id: { not: session.user.id } },
      select: { id: true },
    });
    if (duplicate) redirect("/squad?profileError=username-taken");
  }

  const uploadedAvatarUrl = await saveAvatar(session.user.id, avatar);

  const savedTeam = await prisma.$transaction(async (tx) => {
    if (usernameChanged || uploadedAvatarUrl) {
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          ...(usernameChanged ? { username } : {}),
          ...(uploadedAvatarUrl ? { image: uploadedAvatarUrl } : {}),
        },
      });
    }

    if (!existingTeam) {
      return tx.fantasyTeam.create({
        data: {
          userId: session.user.id,
          name: teamName,
        },
      });
    }

    if (existingTeam.name !== teamName) {
      const updatedTeam = await tx.fantasyTeam.update({
        where: { id: existingTeam.id },
        data: { name: teamName },
      });
      await tx.teamNameHistory.create({
        data: {
          fantasyTeamId: existingTeam.id,
          oldName: existingTeam.name,
          newName: teamName,
          changedById: session.user.id,
        },
      });
      return updatedTeam;
    }

    return existingTeam;
  });

  revalidatePath("/squad");
  revalidatePath(`/teams/${savedTeam.id}`);
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  redirect("/squad?profileSaved=1");
}

export async function saveSquad(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!session.user.username) {
    redirect("/onboarding");
  }

  const nextOpenGameweek = await getEditableGameweek();
  if (!nextOpenGameweek) {
    redirect("/squad?error=deadline-closed");
  }

  const teamName = String(formData.get("teamName") ?? "").trim();
  const starters = String(formData.get("starters") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const bench = String(formData.get("bench") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const captainId = String(formData.get("captainId") ?? "").trim();
  const formation = String(formData.get("formation") ?? "4-3-3").trim();
  const username = String(formData.get("username") ?? "").trim();
  const avatar = formData.get("avatar");
  const rosterIds = [...starters, ...bench];

  if (teamName.length < 2 || teamName.length > 40) {
    redirect("/squad?error=team-name");
  }

  if (rosterIds.length !== 15 || new Set(rosterIds).size !== 15) {
    redirect("/squad?error=roster-size");
  }

  if (starters.length !== 11 || bench.length !== 4) {
    redirect("/squad?error=lineup-size");
  }

  const formationRule = formations[formation];
  if (!formationRule) {
    redirect("/squad?error=formation");
  }

  if (!starters.includes(captainId)) {
    redirect("/squad?error=captain");
  }

  const players = await prisma.player.findMany({
    where: { id: { in: rosterIds } },
    include: { nationalTeam: true },
  });

  if (players.length !== 15) {
    redirect("/squad?error=players");
  }

  const totalPrice = players.reduce((sum, player) => sum + Number(player.price), 0);
  if (totalPrice > 100) {
    redirect("/squad?error=budget-exceeded");
  }

  const nationCounts = new Map<string, number>();
  for (const player of players) {
    nationCounts.set(player.nationalTeam.code, (nationCounts.get(player.nationalTeam.code) ?? 0) + 1);
  }
  if ([...nationCounts.values()].some((count) => count > 2)) {
    redirect("/squad?error=max-players-per-nation");
  }

  const starterPlayers = players.filter((player) => starters.includes(player.id));
  const starterCounts = {
    GK: starterPlayers.filter((player) => player.position === "GK").length,
    DEF: starterPlayers.filter((player) => player.position === "DEF").length,
    MID: starterPlayers.filter((player) => player.position === "MID").length,
    FWD: starterPlayers.filter((player) => player.position === "FWD").length,
  };
  if (
    starterCounts.GK !== 1 ||
    starterCounts.DEF !== formationRule.DEF ||
    starterCounts.MID !== formationRule.MID ||
    starterCounts.FWD !== formationRule.FWD
  ) {
    redirect("/squad?error=formation-shape");
  }

  const existingTeamWithSnapshot = await prisma.fantasyTeam.findUnique({
    where: { userId: session.user.id },
    include: {
      rosterEntries: true,
      lineupSnapshots: {
        where: { gameweek: { lt: nextOpenGameweek.number } },
        include: { entries: true },
        orderBy: { gameweek: "desc" },
        take: 1,
      },
    },
  });

  const previousSnapshot = existingTeamWithSnapshot?.lineupSnapshots[0];
  const previousPlayerIds =
    previousSnapshot?.entries.map((entry) => entry.playerId) ??
    existingTeamWithSnapshot?.rosterEntries.map((entry) => entry.playerId) ??
    [];
  if (nextOpenGameweek.transferLimit !== null && previousPlayerIds.length > 0) {
    const previousIds = new Set(previousPlayerIds);
    const incomingTransfers = rosterIds.filter((playerId) => !previousIds.has(playerId)).length;
    if (incomingTransfers > nextOpenGameweek.transferLimit) {
      redirect("/squad?error=transfer-limit");
    }
  }

  const unavailableNewPlayers = players.filter((player) => player.status !== "AVAILABLE" && !previousPlayerIds.includes(player.id));
  if (unavailableNewPlayers.length > 0) {
    redirect("/squad?error=player-unavailable");
  }

  const uploadedAvatarUrl = await saveAvatar(session.user.id, avatar);
  const currentUser = username
    ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { username: true } })
    : null;
  const usernameChanged = Boolean(username && username !== currentUser?.username);

  if (usernameChanged && !isValidUsername(username)) {
    redirect("/squad?error=username");
  }

  if (usernameChanged) {
    const duplicate = await prisma.user.findFirst({
      where: { username, id: { not: session.user.id } },
      select: { id: true },
    });
    if (duplicate) redirect("/squad?error=username-taken");
  }

  const cookieStore = await cookies();
  const promoLeagueCode = cookieStore.get("promo_league_code")?.value?.trim().toUpperCase();

  await prisma.$transaction(async (tx) => {
    if (usernameChanged || uploadedAvatarUrl) {
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          ...(usernameChanged ? { username } : {}),
          ...(uploadedAvatarUrl ? { image: uploadedAvatarUrl } : {}),
        },
      });
    }

    const existingTeam = await tx.fantasyTeam.findUnique({
      where: { userId: session.user.id },
    });

    const fantasyTeam = existingTeam
      ? await tx.fantasyTeam.update({
          where: { id: existingTeam.id },
          data: { name: teamName, formation },
        })
      : await tx.fantasyTeam.create({
          data: {
            userId: session.user.id,
            name: teamName,
            formation,
          },
        });

    if (!existingTeam || existingTeam.name !== teamName) {
      await tx.teamNameHistory.create({
        data: {
          fantasyTeamId: fantasyTeam.id,
          oldName: existingTeam?.name,
          newName: teamName,
          changedById: session.user.id,
        },
      });
    }

    await tx.rosterEntry.deleteMany({
      where: { fantasyTeamId: fantasyTeam.id },
    });

    await tx.rosterEntry.createMany({
      data: rosterIds.map((playerId) => ({
        fantasyTeamId: fantasyTeam.id,
        playerId,
        slot: starters.includes(playerId) ? "STARTER" : "BENCH",
        benchOrder: bench.includes(playerId) ? bench.indexOf(playerId) : null,
        isCaptain: playerId === captainId,
        isViceCaptain: false,
        })),
    });

    if (promoLeagueCode) {
      const league = await tx.league.findUnique({ where: { inviteCode: promoLeagueCode } });
      if (league) {
        const [existingMemberships, alreadyMember] = await Promise.all([
          tx.leagueMember.count({ where: { fantasyTeamId: fantasyTeam.id } }),
          tx.leagueMember.findUnique({
            where: { leagueId_fantasyTeamId: { leagueId: league.id, fantasyTeamId: fantasyTeam.id } },
          }),
        ]);

        if (!alreadyMember && existingMemberships < 6) {
          await tx.leagueMember.create({
            data: { leagueId: league.id, fantasyTeamId: fantasyTeam.id },
          });
        }
      }
    }

    const ownedLeague = await tx.league.findUnique({ where: { ownerId: session.user.id } });
    if (ownedLeague) {
      await tx.leagueMember.upsert({
        where: { leagueId_fantasyTeamId: { leagueId: ownedLeague.id, fantasyTeamId: fantasyTeam.id } },
        update: {},
        create: { leagueId: ownedLeague.id, fantasyTeamId: fantasyTeam.id },
      });
    }

    await tx.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "SQUAD_SAVED",
        entityType: "FantasyTeam",
        entityId: fantasyTeam.id,
        afterJson: {
          teamName,
          starters,
          bench,
          captainId,
          formation,
        },
      },
    });
  });

  if (promoLeagueCode) {
    cookieStore.delete("promo_league_code");
  }
  cookieStore.delete("promo_team_name");

  revalidatePath("/squad");
  revalidatePath("/leagues");
  redirect("/squad?saved=1");
}

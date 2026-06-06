"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

function makeInviteCode() {
  return crypto.randomBytes(4).toString("base64url").toUpperCase().slice(0, 6);
}

function leaguesUrl(tab: string, params?: Record<string, string>) {
  const search = new URLSearchParams({ tab, ...params });
  return `/leagues?${search.toString()}`;
}

async function requireFantasyTeam() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!session.user.username) redirect("/onboarding");

  const team = await prisma.fantasyTeam.findUnique({ where: { userId: session.user.id } });
  if (!team) redirect("/squad?error=create-team-first");

  return { session, team };
}

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!session.user.username) redirect("/onboarding");
  return session;
}

export async function createOrRenameLeague(formData: FormData) {
  const session = await requireUser();
  const returnTab = String(formData.get("returnTab") ?? "create");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const isOpen = String(formData.get("isOpen") ?? "") === "open";
  if (name.length < 2 || name.length > 40) redirect(leaguesUrl(returnTab, { error: "league-name" }));
  if (description.length > 240) redirect(leaguesUrl(returnTab, { error: "league-description" }));

  const existing = await prisma.league.findUnique({ where: { ownerId: session.user.id } });
  if (existing) {
    await prisma.league.update({
      where: { id: existing.id },
      data: { name, description: description || null, isOpen },
    });
    revalidatePath(`/leagues/${existing.id}`);
  } else {
    let inviteCode = makeInviteCode();
    while (await prisma.league.findUnique({ where: { inviteCode } })) {
      inviteCode = makeInviteCode();
    }

    const league = await prisma.league.create({
      data: {
        ownerId: session.user.id,
        name,
        description: description || null,
        inviteCode,
        isOpen,
      },
    });
    const team = await prisma.fantasyTeam.findUnique({ where: { userId: session.user.id } });
    if (team) {
      await prisma.leagueMember.create({
        data: { leagueId: league.id, fantasyTeamId: team.id },
      });
    }
  }

  revalidatePath("/leagues");
  redirect(leaguesUrl(returnTab, { saved: "1" }));
}

export async function joinLeague(formData: FormData) {
  const { team } = await requireFantasyTeam();
  const returnTab = String(formData.get("returnTab") ?? "join");
  const inviteCode = String(formData.get("inviteCode") ?? "").trim().toUpperCase();
  const leagueId = String(formData.get("leagueId") ?? "").trim();
  const league = leagueId
    ? await prisma.league.findUnique({ where: { id: leagueId } })
    : await prisma.league.findUnique({ where: { inviteCode } });
  if (!league) redirect(leaguesUrl(returnTab, { error: "invite" }));
  if (leagueId && !league.isOpen) redirect(leaguesUrl(returnTab, { error: "closed" }));

  const existingMemberships = await prisma.leagueMember.count({ where: { fantasyTeamId: team.id } });
  const alreadyMember = await prisma.leagueMember.findUnique({
    where: { leagueId_fantasyTeamId: { leagueId: league.id, fantasyTeamId: team.id } },
  });

  if (!alreadyMember && existingMemberships >= 6) {
    redirect(leaguesUrl(returnTab, { error: "limit" }));
  }

  if (!alreadyMember) {
    await prisma.leagueMember.create({ data: { leagueId: league.id, fantasyTeamId: team.id } });
  }

  revalidatePath("/leagues");
  revalidatePath(`/leagues/${league.id}`);
  redirect(`/leagues/${league.id}?joined=1`);
}

export async function leaveLeague(formData: FormData) {
  const { team } = await requireFantasyTeam();
  const leagueId = String(formData.get("leagueId") ?? "");
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  if (!league) redirect(leaguesUrl("mine"));
  if (league.ownerId === (await auth())?.user?.id) redirect(leaguesUrl("mine", { error: "owner-leave" }));

  await prisma.leagueMember.deleteMany({ where: { leagueId, fantasyTeamId: team.id } });
  revalidatePath("/leagues");
  revalidatePath(`/leagues/${leagueId}`);
  redirect(leaguesUrl("mine", { left: "1" }));
}

export async function removeLeagueMember(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const leagueId = String(formData.get("leagueId") ?? "");
  const fantasyTeamId = String(formData.get("fantasyTeamId") ?? "");

  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  if (!league || league.ownerId !== session.user.id) redirect(leaguesUrl("mine", { error: "owner" }));

  await prisma.leagueMember.deleteMany({ where: { leagueId, fantasyTeamId } });
  revalidatePath("/leagues");
  revalidatePath(`/leagues/${leagueId}`);
  redirect(leaguesUrl("mine", { removed: "1" }));
}

export async function deleteOwnedLeague(formData: FormData) {
  const session = await requireUser();
  const leagueId = String(formData.get("leagueId") ?? "");
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  if (!league || league.ownerId !== session.user.id) redirect(leaguesUrl("create", { error: "owner" }));

  await prisma.league.delete({ where: { id: league.id } });
  revalidatePath("/leagues");
  revalidatePath("/leaderboard");
  redirect(leaguesUrl("mine", { deleted: "1" }));
}

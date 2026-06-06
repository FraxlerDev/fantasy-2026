"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";

const categories = new Set(["Ціни", "Гравці", "Очки", "Правила", "Інше"]);

function petitionsUrl(tab: string, params?: Record<string, string>, hash?: string) {
  const search = new URLSearchParams({ tab, ...params });
  return `/petitions?${search.toString()}${hash ? `#${hash}` : ""}`;
}

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!session.user.username) redirect("/onboarding");
  return session;
}

export async function createPetition(formData: FormData) {
  const session = await requireUser();
  const returnTab = String(formData.get("returnTab") ?? "create");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const category = String(formData.get("category") ?? "Інше").trim();

  if (title.length < 8 || title.length > 120 || body.length < 10 || body.length > 1000 || !categories.has(category)) {
    redirect(petitionsUrl(returnTab, { error: "petition" }));
  }

  const activeCount = await prisma.petition.count({
    where: { authorId: session.user.id, reviewed: false },
  });
  if (activeCount >= 5) {
    redirect(petitionsUrl(returnTab, { error: "limit" }));
  }

  await prisma.petition.create({
    data: {
      authorId: session.user.id,
      title,
      body,
      category,
    },
  });

  revalidatePath("/petitions");
  redirect(petitionsUrl("list", { created: "1" }));
}

export async function deletePetition(formData: FormData) {
  const session = await requireUser();
  const returnTab = String(formData.get("returnTab") ?? "list");
  const petitionId = String(formData.get("petitionId") ?? "");
  if (!petitionId) redirect(petitionsUrl(returnTab));

  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const where = session.user.email === adminEmail ? { id: petitionId } : { id: petitionId, authorId: session.user.id };

  await prisma.petition.deleteMany({ where });
  revalidatePath("/petitions");
  redirect(petitionsUrl(returnTab, { deleted: "1" }));
}

export async function votePetition(formData: FormData) {
  const session = await requireUser();
  const returnTab = String(formData.get("returnTab") ?? "list");
  const petitionId = String(formData.get("petitionId") ?? "");
  const value = Number(formData.get("value") ?? 0);
  if (!petitionId || ![1, -1].includes(value)) redirect(petitionsUrl(returnTab));

  const petition = await prisma.petition.findUnique({ where: { id: petitionId }, select: { authorId: true } });
  if (!petition) redirect(petitionsUrl(returnTab));
  if (petition.authorId === session.user.id) redirect(petitionsUrl(returnTab, { error: "own-vote" }));

  const existing = await prisma.petitionVote.findUnique({
    where: { petitionId_userId: { petitionId, userId: session.user.id } },
  });

  if (existing?.value === value) {
    await prisma.petitionVote.delete({ where: { id: existing.id } });
  } else {
    await prisma.petitionVote.upsert({
      where: { petitionId_userId: { petitionId, userId: session.user.id } },
      update: { value },
      create: { petitionId, userId: session.user.id, value },
    });
  }

  revalidatePath("/petitions");
  redirect(petitionsUrl(returnTab, undefined, `petition-${petitionId}`));
}

export async function reviewPetition(formData: FormData) {
  const session = await requireAdmin();
  const returnTab = String(formData.get("returnTab") ?? "list");
  const petitionId = String(formData.get("petitionId") ?? "");
  const adminComment = String(formData.get("adminComment") ?? "").trim();
  const reviewed = formData.get("reviewed") === "on";
  if (!petitionId) redirect(petitionsUrl(returnTab));

  const petition = await prisma.petition.update({
    where: { id: petitionId },
    data: {
      reviewed,
      adminComment: adminComment || null,
      reviewedAt: reviewed ? new Date() : null,
    },
    select: { id: true, title: true, authorId: true },
  });

  if (reviewed) {
    await prisma.notification.create({
      data: {
        userId: petition.authorId,
        message: `Адмін розглянув петицію: ${petition.title}`,
        href: `/petitions?tab=list#petition-${petition.id}`,
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: "PETITION_REVIEWED",
      entityType: "Petition",
      entityId: petition.id,
      afterJson: { reviewed, adminComment },
    },
  });

  revalidatePath("/petitions");
  redirect(petitionsUrl(returnTab, { reviewed: "1" }, `petition-${petition.id}`));
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (!session.user.username) redirect("/onboarding");
  return session;
}

function isAdmin(email?: string | null) {
  return email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com");
}

export async function createForumTopic(formData: FormData) {
  const session = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const pollEnabled = formData.get("pollEnabled") === "on";
  const options = formData
    .getAll("pollOption")
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (
    title.length < 6 ||
    title.length > 140 ||
    description.length < 10 ||
    description.length > 5000 ||
    (pollEnabled && (options.length < 2 || options.length > 7))
  ) {
    redirect("/forum?tab=create&error=validation");
  }

  const topic = await prisma.forumTopic.create({
    data: {
      authorId: session.user.id,
      title,
      description,
      options: pollEnabled
        ? { create: options.map((label, index) => ({ label: label.slice(0, 120), order: index + 1 })) }
        : undefined,
    },
    select: { id: true },
  });

  revalidatePath("/forum");
  redirect(`/forum/${topic.id}`);
}

export async function voteForumPoll(formData: FormData) {
  const session = await requireUser();
  const topicId = String(formData.get("topicId") ?? "");
  const optionId = String(formData.get("optionId") ?? "");

  const option = await prisma.forumPollOption.findFirst({
    where: { id: optionId, topicId, topic: { pollClosed: false, status: { not: "CLOSED" } } },
    select: { id: true },
  });
  if (!option) redirect(`/forum/${topicId}?error=poll`);

  const existing = await prisma.forumPollVote.findUnique({
    where: { topicId_userId: { topicId, userId: session.user.id } },
    select: { id: true },
  });
  if (existing) redirect(`/forum/${topicId}?error=voted`);

  await prisma.forumPollVote.create({
    data: { topicId, optionId, userId: session.user.id },
  });

  revalidatePath(`/forum/${topicId}`);
  redirect(`/forum/${topicId}?voted=1`);
}

export async function updateForumTopic(formData: FormData) {
  const session = await requireUser();
  if (!isAdmin(session.user.email)) redirect("/forum");

  const topicId = String(formData.get("topicId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "ACTIVE");
  const pollClosed = formData.get("pollClosed") === "on";
  if (
    !topicId ||
    title.length < 6 ||
    title.length > 140 ||
    description.length < 10 ||
    description.length > 5000 ||
    !["ACTIVE", "RESOLVED", "CLOSED"].includes(status)
  ) {
    redirect(`/forum/${topicId}?error=validation`);
  }

  await prisma.forumTopic.update({
    where: { id: topicId },
    data: { title, description, status, pollClosed },
  });

  revalidatePath("/forum");
  revalidatePath(`/forum/${topicId}`);
  redirect(`/forum/${topicId}?updated=1`);
}

export async function deleteForumTopic(formData: FormData) {
  const session = await requireUser();
  if (!isAdmin(session.user.email)) redirect("/forum");

  const topicId = String(formData.get("topicId") ?? "");
  if (topicId) await prisma.forumTopic.deleteMany({ where: { id: topicId } });

  revalidatePath("/forum");
  redirect("/forum?deleted=1");
}

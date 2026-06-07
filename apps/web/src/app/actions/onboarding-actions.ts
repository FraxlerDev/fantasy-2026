"use server";

import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { isValidUsername } from "../../lib/username";

export async function completeOnboarding(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const username = String(formData.get("username") ?? "").trim();

  if (!isValidUsername(username)) {
    redirect("/onboarding?error=username");
  }

  const existing = await prisma.user.findFirst({
    where: {
      username,
      NOT: { id: session.user.id },
    },
  });

  if (existing) {
    redirect("/onboarding?error=taken");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  redirect("/squad");
}

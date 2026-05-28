"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

const maxAvatarSize = 200 * 1024;
const allowedAvatarTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const username = String(formData.get("username") ?? "").trim();
  const avatar = formData.get("avatar");

  if (username.length < 3 || username.length > 24 || !/^[a-zA-Z0-9_-]+$/.test(username)) {
    redirect("/squad?profileError=username");
  }

  const duplicate = await prisma.user.findFirst({
    where: { username, id: { not: session.user.id } },
    select: { id: true },
  });
  if (duplicate) redirect("/squad?profileError=username-taken");

  let image: string | undefined;
  if (avatar instanceof File && avatar.size > 0) {
    if (avatar.size > maxAvatarSize || !allowedAvatarTypes.has(avatar.type)) {
      redirect("/squad?profileError=avatar");
    }

    const ext = avatar.type === "image/png" ? "png" : avatar.type === "image/webp" ? "webp" : "jpg";
    const dir = path.join(process.cwd(), "public", "user-photos");
    await mkdir(dir, { recursive: true });
    const fileName = `${session.user.id}.${ext}`;
    await writeFile(path.join(dir, fileName), Buffer.from(await avatar.arrayBuffer()));
    image = `/user-photos/${fileName}`;
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username,
      ...(image ? { image } : {}),
    },
  });

  revalidatePath("/squad");
  revalidatePath("/leaderboard");
  revalidatePath("/leagues");
  redirect("/squad?profileSaved=1");
}

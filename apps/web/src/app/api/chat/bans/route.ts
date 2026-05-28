import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const session = await requireAdmin();
  const payload = (await request.json().catch(() => null)) as { userId?: string; reason?: string } | null;
  const userId = String(payload?.userId ?? "");
  const reason = String(payload?.reason ?? "").trim().slice(0, 240);

  if (!userId || userId === session.user.id) {
    return NextResponse.json({ error: "Некоректний користувач для блокування." }, { status: 400 });
  }

  await prisma.chatBan.upsert({
    where: { userId },
    update: {
      reason: reason || null,
      createdById: session.user.id,
    },
    create: {
      userId,
      reason: reason || null,
      createdById: session.user.id,
    },
  });

  return NextResponse.json({ ok: true });
}

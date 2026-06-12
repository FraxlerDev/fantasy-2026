import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

function isAdminEmail(email?: string | null) {
  return Boolean(email && email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com"));
}

const MAX_MESSAGE_LENGTH = 500;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Потрібен вхід." }, { status: 401 });
  }

  const { id } = await params;
  const payload = (await request.json().catch(() => null)) as { body?: string } | null;
  const body = String(payload?.body ?? "").trim();

  if (body.length < 1 || body.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Повідомлення має бути від 1 до ${MAX_MESSAGE_LENGTH} символів.` },
      { status: 400 },
    );
  }

  const message = await prisma.chatMessage.findUnique({
    where: { id },
    select: { authorId: true, isDeleted: true },
  });

  if (!message || message.isDeleted) {
    return NextResponse.json({ error: "Повідомлення не знайдено." }, { status: 404 });
  }

  if (message.authorId !== session.user.id) {
    return NextResponse.json({ error: "Можна редагувати тільки власні повідомлення." }, { status: 403 });
  }

  const updated = await prisma.chatMessage.update({
    where: { id },
    data: { body },
    select: { id: true, body: true, updatedAt: true },
  });

  return NextResponse.json({
    message: {
      id: updated.id,
      body: updated.body,
      edited: true,
      updatedAt: updated.updatedAt.toISOString(),
    },
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Потрібен вхід." }, { status: 401 });
  }

  const { id } = await params;
  const message = await prisma.chatMessage.findUnique({
    where: { id },
    select: { authorId: true, isDeleted: true },
  });

  if (!message || message.isDeleted) {
    return NextResponse.json({ error: "Повідомлення не знайдено." }, { status: 404 });
  }

  const canDelete = message.authorId === session.user.id || isAdminEmail(session.user.email);
  if (!canDelete) {
    return NextResponse.json({ error: "Можна видаляти тільки свої повідомлення." }, { status: 403 });
  }

  await prisma.chatMessage.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}

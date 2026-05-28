import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

function isAdminEmail(email?: string | null) {
  return Boolean(email && email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com"));
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

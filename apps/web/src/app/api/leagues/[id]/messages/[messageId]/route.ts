import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; messageId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Потрібен вхід." }, { status: 401 });
  }

  const { id, messageId } = await params;
  const message = await prisma.leagueChatMessage.findFirst({
    where: { id: messageId, leagueId: id, isDeleted: false },
    select: { id: true, authorId: true, league: { select: { ownerId: true } } },
  });

  if (!message) {
    return NextResponse.json({ error: "Повідомлення не знайдено." }, { status: 404 });
  }
  if (message.authorId !== session.user.id && message.league.ownerId !== session.user.id) {
    return NextResponse.json({ error: "Недостатньо прав." }, { status: 403 });
  }

  await prisma.leagueChatMessage.update({
    where: { id: message.id },
    data: { isDeleted: true },
  });

  return NextResponse.json({ ok: true });
}

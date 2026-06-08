import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Увійди, щоб поставити вподобайку." }, { status: 401 });
  }

  const { id } = await params;
  const message = await prisma.chatMessage.findFirst({
    where: { id, isDeleted: false },
    select: { id: true, authorId: true },
  });

  if (!message) {
    return NextResponse.json({ error: "Повідомлення вже недоступне." }, { status: 404 });
  }

  if (message.authorId === session.user.id) {
    return NextResponse.json({ error: "Не можна вподобати власне повідомлення." }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.chatMessageLike.findUnique({
      where: {
        messageId_userId: {
          messageId: message.id,
          userId: session.user.id,
        },
      },
      select: { id: true },
    });

    if (existing) {
      await tx.chatMessageLike.delete({ where: { id: existing.id } });
    } else {
      await tx.chatMessageLike.create({
        data: { messageId: message.id, userId: session.user.id },
      });
    }

    const likeCount = await tx.chatMessageLike.count({
      where: { messageId: message.id },
    });

    return { liked: !existing, likeCount };
  });

  return NextResponse.json(result);
}

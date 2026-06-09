import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ unreadCount: 0 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { forumLastReadAt: true },
  });
  const unreadCount = await prisma.forumComment.count({
    where: {
      isDeleted: false,
      authorId: { not: session.user.id },
      ...(user?.forumLastReadAt ? { createdAt: { gt: user.forumLastReadAt } } : {}),
    },
  });

  return NextResponse.json({ unreadCount });
}

export async function PATCH() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ unreadCount: 0 });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { forumLastReadAt: new Date() },
  });

  return NextResponse.json({ unreadCount: 0 });
}

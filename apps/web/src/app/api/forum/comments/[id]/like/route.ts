import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Увійди, щоб поставити лайк." }, { status: 401 });

  const { id } = await params;
  const comment = await prisma.forumComment.findFirst({
    where: { id, isDeleted: false },
    select: { authorId: true },
  });
  if (!comment) return NextResponse.json({ error: "Коментар недоступний." }, { status: 404 });
  if (comment.authorId === session.user.id) {
    return NextResponse.json({ error: "Не можна лайкати власний коментар." }, { status: 400 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.forumCommentLike.findUnique({
      where: { commentId_userId: { commentId: id, userId: session.user.id } },
      select: { id: true },
    });

    if (existing) await tx.forumCommentLike.delete({ where: { id: existing.id } });
    else await tx.forumCommentLike.create({ data: { commentId: id, userId: session.user.id } });

    return {
      liked: !existing,
      likeCount: await tx.forumCommentLike.count({ where: { commentId: id } }),
    };
  });

  return NextResponse.json(result);
}

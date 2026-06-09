import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Потрібен вхід." }, { status: 401 });

  const { id } = await params;
  const comment = await prisma.forumComment.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!comment) return NextResponse.json({ error: "Коментар не знайдено." }, { status: 404 });

  const isAdmin = session.user.email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com");
  if (comment.authorId !== session.user.id && !isAdmin) {
    return NextResponse.json({ error: "Недостатньо прав." }, { status: 403 });
  }

  await prisma.forumComment.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date(), body: "" },
  });

  return NextResponse.json({ ok: true });
}

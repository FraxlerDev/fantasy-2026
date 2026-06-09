import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../lib/prisma";

function displayName(user: { username: string | null }) {
  return user.username?.trim() || "Користувач";
}

const commentInclude = (userId?: string) =>
  ({
    author: { select: { id: true, username: true, image: true, role: true } },
    parent: {
      select: {
        id: true,
        body: true,
        author: { select: { username: true } },
      },
    },
    likes: {
      where: { userId: userId ?? "__anonymous__" },
      select: { id: true },
    },
    _count: { select: { likes: true } },
  }) as const;

function serializeComment(comment: {
  id: string;
  body: string;
  createdAt: Date;
  author: { id: string; username: string | null; image: string | null; role: string };
  parent?: { id: string; body: string; author: { username: string | null } } | null;
  likes: { id: string }[];
  _count: { likes: number };
}) {
  return {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt.toISOString(),
    author: {
      id: comment.author.id,
      name: displayName(comment.author),
      image: comment.author.image,
      role: comment.author.role,
    },
    parent: comment.parent
      ? {
          id: comment.parent.id,
          body: comment.parent.body,
          authorName: displayName(comment.parent.author),
        }
      : null,
    likeCount: comment._count.likes,
    likedByCurrentUser: comment.likes.length > 0,
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const { id } = await params;
  const after = new URL(request.url).searchParams.get("after");
  const afterDate = after ? new Date(after) : null;
  const hasAfter = Boolean(afterDate && !Number.isNaN(afterDate.getTime()));

  const [comments, reactions] = await Promise.all([
    prisma.forumComment.findMany({
      where: {
        topicId: id,
        isDeleted: false,
        ...(hasAfter ? { createdAt: { gt: afterDate! } } : {}),
      },
      include: commentInclude(session?.user?.id),
      orderBy: { createdAt: "asc" },
      take: hasAfter ? 100 : 200,
    }),
    hasAfter
      ? prisma.forumComment.findMany({
          where: { topicId: id, isDeleted: false },
          select: {
            id: true,
            likes: {
              where: { userId: session?.user?.id ?? "__anonymous__" },
              select: { id: true },
            },
            _count: { select: { likes: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  return NextResponse.json({
    comments: comments.map(serializeComment),
    reactions: reactions.map((comment) => ({
      id: comment.id,
      likeCount: comment._count.likes,
      likedByCurrentUser: comment.likes.length > 0,
    })),
    currentUser: session?.user?.id
      ? {
          id: session.user.id,
          name: session.user.username?.trim() || "Користувач",
          image: session.user.image,
          isAdmin: session.user.email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com"),
        }
      : null,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Увійди, щоб долучитися до обговорення." }, { status: 401 });
  }

  const { id } = await params;
  const payload = (await request.json().catch(() => null)) as { body?: string; parentId?: string | null } | null;
  const body = String(payload?.body ?? "").trim();
  const parentId = String(payload?.parentId ?? "").trim() || null;

  if (body.length < 1 || body.length > 1000) {
    return NextResponse.json({ error: "Коментар має містити від 1 до 1000 символів." }, { status: 400 });
  }

  const topic = await prisma.forumTopic.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!topic || topic.status === "CLOSED") {
    return NextResponse.json({ error: "Обговорення цієї теми закрито." }, { status: 403 });
  }

  if (parentId) {
    const parent = await prisma.forumComment.findFirst({
      where: { id: parentId, topicId: id, isDeleted: false },
      select: { id: true },
    });
    if (!parent) return NextResponse.json({ error: "Коментар для відповіді недоступний." }, { status: 400 });
  }

  const comment = await prisma.forumComment.create({
    data: { topicId: id, authorId: session.user.id, body, parentId },
    include: commentInclude(session.user.id),
  });

  return NextResponse.json({ comment: serializeComment(comment) }, { status: 201 });
}

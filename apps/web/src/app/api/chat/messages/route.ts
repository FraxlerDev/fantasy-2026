import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

const MAX_MESSAGE_LENGTH = 500;

function isAdminEmail(email?: string | null) {
  return Boolean(email && email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com"));
}

function displayName(user: { username: string | null; email: string | null }) {
  return user.username?.trim() || "Користувач";
}

function serializeMessage(message: {
  id: string;
  body: string;
  createdAt: Date;
  author: {
    id: string;
    username: string | null;
    email: string | null;
    image: string | null;
    role: string;
  };
  replyTo?: {
    id: string;
    body: string;
    author: {
      username: string | null;
      email: string | null;
    };
  } | null;
  likes: { id: string }[];
  _count: { likes: number };
}) {
  return {
    id: message.id,
    body: message.body,
    createdAt: message.createdAt.toISOString(),
    replyTo: message.replyTo
      ? {
          id: message.replyTo.id,
          body: message.replyTo.body,
          authorName: displayName(message.replyTo.author),
        }
      : null,
    author: {
      id: message.author.id,
      name: displayName(message.author),
      image: message.author.image,
      role: message.author.role,
    },
    likeCount: message._count.likes,
    likedByCurrentUser: message.likes.length > 0,
  };
}

function messageInclude(currentUserId?: string) {
  return {
    author: {
      select: { id: true, username: true, email: true, image: true, role: true },
    },
    replyTo: {
      select: {
        id: true,
        body: true,
        author: { select: { username: true, email: true } },
      },
    },
    likes: {
      where: { userId: currentUserId ?? "__anonymous__" },
      select: { id: true },
    },
    _count: { select: { likes: true } },
  } as const;
}

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after");
  const afterDate = after ? new Date(after) : null;

  const hasAfter = Boolean(afterDate && !Number.isNaN(afterDate.getTime()));
  const [messages, reactionMessages] = await Promise.all([
    prisma.chatMessage.findMany({
      where: {
        isDeleted: false,
        ...(hasAfter ? { createdAt: { gt: afterDate! } } : {}),
      },
      include: messageInclude(session?.user?.id),
      orderBy: { createdAt: "desc" },
      take: hasAfter ? 80 : 50,
    }),
    hasAfter
      ? prisma.chatMessage.findMany({
          where: { isDeleted: false },
          select: {
            id: true,
            likes: {
              where: { userId: session?.user?.id ?? "__anonymous__" },
              select: { id: true },
            },
            _count: { select: { likes: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        })
      : Promise.resolve([]),
  ]);

  const [banned, unreadCount] = session?.user?.id
    ? await Promise.all([
        prisma.chatBan
          .findUnique({ where: { userId: session.user.id }, select: { id: true } })
          .then(Boolean),
        prisma.user
          .findUnique({
            where: { id: session.user.id },
            select: { chatLastReadAt: true },
          })
          .then((user) =>
            prisma.chatMessage.count({
              where: {
                isDeleted: false,
                authorId: { not: session.user.id },
                ...(user?.chatLastReadAt ? { createdAt: { gt: user.chatLastReadAt } } : {}),
              },
            }),
          ),
      ])
    : [false, 0];

  return NextResponse.json({
    messages: messages.reverse().map(serializeMessage),
    reactions: reactionMessages.map((message) => ({
      id: message.id,
      likeCount: message._count.likes,
      likedByCurrentUser: message.likes.length > 0,
    })),
    unreadCount,
    currentUser: session?.user?.id
      ? {
          id: session.user.id,
          name: session.user.username?.trim() || "Користувач",
          image: session.user.image,
          isAdmin: isAdminEmail(session.user.email),
          isBanned: banned,
        }
      : null,
  });
}

export async function PATCH() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Увійди, щоб позначити повідомлення прочитаними." }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { chatLastReadAt: new Date() },
  });

  return NextResponse.json({ unreadCount: 0 });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Увійди, щоб писати в чат." }, { status: 401 });
  }

  const ban = await prisma.chatBan.findUnique({ where: { userId: session.user.id } });
  if (ban) {
    return NextResponse.json({ error: "Для цього акаунта чат тимчасово заблоковано." }, { status: 403 });
  }

  const payload = (await request.json().catch(() => null)) as { body?: string; replyToId?: string | null } | null;
  const body = String(payload?.body ?? "").trim();
  const replyToId = String(payload?.replyToId ?? "").trim() || null;

  if (body.length < 1 || body.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Повідомлення має бути від 1 до ${MAX_MESSAGE_LENGTH} символів.` }, { status: 400 });
  }

  if (replyToId) {
    const replyTo = await prisma.chatMessage.findFirst({
      where: { id: replyToId, isDeleted: false },
      select: { id: true },
    });

    if (!replyTo) {
      return NextResponse.json({ error: "Повідомлення для відповіді вже недоступне." }, { status: 400 });
    }
  }

  const message = await prisma.chatMessage.create({
    data: {
      authorId: session.user.id,
      body,
      ...(replyToId ? { replyToId } : {}),
    },
    include: messageInclude(session.user.id),
  });

  return NextResponse.json({ message: serializeMessage(message) }, { status: 201 });
}

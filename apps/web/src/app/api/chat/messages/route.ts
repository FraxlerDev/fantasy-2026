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
  };
}

const messageInclude = {
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
} as const;

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after");
  const afterDate = after ? new Date(after) : null;

  const messages = await prisma.chatMessage.findMany({
    where: {
      isDeleted: false,
      ...(afterDate && !Number.isNaN(afterDate.getTime()) ? { createdAt: { gt: afterDate } } : {}),
    },
    include: messageInclude,
    orderBy: { createdAt: "desc" },
    take: afterDate && !Number.isNaN(afterDate.getTime()) ? 80 : 50,
  });

  const banned = session?.user?.id
    ? Boolean(await prisma.chatBan.findUnique({ where: { userId: session.user.id }, select: { id: true } }))
    : false;

  return NextResponse.json({
    messages: messages.reverse().map(serializeMessage),
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
    include: messageInclude,
  });

  return NextResponse.json({ message: serializeMessage(message) }, { status: 201 });
}

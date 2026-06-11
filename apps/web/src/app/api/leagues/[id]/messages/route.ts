import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

const MAX_MESSAGE_LENGTH = 500;

function displayName(user: { username: string | null }) {
  return user.username?.trim() || "Користувач";
}

async function getLeagueAccess(leagueId: string, userId: string) {
  const league = await prisma.league.findUnique({
    where: { id: leagueId },
    select: {
      id: true,
      ownerId: true,
      members: {
        where: { fantasyTeam: { userId } },
        select: { id: true },
        take: 1,
      },
    },
  });

  if (!league) return null;
  return {
    league,
    allowed: league.ownerId === userId || league.members.length > 0,
  };
}

function serializeMessage(message: {
  id: string;
  body: string;
  createdAt: Date;
  author: { id: string; username: string | null; image: string | null };
}) {
  return {
    id: message.id,
    body: message.body,
    createdAt: message.createdAt.toISOString(),
    author: {
      id: message.author.id,
      name: displayName(message.author),
      image: message.author.image,
    },
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Потрібен вхід." }, { status: 401 });
  }

  const { id } = await params;
  const access = await getLeagueAccess(id, session.user.id);
  if (!access?.allowed) {
    return NextResponse.json({ error: "Чат доступний лише учасникам ліги." }, { status: 403 });
  }

  const messages = await prisma.leagueChatMessage.findMany({
    where: { leagueId: id, isDeleted: false },
    include: {
      author: { select: { id: true, username: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    messages: messages.reverse().map(serializeMessage),
    currentUserId: session.user.id,
    isOwner: access.league.ownerId === session.user.id,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Увійди, щоб писати в чаті ліги." }, { status: 401 });
  }

  const { id } = await params;
  const access = await getLeagueAccess(id, session.user.id);
  if (!access?.allowed) {
    return NextResponse.json({ error: "Чат доступний лише учасникам ліги." }, { status: 403 });
  }

  const payload = (await request.json().catch(() => null)) as { body?: string } | null;
  const body = String(payload?.body ?? "").trim();
  if (body.length < 1 || body.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Повідомлення має містити від 1 до ${MAX_MESSAGE_LENGTH} символів.` },
      { status: 400 },
    );
  }

  const message = await prisma.leagueChatMessage.create({
    data: { leagueId: id, authorId: session.user.id, body },
    include: {
      author: { select: { id: true, username: true, image: true } },
    },
  });

  return NextResponse.json({ message: serializeMessage(message) }, { status: 201 });
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ unreadCount: 0 }, { status: 401 });
  }

  const { id } = await params;
  const access = await getLeagueAccess(id, session.user.id);
  if (!access?.allowed) {
    return NextResponse.json({ unreadCount: 0 }, { status: 403 });
  }

  await prisma.leagueChatRead.upsert({
    where: {
      leagueId_userId: {
        leagueId: id,
        userId: session.user.id,
      },
    },
    create: {
      leagueId: id,
      userId: session.user.id,
      lastReadAt: new Date(),
    },
    update: {
      lastReadAt: new Date(),
    },
  });

  return NextResponse.json({ unreadCount: 0 });
}

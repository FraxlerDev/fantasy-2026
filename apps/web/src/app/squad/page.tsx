import type { Metadata } from "next";
import { Bell, CheckCircle2, CircleAlert, MessageCircle, Shield, Trophy } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { DeadlineCountdown } from "../../components/deadline-countdown";
import { AppShell } from "../../components/shell";
import { SquadBuilder, type SavedRosterEntry, type SquadPlayer } from "../../components/squad-builder";
import { getEditableGameweek, validateRosterForSnapshot } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Мій склад",
  path: "/squad",
  noIndex: true,
});

function formatDate(date: Date) {
  return date.toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function SquadPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; saved?: string; profileError?: string; profileSaved?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const cookieStore = await cookies();
  const promoTeamName = cookieStore.get("promo_team_name")?.value;

  if (!session?.user?.id) redirect("/login");
  if (!session.user.username) redirect("/onboarding");

  const [players, fantasyTeam, editableGameweek, nextGameweek, notifications, chatMessages] = await Promise.all([
    prisma.player.findMany({
      include: { nationalTeam: true },
      orderBy: [{ position: "asc" }, { price: "asc" }],
    }),
    prisma.fantasyTeam.findUnique({
      where: { userId: session.user.id },
      include: {
        rosterEntries: {
          include: { player: true },
          orderBy: [{ slot: "asc" }, { benchOrder: "asc" }, { createdAt: "asc" }],
        },
        lineupSnapshots: {
          include: { entries: true },
          orderBy: { gameweek: "desc" },
          take: 1,
        },
      },
    }),
    getEditableGameweek(),
    prisma.gameweek.findFirst({
      where: { deadlineAt: { gt: new Date() } },
      orderBy: { deadlineAt: "asc" },
    }),
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.chatMessage.findMany({
      where: { isDeleted: false },
      include: { author: { select: { username: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const [rank, snapshotFailure] = fantasyTeam
    ? await Promise.all([
        prisma.leaderboardRow.findFirst({
          where: { scope: "GLOBAL", fantasyTeamId: fantasyTeam.id },
          select: { rank: true },
        }),
        nextGameweek
          ? prisma.lineupSnapshotFailure.findUnique({
              where: {
                fantasyTeamId_gameweek: {
                  fantasyTeamId: fantasyTeam.id,
                  gameweek: nextGameweek.number,
                },
              },
            })
          : null,
      ])
    : [null, null];

  const currentFixtures = editableGameweek
    ? await prisma.fixture.findMany({
        where: { gameweek: editableGameweek.number },
        include: { homeTeam: true, awayTeam: true },
        orderBy: [{ kickoffAt: "asc" }, { matchNo: "asc" }],
      })
    : [];

  const validationReason = fantasyTeam
    ? validateRosterForSnapshot(fantasyTeam.rosterEntries, fantasyTeam.formation)
    : null;
  const isValid = Boolean(fantasyTeam && !validationReason);
  const previousIds = new Set(fantasyTeam?.lineupSnapshots[0]?.entries.map((entry) => entry.playerId) ?? []);
  const currentIds = new Set(fantasyTeam?.rosterEntries.map((entry) => entry.playerId) ?? []);
  const usedTransfers =
    previousIds.size > 0 ? [...currentIds].filter((playerId) => !previousIds.has(playerId)).length : 0;
  const transferText = !editableGameweek
    ? "Закриті"
    : editableGameweek.transferLimit === null
      ? "Безліміт"
      : `${Math.max(0, editableGameweek.transferLimit - usedTransfers)} з ${editableGameweek.transferLimit}`;

  const activity = [
    ...notifications.map((item) => ({
      id: `notification-${item.id}`,
      message: item.message,
      href: item.href ?? "/petitions",
      createdAt: item.createdAt,
      type: "notification" as const,
    })),
    ...chatMessages.map((item) => ({
      id: `chat-${item.id}`,
      message: `${item.author.username?.trim() || "Користувач"}: ${item.body}`,
      href: "/",
      createdAt: item.createdAt,
      type: "chat" as const,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const mappedPlayers: SquadPlayer[] = players.map((player) => ({
    id: player.id,
    name: player.name,
    position: player.position,
    nationCode: player.nationalTeam.code,
    nationName: player.nationalTeam.nameUk,
    nationFlagPath: player.nationalTeam.flagPath,
    club: player.club,
    clubOriginal: player.clubOriginal,
    squadStatus: player.squadStatus,
    photoUrl: player.photoUrl,
    unavailableReason: player.unavailableReason,
    price: Number(player.price),
    status: player.status,
  }));

  const initialRoster: SavedRosterEntry[] =
    fantasyTeam?.rosterEntries.map((entry) => ({
      playerId: entry.playerId,
      slot: entry.slot,
      isCaptain: entry.isCaptain,
      isViceCaptain: entry.isViceCaptain,
      benchOrder: entry.benchOrder,
    })) ?? [];

  return (
    <AppShell active="/squad">
      <div className="squad-page">
        <div className="dashboard-page squad-dashboard">
          {fantasyTeam ? (
            <>
              <section className="dashboard-stats">
                <div className="panel dashboard-stat">
                  <Trophy size={20} />
                  <span>Місце</span>
                  <strong>{rank?.rank ?? "-"}</strong>
                </div>
                <div className="panel dashboard-stat">
                  <span>Очки</span>
                  <strong>{fantasyTeam.totalPoints}</strong>
                </div>
                <div className="panel dashboard-stat">
                  <span>Трансфери</span>
                  <strong>{transferText}</strong>
                </div>
                <div className={`panel dashboard-stat ${isValid ? "valid" : "invalid"}`}>
                  {isValid ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
                  <span>Статус складу</span>
                  <strong>{isValid ? "Валідний" : "Потрібні зміни"}</strong>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="topbar">
                <div>
                  <p className="eyebrow">Мій склад</p>
                  <h1>Вітаємо, {session.user.username}</h1>
                  <p className="muted">Створи першу команду, щоб відкрити статистику, трансфери й місце в рейтингу.</p>
                </div>
              </div>
              <section className="panel dashboard-empty">
                <Shield size={42} />
                <h2>Команду ще не створено</h2>
                <p>Нижче можна обрати 15 футболістів, стартовий склад і капітана.</p>
              </section>
            </>
          )}

          <section className="grid cols-2 dashboard-grid">
            <div className="panel">
              <h2>Найближчий дедлайн</h2>
              {nextGameweek ? (
                <>
                  <p>
                    <strong>GW{nextGameweek.number}</strong> · {nextGameweek.stage}
                  </p>
                  <p className="muted">{formatDate(nextGameweek.deadlineAt)}</p>
                  <DeadlineCountdown deadlineAt={nextGameweek.deadlineAt.toISOString()} />
                </>
              ) : (
                <p className="muted">Усі дедлайни турніру завершено.</p>
              )}
              {fantasyTeam && !isValid ? (
                <div className="form-error dashboard-validity">
                  {snapshotFailure?.reason ?? validationReason}
                </div>
              ) : null}
            </div>

            <div className="panel">
              <div className="dashboard-section-title">
                <h2>Останні повідомлення</h2>
                <Bell size={20} />
              </div>
              <div className="dashboard-activity">
                {activity.map((item) => (
                  <Link href={item.href} key={item.id}>
                    {item.type === "chat" ? <MessageCircle size={16} /> : <Bell size={16} />}
                    <span>{item.message}</span>
                    <time>{formatDate(item.createdAt)}</time>
                  </Link>
                ))}
                {activity.length === 0 ? <p className="muted">Нових повідомлень поки немає.</p> : null}
              </div>
            </div>
          </section>
        </div>

        {!editableGameweek ? (
          <div className="form-error">Трансфери зараз закриті. Адмін має відкрити наступний GW після створення snapshot.</div>
        ) : null}

        <SquadBuilder
          players={mappedPlayers}
          fixtures={currentFixtures.map((fixture) => ({
            id: fixture.id,
            matchNo: fixture.matchNo,
            gameweek: fixture.gameweek,
            kickoffAt: fixture.kickoffAt.toISOString(),
            homeScore: fixture.homeScore,
            awayScore: fixture.awayScore,
            homeTeam: {
              code: fixture.homeTeam.code,
              nameUk: fixture.homeTeam.nameUk,
              flagPath: fixture.homeTeam.flagPath,
            },
            awayTeam: {
              code: fixture.awayTeam.code,
              nameUk: fixture.awayTeam.nameUk,
              flagPath: fixture.awayTeam.flagPath,
            },
          }))}
          currentGameweek={editableGameweek?.number}
          currentDeadline={editableGameweek?.deadlineAt.toISOString()}
          currentStart={editableGameweek?.startAt.toISOString()}
          transferLimit={editableGameweek?.transferLimit}
          userProfile={{
            username: session.user.username,
            email: session.user.email,
            image: session.user.image,
          }}
          initialTeamName={fantasyTeam?.name ?? promoTeamName}
          initialTeamId={fantasyTeam?.id}
          initialTeamVersion={fantasyTeam?.updatedAt.getTime()}
          publicTeamUrl={fantasyTeam ? `/teams/${fantasyTeam.id}` : undefined}
          initialFormation={fantasyTeam?.formation ?? "4-3-3"}
          initialRoster={initialRoster}
          isSignedIn
          hasProfile
          error={params?.error}
          saved={params?.saved === "1"}
        />
      </div>
    </AppShell>
  );
}

import type { Metadata } from "next";
import { CheckCircle2, CircleAlert, Clock3, Star, Trophy } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { HeroDeadlineCountdown } from "../../components/hero-deadline-countdown";
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

function transferCountLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const noun = mod10 === 1 && mod100 !== 11 ? "трансфер" : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "трансфери" : "трансферів";
  return `Залишилося ${count} ${noun}`;
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

  const [players, fantasyTeam, editableGameweek, nextGameweek, currentUser] = await Promise.all([
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
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true, email: true, image: true },
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
  const pointFixtures = editableGameweek
    ? await prisma.fixture.findMany({
        where: { gameweek: { lte: editableGameweek.number }, playerPoints: { some: {} } },
        include: { playerPoints: true },
        orderBy: [{ gameweek: "desc" }, { kickoffAt: "desc" }],
      })
    : [];
  const latestPointUpdateByGameweek = new Map<number, Date>();
  for (const fixture of pointFixtures) {
    for (const point of fixture.playerPoints) {
      const latest = latestPointUpdateByGameweek.get(fixture.gameweek);
      if (!latest || point.updatedAt > latest) latestPointUpdateByGameweek.set(fixture.gameweek, point.updatedAt);
    }
  }
  const latestRankingRefresh = latestPointUpdateByGameweek.size > 0
    ? await prisma.leaderboardRow.findFirst({
        select: { refreshedAt: true },
        orderBy: { refreshedAt: "desc" },
      })
    : null;
  const officialPointGameweeks = [...latestPointUpdateByGameweek.entries()]
    .filter(([, updatedAt]) => latestRankingRefresh?.refreshedAt && latestRankingRefresh.refreshedAt >= updatedAt)
    .map(([gameweek]) => gameweek)
    .sort((a, b) => b - a);
  const pointsDisplayGameweek = editableGameweek
    ? officialPointGameweeks.includes(editableGameweek.number)
      ? editableGameweek.number
      : editableGameweek.deadlineAt > new Date()
        ? officialPointGameweeks.find((gameweek) => gameweek < editableGameweek.number)
        : undefined
    : undefined;
  const pointsSnapshot =
    fantasyTeam && editableGameweek && pointsDisplayGameweek && pointsDisplayGameweek < editableGameweek.number
      ? await prisma.lineupSnapshot.findUnique({
          where: {
            fantasyTeamId_gameweek: {
              fantasyTeamId: fantasyTeam.id,
              gameweek: pointsDisplayGameweek,
            },
          },
          select: { entries: { select: { playerId: true } } },
        })
      : null;
  const pointsSnapshotPlayerIds =
    fantasyTeam && editableGameweek && pointsDisplayGameweek && pointsDisplayGameweek < editableGameweek.number
      ? new Set(pointsSnapshot?.entries.map((entry) => entry.playerId) ?? [])
      : null;
  const latestPlayerPointMap = new Map<string, { points: number; didPlay: boolean; redCard: boolean }>();
  if (pointsDisplayGameweek) {
    for (const fixture of pointFixtures.filter((item) => item.gameweek === pointsDisplayGameweek)) {
      for (const point of fixture.playerPoints) {
        if (pointsSnapshotPlayerIds && !pointsSnapshotPlayerIds.has(point.playerId)) continue;
        const current = latestPlayerPointMap.get(point.playerId);
        latestPlayerPointMap.set(point.playerId, {
          points: (current?.points ?? 0) + point.points,
          didPlay: Boolean(current?.didPlay || point.didPlay),
          redCard: Boolean(current?.redCard || point.redCard),
        });
      }
    }
  }
  const transferBaseSnapshot =
    fantasyTeam && editableGameweek
      ? await prisma.lineupSnapshot.findFirst({
          where: {
            fantasyTeamId: fantasyTeam.id,
            gameweek: { lt: editableGameweek.number },
          },
          include: { entries: true },
          orderBy: { gameweek: "desc" },
        })
      : null;

  const validationReason = fantasyTeam
    ? validateRosterForSnapshot(fantasyTeam.rosterEntries, fantasyTeam.formation, editableGameweek?.number)
    : null;
  const isValid = Boolean(fantasyTeam && !validationReason);
  const previousIds = new Set(transferBaseSnapshot?.entries.map((entry) => entry.playerId) ?? []);
  const currentIds = new Set(fantasyTeam?.rosterEntries.map((entry) => entry.playerId) ?? []);
  const usedTransfers =
    previousIds.size > 0 ? [...currentIds].filter((playerId) => !previousIds.has(playerId)).length : 0;
  const transferText = !editableGameweek
    ? "Закриті"
    : editableGameweek.transferLimit === null || previousIds.size === 0
      ? "Безліміт"
      : `Зроблено ${usedTransfers} з ${editableGameweek.transferLimit}`;
  const remainingTransfers =
    editableGameweek?.transferLimit !== null && editableGameweek && previousIds.size > 0
      ? Math.max(0, editableGameweek.transferLimit - usedTransfers)
      : null;

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
          <section className="dashboard-stats squad-overview-stats">
            <div className="panel dashboard-stat">
              <Trophy size={20} />
              <span>Місце</span>
              <strong>{rank?.rank ?? "-"}</strong>
            </div>
            <div className="panel dashboard-stat">
              <Star size={28} />
              <span>Очки</span>
              <strong>{fantasyTeam?.totalPoints ?? 0}</strong>
            </div>
            <div className="panel dashboard-stat">
              <span>Трансфери</span>
              <strong>{transferText}</strong>
              {remainingTransfers !== null ? <small className="transfer-remaining-note">{transferCountLabel(remainingTransfers)}</small> : null}
            </div>
            <div className={`panel dashboard-stat ${isValid ? "valid" : "invalid"}`}>
              {isValid ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
              <span>Статус складу</span>
              <strong>{isValid ? "Валідний" : "Потрібні зміни"}</strong>
            </div>
            <div className="panel dashboard-stat squad-deadline-stat">
              {nextGameweek ? (
                <>
                  <Clock3 size={20} />
                  <span>Найближчий дедлайн</span>
                  <strong>GW{nextGameweek.number} · {formatDate(nextGameweek.deadlineAt)}</strong>
                  <HeroDeadlineCountdown deadlineAt={nextGameweek.deadlineAt.toISOString()} />
                </>
              ) : (
                <>
                  <Clock3 size={20} />
                  <span>Найближчий дедлайн</span>
                  <strong>Завершено</strong>
                </>
              )}
            </div>
          </section>

          {fantasyTeam && !isValid ? (
            <div className="form-error dashboard-validity">
              {snapshotFailure?.reason ?? validationReason}
            </div>
          ) : null}
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
          transferBasePlayerIds={[...previousIds]}
          pointsGameweek={pointsDisplayGameweek}
          playerGameweekStats={[...latestPlayerPointMap.entries()].map(([playerId, stats]) => ({ playerId, ...stats }))}
          userProfile={{
            username: currentUser?.username ?? session.user.username,
            email: currentUser?.email ?? session.user.email,
            image: currentUser?.image ?? session.user.image,
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
          profileError={params?.profileError}
          profileSaved={params?.profileSaved === "1"}
        />
      </div>
    </AppShell>
  );
}

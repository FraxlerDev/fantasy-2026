import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { AppShell } from "../../components/shell";
import { SquadBuilder, type SavedRosterEntry, type SquadPlayer } from "../../components/squad-builder";
import { getEditableGameweek } from "../../lib/gameweeks";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Склад команди",
  path: "/squad",
  noIndex: true,
});

export default async function SquadPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; saved?: string; profileError?: string; profileSaved?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const cookieStore = await cookies();
  const promoTeamName = cookieStore.get("promo_team_name")?.value;

  if (session?.user?.id && !session.user.username) {
    redirect("/onboarding");
  }

  const [players, fantasyTeam, editableGameweek] = await Promise.all([
    prisma.player.findMany({
      include: { nationalTeam: true },
      orderBy: [{ position: "asc" }, { price: "asc" }],
    }),
    session?.user?.id
      ? prisma.fantasyTeam.findUnique({
          where: { userId: session.user.id },
          include: { rosterEntries: { orderBy: [{ slot: "asc" }, { benchOrder: "asc" }, { createdAt: "asc" }] } },
        })
      : null,
    getEditableGameweek(),
  ]);

  const currentFixtures = editableGameweek
    ? await prisma.fixture.findMany({
        where: { gameweek: editableGameweek.number },
        include: { homeTeam: true, awayTeam: true },
        orderBy: [{ kickoffAt: "asc" }, { matchNo: "asc" }],
      })
    : [];

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
      <div>
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
          currentStage={editableGameweek?.stage ?? editableGameweek?.name}
          currentDeadline={editableGameweek?.deadlineAt.toISOString()}
          currentStart={editableGameweek?.startAt.toISOString()}
          transferLimit={editableGameweek?.transferLimit}
          userProfile={{
            username: session?.user?.username,
            email: session?.user?.email,
            image: session?.user?.image,
          }}
          initialTeamName={fantasyTeam?.name ?? promoTeamName}
          initialFormation={fantasyTeam?.formation ?? "4-3-3"}
          initialRoster={initialRoster}
          isSignedIn={Boolean(session?.user?.id)}
          hasProfile={Boolean(session?.user?.username)}
          error={params?.error}
          saved={params?.saved === "1"}
        />
      </div>
    </AppShell>
  );
}

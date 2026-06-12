import type { Metadata } from "next";
import { PlayerRankingPage } from "../../components/player-ranking-page";
import { getPlayerRanking } from "../../lib/player-rankings";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Рейтинг гравців за очками",
  description: "Особисті фентезі-очки футболістів ЧС-2026 за всі зіграні матчі.",
  path: "/player-points",
});

export default async function PlayerPointsRankingPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; position?: string; nation?: string }>;
}) {
  const params = await searchParams;
  return (
    <PlayerRankingPage
      mode="points"
      players={await getPlayerRanking("points")}
      query={params?.q ?? ""}
      position={params?.position ?? ""}
      nation={params?.nation ?? ""}
    />
  );
}

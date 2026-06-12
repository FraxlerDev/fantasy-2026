import type { Metadata } from "next";
import { PlayerRankingPage } from "../../components/player-ranking-page";
import { getPlayerRanking } from "../../lib/player-rankings";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Популярні гравці ЧС-2026",
  description: "Рейтинг футболістів, яких найчастіше обирають до фентезі-команд ЧС-2026.",
  path: "/player-rankings",
});

export default async function PopularPlayerRankingPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; position?: string; nation?: string }>;
}) {
  const params = await searchParams;
  return (
    <PlayerRankingPage
      mode="popularity"
      players={await getPlayerRanking("popularity")}
      query={params?.q ?? ""}
      position={params?.position ?? ""}
      nation={params?.nation ?? ""}
    />
  );
}

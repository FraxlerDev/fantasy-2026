import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { PublicPlayerCatalog } from "../../components/public-player-catalog";
import { AppShell } from "../../components/shell";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Гравці та ціни",
  description: "Переглянь гравців збірних ЧС-2026, їхні позиції, клуби та фентезі-ціни до створення команди.",
  path: "/players",
});

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    include: { nationalTeam: true },
    orderBy: [{ price: "desc" }, { name: "asc" }],
  });

  return (
    <AppShell>
      <div className="topbar public-catalog-topbar">
        <div>
          <p className="eyebrow">Перед стартом</p>
          <h1>Гравці та ціни</h1>
          <p className="muted">Переглядай каталог без реєстрації. Вхід потрібен лише для додавання гравців і збереження складу.</p>
        </div>
        <Link className="button primary" href="/login">
          <LogIn size={18} />
          Увійти та зібрати команду
        </Link>
      </div>
      <PublicPlayerCatalog
        players={players.map((player) => ({
          id: player.id,
          name: player.name,
          position: player.position,
          price: Number(player.price),
          club: player.club ?? player.clubOriginal,
          photoUrl: player.photoUrl,
          status: player.status,
          nationName: player.nationalTeam.nameUk,
          nationFlagPath: player.nationalTeam.flagPath,
        }))}
      />
    </AppShell>
  );
}

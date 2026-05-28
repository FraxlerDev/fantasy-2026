import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { PlayerPosition, PlayerStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../../../lib/admin";
import { prisma } from "../../../../../lib/prisma";

const playerPositions = new Set(["GK", "DEF", "MID", "FWD"]);
const playerStatuses = new Set(["AVAILABLE", "DOUBTFUL", "OUT", "ELIMINATED"]);
const maxPlayerPhotoSize = 200 * 1024;
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id: playerId } = await params;
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const nameOriginal = String(formData.get("nameOriginal") ?? "").trim();
    const position = String(formData.get("position") ?? "").trim().toUpperCase();
    const price = Number(formData.get("price") ?? 0);
    const club = String(formData.get("club") ?? "").trim();
    const clubOriginal = String(formData.get("clubOriginal") ?? "").trim();
    const status = String(formData.get("status") ?? "AVAILABLE").trim().toUpperCase();
    const unavailableReason = String(formData.get("unavailableReason") ?? "").trim();
    const photo = formData.get("photo");

    if (!playerId || name.length < 2 || !playerPositions.has(position) || price <= 0 || !playerStatuses.has(status)) {
      return NextResponse.json({ error: "Некоректні дані гравця." }, { status: 400 });
    }

    let photoUrl: string | undefined;
    if (photo instanceof File && photo.size > 0) {
      if (photo.size > maxPlayerPhotoSize || !allowedPhotoTypes.has(photo.type)) {
        return NextResponse.json({ error: "Фото має бути JPG, PNG або WebP до 200 КБ." }, { status: 400 });
      }

      const ext = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
      const dir = path.join(process.cwd(), "public", "player-photos");
      await mkdir(dir, { recursive: true });
      const fileName = `${playerId}.${ext}`;
      await writeFile(path.join(dir, fileName), Buffer.from(await photo.arrayBuffer()));
      photoUrl = `/player-photos/${fileName}`;
    }

    const player = await prisma.player.update({
      where: { id: playerId },
      data: {
        name,
        nameOriginal: nameOriginal || null,
        position: position as PlayerPosition,
        price,
        club: club || null,
        clubOriginal: clubOriginal || null,
        status: status as PlayerStatus,
        unavailableReason: status === "AVAILABLE" ? null : unavailableReason || null,
        ...(photoUrl ? { photoUrl } : {}),
      },
      include: { nationalTeam: true },
    });

    revalidatePath("/admin");
    revalidatePath("/squad");
    revalidatePath("/teams");

    return NextResponse.json({
      player: {
        id: player.id,
        name: player.name,
        position: player.position,
        price: Number(player.price).toFixed(1),
        club: player.club ?? "-",
        status: player.status,
        photoUrl: player.photoUrl,
      },
    });
  } catch {
    return NextResponse.json({ error: "Немає доступу або не вдалося зберегти гравця." }, { status: 403 });
  }
}

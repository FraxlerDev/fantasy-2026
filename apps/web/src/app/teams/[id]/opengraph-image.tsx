import type { PlayerPosition } from "@prisma/client";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { prisma } from "../../../lib/prisma";

export const alt = "Склад фентезі-команди до ЧС-2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const formationShapes: Record<string, Record<PlayerPosition, number>> = {
  "4-3-3": { GK: 1, DEF: 4, MID: 3, FWD: 3 },
  "3-4-3": { GK: 1, DEF: 3, MID: 4, FWD: 3 },
  "3-5-2": { GK: 1, DEF: 3, MID: 5, FWD: 2 },
  "4-4-2": { GK: 1, DEF: 4, MID: 4, FWD: 2 },
  "4-5-1": { GK: 1, DEF: 4, MID: 5, FWD: 1 },
  "5-3-2": { GK: 1, DEF: 5, MID: 3, FWD: 2 },
  "5-4-1": { GK: 1, DEF: 5, MID: 4, FWD: 1 },
};

const positionLabels: Record<PlayerPosition, string> = {
  GK: "Воротар",
  DEF: "Захисник",
  MID: "Півзахисник",
  FWD: "Нападник",
};

function assetMime(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".svg") return "image/svg+xml";
  return "image/jpeg";
}

function asArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

async function assetDataUrl(publicPath: string | null) {
  if (!publicPath) return null;
  if (/^https?:\/\//i.test(publicPath)) return publicPath;

  try {
    const relativePath = publicPath.replace(/^\/+/, "");
    const filePath = path.resolve(process.cwd(), "public", relativePath);
    const publicRoot = path.resolve(process.cwd(), "public");
    if (!filePath.startsWith(publicRoot)) return null;
    const source = await readFile(filePath);
    const isWebp = path.extname(filePath).toLowerCase() === ".webp";
    const data = isWebp ? await sharp(source).png().toBuffer() : source;
    const mime = isWebp ? "image/png" : assetMime(filePath);
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = await prisma.fantasyTeam.findUnique({
    where: { id },
    include: {
      user: { select: { username: true } },
      rosterEntries: {
        where: { slot: "STARTER" },
        include: { player: { include: { nationalTeam: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!team) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b2d20", color: "white", fontSize: 54, fontWeight: 800 }}>
          Команду не знайдено
        </div>
      ),
      size,
    );
  }

  const shape = formationShapes[team.formation] ?? formationShapes["4-3-3"];
  const rows: PlayerPosition[] = ["FWD", "MID", "DEF", "GK"];
  const starters = team.rosterEntries;
  const manager = team.user.username?.trim() || "Користувач";
  const [logoUrl, regularFont, boldFont, playerVisuals] = await Promise.all([
    assetDataUrl("/main-photo.png"),
    readFile(path.join(process.cwd(), "public", "fonts", "NotoSans-Regular.ttf")),
    readFile(path.join(process.cwd(), "public", "fonts", "NotoSans-Bold.ttf")),
    Promise.all(
      starters.map(async (entry) => ({
        entryId: entry.id,
        photo: await assetDataUrl(entry.player.photoUrl),
        flag: await assetDataUrl(entry.player.nationalTeam.flagPath),
      })),
    ),
  ]);
  const visualsByEntry = new Map(playerVisuals.map((visual) => [visual.entryId, visual]));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#edf2eb",
          color: "#09251b",
          padding: 24,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            width: 840,
            height: 582,
            display: "flex",
            flexDirection: "column",
            border: "3px solid #d8dfd5",
            background: "#08713e",
          }}
        >
          <div
            style={{
              height: 68,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#0b3f2d",
              color: "white",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, fontWeight: 800 }}>{team.name}</span>
              <span style={{ fontSize: 15, opacity: 0.8 }}>Стартовий склад · {team.formation}</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Fantasy 2026 UA</span>
          </div>

          <div
            style={{
              height: 514,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "10px 28px 14px",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          >
            {rows.map((position) => {
              const players = starters.filter((entry) => entry.player.position === position);
              return (
                <div key={position} style={{ width: "100%", height: 108, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                  {Array.from({ length: shape[position] }, (_, index) => {
                    const entry = players[index];
                    if (!entry) {
                      return (
                        <div
                          key={`${position}-${index}`}
                          style={{
                            width: 112,
                            height: 94,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px dashed rgba(255,255,255,.55)",
                            borderRadius: 10,
                            color: "rgba(255,255,255,.75)",
                            fontSize: 14,
                          }}
                        >
                          {positionLabels[position]}
                        </div>
                      );
                    }

                    const visual = visualsByEntry.get(entry.id);
                    const photo = visual?.photo ?? null;
                    const flag = visual?.flag ?? null;
                    return (
                      <div key={entry.id} style={{ width: 128, height: 106, display: "flex", flexDirection: "column", alignItems: "center", color: "white", position: "relative" }}>
                        <div
                          style={{
                            width: 58,
                            height: 58,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 29,
                            border: "3px solid white",
                            background: "#f4f6f3",
                            overflow: "hidden",
                            color: "#0b3f2d",
                            fontSize: 24,
                            fontWeight: 800,
                            position: "relative",
                          }}
                        >
                          {photo ? (
                            <img alt="" src={photo} width="58" height="58" style={{ width: 58, height: 58, objectFit: "cover" }} />
                          ) : (
                            entry.player.name.slice(0, 1).toUpperCase()
                          )}
                        </div>
                        {flag ? <img alt="" src={flag} width="26" height="18" style={{ position: "absolute", top: 42, right: 27, width: 26, height: 18, objectFit: "cover", border: "2px solid white" }} /> : null}
                        {entry.isCaptain ? (
                          <span style={{ position: "absolute", top: 0, right: 25, width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 13, background: "#f6ce35", color: "#10271e", fontSize: 14, fontWeight: 900 }}>
                            К
                          </span>
                        ) : null}
                        <span style={{ width: 128, height: 28, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 13, lineHeight: 1.05, fontWeight: 800, overflow: "hidden" }}>
                          {entry.player.name}
                        </span>
                        <span style={{ padding: "2px 7px", display: "flex", background: "#f6ce35", color: "#10271e", fontSize: 13, fontWeight: 900 }}>
                          {Number(entry.player.price).toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: 312,
            height: 582,
            marginLeft: 20,
            padding: 26,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            border: "3px solid #d8dfd5",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
              {logoUrl ? <img alt="" src={logoUrl} width="72" height="72" style={{ width: 72, height: 72, objectFit: "cover", marginRight: 16 }} /> : null}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 20, fontWeight: 900 }}>Fantasy</span>
                <span style={{ fontSize: 20, fontWeight: 900 }}>2026 UA</span>
              </div>
            </div>
            <span style={{ fontSize: 15, color: "#5d6f67", marginBottom: 6 }}>КОМАНДА</span>
            <span style={{ fontSize: 31, lineHeight: 1.08, fontWeight: 900, marginBottom: 24 }}>{team.name}</span>
            <span style={{ fontSize: 15, color: "#5d6f67", marginBottom: 6 }}>МЕНЕДЖЕР</span>
            <span style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{manager}</span>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #e3e8e1", paddingTop: 18 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 14, color: "#5d6f67" }}>СХЕМА</span>
                <span style={{ fontSize: 27, fontWeight: 900 }}>{team.formation}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: 14, color: "#5d6f67" }}>ОЧКИ</span>
                <span style={{ fontSize: 27, fontWeight: 900 }}>{team.totalPoints}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#0b6a43", fontSize: 18, fontWeight: 900 }}>fantasy.fraxler.site</span>
            <span style={{ marginTop: 5, color: "#6c7c75", fontSize: 13 }}>Фентезі до ЧС-2026</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: asArrayBuffer(regularFont), style: "normal", weight: 400 },
        { name: "Inter", data: asArrayBuffer(boldFont), style: "normal", weight: 700 },
      ],
    },
  );
}

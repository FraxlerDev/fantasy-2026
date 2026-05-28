import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

type VisitPayload = {
  action?: string;
  visitorKey?: string;
  visitId?: string;
  path?: string;
  referrer?: string | null;
  durationSeconds?: number;
};

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip") ?? null;
}

function countryCity(request: Request) {
  const country = request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");
  const city = request.headers.get("x-vercel-ip-city");
  return [country, city].filter(Boolean).join(" / ") || null;
}

function deviceFromUa(userAgent: string) {
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  if (/mobile|android|iphone|ipod/i.test(userAgent)) return "mobile";
  return "desktop";
}

function browserOsFromUa(userAgent: string) {
  const browser =
    userAgent.match(/Edg\/([\d.]+)/)?.[0].replace("Edg/", "Edge ") ??
    userAgent.match(/OPR\/([\d.]+)/)?.[0].replace("OPR/", "Opera ") ??
    userAgent.match(/Chrome\/([\d.]+)/)?.[0].replace("Chrome/", "Chrome ") ??
    userAgent.match(/Firefox\/([\d.]+)/)?.[0].replace("Firefox/", "Firefox ") ??
    userAgent.match(/Version\/([\d.]+).*Safari/)?.[1]?.replace(/^/, "Safari ") ??
    "Unknown";

  const os =
    userAgent.includes("Windows NT 10") ? "Windows 10/11"
    : userAgent.includes("Windows") ? "Windows"
    : userAgent.includes("Mac OS X") ? "macOS"
    : userAgent.includes("Android") ? "Android"
    : /iPhone|iPad|iPod/.test(userAgent) ? "iOS"
    : userAgent.includes("Linux") ? "Linux"
    : "Unknown";

  return `${browser} ${os}`;
}

function safePath(value?: string) {
  const path = String(value ?? "/").trim();
  if (!path.startsWith("/")) return "/";
  return path.slice(0, 300);
}

async function readPayload(request: Request) {
  const text = await request.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as VisitPayload;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload?.action) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const siteVisit = (prisma as unknown as { siteVisit?: any }).siteVisit;
  if (!siteVisit) {
    return NextResponse.json({ ok: true, disabled: true }, { status: 202 });
  }

  if (payload.action === "start") {
    const visitorKey = String(payload.visitorKey ?? "").trim();
    if (!visitorKey) {
      return NextResponse.json({ error: "visitorKey is required" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const visit = await siteVisit.create({
      data: {
        visitorKey: visitorKey.slice(0, 80),
        site: request.headers.get("host") ?? "fantasy.fraxler.site",
        path: safePath(payload.path),
        referrer: payload.referrer ? String(payload.referrer).slice(0, 500) : null,
        ip: clientIp(request),
        countryCity: countryCity(request),
        device: deviceFromUa(userAgent),
        browserOs: browserOsFromUa(userAgent),
        userAgent,
      },
      select: { id: true },
    }).catch(() => null);

    return NextResponse.json({ visitId: visit?.id ?? null }, { status: visit ? 201 : 202 });
  }

  if (payload.action === "update") {
    const visitId = String(payload.visitId ?? "").trim();
    if (!visitId) {
      return NextResponse.json({ error: "visitId is required" }, { status: 400 });
    }

    const durationSeconds = Math.max(0, Math.min(86400, Math.round(Number(payload.durationSeconds ?? 0))));
    await siteVisit
      .update({
        where: { id: visitId },
        data: {
          lastSeenAt: new Date(),
          durationSeconds,
        },
      })
      .catch(() => null);

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

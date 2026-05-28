import { NextResponse } from "next/server";
import { processDueGameweekSnapshots } from "../../../../lib/gameweeks";

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results = await processDueGameweekSnapshots();

  return NextResponse.json({ ok: true, results });
}

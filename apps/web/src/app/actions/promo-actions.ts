"use server";

import { cookies } from "next/headers";
import { signIn } from "../../auth";

export async function startFromPromo(formData: FormData) {
  const teamName = String(formData.get("teamName") ?? "").trim();
  const cookieStore = await cookies();

  if (teamName) {
    cookieStore.set("promo_team_name", teamName.slice(0, 40), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
  }

  cookieStore.delete("promo_league_code");

  await signIn("google", { redirectTo: "/after-login" });
}

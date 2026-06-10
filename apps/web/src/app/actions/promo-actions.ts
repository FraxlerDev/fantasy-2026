"use server";

import { signIn } from "../../auth";

export async function startFromPromo() {
  await signIn("google", { redirectTo: "/after-login" });
}

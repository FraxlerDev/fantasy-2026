import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Після входу",
  path: "/after-login",
  noIndex: true,
});

export default async function AfterLoginPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!session.user.username) {
    redirect("/onboarding");
  }

  redirect("/squad");
}

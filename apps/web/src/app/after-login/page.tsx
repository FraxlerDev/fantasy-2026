import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

export default async function AfterLoginPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!session.user.username) {
    redirect("/onboarding");
  }

  const team = await prisma.fantasyTeam.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (team) {
    redirect(`/teams/${team.id}`);
  }

  redirect("/squad");
}

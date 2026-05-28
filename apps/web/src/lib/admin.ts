import { auth } from "../auth";
import { prisma } from "./prisma";

export async function requireAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";

  if (!session?.user?.id || session.user.email !== adminEmail) {
    throw new Error("ADMIN_REQUIRED");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: "ADMIN" },
  });

  return session;
}

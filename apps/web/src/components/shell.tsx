import { Sidebar } from "./sidebar";
import { FloatingChat } from "./floating-chat";
import { AdminTeamPresence } from "./admin-team-presence";
import { auth } from "../auth";
import { prisma } from "../lib/prisma";

export async function AppShell({
  active,
  children,
}: Readonly<{
  active?: string;
  children: React.ReactNode;
}>) {
  const [session, maintenanceMode] = await Promise.all([
    auth(),
    prisma.systemSetting.findUnique({ where: { key: "maintenanceMode" } }).catch(() => null),
  ]);
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;
  const isMaintenance = maintenanceMode?.value === "on";
  const canBypassMaintenance = isAdmin || active === "/admin" || active === "/login";

  if (isMaintenance && !canBypassMaintenance) {
    return (
      <div className="maintenance-screen">
        <div className="maintenance-card">
          <p className="eyebrow">Fantasy 2026</p>
          <h1>Тривають технічні роботи</h1>
          <p>Сайт повернеться найближчим часом.</p>
          <a className="button primary" href="/login">Увійти</a>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} />
      <main className="main">{children}</main>
      <FloatingChat />
      {isAdmin ? <AdminTeamPresence /> : null}
    </div>
  );
}

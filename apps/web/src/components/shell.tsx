import { Sidebar } from "./sidebar";
import { FloatingChat } from "./floating-chat";

export function AppShell({
  active,
  children,
}: Readonly<{
  active?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="app-shell">
      <Sidebar active={active} />
      <main className="main">{children}</main>
      <FloatingChat />
    </div>
  );
}

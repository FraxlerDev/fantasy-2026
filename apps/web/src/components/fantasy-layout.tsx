import { FantasySidebar } from "./fantasy-sidebar";

export function FantasyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fantasy-layout">
      <section className="fantasy-main">{children}</section>
      <FantasySidebar />
    </div>
  );
}

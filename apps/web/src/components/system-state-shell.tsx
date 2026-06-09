"use client";

import { BookOpen, CalendarDays, Flag, Home, MessageSquareText, Shield, Table2, Trophy, Users } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "Головна", icon: Trophy },
  { href: "/tournament", label: "Турнір", icon: Flag },
  { href: "/matches", label: "Матч-центр", icon: CalendarDays },
  { href: "/squad", label: "Мій склад", icon: Shield },
  { href: "/leagues", label: "Ліги", icon: Users },
  { href: "/forum", label: "Форум", icon: MessageSquareText },
  { href: "/rules", label: "Правила", icon: BookOpen },
  { href: "/leaderboard", label: "Рейтинг", icon: Table2 },
];

export function SystemStateShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <input className="mobile-nav-toggle" id="system-mobile-nav-toggle" type="checkbox" aria-hidden="true" />
        <div className="brand">
          <Link className="brand-home" href="/" aria-label="На головну">
            <div className="brand-mark brand-photo">
              <img src="/main-photo.png" alt="" />
            </div>
            <div className="brand-text">
              <div>Fantasy 2026 UA</div>
            </div>
          </Link>
          <label className="mobile-menu-button" htmlFor="system-mobile-nav-toggle" aria-label="Відкрити меню">
            <span />
            <span />
            <span />
          </label>
        </div>
        <div className="sidebar-menu">
          <nav className="nav" aria-label="Головна навігація">
            {items.map((item) => (
              <div className="nav-entry" key={item.href}>
                <Link href={item.href}>
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
          <div className="sidebar-note">
            <Link className="button" href="/">
              <Home size={16} />
              На головну
            </Link>
          </div>
        </div>
      </aside>
      <main className="main system-state-main">{children}</main>
    </div>
  );
}

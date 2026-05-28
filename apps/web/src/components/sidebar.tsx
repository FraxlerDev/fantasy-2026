import { BookOpen, CalendarDays, Flag, Megaphone, Shield, Table2, Trophy, Users, Wrench } from "lucide-react";
import Link from "next/link";
import { signOutUser } from "../app/actions/auth-actions";
import { auth } from "../auth";

const items = [
  { href: "/", label: "Головна", icon: Trophy },
  { href: "/tournament", label: "Турнір", icon: Flag },
  { href: "/calendar", label: "Календар", icon: CalendarDays },
  { href: "/squad", label: "Склад", icon: Shield },
  { href: "/leagues", label: "Ліги", icon: Users },
  { href: "/petitions", label: "Поради / Петиції", icon: Megaphone },
  { href: "/rules", label: "Правила", icon: BookOpen },
  { href: "/leaderboard", label: "Рейтинг", icon: Table2 },
];

const adminItem = { href: "/admin", label: "Адмін", icon: Wrench };

export async function Sidebar({ active = "/" }: { active?: string }) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const visibleItems = session?.user?.email === adminEmail ? [...items, adminItem] : items;

  return (
    <aside className="sidebar">
      <input className="mobile-nav-toggle" id="mobile-nav-toggle" type="checkbox" aria-hidden="true" />
      <div className="brand">
        <div className="brand-mark brand-photo">
          <img src="/main-photo.png" alt="" />
        </div>
        <div className="brand-text">
          <div>Fantasy 2026 UA</div>
          <small className="muted">ЧС-2026 для своїх ліг</small>
        </div>
        <label className="mobile-menu-button" htmlFor="mobile-nav-toggle" aria-label="Відкрити меню">
          <span />
          <span />
          <span />
        </label>
      </div>
      <div className="sidebar-menu">
        <nav className="nav" aria-label="Головна навігація">
          {visibleItems.map((item) => (
            <Link key={item.href} href={item.href} data-active={active === item.href}>
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <a className="author-link" href="https://t.me/fraxler7" target="_blank" rel="noreferrer">
            Зв'язок з автором
          </a>
          {session?.user?.username ? (
            <form action={signOutUser}>
              <strong>{session.user.username}</strong>
              <div style={{ marginTop: 6 }}>{session.user.email}</div>
              <button className="button" style={{ marginTop: 12, width: "100%" }} type="submit">
                Вийти
              </button>
            </form>
          ) : (
            <Link className="button" href="/login" style={{ marginTop: 12, width: "100%" }}>
              Увійти
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

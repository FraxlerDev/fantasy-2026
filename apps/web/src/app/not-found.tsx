import { Home, SearchX, Shield } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../components/shell";

export default function NotFound() {
  return (
    <AppShell active="">
      <div className="system-state-page">
        <section className="system-state-card">
          <SearchX size={40} aria-hidden="true" />
          <p className="eyebrow">Помилка 404</p>
          <h1>Такої сторінки немає</h1>
          <p>Посилання могло застаріти або сторінку було переміщено.</p>
          <div className="system-state-actions">
            <Link className="button primary" href="/">
              <Home size={18} />
              На головну
            </Link>
            <Link className="button" href="/squad">
              <Shield size={18} />
              Мій склад
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

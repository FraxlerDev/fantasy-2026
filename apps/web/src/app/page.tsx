import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Users } from "lucide-react";
import { AppShell } from "../components/shell";
import { createMetadata } from "../lib/seo";
import { startFromPromo } from "./actions/promo-actions";

export const metadata: Metadata = createMetadata({
  title: "Фентезі до ЧС-2026",
  description: "Фентезі-футбол до ЧС-2026 українською: збери склад, обери капітана, грай у лігах з друзями та глобальному рейтингу.",
  path: "/",
});

export default function HomePage() {
  return (
    <AppShell active="/">
      <section className="promo-hero poster-hero">
        <div className="promo-copy">
          <p className="eyebrow">Fantasy World Cup 2026</p>
          <h1>Фентезі-турнір до ЧС-2026 для твоєї футбольної компанії</h1>
          <p>
            Збери команду з 15 гравців, обери стартові 11, постав капітана і
            змагайся у глобальному рейтингу або в лігах з друзями.
          </p>
          <form action={startFromPromo} className="promo-form">
            <input
              className="input"
              name="teamName"
              placeholder="Придумай назву команди"
              maxLength={40}
            />
            <button className="button primary" type="submit">
              Грати
            </button>
          </form>
        </div>
        <div className="promo-poster" aria-label="Постер Fantasy World Cup 2026" />
      </section>

      <section className="promo-steps">
        <article>
          <span>1</span>
          <Shield size={28} />
          <h2>Збери команду мрії</h2>
          <p>Використай бюджет 100 монет і склади ростер із 15 гравців.</p>
        </article>
        <article>
          <span>2</span>
          <Users size={28} />
          <h2>Створюй або вступай у ліги</h2>
          <p>Команда може грати без ліги, а приватні та відкриті ліги доступні окремо.</p>
        </article>
        <article>
          <span>3</span>
          <ArrowRight size={28} />
          <h2>Роби трансфери</h2>
          <p>Керуй складом між турами за лімітами кожного GW.</p>
        </article>
        <article>
          <span>4</span>
          <CheckCircle2 size={28} />
          <h2>Змагайся з друзями</h2>
          <p>Після оновлення рейтингів дивись місце у лігах і глобальній таблиці.</p>
        </article>
      </section>

      <section className="panel home-links-panel" style={{ marginTop: 18 }}>
        <div className="topbar" style={{ marginBottom: 0 }}>
          <div>
            <h2>Турнірна структура</h2>
            <p className="muted">
              Профіль турніру, рейтинг, правила і сторінки команд винесені окремо.
            </p>
          </div>
          <div className="toolbar">
            <Link className="button" href="/tournament">
              Турнір
            </Link>
            <Link className="button" href="/rules">
              Правила
            </Link>
            <Link className="button primary" href="/leaderboard">
              Рейтинг
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

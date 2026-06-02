import type { Metadata } from "next";
import { AppShell } from "../../components/shell";
import { guideCards } from "../../data/mock";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Гайди та поради",
  description: "Гайди, поради та редакційні матеріали для швидкого старту у фентезі-футболі до ЧС-2026.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <AppShell active="/guides">
      <div className="topbar">
        <div>
          <p className="eyebrow">Медіа</p>
          <h1>Гайди і поради</h1>
          <p className="muted">Редакційний шар допомагає новачкам швидко почати і повертатися перед дедлайнами.</p>
        </div>
      </div>
      <section className="panel">
        <div className="content-list">
          {guideCards.map((card) => (
            <article className="content-item" key={card.title}>
              <div className="media-thumb" />
              <div>
                <span className="badge">{card.label}</span>
                <h3 style={{ marginTop: 8 }}>{card.title}</h3>
                <p className="muted">Матеріал українською мовою для desktop-first fantasy experience.</p>
              </div>
              <span className="muted">{card.meta}</span>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

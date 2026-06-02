import type { Metadata } from "next";
import { CheckCircle2, Megaphone, Trash2 } from "lucide-react";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";
import { createPetition, deletePetition, reviewPetition, votePetition } from "../actions/petition-actions";

export const metadata: Metadata = createMetadata({
  title: "Поради та петиції",
  description: "Сторінка зворотного зв'язку для фентезі до ЧС-2026: пропозиції щодо цін, гравців, правил, очок і технічних деталей.",
  path: "/petitions",
});

const examples = [
  "Змінити ціну гравця збірної Англії Гаррі Кейна з 9 на 9,5",
  "Виправити помилку в імені гравця збірної Кюрасао Брандлей Кувас",
  "Перерахувати очки 1 туру гравця Fraxler",
  "Додати пояснення дедлайнів на сторінку правил",
  "Додати фільтр гравців за статусом доступності",
];

const categories = ["Ціни", "Гравці", "Очки", "Правила", "Інше"];

export default async function PetitionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ sort?: string; error?: string; created?: string; deleted?: string; reviewed?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;
  const sort = params?.sort === "top" ? "top" : "new";

  const petitions = await prisma.petition.findMany({
    include: {
      votes: true,
    },
    orderBy: sort === "new" ? { createdAt: "desc" } : { createdAt: "desc" },
  });
  const enriched = petitions
    .map((petition) => ({
      ...petition,
      score: petition.votes.reduce((sum, vote) => sum + vote.value, 0),
      myVote: petition.votes.find((vote) => vote.userId === session?.user?.id)?.value ?? 0,
    }))
    .sort((a, b) => (sort === "top" ? b.score - a.score || b.createdAt.getTime() - a.createdAt.getTime() : 0));

  const notifications = session?.user?.id
    ? await prisma.notification.findMany({
        where: { userId: session.user.id, href: { contains: "/petitions" } },
        orderBy: { createdAt: "desc" },
        take: 5,
      })
    : [];

  return (
    <AppShell active="/petitions">
      <div className="topbar">
        <div>
          <p className="eyebrow">Спільнота</p>
          <h1>Поради / Петиції</h1>
          <p className="muted">Авторизовані користувачі можуть додавати поради, голосувати за чужі петиції та бачити відповідь адміна.</p>
        </div>
      </div>

      {params?.error ? (
        <div className="form-error">
          {params.error === "limit"
            ? "У тебе вже є 5 активних петицій на розгляді."
            : params.error === "own-vote"
              ? "За свою петицію голосувати не можна."
              : "Перевір заголовок, опис і категорію петиції."}
        </div>
      ) : null}
      {params?.created || params?.deleted || params?.reviewed ? <div className="form-success">Зміни збережено.</div> : null}

      {notifications.length > 0 ? (
        <section className="panel petition-notifications">
          <h2>Notification</h2>
          {notifications.map((notification) => (
            <a href={notification.href ?? "/petitions"} key={notification.id}>
              {notification.message}
            </a>
          ))}
        </section>
      ) : null}

      <section className="grid cols-2">
        <div className="panel">
          <h2>Додати петицію</h2>
          {session?.user?.id ? (
            <form action={createPetition} className="form-stack">
              <label>
                Заголовок
                <input className="input" name="title" minLength={8} maxLength={120} required />
              </label>
              <label>
                Категорія
                <select className="input" name="category" defaultValue="Інше">
                  {categories.map((category) => <option value={category} key={category}>{category}</option>)}
                </select>
              </label>
              <label>
                Опис
                <textarea className="input textarea" name="body" minLength={10} maxLength={1000} required />
              </label>
              <button className="button primary" type="submit">
                <Megaphone size={18} />
                Опублікувати
              </button>
            </form>
          ) : (
            <p className="muted">Увійди через Google, щоб додати петицію або проголосувати.</p>
          )}
        </div>

        <div className="panel">
          <h2>Приклади</h2>
          <ol className="petition-examples">
            {examples.map((example) => <li key={example}>{example}</li>)}
          </ol>
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="topbar" style={{ marginBottom: 12 }}>
          <h2>Список петицій</h2>
          <div className="toolbar">
            <a className={`button ${sort === "new" ? "primary" : ""}`} href="/petitions">Нові</a>
            <a className={`button ${sort === "top" ? "primary" : ""}`} href="/petitions?sort=top">Топ за голосами</a>
          </div>
        </div>

        <div className="petition-list">
          {enriched.map((petition) => {
            const isOwner = petition.authorId === session?.user?.id;
            return (
              <article className="petition-row" id={`petition-${petition.id}`} key={petition.id}>
                <div>
                  <div className="petition-meta">
                    <span className="badge">{petition.category}</span>
                    <span>{petition.createdAt.toLocaleString("uk-UA", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <h3>{petition.title}</h3>
                  <p>{petition.body}</p>
                  {petition.adminComment ? (
                    <div className="admin-comment">
                      <strong>Коментар адміна:</strong> {petition.adminComment}
                    </div>
                  ) : null}
                  {(isOwner || isAdmin) ? (
                    <form action={deletePetition}>
                      <input type="hidden" name="petitionId" value={petition.id} />
                      <button className="button warning" type="submit">
                        <Trash2 size={16} />
                        Видалити
                      </button>
                    </form>
                  ) : null}
                </div>

                <div className="petition-vote">
                  <form action={votePetition}>
                    <input type="hidden" name="petitionId" value={petition.id} />
                    <input type="hidden" name="value" value="1" />
                    <button className={petition.myVote === 1 ? "vote-button active" : "vote-button"} type="submit" disabled={!session?.user?.id || isOwner}>+</button>
                  </form>
                  <strong>{petition.score}</strong>
                  <form action={votePetition}>
                    <input type="hidden" name="petitionId" value={petition.id} />
                    <input type="hidden" name="value" value="-1" />
                    <button className={petition.myVote === -1 ? "vote-button active" : "vote-button"} type="submit" disabled={!session?.user?.id || isOwner}>-</button>
                  </form>
                </div>

                <div className="petition-review">
                  {petition.reviewed ? (
                    <span className="reviewed"><CheckCircle2 size={18} /> Розглянуто</span>
                  ) : (
                    <span className="pending">На розгляді</span>
                  )}
                  {isAdmin ? (
                    <form action={reviewPetition} className="review-form">
                      <input type="hidden" name="petitionId" value={petition.id} />
                      <label><input name="reviewed" type="checkbox" defaultChecked={petition.reviewed} /> Розглянуто</label>
                      <textarea className="input textarea" name="adminComment" placeholder="Коментар адміна" defaultValue={petition.adminComment ?? ""} />
                      <button className="button primary" type="submit">Зберегти</button>
                    </form>
                  ) : null}
                </div>
              </article>
            );
          })}
          {enriched.length === 0 ? <p className="muted">Петицій ще немає.</p> : null}
        </div>
      </section>
    </AppShell>
  );
}

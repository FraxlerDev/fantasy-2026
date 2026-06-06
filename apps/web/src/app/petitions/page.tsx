import type { Metadata } from "next";
import { CheckCircle2, Megaphone, MessageSquareText, Trash2 } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";
import { createPetition, deletePetition, reviewPetition, votePetition } from "../actions/petition-actions";

export const metadata: Metadata = createMetadata({
  title: "Поради та петиції",
  description: "Зворотний зв'язок щодо цін, гравців, правил, очок і технічних деталей фентезі до ЧС-2026.",
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
const tabs = [
  { id: "list", label: "Усі петиції" },
  { id: "create", label: "Додати петицію" },
  { id: "responses", label: "Відповіді адміністратора" },
  { id: "examples", label: "Приклади" },
] as const;

type PetitionTab = (typeof tabs)[number]["id"];

type PetitionSearchParams = {
  tab?: string;
  sort?: string;
  category?: string;
  status?: string;
  error?: string;
  created?: string;
  deleted?: string;
  reviewed?: string;
};

function petitionsUrl({
  tab = "list",
  sort,
  category,
  status,
}: {
  tab?: PetitionTab;
  sort: "new" | "top";
  category: string;
  status: string;
}) {
  const params = new URLSearchParams({ tab });
  if (sort === "top") params.set("sort", "top");
  if (category !== "all") params.set("category", category);
  if (status !== "all") params.set("status", status);
  const query = params.toString();
  return query ? `/petitions?${query}` : "/petitions";
}

export default async function PetitionsPage({
  searchParams,
}: {
  searchParams?: Promise<PetitionSearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  const isAdmin = session?.user?.email === adminEmail;
  const requestedTab = String(params?.tab ?? "list");
  const activeTab: PetitionTab = tabs.some((tab) => tab.id === requestedTab)
    ? (requestedTab as PetitionTab)
    : "list";
  const sort = params?.sort === "top" ? "top" : "new";
  const category = categories.includes(String(params?.category)) ? String(params?.category) : "all";
  const status = ["pending", "reviewed"].includes(String(params?.status)) ? String(params?.status) : "all";
  const where = {
    ...(category !== "all" ? { category } : {}),
    ...(status === "pending" ? { reviewed: false } : status === "reviewed" ? { reviewed: true } : {}),
  };

  const [petitions, adminResponses, notifications] = await Promise.all([
    prisma.petition.findMany({
      where,
      include: { votes: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.petition.findMany({
      where: { reviewed: true, adminComment: { not: null } },
      select: { id: true, title: true, adminComment: true, reviewedAt: true },
      orderBy: { reviewedAt: "desc" },
      take: 10,
    }),
    session?.user?.id
      ? prisma.notification.findMany({
          where: { userId: session.user.id, href: { contains: "/petitions" } },
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : Promise.resolve([]),
  ]);

  const enriched = petitions
    .map((petition) => ({
      ...petition,
      score: petition.votes.reduce((sum, vote) => sum + vote.value, 0),
      myVote: petition.votes.find((vote) => vote.userId === session?.user?.id)?.value ?? 0,
    }))
    .sort((a, b) =>
      sort === "top"
        ? b.score - a.score || b.createdAt.getTime() - a.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime(),
    );

  return (
    <AppShell active="/petitions">
      <div className="topbar">
        <div>
          <p className="eyebrow">Спільнота</p>
          <h1>Поради / Петиції</h1>
          <p className="muted">
            Авторизовані користувачі можуть пропонувати зміни, голосувати за чужі петиції та бачити відповідь адміністратора.
          </p>
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
          <h2>Сповіщення</h2>
          {notifications.map((notification) => (
            <a href={notification.href ?? "/petitions"} key={notification.id}>{notification.message}</a>
          ))}
        </section>
      ) : null}

      <nav className="section-tabs" aria-label="Розділи петицій">
        {tabs.map((tab) => (
          <Link className={activeTab === tab.id ? "active" : ""} href={`/petitions?tab=${tab.id}`} key={tab.id}>
            {tab.label}
          </Link>
        ))}
      </nav>

      {activeTab === "create" ? (
        <section className="panel">
          <h2>Додати петицію</h2>
          {session?.user?.id ? (
            <form action={createPetition} className="form-stack">
              <input type="hidden" name="returnTab" value="create" />
              <label>Заголовок
                <input className="input" name="title" minLength={8} maxLength={120} required />
              </label>
              <label>Категорія
                <select className="input" name="category" defaultValue="Інше">
                  {categories.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
              <label>Опис
                <textarea className="input textarea" name="body" minLength={10} maxLength={1000} required />
              </label>
              <button className="button primary" type="submit"><Megaphone size={18} />Опублікувати</button>
            </form>
          ) : (
            <p className="muted">Увійди через Google, щоб додати петицію або проголосувати.</p>
          )}
        </section>
      ) : null}

      {activeTab === "examples" ? (
        <section className="panel">
          <h2>Приклади петицій</h2>
          <p className="muted">Ці приклади показують, які пропозиції та повідомлення про помилки можна надсилати.</p>
          <ol className="petition-examples">
            {examples.map((example) => <li key={example}>{example}</li>)}
          </ol>
        </section>
      ) : null}

      {activeTab === "responses" ? (
        <section className="panel petition-responses">
          <h2>Відповіді адміністратора</h2>
          {adminResponses.length > 0 ? (
            <div className="grid">
              {adminResponses.map((petition) => (
                <Link href={`/petitions?tab=list#petition-${petition.id}`} className="admin-response-card" key={petition.id}>
                  <MessageSquareText size={18} />
                  <span>
                    <strong>{petition.title}</strong>
                    <small>{petition.adminComment}</small>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="muted">Відповідей адміністратора поки немає.</p>
          )}
        </section>
      ) : null}

      {activeTab === "list" ? (
        <section className="panel">
          <div className="petition-list-header">
            <h2>Список петицій</h2>
            <form className="petition-filters" action="/petitions">
              <input type="hidden" name="tab" value="list" />
              <input type="hidden" name="sort" value={sort} />
              <select className="input" name="category" defaultValue={category}>
                <option value="all">Усі категорії</option>
                {categories.map((item) => <option value={item} key={item}>{item}</option>)}
              </select>
              <select className="input" name="status" defaultValue={status}>
                <option value="all">Усі статуси</option>
                <option value="pending">На розгляді</option>
                <option value="reviewed">Розглянуті</option>
              </select>
              <button className="button" type="submit">Застосувати</button>
              {(category !== "all" || status !== "all") ? <Link className="button" href="/petitions?tab=list">Скинути</Link> : null}
            </form>
            <div className="toolbar">
              <Link className={`button ${sort === "new" ? "primary" : ""}`} href={petitionsUrl({ tab: "list", sort: "new", category, status })}>Нові</Link>
              <Link className={`button ${sort === "top" ? "primary" : ""}`} href={petitionsUrl({ tab: "list", sort: "top", category, status })}>Топ за голосами</Link>
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
                      <span className="petition-comment-count"><MessageSquareText size={14} />{petition.adminComment ? 1 : 0}</span>
                    </div>
                    <h3>{petition.title}</h3>
                    <p>{petition.body}</p>
                    {petition.adminComment ? (
                      <div className="admin-comment"><strong>Відповідь адміністратора:</strong> {petition.adminComment}</div>
                    ) : null}
                    {isOwner || isAdmin ? (
                      <form action={deletePetition}>
                        <input type="hidden" name="petitionId" value={petition.id} />
                        <input type="hidden" name="returnTab" value="list" />
                        <button className="button warning" type="submit"><Trash2 size={16} />Видалити</button>
                      </form>
                    ) : null}
                  </div>

                  <div className="petition-vote">
                    <form action={votePetition}>
                      <input type="hidden" name="petitionId" value={petition.id} />
                      <input type="hidden" name="value" value="1" />
                      <input type="hidden" name="returnTab" value="list" />
                      <button className={petition.myVote === 1 ? "vote-button active" : "vote-button"} type="submit" disabled={!session?.user?.id || isOwner}>+</button>
                    </form>
                    <strong>{petition.score}</strong>
                    <form action={votePetition}>
                      <input type="hidden" name="petitionId" value={petition.id} />
                      <input type="hidden" name="value" value="-1" />
                      <input type="hidden" name="returnTab" value="list" />
                      <button className={petition.myVote === -1 ? "vote-button active" : "vote-button"} type="submit" disabled={!session?.user?.id || isOwner}>-</button>
                    </form>
                  </div>

                  <div className="petition-review">
                    {petition.reviewed ? (
                      <span className="reviewed"><CheckCircle2 size={18} />Розглянуто</span>
                    ) : <span className="pending">На розгляді</span>}
                    {isAdmin ? (
                      <form action={reviewPetition} className="review-form">
                        <input type="hidden" name="petitionId" value={petition.id} />
                        <input type="hidden" name="returnTab" value="list" />
                        <label><input name="reviewed" type="checkbox" defaultChecked={petition.reviewed} /> Розглянуто</label>
                        <textarea className="input textarea" name="adminComment" placeholder="Одна відповідь адміністратора" defaultValue={petition.adminComment ?? ""} />
                        <button className="button primary" type="submit">Зберегти</button>
                      </form>
                    ) : null}
                  </div>
                </article>
              );
            })}
            {enriched.length === 0 ? <p className="muted">Петицій за цими фільтрами немає.</p> : null}
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}

import type { Metadata } from "next";
import { CheckCircle2, CircleDot, Lock, MessageSquareText, Vote } from "lucide-react";
import Link from "next/link";
import { auth } from "../../auth";
import { ForumCreateForm } from "../../components/forum-create-form";
import { ForumReadMarker } from "../../components/forum-read-marker";
import { AppShell } from "../../components/shell";
import { prisma } from "../../lib/prisma";
import { createMetadata } from "../../lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Форум фентезі до ЧС-2026",
  description: "Обговорення правил, механік і розвитку українського фентезі до ЧС-2026.",
  path: "/forum",
});

const statusLabels: Record<string, string> = {
  ACTIVE: "Активна",
  RESOLVED: "Вирішено",
  CLOSED: "Закрито",
};

const statusIcons = {
  ACTIVE: CircleDot,
  RESOLVED: CheckCircle2,
  CLOSED: Lock,
};

export default async function ForumPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string; status?: string; error?: string; deleted?: string }>;
}) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const activeTab = params?.tab === "create" ? "create" : "topics";
  const status = ["ACTIVE", "RESOLVED", "CLOSED"].includes(String(params?.status))
    ? String(params?.status)
    : "ALL";

  const topics = await prisma.forumTopic.findMany({
    where: status === "ALL" ? {} : { status },
    include: {
      author: { select: { username: true } },
      _count: { select: { comments: true, votes: true, options: true } },
      comments: { select: { createdAt: true }, orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell active="/forum">
      <ForumReadMarker />
      <div className="topbar">
        <div>
          <p className="eyebrow">Спільнота</p>
          <h1>Форум</h1>
          <p className="muted">
            Обговорюй правила, механіки й розвиток гри. Теми можуть створювати всі авторизовані користувачі.
          </p>
        </div>
      </div>

      {params?.error ? <div className="form-error">Перевір заголовок, опис і варіанти голосування.</div> : null}
      {params?.deleted ? <div className="form-success">Тему видалено.</div> : null}

      <nav className="section-tabs forum-tabs" aria-label="Розділи форуму">
        <Link className={activeTab === "topics" ? "active" : ""} href="/forum">Теми</Link>
        <Link className={activeTab === "create" ? "active" : ""} href="/forum?tab=create">Створити тему</Link>
      </nav>

      {activeTab === "create" ? (
        <section className="panel">
          <h2>Нова тема</h2>
          {session?.user?.id ? (
            <ForumCreateForm />
          ) : (
            <p className="muted">Увійди через Google, щоб створити тему.</p>
          )}
        </section>
      ) : (
        <>
          <nav className="forum-status-filter" aria-label="Фільтр статусів">
            <Link className={status === "ALL" ? "active" : ""} href="/forum">Усі</Link>
            <Link className={status === "ACTIVE" ? "active" : ""} href="/forum?status=ACTIVE">Активні</Link>
            <Link className={status === "RESOLVED" ? "active" : ""} href="/forum?status=RESOLVED">Вирішені</Link>
            <Link className={status === "CLOSED" ? "active" : ""} href="/forum?status=CLOSED">Закриті</Link>
          </nav>
          <section className="forum-topic-list">
            {topics.map((topic) => {
              const StatusIcon = statusIcons[topic.status as keyof typeof statusIcons] ?? CircleDot;
              const latestActivity = topic.comments[0]?.createdAt ?? topic.createdAt;
              return (
                <Link className="panel forum-topic-card" href={`/forum/${topic.id}`} key={topic.id}>
                  <div className="forum-topic-main">
                    <div className="forum-topic-meta">
                      <span className={`forum-status ${topic.status.toLowerCase()}`}>
                        <StatusIcon size={14} />
                        {statusLabels[topic.status] ?? topic.status}
                      </span>
                      <span>{topic.author.username?.trim() || "Користувач"}</span>
                      <time>
                        {latestActivity.toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Europe/Kyiv",
                        })}
                      </time>
                    </div>
                    <h2>{topic.title}</h2>
                    <p>{topic.description}</p>
                  </div>
                  <div className="forum-topic-stats">
                    {topic._count.options > 0 ? <span><Vote size={17} />{topic._count.votes} голосів</span> : null}
                    <span><MessageSquareText size={17} />{topic._count.comments}</span>
                  </div>
                </Link>
              );
            })}
            {topics.length === 0 ? <div className="panel"><p className="muted">Тем із таким статусом поки немає.</p></div> : null}
          </section>
        </>
      )}
    </AppShell>
  );
}

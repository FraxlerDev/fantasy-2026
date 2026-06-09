import type { Metadata } from "next";
import { CheckCircle2, CircleDot, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "../../../auth";
import { voteForumPoll } from "../../actions/forum-actions";
import { ForumDiscussion } from "../../../components/forum-discussion";
import { ForumReadMarker } from "../../../components/forum-read-marker";
import { ForumTopicAdminEditor } from "../../../components/forum-topic-admin-editor";
import { AppShell } from "../../../components/shell";
import { prisma } from "../../../lib/prisma";

export const metadata: Metadata = {
  title: "Тема форуму | Fantasy 2026 UA",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Активна",
  RESOLVED: "Вирішено",
  CLOSED: "Закрито",
};

export default async function ForumTopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string; voted?: string; updated?: string }>;
}) {
  const [{ id }, query, session] = await Promise.all([params, searchParams, auth()]);
  const topic = await prisma.forumTopic.findUnique({
    where: { id },
    include: {
      author: { select: { username: true } },
      options: {
        include: { _count: { select: { votes: true } } },
        orderBy: { order: "asc" },
      },
      votes: session?.user?.id
        ? { where: { userId: session.user.id }, select: { optionId: true } }
        : { where: { userId: "__anonymous__" }, select: { optionId: true } },
      _count: { select: { votes: true, comments: true } },
    },
  });
  if (!topic) notFound();

  const isAdmin = session?.user?.email === (process.env.ADMIN_EMAIL ?? "terintention@gmail.com");
  const myVote = topic.votes[0]?.optionId;
  const totalVotes = topic._count.votes;
  const StatusIcon = topic.status === "CLOSED" ? Lock : topic.status === "RESOLVED" ? CheckCircle2 : CircleDot;

  return (
    <AppShell active="/forum">
      <ForumReadMarker />
      <Link className="forum-back-link" href="/forum">← Усі теми</Link>
      {query?.error === "voted" ? <div className="form-error">Голос уже зафіксовано і змінити його не можна.</div> : null}
      {query?.error === "poll" ? <div className="form-error">Голосування вже завершено.</div> : null}
      {query?.error === "validation" ? <div className="form-error">Перевір заголовок та опис теми.</div> : null}
      {query?.voted ? <div className="form-success">Голос зараховано.</div> : null}
      {query?.updated ? <div className="form-success">Налаштування теми збережено.</div> : null}

      <article className="panel forum-topic-detail">
        <div className="forum-topic-meta">
          <span className={`forum-status ${topic.status.toLowerCase()}`}>
            <StatusIcon size={14} />
            {statusLabels[topic.status]}
          </span>
          <span>{topic.author.username?.trim() || "Користувач"}</span>
          <time>{topic.createdAt.toLocaleString("uk-UA", { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })}</time>
        </div>
        {isAdmin ? (
          <ForumTopicAdminEditor
            topic={{
              id: topic.id,
              title: topic.title,
              description: topic.description,
              status: topic.status,
              pollClosed: topic.pollClosed,
              hasPoll: topic.options.length > 0,
            }}
          />
        ) : (
          <>
            <h1>{topic.title}</h1>
            <p>{topic.description}</p>
          </>
        )}
      </article>

      {topic.options.length > 0 ? (
        <section className="panel forum-poll">
          <div className="forum-section-heading">
            <h2>Голосування</h2>
            <span>{totalVotes} голосів · {topic.pollClosed ? "завершено" : "активне"}</span>
          </div>
          <div className="forum-poll-options">
            {topic.options.map((option) => {
              const votes = option._count.votes;
              const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              return (
                <div className={`forum-poll-option ${myVote === option.id ? "selected" : ""}`} key={option.id}>
                  <div>
                    <strong>{option.label}</strong>
                    <span>{votes} · {percent}%</span>
                  </div>
                  <div className="forum-poll-bar"><span style={{ width: `${percent}%` }} /></div>
                  {!myVote && !topic.pollClosed && topic.status !== "CLOSED" && session?.user?.id ? (
                    <form action={voteForumPoll}>
                      <input type="hidden" name="topicId" value={topic.id} />
                      <input type="hidden" name="optionId" value={option.id} />
                      <button className="button" type="submit">Обрати</button>
                    </form>
                  ) : null}
                </div>
              );
            })}
          </div>
          {!session?.user?.id ? <p className="muted">Увійди, щоб проголосувати.</p> : null}
        </section>
      ) : null}

      <ForumDiscussion topicId={topic.id} closed={topic.status === "CLOSED"} />
    </AppShell>
  );
}

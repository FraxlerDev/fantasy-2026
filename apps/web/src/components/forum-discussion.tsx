"use client";

import { Heart, Reply, Send, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type ForumComment = {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null; role: string };
  parent: { id: string; body: string; authorName: string } | null;
  likeCount: number;
  likedByCurrentUser: boolean;
};

type ForumUser = {
  id: string;
  name: string;
  image: string | null;
  isAdmin: boolean;
} | null;

function shortText(value: string, limit = 100) {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ForumDiscussion({ topicId, closed }: { topicId: string; closed: boolean }) {
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [currentUser, setCurrentUser] = useState<ForumUser>(null);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<ForumComment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [liking, setLiking] = useState<Set<string>>(() => new Set());
  const [loading, setLoading] = useState(true);
  const lastCommentAt = comments.at(-1)?.createdAt;

  async function loadComments(onlyNew = false) {
    const suffix = onlyNew && lastCommentAt ? `?after=${encodeURIComponent(lastCommentAt)}` : "";
    const response = await fetch(`/api/forum/topics/${topicId}/comments${suffix}`, { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as {
      comments: ForumComment[];
      reactions: Pick<ForumComment, "id" | "likeCount" | "likedByCurrentUser">[];
      currentUser: ForumUser;
    };
    setCurrentUser(data.currentUser);
    setComments((existing) => {
      if (!onlyNew) return data.comments;
      const reactions = new Map(data.reactions.map((reaction) => [reaction.id, reaction]));
      const refreshed = existing.map((comment) => {
        const reaction = reactions.get(comment.id);
        return reaction ? { ...comment, ...reaction } : comment;
      });
      const known = new Set(refreshed.map((comment) => comment.id));
      const next = data.comments.filter((comment) => !known.has(comment.id));
      return next.length ? [...refreshed, ...next] : refreshed;
    });
  }

  useEffect(() => {
    void loadComments(false).finally(() => {
      setLoading(false);
    });
  }, [topicId]);

  useEffect(() => {
    const interval = window.setInterval(() => void loadComments(true), 4000);
    return () => window.clearInterval(interval);
  }, [lastCommentAt, topicId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    setError(null);
    const response = await fetch(`/api/forum/topics/${topicId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: body.trim(), parentId: replyTo?.id ?? null }),
    });
    const data = (await response.json().catch(() => null)) as { error?: string; comment?: ForumComment } | null;
    if (!response.ok || !data?.comment) {
      setError(data?.error ?? "Не вдалося додати коментар.");
      setSending(false);
      return;
    }
    setComments((current) => [...current, data.comment!]);
    setBody("");
    setReplyTo(null);
    setSending(false);
  }

  async function deleteComment(commentId: string) {
    const response = await fetch(`/api/forum/comments/${commentId}`, { method: "DELETE" });
    if (response.ok) setComments((current) => current.filter((comment) => comment.id !== commentId));
  }

  async function toggleLike(commentId: string) {
    if (!currentUser || liking.has(commentId)) return;
    setLiking((current) => new Set(current).add(commentId));
    const response = await fetch(`/api/forum/comments/${commentId}/like`, { method: "POST" });
    const data = (await response.json().catch(() => null)) as { error?: string; liked?: boolean; likeCount?: number } | null;
    if (response.ok && typeof data?.liked === "boolean" && typeof data.likeCount === "number") {
      setComments((current) =>
        current.map((comment) =>
          comment.id === commentId
            ? { ...comment, likedByCurrentUser: data.liked!, likeCount: data.likeCount! }
            : comment,
        ),
      );
    } else setError(data?.error ?? "Не вдалося поставити лайк.");
    setLiking((current) => {
      const next = new Set(current);
      next.delete(commentId);
      return next;
    });
  }

  return (
    <section className="panel forum-discussion">
      <div className="forum-section-heading">
        <h2>Обговорення</h2>
        <span>{comments.length} повідомлень</span>
      </div>
      <div className="forum-comment-list">
        {comments.map((comment) => {
          const own = currentUser?.id === comment.author.id;
          return (
            <article className="forum-comment" key={comment.id}>
              <div className="forum-comment-avatar">
                {comment.author.image ? <img src={comment.author.image} alt="" /> : comment.author.name.slice(0, 1)}
              </div>
              <div className="forum-comment-content">
                <header>
                  <strong>{comment.author.name}</strong>
                  <time>{formatDate(comment.createdAt)}</time>
                </header>
                {comment.parent ? (
                  <div className="forum-comment-reply">
                    <strong>{comment.parent.authorName}</strong>
                    <span>{shortText(comment.parent.body)}</span>
                  </div>
                ) : null}
                <p>{comment.body}</p>
                <footer>
                  <div>
                    {currentUser && !closed ? (
                      <button type="button" onClick={() => setReplyTo(comment)}><Reply size={14} />Відповісти</button>
                    ) : null}
                    {own || currentUser?.isAdmin ? (
                      <button type="button" onClick={() => void deleteComment(comment.id)}><Trash2 size={14} />Видалити</button>
                    ) : null}
                  </div>
                  {currentUser && !own ? (
                    <button
                      className={`forum-like ${comment.likedByCurrentUser ? "active" : ""}`}
                      type="button"
                      disabled={liking.has(comment.id)}
                      onClick={() => void toggleLike(comment.id)}
                      aria-label="Лайкнути коментар"
                    >
                      <Heart size={16} fill={comment.likedByCurrentUser ? "currentColor" : "none"} />
                      {comment.likeCount > 0 ? comment.likeCount : null}
                    </button>
                  ) : comment.likeCount > 0 ? (
                    <span className="forum-like readonly"><Heart size={16} fill="currentColor" />{comment.likeCount}</span>
                  ) : null}
                </footer>
              </div>
            </article>
          );
        })}
        {!loading && comments.length === 0 ? <p className="muted">Обговорення ще не розпочалося.</p> : null}
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {replyTo ? (
        <div className="forum-reply-composer">
          <span><strong>Відповідь для {replyTo.author.name}</strong>{shortText(replyTo.body)}</span>
          <button className="icon-button" type="button" onClick={() => setReplyTo(null)}><X size={16} /></button>
        </div>
      ) : null}
      {closed ? (
        <div className="forum-closed-note">Обговорення закрито адміністратором.</div>
      ) : currentUser ? (
        <form className="forum-comment-form" onSubmit={submit}>
          <textarea
            className="input textarea"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={1000}
            placeholder="Написати повідомлення..."
          />
          <button className="button primary" type="submit" disabled={sending || !body.trim()}>
            <Send size={17} />Надіслати
          </button>
        </form>
      ) : (
        <p className="muted">Увійди через Google, щоб долучитися до обговорення.</p>
      )}
    </section>
  );
}

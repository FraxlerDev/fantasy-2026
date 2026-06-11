"use client";

import { Send, Trash2, UserRound } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { LEAGUE_UNREAD_EVENT } from "./league-unread-badge";

type LeagueChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

function formatMessageTime(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function LeagueChat({ leagueId, leagueName }: { leagueId: string; leagueName: string }) {
  const [messages, setMessages] = useState<LeagueChatMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    const response = await fetch(`/api/leagues/${leagueId}/messages`, { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as {
      messages: LeagueChatMessage[];
      currentUserId: string;
      isOwner: boolean;
    };
    setMessages(data.messages);
    setCurrentUserId(data.currentUserId);
    setIsOwner(data.isOwner);

    const readResponse = await fetch(`/api/leagues/${leagueId}/messages`, {
      method: "PATCH",
    });
    if (readResponse.ok) {
      window.dispatchEvent(new Event(LEAGUE_UNREAD_EVENT));
    }
  }, [leagueId]);

  useEffect(() => {
    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(), 5000);
    return () => window.clearInterval(interval);
  }, [loadMessages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || sending) return;
    setSending(true);
    setError("");

    const response = await fetch(`/api/leagues/${leagueId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text }),
    });
    const data = (await response.json().catch(() => null)) as {
      message?: LeagueChatMessage;
      error?: string;
    } | null;

    if (!response.ok || !data?.message) {
      setError(data?.error ?? "Не вдалося надіслати повідомлення.");
      setSending(false);
      return;
    }

    setMessages((current) => [...current, data.message!].slice(-50));
    setBody("");
    setSending(false);
  }

  async function deleteMessage(messageId: string) {
    const response = await fetch(`/api/leagues/${leagueId}/messages/${messageId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setMessages((current) => current.filter((message) => message.id !== messageId));
    }
  }

  return (
    <section className="panel league-chat">
      <div className="league-chat-heading">
        <div>
          <span>Внутрішній чат ліги</span>
          <h2>«{leagueName}»</h2>
        </div>
        <small>Тільки для учасників</small>
      </div>

      <div className="league-chat-messages" ref={listRef}>
        {messages.length === 0 ? (
          <p className="league-chat-empty">Повідомлень ще немає. Почни розмову першим.</p>
        ) : null}
        {messages.map((message) => {
          const canDelete = message.author.id === currentUserId || isOwner;
          return (
            <article className="league-chat-message" key={message.id}>
              <span className="league-chat-avatar">
                {message.author.image ? (
                  <img alt="" src={message.author.image} />
                ) : (
                  <UserRound size={17} />
                )}
              </span>
              <div>
                <header>
                  <strong>{message.author.name}</strong>
                  <time>{formatMessageTime(message.createdAt)}</time>
                </header>
                <p>{message.body}</p>
              </div>
              {canDelete ? (
                <button
                  className="league-chat-delete"
                  type="button"
                  onClick={() => void deleteMessage(message.id)}
                  aria-label="Видалити повідомлення"
                  title="Видалити повідомлення"
                >
                  <Trash2 size={15} />
                </button>
              ) : null}
            </article>
          );
        })}
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      <form className="league-chat-form" onSubmit={submitMessage}>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={500}
          rows={2}
          placeholder="Написати учасникам ліги..."
        />
        <button className="button primary" type="submit" disabled={sending || !body.trim()}>
          <Send size={17} />
          Надіслати
        </button>
      </form>
    </section>
  );
}

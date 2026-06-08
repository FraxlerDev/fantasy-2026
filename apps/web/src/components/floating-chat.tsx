"use client";

import { Ban, Reply, Send, Smile, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  body: string;
  createdAt: string;
  replyTo: {
    id: string;
    body: string;
    authorName: string;
  } | null;
  author: {
    id: string;
    name: string;
    image: string | null;
    role: string;
  };
};

type CurrentUser = {
  id: string;
  name: string;
  image: string | null;
  isAdmin: boolean;
  isBanned: boolean;
} | null;

const emojiGroups = [
  { title: "Смайли", items: "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😋 😛 😜 🤪 😎 🥳 😏 😒 😔 🥺 😢 😭 😤 😠 🤯 😳 😱 🤔 🤭 🤫 😴 🤐 🥴 🤢 🤧".split(" ") },
  { title: "Жести", items: "👍 👎 👊 ✊ 🤛 🤜 👏 🙌 👐 🤝 🙏 ✍️ 💪 🖐️ ✋ 👋 🤙 👈 👉 👆 👇 ☝️ ✌️ 🤞 🤟 🤘 👌".split(" ") },
  { title: "Футбол", items: "⚽ 🥅 🏟️ 🏆 🥇 🥈 🥉 🎖️ 🏅 🎫 📣 🚩 🟨 🟥 👟 🧤 🔥 💥 ⭐ 🌟 ⚡ 🎯 🚀 📊".split(" ") },
  { title: "Серця", items: "❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝".split(" ") },
  { title: "Предмети", items: "📌 📍 🧩 🎮 🎲 🎧 📱 💻 ⌚ 📷 🎥 📺 📚 📝 📈 📉 ✅ ❌ ❗ ❓ 💬 🔔".split(" ") },
  { title: "Їжа", items: "🍕 🍔 🍟 🌭 🥪 🌮 🌯 🍗 🥩 🍿 🥐 🍞 🍌 🍎 🍊 🍓 🍒 🍉 🍇".split(" ") },
  { title: "Подорожі", items: "✈️ 🚆 🚇 🚕 🚌 🚗 🏎️ 🚲 🚀 🛫 🛬 🗺️ 🧭 🏨 🏠 🏙️ 🌆 🌃 🌍".split(" ") },
];

const CHAT_TOGGLE_EVENT = "fantasy:chat-toggle";
const CHAT_UNREAD_EVENT = "fantasy:chat-unread";
const CHAT_UNREAD_REQUEST_EVENT = "fantasy:chat-unread-request";

function formatTime(value: string) {
  return new Intl.DateTimeFormat("uk-UA", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function authorInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "U";
}

function shortText(value: string, limit = 86) {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [emojiQuery, setEmojiQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const lastMessageAt = messages.at(-1)?.createdAt;
  const filteredEmojiGroups = useMemo(() => {
    const query = emojiQuery.trim().toLowerCase();
    if (!query) return emojiGroups;
    return emojiGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.includes(query) || group.title.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0);
  }, [emojiQuery]);

  async function loadMessages(onlyNew = false) {
    const suffix = onlyNew && lastMessageAt ? `?after=${encodeURIComponent(lastMessageAt)}` : "";
    const response = await fetch(`/api/chat/messages${suffix}`, { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { messages: ChatMessage[]; currentUser: CurrentUser };
    setCurrentUser(data.currentUser);
    setMessages((existing) => {
      if (!onlyNew) return data.messages;
      const known = new Set(existing.map((message) => message.id));
      const next = data.messages.filter((message) => !known.has(message.id));
      if (next.length && !isOpen) setUnreadCount((count) => Math.min(99, count + next.length));
      return next.length ? [...existing, ...next].slice(-80) : existing;
    });
  }

  useEffect(() => {
    void loadMessages(false);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => void loadMessages(true), 3000);
    return () => window.clearInterval(interval);
  }, [lastMessageAt, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setUnreadCount(0);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [isOpen, messages.length]);

  useEffect(() => {
    function toggleFromNavigation() {
      setIsOpen((open) => {
        if (!open) setUnreadCount(0);
        return !open;
      });
    }

    window.addEventListener(CHAT_TOGGLE_EVENT, toggleFromNavigation);
    return () => window.removeEventListener(CHAT_TOGGLE_EVENT, toggleFromNavigation);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(CHAT_UNREAD_EVENT, { detail: unreadCount }));
  }, [unreadCount]);

  useEffect(() => {
    function reportUnread() {
      window.dispatchEvent(new CustomEvent(CHAT_UNREAD_EVENT, { detail: unreadCount }));
    }

    window.addEventListener(CHAT_UNREAD_REQUEST_EVENT, reportUnread);
    return () => window.removeEventListener(CHAT_UNREAD_REQUEST_EVENT, reportUnread);
  }, [unreadCount]);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!window.matchMedia("(min-width: 981px)").matches) return;
      if ((event.target as Element).closest?.(".nav-chat-button, .dashboard-chat-button")) return;
      if (panelRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
      setEmojiOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || isSending) return;
    setIsSending(true);
    setError(null);

    const response = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text, replyToId: replyTo?.id ?? null }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Не вдалося надіслати повідомлення.");
      setIsSending(false);
      return;
    }

    const data = (await response.json()) as { message: ChatMessage };
    setMessages((existing) => [...existing, data.message].slice(-80));
    setBody("");
    setReplyTo(null);
    setEmojiOpen(false);
    setIsSending(false);
  }

  async function deleteMessage(messageId: string) {
    const response = await fetch(`/api/chat/messages/${messageId}`, { method: "DELETE" });
    if (response.ok) {
      setMessages((existing) => existing.filter((message) => message.id !== messageId));
      if (replyTo?.id === messageId) setReplyTo(null);
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Не вдалося видалити повідомлення.");
    }
  }

  async function banUser(userId: string) {
    const reason = window.prompt("Причина блокування в чаті", "Модерація чату");
    if (reason === null) return;
    const response = await fetch("/api/chat/bans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, reason }),
    });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Не вдалося заблокувати користувача.");
    }
  }

  function addEmoji(emoji: string) {
    setBody((value) => `${value}${emoji}`);
  }

  return (
    <div className="floating-chat">
      {isOpen ? (
        <section ref={panelRef} className="chat-panel" aria-label="Загальний чат">
          <header className="chat-header">
            <div>
              <strong>Фан-сектор</strong>
              <span>{currentUser ? "Пишуть авторизовані, читають усі" : "Увійди, щоб писати"}</span>
            </div>
            <button className="chat-icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Закрити чат">
              <X size={18} />
            </button>
          </header>

          <div className="chat-messages" ref={listRef}>
            {messages.length === 0 ? <p className="chat-empty">Повідомлень ще немає. Почни розмову першим.</p> : null}
            {messages.map((message) => {
              const own = currentUser?.id === message.author.id;
              const canDelete = Boolean(own || currentUser?.isAdmin);
              return (
                <article className={`chat-message ${own ? "own" : ""}`} key={message.id}>
                  <div className="chat-avatar">
                    {message.author.image ? <img alt="" src={message.author.image} /> : <span>{authorInitial(message.author.name)}</span>}
                  </div>
                  <div className="chat-bubble">
                    <div className="chat-meta">
                      <strong>{message.author.name}</strong>
                      <span>{formatTime(message.createdAt)}</span>
                    </div>
                    {message.replyTo ? (
                      <div className="chat-reply-preview">
                        <strong>{message.replyTo.authorName}</strong>
                        <span>{shortText(message.replyTo.body)}</span>
                      </div>
                    ) : null}
                    <p>{message.body}</p>
                    <div className="chat-admin-actions">
                      {currentUser ? (
                        <button type="button" onClick={() => setReplyTo(message)}>
                          <Reply size={13} />
                          Відповісти
                        </button>
                      ) : null}
                      {canDelete ? (
                        <button type="button" onClick={() => void deleteMessage(message.id)}>
                          <Trash2 size={13} />
                          Видалити
                        </button>
                      ) : null}
                      {currentUser?.isAdmin && message.author.id !== currentUser.id ? (
                        <button type="button" onClick={() => void banUser(message.author.id)}>
                          <Ban size={13} />
                          Заблокувати
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {error ? <div className="chat-error">{error}</div> : null}

          {emojiOpen ? (
            <div className="emoji-picker">
              <input className="input" value={emojiQuery} onChange={(event) => setEmojiQuery(event.target.value)} placeholder="Пошук emoji" />
              <div className="emoji-picker-scroll">
                {filteredEmojiGroups.map((group) => (
                  <section key={group.title}>
                    <h4>{group.title}</h4>
                    <div className="emoji-grid">
                      {group.items.map((emoji) => (
                        <button type="button" key={`${group.title}-${emoji}`} onClick={() => addEmoji(emoji)} aria-label={emoji}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : null}

          {replyTo ? (
            <div className="chat-reply-composer">
              <div>
                <strong>Відповідь: {replyTo.author.name}</strong>
                <span>{shortText(replyTo.body)}</span>
              </div>
              <button className="chat-icon-button" type="button" onClick={() => setReplyTo(null)} aria-label="Скасувати відповідь">
                <X size={16} />
              </button>
            </div>
          ) : null}

          <form className="chat-form" onSubmit={submitMessage}>
            <button className="chat-icon-button" type="button" onClick={() => setEmojiOpen((value) => !value)} aria-label="Emoji">
              <Smile size={18} />
            </button>
            <input
              value={body}
              onChange={(event) => setBody(event.target.value)}
              maxLength={500}
              placeholder={currentUser ? "Написати повідомлення..." : "Увійди, щоб писати"}
              disabled={!currentUser || currentUser.isBanned}
            />
            <button className="chat-send" type="submit" disabled={!currentUser || currentUser.isBanned || !body.trim() || isSending} aria-label="Надіслати">
              <Send size={18} />
            </button>
          </form>
        </section>
      ) : null}

    </div>
  );
}

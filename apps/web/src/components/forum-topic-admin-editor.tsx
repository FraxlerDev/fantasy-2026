"use client";

import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { deleteForumTopic, updateForumTopic } from "../app/actions/forum-actions";

type ForumTopicAdminEditorProps = {
  topic: {
    id: string;
    title: string;
    description: string;
    status: string;
    pollClosed: boolean;
    hasPoll: boolean;
  };
};

export function ForumTopicAdminEditor({ topic }: ForumTopicAdminEditorProps) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <>
        <div className="forum-topic-title-row">
          <h1>{topic.title}</h1>
          <button
            className="icon-button forum-topic-edit-button"
            type="button"
            title="Редагувати тему"
            aria-label="Редагувати тему"
            onClick={() => setEditing(true)}
          >
            <Pencil size={18} />
          </button>
        </div>
        <p>{topic.description}</p>
      </>
    );
  }

  return (
    <div className="forum-topic-editor">
      <div className="forum-topic-editor-heading">
        <strong>Редагування теми</strong>
        <button
          className="icon-button"
          type="button"
          title="Скасувати редагування"
          aria-label="Скасувати редагування"
          onClick={() => setEditing(false)}
        >
          <X size={18} />
        </button>
      </div>
      <form action={updateForumTopic} className="form-stack">
        <input type="hidden" name="topicId" value={topic.id} />
        <label>
          Заголовок
          <input className="input" name="title" defaultValue={topic.title} minLength={6} maxLength={140} required />
        </label>
        <label>
          Опис
          <textarea
            className="input textarea"
            name="description"
            defaultValue={topic.description}
            minLength={10}
            maxLength={5000}
            required
          />
        </label>
        <label>
          Статус теми
          <select className="input" name="status" defaultValue={topic.status}>
            <option value="ACTIVE">Активна</option>
            <option value="RESOLVED">Вирішено</option>
            <option value="CLOSED">Закрито</option>
          </select>
        </label>
        {topic.hasPoll ? (
          <label className="forum-poll-toggle">
            <input name="pollClosed" type="checkbox" defaultChecked={topic.pollClosed} />
            Завершити голосування
          </label>
        ) : null}
        <div className="forum-topic-editor-actions">
          <button className="button primary" type="submit">Зберегти зміни</button>
          <button className="button" type="button" onClick={() => setEditing(false)}>Скасувати</button>
        </div>
      </form>
      <form action={deleteForumTopic} className="forum-topic-delete-form">
        <input type="hidden" name="topicId" value={topic.id} />
        <button className="button warning" type="submit">
          <Trash2 size={16} />
          Видалити тему
        </button>
      </form>
    </div>
  );
}

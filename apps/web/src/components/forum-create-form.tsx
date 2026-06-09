"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { createForumTopic } from "../app/actions/forum-actions";

export function ForumCreateForm() {
  const [pollEnabled, setPollEnabled] = useState(false);
  const [optionCount, setOptionCount] = useState(2);

  return (
    <form action={createForumTopic} className="form-stack forum-create-form">
      <label>
        Заголовок
        <input className="input" name="title" minLength={6} maxLength={140} required />
      </label>
      <label>
        Опис теми
        <textarea className="input textarea forum-description-input" name="description" minLength={10} maxLength={5000} required />
      </label>
      <label className="forum-poll-toggle">
        <input
          name="pollEnabled"
          type="checkbox"
          checked={pollEnabled}
          onChange={(event) => setPollEnabled(event.target.checked)}
        />
        Додати голосування
      </label>

      {pollEnabled ? (
        <fieldset className="forum-poll-builder">
          <legend>Варіанти відповіді</legend>
          {Array.from({ length: optionCount }, (_, index) => (
            <div className="forum-option-input" key={index}>
              <input
                className="input"
                name="pollOption"
                placeholder={`Варіант ${index + 1}`}
                maxLength={120}
                required
              />
              {optionCount > 2 && index === optionCount - 1 ? (
                <button
                  className="icon-button"
                  type="button"
                  title="Видалити варіант"
                  onClick={() => setOptionCount((count) => Math.max(2, count - 1))}
                >
                  <Trash2 size={17} />
                </button>
              ) : null}
            </div>
          ))}
          {optionCount < 7 ? (
            <button className="button" type="button" onClick={() => setOptionCount((count) => Math.min(7, count + 1))}>
              <Plus size={17} />
              Додати варіант
            </button>
          ) : null}
        </fieldset>
      ) : null}

      <button className="button primary" type="submit">Опублікувати тему</button>
    </form>
  );
}

"use client";

import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Feedback = { type: "saving" | "success" | "error"; message: string } | null;

function actionError(url: string) {
  const code = new URL(url).searchParams.get("error");
  if (!code) return null;
  const messages: Record<string, string> = {
    fixture: "Перевірте дані матчу.",
    score: "Перевірте введений рахунок.",
    price: "Перевірте введену ціну.",
    photo: "Фото має бути JPG, PNG або WebP розміром до 200 КБ.",
    gameweek: "Не вдалося визначити ігровий тур.",
    "open-gameweek": "Не вдалося відкрити трансфери.",
    "close-gameweek": "Не вдалося закрити трансфери.",
    "player-in-use": "Гравець використовується у складах і не може бути видалений.",
    "team-players-in-use": "Гравці цієї збірної використовуються у складах.",
    "playoff-fixture-in-use": "Матч уже використовується у наступній стадії.",
  };
  return { code, message: messages[code] ?? `Не вдалося зберегти зміни (${code}).` };
}

function highlightInvalidFields(form: HTMLFormElement, code: string) {
  const selectors: Record<string, string> = {
    score: '[name="homeScore"], [name="awayScore"]',
    price: '[name="price"]',
    photo: '[name="photo"]',
    gameweek: '[name="gameweek"]',
    fixture: '[name="fixtureId"], [name="homeTeamId"], [name="awayTeamId"]',
    "players-csv": '[name="csv"], [name="playersCsv"]',
  };
  const selector = selectors[code] ?? (code.startsWith("players-csv-row-") ? selectors["players-csv"] : "");
  if (!selector) return;
  form.querySelectorAll<HTMLElement>(selector).forEach((field) => field.classList.add("admin-field-error"));
}

export function AdminAjaxController() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    let successTimer: number | undefined;

    async function handleSubmit(event: SubmitEvent) {
      if (!(event.target instanceof HTMLFormElement)) return;
      const form = event.target;
      const formData = new FormData(form);
      let isServerAction = false;
      formData.forEach((_value, key) => {
        if (key.startsWith("$ACTION_")) isServerAction = true;
      });
      if (!isServerAction) return;

      const confirmMessage = form.dataset.confirm;
      if (confirmMessage && !window.confirm(confirmMessage)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const submitter = event.submitter instanceof HTMLButtonElement ? event.submitter : null;
      form.classList.remove("admin-form-error");
      form.querySelectorAll(".admin-field-error").forEach((field) => field.classList.remove("admin-field-error"));
      submitter?.classList.remove("admin-ajax-success");
      submitter?.classList.add("admin-ajax-pending");
      if (submitter) submitter.disabled = true;
      setFeedback({ type: "saving", message: "Зберігаю зміни..." });

      try {
        const response = await fetch(window.location.href.split("#")[0], {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        });
        const error = actionError(response.url);
        if (!response.ok || error) {
          form.classList.add("admin-form-error");
          if (error) highlightInvalidFields(form, error.code);
          setFeedback({ type: "error", message: error?.message ?? "Не вдалося зберегти зміни." });
          return;
        }

        submitter?.classList.add("admin-ajax-success");
        setFeedback({ type: "success", message: submitter?.dataset.successMessage || "Збережено" });
        router.refresh();
        window.clearTimeout(successTimer);
        successTimer = window.setTimeout(() => setFeedback(null), 2600);
      } catch {
        form.classList.add("admin-form-error");
        setFeedback({ type: "error", message: "Помилка мережі. Дані не збережено." });
      } finally {
        submitter?.classList.remove("admin-ajax-pending");
        if (submitter) submitter.disabled = false;
      }
    }

    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("submit", handleSubmit, true);
      window.clearTimeout(successTimer);
    };
  }, [router]);

  if (!feedback) return null;
  return (
    <div className={`admin-save-feedback ${feedback.type}`} role="status" aria-live="polite">
      {feedback.type === "saving" ? <LoaderCircle className="spin" size={18} /> : null}
      {feedback.type === "success" ? <Check size={18} /> : null}
      {feedback.type === "error" ? <TriangleAlert size={18} /> : null}
      <span>{feedback.message}</span>
    </div>
  );
}

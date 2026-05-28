"use client";

import { useRef, useState, useTransition } from "react";

type AdminPlayerEditFormProps = {
  player: {
    id: string;
    name: string;
    nameOriginal: string | null;
    position: string;
    price: number;
    club: string | null;
    clubOriginal: string | null;
    status: string;
    unavailableReason: string | null;
  };
};

export function AdminPlayerEditForm({ player }: AdminPlayerEditFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setError("");

    startTransition(async () => {
      const response = await fetch(`/api/admin/players/${player.id}`, {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? "Не вдалося зберегти гравця.");
        return;
      }

      setMessage("Гравця збережено без перезавантаження сторінки.");
      const fileInput = formRef.current?.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput) fileInput.value = "";
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="player-edit-form" encType="multipart/form-data">
      <label>Ім'я українською<input className="input" name="name" defaultValue={player.name} required /></label>
      <label>Оригінальне ім'я<input className="input" name="nameOriginal" defaultValue={player.nameOriginal ?? ""} /></label>
      <label>
        Позиція
        <select className="input" name="position" defaultValue={player.position}>
          <option value="GK">Воротар</option>
          <option value="DEF">Захисник</option>
          <option value="MID">Півзахисник</option>
          <option value="FWD">Нападник</option>
        </select>
      </label>
      <label>Ціна<input className="input" name="price" type="number" min="0.1" step="0.1" defaultValue={player.price} required /></label>
      <label>Клуб українською<input className="input" name="club" defaultValue={player.club ?? ""} /></label>
      <label>Клуб оригінал<input className="input" name="clubOriginal" defaultValue={player.clubOriginal ?? ""} /></label>
      <label>
        Статус
        <select className="input" name="status" defaultValue={player.status}>
          <option value="AVAILABLE">Доступний</option>
          <option value="DOUBTFUL">Під питанням</option>
          <option value="OUT">Недоступний</option>
          <option value="ELIMINATED">Вибув</option>
        </select>
      </label>
      <label>Причина недоступності<input className="input" name="unavailableReason" placeholder="Травма, червона картка..." defaultValue={player.unavailableReason ?? ""} /></label>
      <label>Фото<input className="input" name="photo" type="file" accept="image/png,image/jpeg,image/webp" /></label>
      <button className="button primary" type="submit" disabled={isPending}>{isPending ? "Зберігаю..." : "Зберегти гравця"}</button>
      {message ? <div className="form-success">{message}</div> : null}
      {error ? <div className="form-error">{error}</div> : null}
    </form>
  );
}

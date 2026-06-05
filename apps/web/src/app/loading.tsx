import { LoaderCircle } from "lucide-react";
import { AppShell } from "../components/shell";

export default function Loading() {
  return (
    <AppShell active="">
      <div className="system-state-page" aria-live="polite" aria-busy="true">
        <section className="system-state-card">
          <LoaderCircle className="system-state-spinner" size={34} aria-hidden="true" />
          <h1>Завантажуємо сторінку</h1>
          <p>Ще мить, дані фентезі вже готуються.</p>
          <div className="system-state-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

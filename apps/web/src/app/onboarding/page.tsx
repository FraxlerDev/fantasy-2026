import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { createMetadata } from "../../lib/seo";
import { completeOnboarding } from "../actions/onboarding-actions";

export const metadata: Metadata = createMetadata({
  title: "Перший вхід",
  path: "/onboarding",
  noIndex: true,
});

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.username) {
    redirect("/squad");
  }

  const params = await searchParams;
  const error = params?.error;

  return (
    <AppShell active="/squad">
      <section className="auth-layout">
        <div className="panel auth-card">
          <p className="eyebrow">Перший вхід</p>
          <h1>Створи менеджера</h1>
          <p className="muted">Username буде видно у рейтингах і приватних лігах.</p>
          {error ? (
            <div className="form-error">
              {error === "taken"
                ? "Такий username уже зайнятий."
                : "Перевір username. Він має містити 3-24 символи."}
            </div>
          ) : null}
          <form action={completeOnboarding} className="form-stack">
            <label>
              Username
              <input className="input" name="username" minLength={3} maxLength={24} required />
            </label>
            <button className="button primary" type="submit">Зберегти і перейти до складу</button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}

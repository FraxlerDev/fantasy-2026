import type { Metadata } from "next";
import { Chrome } from "lucide-react";
import { AppShell } from "../../components/shell";
import { createMetadata } from "../../lib/seo";
import { signInWithGoogle } from "../actions/auth-actions";

export const metadata: Metadata = createMetadata({
  title: "Вхід",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <AppShell active="/">
      <section className="auth-layout">
        <div className="panel auth-card">
          <p className="eyebrow">Вхід</p>
          <h1>Увійди через Google</h1>
          <p className="muted">
            Після входу ти задаси username, а потім зможеш створити fantasy-команду.
          </p>
          <form action={signInWithGoogle}>
            <button className="button primary" type="submit">
              <Chrome size={18} />
              Продовжити з Google
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}

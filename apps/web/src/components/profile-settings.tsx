import { updateProfile } from "../app/actions/profile-actions";

type ProfileSettingsProps = {
  username?: string | null;
  email?: string | null;
  image?: string | null;
  profileError?: string;
  profileSaved?: boolean;
};

const profileErrors: Record<string, string> = {
  username: "Нік має містити 3-24 символи: латиниця, цифри, _ або -.",
  "username-taken": "Такий нік уже зайнятий.",
  avatar: "Фото має бути JPG, PNG або WebP до 200 КБ.",
};

export function ProfileSettings({ username, email, image, profileError, profileSaved }: ProfileSettingsProps) {
  return (
    <section className="panel profile-settings">
      <div className="profile-settings-preview">
        {image ? <img src={image} alt="" /> : <div className="profile-avatar-placeholder">{(username ?? email ?? "U").slice(0, 1).toUpperCase()}</div>}
        <div>
          <p className="eyebrow">Профіль менеджера</p>
          <h2>{username ?? "Новий менеджер"}</h2>
          <p className="muted">{email}</p>
        </div>
      </div>
      <form action={updateProfile} className="profile-settings-form">
        <label>
          Нік користувача
          <input className="input" name="username" defaultValue={username ?? ""} minLength={3} maxLength={24} required />
        </label>
        <label>
          Фото до 200 КБ
          <input className="input" name="avatar" type="file" accept="image/png,image/jpeg,image/webp" />
        </label>
        <button className="button primary" type="submit">Зберегти профіль</button>
      </form>
      {profileError ? <div className="form-error">{profileErrors[profileError] ?? "Не вдалося зберегти профіль."}</div> : null}
      {profileSaved ? <div className="form-success">Профіль оновлено.</div> : null}
    </section>
  );
}

"use client";

import { BarChart3, Trophy, Wrench } from "lucide-react";
import {
  setMaintenanceModeAction,
  setPublicTeamStatisticsVisibilityAction,
  setSeasonReviewVisibilityAction,
} from "../app/actions/admin-actions";

function SettingToggle({
  label,
  description,
  enabled,
  action,
  icon,
  confirmEnable,
}: {
  label: string;
  description: string;
  enabled: boolean;
  action: (formData: FormData) => Promise<void>;
  icon: React.ReactNode;
  confirmEnable?: string;
}) {
  return (
    <form
      action={action}
      className="admin-setting-row"
      data-confirm={!enabled ? confirmEnable : undefined}
    >
      <input type="hidden" name="enabled" value={enabled ? "0" : "1"} />
      <span className="admin-setting-icon">{icon}</span>
      <span className="admin-setting-copy"><strong>{label}</strong><small>{description}</small></span>
      <span className={`admin-setting-state ${enabled ? "on" : "off"}`}>{enabled ? "Увімкнено" : "Вимкнено"}</span>
      <button
        className={`admin-toggle ${enabled ? "on" : "off"}`}
        type="submit"
        role="switch"
        aria-checked={enabled}
        aria-label={`${enabled ? "Вимкнути" : "Увімкнути"} ${label}`}
        data-success-message={`${label}: ${enabled ? "вимкнено" : "увімкнено"}`}
      ><span /></button>
    </form>
  );
}

export function AdminSettingsToggles({
  maintenanceEnabled,
  teamStatisticsEnabled,
  seasonReviewEnabled,
}: {
  maintenanceEnabled: boolean;
  teamStatisticsEnabled: boolean;
  seasonReviewEnabled: boolean;
}) {
  return (
    <section className="panel admin-settings-panel" id="site-settings">
      <div className="section-heading-row">
        <div><p className="eyebrow">Система</p><h2>Налаштування сайту</h2></div>
        <a className="button" href="/season-review?preview=1" target="_blank" rel="noreferrer">Переглянути підсумки</a>
      </div>
      <div className="admin-settings-list">
        <SettingToggle
          label="Технічні роботи"
          description="Закриває публічні сторінки для користувачів. Адмінка залишається доступною."
          enabled={maintenanceEnabled}
          action={setMaintenanceModeAction}
          icon={<Wrench size={20} />}
          confirmEnable="Увімкнути технічні роботи? Публічні сторінки стануть недоступними для користувачів."
        />
        <SettingToggle
          label="Статистика публічних команд"
          description="Показує розширену статистику на індивідуальних сторінках команд."
          enabled={teamStatisticsEnabled}
          action={setPublicTeamStatisticsVisibilityAction}
          icon={<BarChart3 size={20} />}
        />
        <SettingToggle
          label="Підсумки турніру"
          description="Замінює головну сторінку фінальними підсумками турніру."
          enabled={seasonReviewEnabled}
          action={setSeasonReviewVisibilityAction}
          icon={<Trophy size={20} />}
        />
      </div>
    </section>
  );
}

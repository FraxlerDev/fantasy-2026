"use client";

import { Check, Share2, Users } from "lucide-react";
import { useState } from "react";

const siteUrl = "https://fantasy.fraxler.site";

export function InviteFriendsBanner() {
  const [copied, setCopied] = useState(false);

  async function inviteFriends() {
    const shareData = {
      title: "Фентезі до ЧС-2026",
      text: "Приєднуйся до українського Фентезі-турніру до ЧС-2026 і збирай свою команду!",
      url: siteUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <aside className="home-invite-banner">
      <span className="home-invite-icon" aria-hidden="true">
        <Users size={22} />
      </span>
      <strong>
        Сьогодні стартує ЧС-2026 і наш Фентезі-турнір. Встигни запросити друзів до дедлайну о 20:30!
      </strong>
      <button className="button home-invite-button" type="button" onClick={inviteFriends}>
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        {copied ? "Посилання скопійовано" : "Запросити"}
      </button>
    </aside>
  );
}

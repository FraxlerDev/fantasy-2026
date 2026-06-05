"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareSquadButton({ teamId }: { teamId: string }) {
  const [copied, setCopied] = useState(false);

  async function copyTeamLink() {
    await navigator.clipboard.writeText(`https://fantasy.fraxler.site/teams/${teamId}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <span className="share-squad-control">
      <button
        className="button icon-only share-squad-button"
        type="button"
        onClick={copyTeamLink}
        aria-label="Поділитися своїм складом із друзями"
      >
        <Share2 size={19} />
      </button>
      <span className="share-squad-tooltip" role="status">
        {copied ? "Посилання скопійовано" : "Поділися своїм складом із друзями"}
      </span>
    </span>
  );
}

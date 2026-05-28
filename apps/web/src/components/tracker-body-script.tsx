"use client";

import { useEffect } from "react";

const TRACKER_SRC = "https://views.fraxler.site/tracker.js";

export function TrackerBodyScript() {
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TRACKER_SRC}"]`);

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = TRACKER_SRC;
    document.body.appendChild(script);
  }, []);

  return null;
}

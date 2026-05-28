"use client";

import { useEffect } from "react";

export function DevtoolsVisibility({ isAdmin }: { isAdmin: boolean }) {
  useEffect(() => {
    if (isAdmin) {
      return;
    }

    function hideNextDevtoolsIndicator() {
      document.querySelectorAll("nextjs-portal").forEach((portal) => {
        const shadowRoot = (portal as HTMLElement).shadowRoot;

        if (!shadowRoot) {
          return;
        }

        shadowRoot
          .querySelectorAll<HTMLElement>(
            [
              "#data-devtools-indicator",
              ".dev-tools-indicator-menu",
              ".dev-tools-indicator-issue-count",
              ".dev-tools-indicator-issue-count-indicator",
              "[data-nextjs-devtools-button]",
              "[data-testid='devtools-indicator']",
            ].join(", "),
          )
          .forEach((element) => {
            element.style.display = "none";
            element.style.pointerEvents = "none";
          });
      });
    }

    hideNextDevtoolsIndicator();

    const observer = new MutationObserver(hideNextDevtoolsIndicator);
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = window.setInterval(hideNextDevtoolsIndicator, 1000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [isAdmin]);

  return null;
}

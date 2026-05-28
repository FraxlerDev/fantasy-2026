"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text, label = "Скопіювати" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button className="button" type="button" onClick={copy}>
      <Copy size={18} />
      {copied ? "Скопійовано" : label}
    </button>
  );
}

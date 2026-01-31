"use client";

import { useLanguage } from "@/contexts/language-context";

export function UsageCard() {
  const { t } = useLanguage();
  return (
    <div
      className="flex flex-col"
      style={{
        border: "var(--border-thick)",
        background: "var(--paper)",
      }}
    >
      <div
        className="border-b-[length:3px] border-b-[var(--ink)] bg-[var(--ink)] p-[var(--space-sm)] text-[var(--paper)] uppercase"
        style={{ fontFamily: "var(--font-dela), cursive" }}
      >
        {t("account.usage.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        <div className="mb-[var(--space-sm)] flex justify-between font-bold">
          <span>{t("account.usage.calls")}</span>
          <span>65%</span>
        </div>
        <div
          className="relative mb-[var(--space-sm)] flex h-10 border"
          style={{
            borderWidth: "1.5px",
            borderColor: "var(--ink)",
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,56,168,0.1) 5px, rgba(0,56,168,0.1) 10px)",
          }}
        >
          <div className="h-full bg-[var(--ink)]" style={{ width: "65%" }} />
        </div>
        <div className="text-[0.8rem] leading-snug opacity-80">
          {t("account.usage.cycleResets")}
          <br />
          {t("account.usage.peakReached")}
        </div>
      </div>
    </div>
  );
}

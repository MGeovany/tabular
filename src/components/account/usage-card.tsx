"use client";

import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

export function UsageCard() {
  const { t } = useLanguage();
  const { apiUser } = useAuth();
  const used = apiUser?.conversions_used ?? 0;
  const limit = apiUser?.conversions_limit ?? 0;
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <div className="border-ink bg-paper flex flex-col border-[3px]">
      <div className="font-dela border-ink bg-ink text-paper border-b-[3px] p-[var(--space-sm)] uppercase">
        {t("account.usage.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        <div className="mb-[var(--space-sm)] flex justify-between font-bold">
          <span>{t("account.usage.calls")}</span>
          <span>
            {used.toLocaleString()} / {limit > 0 ? limit.toLocaleString() : "—"}
          </span>
        </div>
        <div className="border-ink relative mb-[var(--space-sm)] flex h-10 border-[1.5px] [background:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,56,168,0.1)_5px,rgba(0,56,168,0.1)_10px)]">
          <div className="bg-ink h-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[0.8rem] leading-snug opacity-80">
          {t("account.usage.cycleResets")}
          {t("account.usage.peakReached") && (
            <>
              <br />
              {t("account.usage.peakReached")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

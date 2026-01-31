"use client";

import { useLanguage } from "@/contexts/language-context";

export default function HistoryPage() {
  const { t } = useLanguage();
  return (
    <section className="flex flex-1 flex-col gap-[var(--space-md)]">
      <h2 className="text-lg uppercase" style={{ fontFamily: "var(--font-dela), cursive" }}>
        {t("history.title")}
      </h2>
      <p className="text-sm opacity-80">{t("history.comingSoon")}</p>
    </section>
  );
}

"use client";

import { useLanguage } from "@/contexts/language-context";

export function HeroAccount() {
  const { t } = useLanguage();
  return (
    <section
      className="relative flex items-center gap-[var(--space-md)] p-[var(--space-md)]"
      style={{
        border: "var(--border-thick)",
        background: "var(--paper)",
      }}
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(var(--ink) 15%, transparent 15%)",
          backgroundPosition: "0 0",
          backgroundSize: "6px 6px",
        }}
      />
      <div
        className="flex h-[120px] w-[120px] shrink-0 items-center justify-center text-4xl"
        style={{
          border: "var(--border-thick)",
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "var(--font-dela), cursive",
        }}
      >
        JD
      </div>
      <div className="relative">
        <h1 className="text-2xl uppercase" style={{ fontFamily: "var(--font-dela), cursive" }}>
          JUAN DELGADO
        </h1>
        <span
          className="mt-2 inline-block px-3 py-1 text-sm font-bold"
          style={{
            border: "1.5px solid var(--ink)",
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          {t("account.hero.membership")}
        </span>
        <div className="mt-2.5 font-bold">ID: 8829-TAB-24</div>
      </div>
    </section>
  );
}

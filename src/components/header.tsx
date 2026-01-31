"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const USER_NAME = "Juan Delgado";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const displayLang = language === "en" ? "EN" : "ES";

  return (
    <header
      className="z-10 flex items-center justify-between bg-[var(--paper)] px-[var(--space-md)]"
      style={{ gridColumn: "1 / -1", borderBottom: "var(--border-thick)" }}
    >
      <div
        className="flex items-center gap-3 text-2xl tracking-tight uppercase"
        style={{ fontFamily: "var(--font-dela), cursive" }}
      >
        <div className="relative h-8 w-8 rounded-full border-[length:3px] border-[var(--ink)] bg-[var(--ink)]">
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--paper)]" />
        </div>
        <span>Tabular</span>
      </div>
      <div className="flex items-center gap-[var(--space-md)] text-sm font-bold tracking-wider uppercase">
        <span className="uppercase" style={{ fontFamily: "var(--font-dela), cursive" }}>
          {USER_NAME}
        </span>

        <button
          type="button"
          className="cursor-pointer"
          onClick={toggleLanguage}
          title={language === "en" ? "Cambiar a español" : "Switch to English"}
        >
          [ {displayLang} ]
        </button>
      </div>
    </header>
  );
}

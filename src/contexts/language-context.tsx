"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getNested } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

type LanguageContextValue = {
  language: Locale;
  setLanguage: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "tabular-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((locale: Locale) => {
    setLanguageState(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = translations[language];
      return getNested(dict as object, key);
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

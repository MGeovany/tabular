"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type NavigationContextValue = {
  setNavigatingTo: (href: string | null) => void;
  navigatingToHref: string | null;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigatingToHref, setNavigatingToHref] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setNavigatingToHref(null);
  }, [pathname]);

  const setNavigatingToStable = useCallback((href: string | null) => {
    setNavigatingToHref(href);
  }, []);

  return (
    <NavigationContext.Provider
      value={{ setNavigatingTo: setNavigatingToStable, navigatingToHref }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  return ctx;
}

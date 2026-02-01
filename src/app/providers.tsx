"use client";

import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "tabular border-ink bg-paper text-ink border-[2px] font-mono shadow-[3px_3px_0_var(--ink)]",
          }}
        />
      </LanguageProvider>
    </AuthProvider>
  );
}

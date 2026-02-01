"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, signOut, apiUser } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const displayLang = language === "en" ? "EN" : "ES";

  // Microsoft (Azure) OAuth: prefer display name from provider, then email
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    apiUser?.email ??
    user?.email ??
    (user ? "User" : null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      // AuthProvider stores the error; navigation will still proceed.
    }
    router.replace("/");
  };

  return (
    <header className="border-ink bg-paper z-10 col-span-full flex items-center justify-between border-b-[3px] px-[var(--space-md)]">
      <Link
        href="/dashboard"
        className="font-dela flex items-center gap-3 text-2xl tracking-tight uppercase"
      >
        <span>Tabularis</span>
      </Link>
      <div className="flex items-center gap-[var(--space-md)] text-sm font-bold tracking-wider uppercase">
        {!loading && (
          <>
            {displayName ? (
              <>
                <span className="font-dela uppercase">{displayName}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="border-ink bg-paper rounded border-[1.5px] px-2 py-1 text-xs uppercase"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="border-ink bg-ink text-paper rounded border-[1.5px] px-3 py-1.5 text-xs uppercase"
              >
                Login
              </Link>
            )}
          </>
        )}

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

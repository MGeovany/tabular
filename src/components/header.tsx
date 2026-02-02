"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

type HeaderProps = {
  onMenuClick?: () => void;
  mobileMenuOpen?: boolean;
};

export function Header({ onMenuClick, mobileMenuOpen = false }: HeaderProps) {
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
    <header className="border-ink bg-paper z-10 col-span-full flex items-center justify-between border-b-[3px] px-4 md:px-[var(--space-md)]">
      <div className="flex min-w-0 items-center">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="border-ink bg-paper mr-2 inline-flex items-center justify-center rounded border-[1.5px] p-2 md:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
        <Link
          href="/"
          className="font-dela flex min-w-0 items-center gap-2 text-xl tracking-tight uppercase md:gap-3 md:text-3xl"
        >
          <Image
            src="/favicon.png"
            alt="tabularis logo"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"
          />
          <span className="truncate">Tabularis</span>
        </Link>
      </div>
      <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase md:gap-[var(--space-md)] md:text-sm">
        {!loading && (
          <>
            {displayName ? (
              <>
                <span className="font-dela hidden max-w-[14ch] truncate uppercase sm:inline">
                  {displayName}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="border-ink bg-paper rounded border-[1.5px] px-2 py-1 text-[0.7rem] uppercase md:text-xs"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="border-ink bg-ink text-paper rounded border-[1.5px] px-3 py-1.5 text-[0.7rem] uppercase md:text-xs"
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

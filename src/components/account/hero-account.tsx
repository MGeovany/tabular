"use client";

import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";

function getInitials(name: string | null | undefined): string {
  if (!name || !name.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2);
  }
  return name.slice(0, 2).toUpperCase();
}

export function HeroAccount() {
  const { t } = useLanguage();
  const { user, apiUser } = useAuth();
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    apiUser?.email ??
    user?.email ??
    null;
  const initials = getInitials(displayName ?? undefined);

  return (
    <section className="border-ink bg-paper relative flex items-center gap-[var(--space-md)] border-[3px] p-[var(--space-md)]">
      <div className="absolute inset-0 [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] [background-position:0_0] opacity-15" />
      <div className="font-dela border-ink bg-ink text-paper flex h-[120px] w-[120px] shrink-0 items-center justify-center border-[3px] text-4xl">
        {initials}
      </div>
      <div className="relative">
        <h1 className="font-dela text-2xl uppercase">
          {displayName ? displayName.toUpperCase() : "—"}
        </h1>
        <span className="border-ink bg-ink text-paper mt-2 inline-block border-[1.5px] px-3 py-1 text-sm font-bold">
          {t("account.hero.membership")}
        </span>
        {apiUser?.id && (
          <div className="mt-2.5 font-bold">ID: {apiUser.id.slice(0, 8).toUpperCase()}</div>
        )}
      </div>
    </section>
  );
}

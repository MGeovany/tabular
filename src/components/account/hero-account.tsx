"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { PricingSection } from "@/components/pricing";

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
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    apiUser?.email ??
    user?.email ??
    null;
  const initials = getInitials(displayName ?? undefined);
  const plan = apiUser?.plan?.toUpperCase();
  const membershipLabel =
    plan === "PRO" ? t("account.hero.membership") : plan ? t("account.hero.membershipFree") : null;
  const isFree = plan === "FREE";

  return (
    <>
      <section className="border-ink bg-paper relative flex items-center gap-[var(--space-md)] border-[3px] p-[var(--space-md)]">
        <div className="absolute inset-0 [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] [background-position:0_0] opacity-15" />
        <div className="font-dela border-ink bg-ink text-paper flex h-[120px] w-[120px] shrink-0 items-center justify-center border-[3px] text-4xl">
          {initials}
        </div>
        <div className="relative">
          <h1 className="font-dela text-2xl uppercase">
            {displayName ? displayName.toUpperCase() : "—"}
          </h1>
          {membershipLabel && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="border-ink bg-ink text-paper inline-block border-[1.5px] px-3 py-1 text-sm font-bold">
                {membershipLabel}
              </span>
              {isFree && (
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(true)}
                  className="border-ink hover:bg-ink hover:text-paper text-ink inline-block border-[1.5px] px-3 py-1 text-sm font-bold uppercase transition-colors"
                >
                  {t("account.hero.upgradeToPro")}
                </button>
              )}
            </div>
          )}
          {apiUser?.id && (
            <div className="mt-2.5 font-bold">ID: {apiUser.id.slice(0, 8).toUpperCase()}</div>
          )}
        </div>
      </section>

      {pricingModalOpen && (
        <div
          className="border-ink bg-ink/20 fixed inset-0 z-50 flex items-start justify-center overflow-y-auto border-[3px] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pricing-modal-title"
          onClick={() => setPricingModalOpen(false)}
        >
          <div
            className="bg-paper border-ink relative my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto border-[3px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-ink bg-paper sticky top-0 z-10 flex items-center justify-between border-b-[3px] px-6 py-4">
              <h2 id="pricing-modal-title" className="font-dela text-xl font-black uppercase">
                {t("pricing.title")}
              </h2>
              <button
                type="button"
                onClick={() => setPricingModalOpen(false)}
                className="border-ink hover:bg-ink hover:text-paper flex h-10 w-10 items-center justify-center border-[3px] font-bold uppercase transition-colors"
                aria-label={t("common.close")}
              >
                ×
              </button>
            </div>
            <PricingSection currentPlan={apiUser?.plan} />
          </div>
        </div>
      )}
    </>
  );
}

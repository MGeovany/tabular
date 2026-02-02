"use client";

import { HeroAccount } from "@/components/account/hero-account";
import { UsageCard } from "@/components/account/usage-card";
import { TeamCard } from "@/components/account/team-card";
import { BillingHistoryCard } from "@/components/account/billing-history-card";

export default function AccountPage() {
  return (
    <div className="mt-auto flex flex-1 flex-col gap-[var(--space-md)]">
      <HeroAccount />
      <div className="grid grid-cols-1 gap-[var(--space-md)] lg:grid-cols-[1.5fr_1fr]">
        <UsageCard />
        <TeamCard />
        <BillingHistoryCard />
      </div>

      <div className="border-ink mt-auto h-5 border-t-[3px] [background:repeating-linear-gradient(45deg,var(--ink),var(--ink)_2px,var(--paper)_2px,var(--paper)_6px)]" />
    </div>
  );
}

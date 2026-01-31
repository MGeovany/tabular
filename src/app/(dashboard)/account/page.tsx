"use client";

import { HeroAccount } from "@/components/account/hero-account";
import { UsageCard } from "@/components/account/usage-card";
import { TeamCard } from "@/components/account/team-card";
import { BillingHistoryCard } from "@/components/account/billing-history-card";

export default function AccountPage() {
  return (
    <div className="mt-auto flex flex-1 flex-col gap-[var(--space-md)]">
      <HeroAccount />
      <div className="grid gap-[var(--space-md)]" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <UsageCard />
        <TeamCard />
        <BillingHistoryCard />
      </div>
      <div
        className="mt-auto h-5"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--ink), var(--ink) 2px, var(--paper) 2px, var(--paper) 6px)",
          borderTop: "var(--border-thick)",
        }}
      />
    </div>
  );
}

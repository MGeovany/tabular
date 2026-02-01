"use client";

import { useAuth } from "@/contexts/auth-context";
import { LandingHeader } from "@/components/landing";
import { PricingSection } from "@/components/pricing";

export default function PricingPage() {
  const { apiUser } = useAuth();

  return (
    <div className="tabular bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto flex min-h-screen max-w-[1440px] flex-col border-[3px]">
        <LandingHeader />
        <main className="flex flex-1 flex-col">
          <PricingSection currentPlan={apiUser?.plan} />
        </main>
      </div>
    </div>
  );
}

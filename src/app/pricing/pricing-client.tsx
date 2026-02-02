"use client";

import { useAuth } from "@/contexts/auth-context";
import { PricingSection } from "@/components/pricing";

export function PricingClient({ fromAddMember }: { fromAddMember: boolean }) {
  const { apiUser } = useAuth();
  return <PricingSection currentPlan={apiUser?.plan} fromAddMember={fromAddMember} />;
}

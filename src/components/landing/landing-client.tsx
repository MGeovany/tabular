"use client";

import { useAuth } from "@/contexts/auth-context";
import { LandingHeader, LandingHero, LandingFeatures } from "@/components/landing";

export function LandingClient() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <>
        <LandingHeader />
        <div className="bg-paper flex min-h-[60vh] items-center justify-center font-mono">
          <p className="text-ink text-sm font-bold uppercase">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
    </>
  );
}

import { LandingHeader } from "@/components/landing";
import { PricingClient } from "./pricing-client";

type PricingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const sp = (await searchParams) ?? {};
  const addMember = sp.addMember;
  const fromAddMember = (Array.isArray(addMember) ? addMember[0] : addMember) === "1";

  return (
    <div className="tabular bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto flex min-h-screen max-w-[1440px] flex-col border-[3px]">
        <LandingHeader />
        <main className="flex flex-1 flex-col">
          <PricingClient fromAddMember={fromAddMember} />
        </main>
      </div>
    </div>
  );
}

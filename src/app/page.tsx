import { LandingClient, LandingFooter } from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="tabular bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto flex min-h-screen max-w-[1440px] flex-col border-[3px]">
        <LandingClient />
        <LandingFooter />
      </div>
    </div>
  );
}

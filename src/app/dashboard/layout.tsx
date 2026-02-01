"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { useAuth } from "@/contexts/auth-context";
import { NavigationProvider } from "@/contexts/navigation-context";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Close mobile nav on route changes.
    queueMicrotask(() => setMobileNavOpen(false));
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="bg-paper flex min-h-screen items-center justify-center font-mono">
        <p className="text-ink text-sm font-bold uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="tabular border-ink bg-paper mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col border-[3px]">
      <div className="border-ink grid min-h-[100dvh] w-full grid-cols-1 grid-rows-[64px_1fr] border-[3px] md:grid-cols-[280px_1fr] md:grid-rows-[80px_1fr]">
        <Header onMenuClick={() => setMobileNavOpen((v) => !v)} mobileMenuOpen={mobileNavOpen} />

        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="relative flex min-w-0 flex-col gap-[var(--space-md)] overflow-y-auto p-4 pb-24 md:p-[var(--space-md)] md:pb-[var(--space-md)]">
          <PageTransition>{children}</PageTransition>
          <div className="md:hidden">
            <MobileBottomNav />
          </div>
        </main>
      </div>

      <div className="md:hidden">
        <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
          <Sidebar />
        </MobileSidebar>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </NavigationProvider>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/contexts/auth-context";
import { NavigationProvider } from "@/contexts/navigation-context";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="bg-paper flex min-h-screen items-center justify-center font-mono">
        <p className="text-ink text-sm font-bold uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="tabular border-ink bg-paper mx-auto flex h-screen max-w-[1600px] flex-col border-[3px]">
      <div className="border-ink grid h-full w-full grid-cols-[280px_1fr] grid-rows-[80px_1fr] border-[3px]">
        <Header />
        <Sidebar />
        <main className="relative flex flex-col gap-[var(--space-md)] overflow-y-auto p-[var(--space-md)]">
          <PageTransition>{children}</PageTransition>
        </main>
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

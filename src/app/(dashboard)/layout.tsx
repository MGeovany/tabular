"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tabular mx-auto flex h-screen max-w-[1600px] flex-col border-[length:3px] border-[var(--ink)] bg-[var(--paper)]">
      <div
        className="grid h-full w-full grid-cols-[280px_1fr] grid-rows-[80px_1fr]"
        style={{ border: "var(--border-thick)" }}
      >
        <Header />
        <Sidebar />
        <main className="relative flex flex-col gap-[var(--space-md)] overflow-y-auto p-[var(--space-md)]">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { MicrosoftLogo } from "@/components/shared-icons/microsoft-logo";

export default function LoginPage() {
  const router = useRouter();
  const { user, signInWithMicrosoft, loading, error } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSignInWithMicrosoft = async () => {
    try {
      await signInWithMicrosoft();
    } catch {
      // Error already set in context
    }
  };

  return (
    <div className="tabular flex min-h-screen flex-col items-center justify-center bg-[var(--paper)] px-6 font-mono">
      <div className="w-full max-w-[360px]">
        <h1 className="font-dela mb-2 text-center text-xl font-semibold tracking-tight text-[var(--ink)]">
          Sign in
        </h1>
        <p className="mb-8 text-center text-sm text-[var(--ink)]/80">
          Use your Microsoft account to access Tabularis.
        </p>

        {error && (
          <p className="border-destructive/30 bg-destructive/10 text-destructive mb-4 rounded-md border px-3 py-2 font-mono text-sm">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSignInWithMicrosoft}
          disabled={loading}
          className="font-dela flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper)] px-5 py-4 text-sm font-semibold tracking-wide text-[var(--ink)] uppercase transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] disabled:opacity-50 disabled:hover:bg-[var(--paper)] disabled:hover:text-[var(--ink)]"
        >
          <MicrosoftLogo size={22} />
          {loading ? "Signing in…" : "Sign in with Microsoft"}
        </button>

        <Link
          href="/"
          className="font-dela mt-8 block text-center text-sm font-medium tracking-wide text-[var(--ink)]/70 uppercase transition-colors hover:text-[var(--ink)]"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}

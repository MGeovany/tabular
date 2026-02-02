"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function TeamCard() {
  const { t } = useLanguage();
  const members: { initials: string; name: string }[] = [];

  return (
    <div className="border-ink bg-paper flex flex-col border-[3px]">
      <div className="font-dela border-ink bg-ink text-paper border-b-[3px] p-[var(--space-sm)] uppercase">
        {t("account.team.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        {members.length === 0 ? (
          <p className="mb-4 text-sm opacity-80">No team members yet.</p>
        ) : (
          <div className="mb-4 grid grid-cols-2 gap-[var(--space-sm)]">
            {members.map((member, index) => (
              <div
                key={index}
                className="border-ink border-[1.5px] p-[var(--space-sm)] text-center"
              >
                <div className="border-ink mx-auto mb-2 flex h-10 w-10 items-center justify-center border-[1.5px] font-bold">
                  {member.initials}
                </div>
                <div className="text-[0.7rem] font-bold">{member.name}</div>
              </div>
            ))}
          </div>
        )}
        <Link
          href="/pricing?addMember=1"
          className="border-ink bg-ink text-paper hover:bg-paper hover:text-ink inline-block border-2 px-8 py-4 text-center text-base font-bold uppercase transition-colors"
        >
          {t("account.team.addMember")}
        </Link>
      </div>
    </div>
  );
}

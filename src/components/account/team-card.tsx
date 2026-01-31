"use client";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "../button";

export function TeamCard() {
  const { t } = useLanguage();
  const members: { initials: string; name: string }[] = [];

  const handleAddMember = () => {
    // TODO: invite flow
  };

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
        <Button onClick={handleAddMember}>{t("account.team.addMember")}</Button>
      </div>
    </div>
  );
}

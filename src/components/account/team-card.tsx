"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "../button";

const INITIAL_MEMBERS = [
  { initials: "AM", name: "A. MARTIN" },
  { initials: "SR", name: "S. RUIZ" },
];

export function TeamCard() {
  const { t } = useLanguage();
  const [members] = useState(INITIAL_MEMBERS);

  const handleAddMember = () => {
    console.log("Add member");
  };

  return (
    <div
      className="flex flex-col"
      style={{
        border: "var(--border-thick)",
        background: "var(--paper)",
      }}
    >
      <div
        className="border-b-[length:3px] border-b-[var(--ink)] bg-[var(--ink)] p-[var(--space-sm)] text-[var(--paper)] uppercase"
        style={{ fontFamily: "var(--font-dela), cursive" }}
      >
        {t("account.team.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        <div className="grid gap-[var(--space-sm)]" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {members.map((member, index) => (
            <div
              key={index}
              className="border border-[var(--ink)] p-[var(--space-sm)] text-center"
              style={{ borderWidth: "1.5px" }}
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center font-bold"
                style={{
                  border: "1.5px solid var(--ink)",
                }}
              >
                {member.initials}
              </div>
              <div className="text-[0.7rem] font-bold">{member.name}</div>
            </div>
          ))}
        </div>
        <Button onClick={handleAddMember}>{t("account.team.addMember")}</Button>
      </div>
    </div>
  );
}

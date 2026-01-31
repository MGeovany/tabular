"use client";

import { useLanguage } from "@/contexts/language-context";

const BILLING_DATA = [
  { date: "OCT 01 2024", ref: "INV-00982", amount: "$29.00 USD" },
  { date: "SEP 01 2024", ref: "INV-00871", amount: "$29.00 USD" },
  { date: "AUG 01 2024", ref: "INV-00754", amount: "$29.00 USD" },
];

export function BillingHistoryCard() {
  const { t } = useLanguage();
  const handleDownloadPDF = (ref: string) => {
    console.log(`Download receipt ${ref}`);
  };

  return (
    <div
      className="col-span-full flex flex-col"
      style={{
        border: "var(--border-thick)",
        background: "var(--paper)",
      }}
    >
      <div
        className="border-b-[length:3px] border-b-[var(--ink)] bg-[var(--ink)] p-[var(--space-sm)] text-[var(--paper)] uppercase"
        style={{ fontFamily: "var(--font-dela), cursive" }}
      >
        {t("account.billing.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        <div className="flex justify-between border-b-[length:3px] border-b-[var(--ink)] py-2 font-bold">
          <span>{t("account.billing.date")}</span>
          <span>{t("account.billing.reference")}</span>
          <span>{t("account.billing.amount")}</span>
          <span>{t("account.billing.receipt")}</span>
        </div>
        {BILLING_DATA.map((item, index) => (
          <div
            key={item.ref}
            className="flex justify-between py-2"
            style={{
              borderBottom: index < BILLING_DATA.length - 1 ? "var(--border-thin)" : "none",
            }}
          >
            <span>{item.date}</span>
            <span>{item.ref}</span>
            <span>{item.amount}</span>
            <button
              type="button"
              className="cursor-pointer underline"
              onClick={() => handleDownloadPDF(item.ref)}
            >
              PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useLanguage } from "@/contexts/language-context";

export function BillingHistoryCard() {
  const { t } = useLanguage();
  const items: { date: string; ref: string; amount: string }[] = [];

  const handleDownloadPDF = (ref: string) => {
    // TODO: download receipt
    void ref;
  };

  return (
    <div className="border-ink bg-paper col-span-full flex flex-col border-[3px]">
      <div className="font-dela border-ink bg-ink text-paper border-b-[3px] p-[var(--space-sm)] uppercase">
        {t("account.billing.title")}
      </div>
      <div className="p-[var(--space-sm)]">
        {items.length === 0 ? (
          <p className="py-4 text-sm opacity-80">No billing history yet.</p>
        ) : (
          <>
            <div className="border-ink flex justify-between border-b-[3px] py-2 font-bold">
              <span>{t("account.billing.date")}</span>
              <span>{t("account.billing.reference")}</span>
              <span>{t("account.billing.amount")}</span>
              <span>{t("account.billing.receipt")}</span>
            </div>
            {items.map((item, index) => (
              <div
                key={item.ref}
                className={`flex justify-between py-2 ${index < items.length - 1 ? "border-ink border-b border-b-[1.5px]" : ""}`}
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
          </>
        )}
      </div>
    </div>
  );
}

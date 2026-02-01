"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

type PricingSectionProps = {
  currentPlan?: string;
  id?: string;
};

function featureLines(value: string): string[] {
  return value.split("\n").filter(Boolean);
}

export function PricingSection({ currentPlan, id }: PricingSectionProps) {
  const { t } = useLanguage();
  const plan = currentPlan?.toUpperCase();
  const features = {
    free: featureLines(t("pricing.featureFree")),
    pro: featureLines(t("pricing.featurePro")),
    enterprise: featureLines(t("pricing.featureEnterprise")),
  };

  return (
    <section id={id} className="px-6 py-12 md:px-10">
      <div className="border-ink mb-6 border-b-[3px] pb-4">
        <h2 className="font-dela text-3xl font-black uppercase md:text-4xl">
          {t("pricing.title")}
        </h2>
        <p className="mt-2 text-sm opacity-80">{t("pricing.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-md)] md:grid-cols-3">
        {/* Free */}
        <article className="border-ink bg-paper flex flex-col border-[3px]">
          <div className="border-ink border-b-[3px] p-6">
            <h3 className="font-dela text-xl font-black uppercase">{t("pricing.free")}</h3>
            <div className="text-2.5xl mt-2 font-bold">
              $0
              <span className="text-[0.9rem] font-normal opacity-80"> {t("pricing.perMonth")}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <ul className="flex flex-col gap-4">
              {features.free.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.9rem]">
                  <span className="text-ink shrink-0 font-bold">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-ink border-t-[1.5px] p-6">
            {plan === "FREE" ? (
              <button
                type="button"
                disabled
                className="border-ink bg-ink/50 text-paper w-full cursor-not-allowed border-[3px] py-4 font-bold uppercase opacity-70"
              >
                {t("pricing.current")}
              </button>
            ) : (
              <Link
                href="/login"
                className="border-ink bg-ink text-paper flex w-full items-center justify-center border-[3px] py-4 font-bold uppercase transition-opacity hover:opacity-90"
              >
                {t("pricing.getStarted")}
              </Link>
            )}
          </div>
        </article>

        {/* PRO - featured */}
        <article className="border-ink bg-ink text-paper relative flex flex-col border-[3px] shadow-[8px_8px_0_var(--ink-dim)] md:-translate-x-1 md:-translate-y-1">
          <div className="border-paper border-b-[3px] p-6">
            <h3 className="font-dela text-xl font-black uppercase">{t("pricing.pro")}</h3>
            <div className="text-2.5xl mt-2 font-bold">
              $29
              <span className="text-[0.9rem] font-normal opacity-90"> {t("pricing.perMonth")}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <ul className="flex flex-col gap-4">
              {features.pro.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.9rem]">
                  <span className="shrink-0 font-bold">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-paper border-t-[1.5px] p-6">
            {plan === "PRO" ? (
              <button
                type="button"
                disabled
                className="border-paper bg-paper/50 text-ink w-full cursor-not-allowed border-[3px] py-4 font-bold uppercase opacity-70"
              >
                {t("pricing.current")}
              </button>
            ) : (
              <Link
                href="/login"
                className="border-paper bg-paper text-ink flex w-full items-center justify-center border-[3px] py-4 font-bold uppercase transition-opacity hover:opacity-90"
              >
                {t("pricing.selectPro")}
              </Link>
            )}
          </div>
        </article>

        {/* Enterprise */}
        <article className="border-ink bg-paper flex flex-col border-[3px]">
          <div className="border-ink border-b-[3px] p-6">
            <h3 className="font-dela text-xl font-black uppercase">{t("pricing.enterprise")}</h3>
            <div className="text-2.5xl mt-2 font-bold">
              $99
              <span className="text-[0.9rem] font-normal opacity-80"> {t("pricing.perMonth")}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <ul className="flex flex-col gap-4">
              {features.enterprise.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.9rem]">
                  <span className="text-ink shrink-0 font-bold">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-ink border-t-[1.5px] p-6">
            {plan === "ENTERPRISE" ? (
              <button
                type="button"
                disabled
                className="border-ink bg-ink/50 text-paper w-full cursor-not-allowed border-[3px] py-4 font-bold uppercase opacity-70"
              >
                {t("pricing.current")}
              </button>
            ) : (
              <a
                href="mailto:marlon.castro@thefndrs.com"
                className="border-ink bg-ink text-paper flex w-full items-center justify-center border-[3px] py-4 font-bold uppercase transition-opacity hover:opacity-90"
              >
                {t("pricing.contact")}
              </a>
            )}
          </div>
        </article>
      </div>

      {/* Comparison table */}
      <div className="border-ink mt-10 w-full border-[3px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-ink bg-ink/5 font-dela px-4 py-3 text-left text-xs font-bold uppercase">
                {t("pricing.comparison.feature")}
              </th>
              <th className="border-ink bg-ink/5 font-dela border-l-[1.5px] px-4 py-3 text-left text-xs font-bold uppercase">
                {t("pricing.comparison.free")}
              </th>
              <th className="border-ink bg-ink/5 font-dela border-l-[1.5px] px-4 py-3 text-left text-xs font-bold uppercase">
                {t("pricing.comparison.pro")}
              </th>
              <th className="border-ink bg-ink/5 font-dela border-l-[1.5px] px-4 py-3 text-left text-xs font-bold uppercase">
                {t("pricing.comparison.enterprise")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-ink border-t-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.monthlyLimit")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.monthlyLimitFree")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.monthlyLimitPro")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.monthlyLimitEnt")}
              </td>
            </tr>
            <tr>
              <td className="border-ink border-t-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.advancedExport")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.no")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.yes")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.yes")}
              </td>
            </tr>
            <tr>
              <td className="border-ink border-t-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.bulkExport")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.bulkExportFree")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.bulkExportPro")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.bulkExportEnt")}
              </td>
            </tr>
            <tr>
              <td className="border-ink border-t-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.jsonFormat")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.no")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.yes")}
              </td>
              <td className="border-ink border-t-[1.5px] border-l-[1.5px] px-4 py-3 text-sm">
                {t("pricing.comparison.yes")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

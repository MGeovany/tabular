"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { NavItem } from "./nav-item";

const navItemIds = [
  { id: "CONVERT", key: "nav.convert", href: "/dashboard" },
  { id: "HISTORY", key: "nav.history", href: "/dashboard/history" },
  { id: "ACCOUNT", key: "nav.account", href: "/dashboard/account" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const getActive = (item: (typeof navItemIds)[0]) => {
    if (item.href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="border-ink bg-paper flex flex-col gap-[var(--space-lg)] border-r-[3px] p-[var(--space-md)]">
      <nav>
        <ul className="flex list-none flex-col gap-0">
          {navItemIds.map((item) => (
            <NavItem key={item.id} active={getActive(item)} href={item.href}>
              {t(item.key)}
            </NavItem>
          ))}
        </ul>
      </nav>

      <div className="border-ink relative mt-auto border-[1.5px] p-[var(--space-sm)] text-[0.75rem]">
        <div className="bg-paper absolute top-[-10px] left-2.5 px-1.5 font-bold">
          {t("sidebar.plan")}
        </div>
        <div className="mb-2 flex justify-between">
          <span>{t("sidebar.free")}</span>
          <span>3/10</span>
        </div>
        <div className="border-ink h-2 w-full border-[1.5px] p-px">
          <div className="bg-ink h-full w-[30%] [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] opacity-100" />
        </div>
      </div>
    </aside>
  );
}

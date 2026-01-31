"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { NavItem } from "./nav-item";

const navItemIds = [
  { id: "CONVERT", key: "nav.convert", href: "/" },
  { id: "HISTORY", key: "nav.history", href: "/history" },
  { id: "ACCOUNT", key: "nav.account", href: "/account" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const getActive = (item: (typeof navItemIds)[0]) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="flex flex-col gap-[var(--space-lg)] border-r-[length:3px] border-r-[var(--ink)] bg-[var(--paper)] p-[var(--space-md)]">
      <nav>
        <ul className="flex list-none flex-col gap-0">
          {navItemIds.map((item) => (
            <NavItem key={item.id} active={getActive(item)} href={item.href}>
              {t(item.key)}
            </NavItem>
          ))}
        </ul>
      </nav>

      <div
        className="relative mt-auto border border-[var(--ink)] p-[var(--space-sm)] text-[0.75rem]"
        style={{ borderWidth: "1.5px" }}
      >
        <div className="absolute top-[-10px] left-2.5 bg-[var(--paper)] px-1.5 font-bold">
          {t("sidebar.plan")}
        </div>
        <div className="mb-2 flex justify-between">
          <span>{t("sidebar.free")}</span>
          <span>3/10</span>
        </div>
        <div
          className="h-2 w-full border p-px"
          style={{ borderWidth: "1.5px", borderColor: "var(--ink)" }}
        >
          <div
            className="h-full w-[30%] bg-[var(--ink)] opacity-100"
            style={{
              backgroundImage: "radial-gradient(var(--ink) 15%, transparent 15%)",
              backgroundSize: "6px 6px",
            }}
          />
        </div>
      </div>
    </aside>
  );
}

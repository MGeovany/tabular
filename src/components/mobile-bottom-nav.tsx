"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useNavigation } from "@/contexts/navigation-context";

const items = [
  { href: "/dashboard", key: "nav.convert" },
  { href: "/dashboard/history", key: "nav.history" },
  { href: "/dashboard/account", key: "nav.account" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const nav = useNavigation();

  return (
    <nav className="border-ink bg-paper sticky bottom-0 z-10 mt-6 border-t-[3px]">
      <div className="flex items-stretch">
        {items.map((it) => {
          const active =
            it.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(it.href);
          const navigating = nav?.navigatingToHref === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              prefetch
              onMouseDown={() => nav?.setNavigatingTo(it.href)}
              className={`border-ink flex flex-1 items-center justify-center gap-2 border-r-[1.5px] px-3 py-3 text-[0.7rem] font-bold tracking-wider uppercase transition-colors ${
                active ? "bg-ink text-paper" : "text-ink bg-paper"
              }`}
            >
              {navigating ? (
                <span
                  className="inline-block h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-t-transparent"
                  aria-hidden
                />
              ) : null}
              {t(it.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

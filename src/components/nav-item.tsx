"use client";

import Link from "next/link";
import { useState } from "react";
import { useNavigation } from "@/contexts/navigation-context";

interface NavItemProps {
  children: React.ReactNode;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

export function NavItem({ children, active, href, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const nav = useNavigation();

  const style = {
    borderBottom: "var(--border-thin)",
    opacity: active ? 1 : 0.7,
    paddingLeft: active || isHovered ? "10px" : 0,
    fontWeight: active || isHovered ? 700 : 400,
  };

  const isNavigatingToThis = Boolean(href && nav?.navigatingToHref === href);

  const content = (
    <>
      {active && !isNavigatingToThis && "→ "}
      {isNavigatingToThis && (
        <span
          className="border-ink inline-block h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <li
        className="transition-all duration-200 ease-in-out"
        style={{ borderBottom: style.borderBottom }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={href}
          prefetch
          className="flex w-full items-center gap-2 py-[var(--space-sm)] transition-all duration-200 ease-in-out"
          style={{
            opacity: style.opacity,
            paddingLeft: style.paddingLeft,
            fontWeight: style.fontWeight,
          }}
          onMouseDown={() => nav?.setNavigatingTo(href)}
        >
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="flex cursor-pointer items-center gap-2 py-[var(--space-sm)] transition-all duration-200 ease-in-out"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {content}
    </li>
  );
}

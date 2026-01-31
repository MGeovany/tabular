"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItemProps {
  children: React.ReactNode;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

export function NavItem({ children, active, href, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    borderBottom: "var(--border-thin)",
    opacity: active ? 1 : 0.7,
    paddingLeft: active || isHovered ? "10px" : 0,
    fontWeight: active || isHovered ? 700 : 400,
  };

  const content = (
    <>
      {active && "→ "}
      {children}
    </>
  );

  if (href) {
    return (
      <li
        className="flex cursor-pointer items-center gap-2 py-[var(--space-sm)] transition-all duration-200 ease-in-out"
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="flex items-center gap-2">
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

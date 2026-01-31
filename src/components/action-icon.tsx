"use client";

import { useState } from "react";

interface ActionIconProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function ActionIcon({ children, onClick }: ActionIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`cursor-pointer text-right font-bold ${isHovered ? "underline" : "no-underline"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}

"use client";

import { useState } from "react";

interface FileRowProps {
  id: string;
  name: string;
  date: string;
  size: string;
  status: React.ReactNode;
  isHeader?: boolean;
  actions?: React.ReactNode;
}

export function FileRow({ id, name, date, size, status, isHeader = false, actions }: FileRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasActions = actions != null;
  const gridCols = hasActions
    ? "grid-cols-[60px_2fr_1fr_1fr_100px_72px]"
    : "grid-cols-[60px_2fr_1fr_1fr_100px]";

  return (
    <div
      className={`border-ink grid ${gridCols} items-center border-b-[1.5px] px-[var(--space-sm)] py-[var(--space-sm)] text-[0.9rem] transition-colors duration-200 ${
        isHeader ? "bg-ink text-paper" : isHovered ? "bg-ink/5 text-ink" : "text-ink bg-transparent"
      }`}
      onMouseEnter={() => !isHeader && setIsHovered(true)}
      onMouseLeave={() => !isHeader && setIsHovered(false)}
    >
      <span className={`font-bold ${isHeader ? "opacity-100" : "opacity-50"}`}>{id}</span>
      <span className="font-bold uppercase">{name}</span>
      <span className={`text-[0.8rem] ${isHeader ? "opacity-100" : "opacity-80"}`}>{date}</span>
      <span className={`text-[0.8rem] ${isHeader ? "opacity-100" : "opacity-80"}`}>{size}</span>
      <span>{status}</span>
      {hasActions && <span className="flex justify-end">{actions}</span>}
    </div>
  );
}

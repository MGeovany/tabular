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
    ? "grid-cols-[72px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,80px)_minmax(0,100px)_72px]"
    : "grid-cols-[72px_minmax(0,2fr)_minmax(0,1fr)_minmax(0,80px)_minmax(0,100px)]";

  const cellClass = "min-w-0 overflow-hidden";

  return (
    <>
      {/* Mobile layout */}
      {!isHeader && (
        <div
          className={`border-ink border-b-[1.5px] px-4 py-4 transition-colors duration-200 md:hidden ${
            isHovered ? "bg-ink/5 text-ink" : "text-ink bg-transparent"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-bold uppercase" title={name}>
                {name}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.75rem] opacity-80">
                <span className="opacity-70">{id}</span>
                <span>{date}</span>
                <span>{size}</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              {status}
              {hasActions && <div className="mt-2 flex justify-end">{actions}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Desktop layout */}
      <div
        className={`border-ink hidden md:grid ${gridCols} items-center border-b-[1.5px] px-[var(--space-sm)] py-[var(--space-sm)] text-[0.9rem] transition-colors duration-200 ${
          isHeader
            ? "bg-ink text-paper"
            : isHovered
              ? "bg-ink/5 text-ink"
              : "text-ink bg-transparent"
        }`}
        onMouseEnter={() => !isHeader && setIsHovered(true)}
        onMouseLeave={() => !isHeader && setIsHovered(false)}
      >
        <span className={`${cellClass} font-bold ${isHeader ? "opacity-100" : "opacity-50"}`}>
          {id}
        </span>
        <span
          className={`${cellClass} truncate font-bold uppercase`}
          title={!isHeader ? name : undefined}
        >
          {name}
        </span>
        <span
          className={`${cellClass} truncate text-[0.8rem] ${isHeader ? "opacity-100" : "opacity-80"}`}
        >
          {date}
        </span>
        <span className={`${cellClass} text-[0.8rem] ${isHeader ? "opacity-100" : "opacity-80"}`}>
          {size}
        </span>
        <span className={`${cellClass} flex items-center justify-end`}>{status}</span>
        {hasActions && <span className={`${cellClass} flex justify-end`}>{actions}</span>}
      </div>
    </>
  );
}

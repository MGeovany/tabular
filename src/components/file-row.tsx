"use client";

import { useState } from "react";

interface FileRowProps {
  id: string;
  name: string;
  date: string;
  size: string;
  status: React.ReactNode;
  isHeader?: boolean;
}

export function FileRow({ id, name, date, size, status, isHeader = false }: FileRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="grid items-center px-[var(--space-sm)] py-[var(--space-sm)] text-[0.9rem] transition-colors duration-200"
      style={{
        gridTemplateColumns: "60px 2fr 1fr 1fr 100px",
        borderBottom: "var(--border-thin)",
        background: isHeader ? "var(--ink)" : isHovered ? "rgba(0, 56, 168, 0.05)" : "transparent",
        color: isHeader ? "var(--paper)" : "var(--ink)",
      }}
      onMouseEnter={() => !isHeader && setIsHovered(true)}
      onMouseLeave={() => !isHeader && setIsHovered(false)}
    >
      <span style={{ fontWeight: 700, opacity: isHeader ? 1 : 0.5 }}>{id}</span>
      <span className="font-bold uppercase">{name}</span>
      <span className="text-[0.8rem]" style={{ opacity: isHeader ? 1 : 0.8 }}>
        {date}
      </span>
      <span className="text-[0.8rem]" style={{ opacity: isHeader ? 1 : 0.8 }}>
        {size}
      </span>
      <span>{status}</span>
    </div>
  );
}

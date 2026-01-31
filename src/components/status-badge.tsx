"use client";

interface StatusBadgeProps {
  children: React.ReactNode;
  done?: boolean;
}

export function StatusBadge({ children, done = false }: StatusBadgeProps) {
  return (
    <span
      className="inline-block border border-[length:1.5px] border-[var(--ink)] px-2 py-1 text-center text-[0.7rem] font-bold uppercase"
      style={{
        background: done ? "var(--ink)" : "transparent",
        color: done ? "var(--paper)" : "var(--ink)",
      }}
    >
      {children}
    </span>
  );
}

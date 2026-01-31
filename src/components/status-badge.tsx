"use client";

interface StatusBadgeProps {
  children: React.ReactNode;
  done?: boolean;
}

export function StatusBadge({ children, done = false }: StatusBadgeProps) {
  return (
    <span
      className={`border-ink inline-block border-[1.5px] px-2 py-1 text-center text-[0.7rem] font-bold uppercase ${
        done ? "bg-ink text-paper" : "text-ink bg-transparent"
      }`}
    >
      {children}
    </span>
  );
}

"use client";

import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({ children, onClick, type = "button" }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      className="cursor-pointer border-2 border-[var(--ink)] px-8 py-4 text-base font-bold uppercase transition-transform duration-100"
      style={{
        background: isHovered ? "var(--paper)" : "var(--ink)",
        color: isHovered ? "var(--ink)" : "var(--paper)",
        transform: isActive ? "translateY(2px)" : "translateY(0)",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
    </button>
  );
}

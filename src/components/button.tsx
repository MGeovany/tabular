"use client";

import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({ children, onClick, type = "button", disabled = false }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      disabled={disabled}
      className={`border-ink border-2 px-8 py-4 text-base font-bold uppercase transition-transform duration-100 ${
        disabled
          ? "bg-ink/70 text-paper/90 cursor-not-allowed opacity-70"
          : isHovered
            ? "bg-paper text-ink cursor-pointer"
            : "bg-ink text-paper cursor-pointer"
      } ${!disabled && isActive ? "translate-y-0.5" : "translate-y-0"}`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => {
        if (!disabled) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => {
        if (!disabled) setIsActive(true);
      }}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
    </button>
  );
}

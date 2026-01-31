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
      className={`border-ink cursor-pointer border-2 px-8 py-4 text-base font-bold uppercase transition-transform duration-100 ${
        isHovered ? "bg-paper text-ink" : "bg-ink text-paper"
      } ${isActive ? "translate-y-0.5" : "translate-y-0"}`}
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

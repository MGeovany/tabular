"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./button";

export function UploadZone() {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log("File dropped:", file.name);
    }
  };

  const zoneStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    border: "var(--border-thick)",
    position: "relative" as const,
    transition: "all 0.3s ease",
    backgroundColor: "var(--paper)",
    overflow: "hidden" as const,
    backgroundImage: "radial-gradient(var(--ink) 15%, transparent 15%)",
    backgroundPosition: "0 0",
    backgroundSize: "6px 6px",
    opacity: isHovered || isDragging ? 1 : 0.95,
    transform: isHovered || isDragging ? "translate(-2px, -2px)" : "translate(0, 0)",
    boxShadow: isHovered || isDragging ? "4px 4px 0 var(--ink)" : "none",
  };

  const cornerStyle =
    "absolute text-2xl font-bold leading-none [font-family:var(--font-dela),cursive]";

  const graphicLinesStyle = {
    position: "absolute" as const,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "20px",
    background:
      "repeating-linear-gradient(45deg, var(--ink), var(--ink) 2px, var(--paper) 2px, var(--paper) 6px)",
    borderTop: "var(--border-thick)",
  };

  return (
    <section
      style={zoneStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <span className={cornerStyle} style={{ top: "10px", left: "15px" }}>
        PDF
      </span>
      <span className={cornerStyle} style={{ top: "10px", right: "15px" }}>
        XLS
      </span>
      <span className={cornerStyle} style={{ bottom: "10px", left: "15px" }}>
        IN
      </span>
      <span className={cornerStyle} style={{ bottom: "10px", right: "15px" }}>
        OUT
      </span>

      <div
        className="z-[2] max-w-[400px] text-center"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        <span
          className="mb-[var(--space-sm)] block text-6xl"
          style={{ fontFamily: "var(--font-dela), cursive" }}
        >
          ⬇
        </span>
        <h1
          className="mb-[var(--space-xs)] text-2xl uppercase"
          style={{ fontFamily: "var(--font-dela), cursive" }}
        >
          {t("upload.title")}
        </h1>
        <p className="mb-[var(--space-md)] text-[0.9rem] leading-[1.5]">
          {t("upload.subtitle1")}
          <br />
          {t("upload.subtitle2")}
        </p>
        <Button onClick={handleFileSelect}>{t("upload.selectFile")}</Button>
      </div>

      <div style={graphicLinesStyle} />
    </section>
  );
}

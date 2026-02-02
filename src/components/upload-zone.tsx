"use client";

import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./button";
import { convertPdfToExcel, inspectPdf, isPdfFile, type PdfInfo } from "@/lib/api";
import { ConvertPagesModal } from "@/components/convert-pages-modal";

type UploadZoneProps = {
  onConvertSuccess?: () => void;
};

export function UploadZone({ onConvertSuccess }: UploadZoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { accessToken, apiUser, refreshApiUser } = useAuth();

  const [pending, setPending] = useState<{ file: File; info: PdfInfo } | null>(null);
  const [pagesModalOpen, setPagesModalOpen] = useState(false);

  const limit = apiUser?.conversions_limit ?? 0;
  const used = apiUser?.conversions_used ?? 0;
  const limitReached = limit > 0 && used >= limit;

  const formatTimeLeft = (resetAtIso: string | undefined) => {
    if (!resetAtIso) return "";
    const resetAt = new Date(resetAtIso).getTime();
    if (!Number.isFinite(resetAt)) return "";
    const diff = Math.max(0, resetAt - Date.now());
    const totalMin = Math.ceil(diff / 60000);
    const days = Math.floor(totalMin / (60 * 24));
    const hours = Math.floor((totalMin - days * 24 * 60) / 60);
    const mins = totalMin - days * 24 * 60 - hours * 60;
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const fmt = (template: string, vars: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!isPdfFile(file)) {
        setError(t("upload.onlyPdf"));
        return;
      }
      if (!accessToken) {
        setError(t("upload.signInRequired"));
        return;
      }
      if (limitReached) {
        const time = formatTimeLeft(apiUser?.reset_at);
        setError(fmt(t("upload.limitReached"), { time: time || "" }));
        return;
      }
      setConverting(true);
      try {
        const info = await inspectPdf(accessToken, file);
        setPending({ file, info });
        setPagesModalOpen(true);
      } catch (err: unknown) {
        let text = t("upload.convertError");
        const ax =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: Blob | string; status?: number } }).response
            : null;
        if (ax?.data) {
          if (typeof ax.data === "string") text = ax.data;
          else if (ax.data instanceof Blob) {
            try {
              const s = await ax.data.text();
              const j = JSON.parse(s) as { detail?: unknown };
              const d = j.detail;
              if (typeof d === "string") text = d || text;
              else if (d && typeof d === "object" && "message" in d)
                text = String((d as { message?: unknown }).message ?? text);
              else text = s || text;
            } catch {
              text = t("upload.convertError");
            }
          }
        }
        setError(text);
      } finally {
        setConverting(false);
      }
    },
    [accessToken, t, onConvertSuccess, limitReached, apiUser?.reset_at],
  );

  const handleConfirmPages = useCallback(
    async (pages: string | null) => {
      if (!accessToken || !pending) return;
      setPagesModalOpen(false);
      setError(null);
      setConverting(true);
      try {
        const { blob, filename } = await convertPdfToExcel(
          accessToken,
          pending.file,
          pages ?? undefined,
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        onConvertSuccess?.();
        refreshApiUser().catch(() => {});
      } catch (err: unknown) {
        let text = t("upload.convertError");
        const ax =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: Blob | string; status?: number } }).response
            : null;
        if (ax?.data) {
          if (typeof ax.data === "string") text = ax.data;
          else if (ax.data instanceof Blob) {
            try {
              const s = await ax.data.text();
              const j = JSON.parse(s) as { detail?: unknown };
              const d = j.detail;
              if (typeof d === "string") text = d || text;
              else if (d && typeof d === "object" && "message" in d)
                text = String((d as { message?: unknown }).message ?? text);
              else text = s || text;
            } catch {
              text = t("upload.convertError");
            }
          }
        }
        setError(text);
      } finally {
        setConverting(false);
        setPending(null);
      }
    },
    [accessToken, pending, onConvertSuccess, refreshApiUser, t],
  );

  const handleFileSelect = () => {
    if (limitReached) {
      const time = formatTimeLeft(apiUser?.reset_at);
      setError(fmt(t("upload.limitReached"), { time: time || "" }));
      return;
    }
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const active = isHovered || isDragging;

  return (
    <section
      className={`border-ink bg-paper relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden border-[3px] [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] [background-position:0_0] transition-all duration-300 ${
        active
          ? "-translate-x-0.5 -translate-y-0.5 opacity-100 shadow-[4px_4px_0_var(--ink)]"
          : "translate-x-0 translate-y-0 opacity-95 shadow-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ConvertPagesModal
        key={
          pending
            ? `${pending.file.name}-${pending.file.size}-${pending.file.lastModified}`
            : "convert-pages"
        }
        open={pagesModalOpen && Boolean(pending)}
        title={t("upload.pagesModalTitle")}
        filename={pending?.info.filename ?? ""}
        totalPages={pending?.info.total_pages ?? 0}
        canConvertAll={Boolean(pending?.info.can_convert_all)}
        maxSelectPages={pending?.info.max_select_pages ?? 20}
        freeMaxPages={pending?.info.free_max_pages ?? 20}
        labels={{
          fileHasPages: (total) => fmt(t("upload.fileHasPages"), { total }),
          convertAll: t("upload.convertAll"),
          convertSelected: t("upload.convertSelected"),
          selectPagesHint: t("upload.selectPagesHint"),
          maxPagesHint: (max) => fmt(t("upload.maxPagesHint"), { max }),
          upgradeToPro: t("upload.upgradeToPro"),
          onlyProPopover: t("upload.onlyProPopover"),
          from: t("upload.from"),
          to: t("upload.to"),
          addRange: t("upload.addRange"),
          clear: t("upload.clear"),
          selected: t("upload.selected"),
          cancel: t("common.cancel"),
        }}
        onClose={() => {
          setPagesModalOpen(false);
          setPending(null);
        }}
        onUpgrade={() => {
          // For now: take them to pricing.
          window.location.href = "/pricing";
        }}
        onConfirm={handleConfirmPages}
      />

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
        disabled={converting || limitReached}
      />

      <span className="font-dela absolute top-[10px] left-[15px] text-2xl leading-none font-bold">
        PDF
      </span>
      <span className="font-dela absolute top-[10px] right-[15px] text-2xl leading-none font-bold">
        XLS
      </span>

      <div className="z-[2] mb-2 mb-8 max-w-[400px] text-center font-mono">
        <span className="font-dela mb-[var(--space-sm)] block text-6xl">⬇</span>
        <h1 className="font-dela mb-[var(--space-xs)] text-2xl uppercase">{t("upload.title")}</h1>
        <p className="mb-[var(--space-md)] text-xl leading-[1.5]">
          {t("upload.subtitle1")}
          <br />
          {t("upload.subtitle2")}
        </p>
        {error && (
          <p className="border-ink bg-ink/5 text-ink mb-4 border-2 px-3 py-2 text-sm font-bold">
            {error}
          </p>
        )}
        <Button onClick={handleFileSelect} disabled={converting || limitReached}>
          {converting ? t("upload.converting") : t("upload.selectFile")}
        </Button>
      </div>

      <div className="border-ink absolute right-0 bottom-0 h-5 w-full border-t-[3px] [background:repeating-linear-gradient(45deg,var(--ink),var(--ink)_2px,var(--paper)_2px,var(--paper)_6px)]" />
    </section>
  );
}

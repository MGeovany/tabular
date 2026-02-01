"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileRow } from "@/components/file-row";
import { StatusBadge } from "@/components/status-badge";
import { ActionIcon } from "@/components/action-icon";
import { formatDate, formatSize } from "@/lib/format";
import { downloadConversionXlsx, type ConversionItem } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

type TFunction = (key: string) => string;

type ConversionListProps = {
  files: ConversionItem[];
  loading: boolean;
  t: TFunction;
  title?: string;
  onDeleteAll?: () => void | Promise<void>;
};

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the browser a tick to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 250);
}

function confirmToast(
  message: string,
  confirmLabel: string,
  cancelLabel: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    let toastId: string | number = -1;

    const settle = (value: boolean) => {
      if (settled) return;
      settled = true;
      resolve(value);
      toast.dismiss(toastId);
    };

    toastId = toast(message, {
      duration: 7000,
      action: {
        label: confirmLabel,
        onClick: () => settle(true),
      },
      cancel: {
        label: cancelLabel,
        onClick: () => settle(false),
      },
      onDismiss: () => settle(false),
    });
  });
}

function renderStatus(
  file: ConversionItem,
  t: TFunction,
  onDownload: (file: ConversionItem) => void,
) {
  const status = file.status;
  const st = (status || "").toLowerCase();
  if (st === "success")
    return <ActionIcon onClick={() => onDownload(file)}>{t("status.download")}</ActionIcon>;
  if (st === "completed" || st === "done")
    return <StatusBadge done>{t("status.ready")}</StatusBadge>;
  if (st === "processing" || st === "pending")
    return <StatusBadge>{t("status.processing")}</StatusBadge>;
  if (st === "failed") return <StatusBadge>FAILED</StatusBadge>;
  return <StatusBadge>{status}</StatusBadge>;
}

export function ConversionList({ files, loading, t, title, onDeleteAll }: ConversionListProps) {
  const { accessToken } = useAuth();
  const [deletingAll, setDeletingAll] = useState(false);

  const handleDownload = async (file: ConversionItem) => {
    if (!accessToken) return;
    try {
      toast.message(t("toast.downloadStarted"));
      const { blob, filename } = await downloadConversionXlsx(accessToken, file.id);
      triggerDownload(blob, filename);
    } catch (err) {
      const ax =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { status?: number } }).response
          : null;
      if (ax?.status === 410) toast.error(t("toast.downloadExpired"));
      else toast.error(t("toast.downloadFailed"));
    }
  };

  const handleDeleteAllClick = async () => {
    if (!onDeleteAll) return;
    const ok = await confirmToast(
      t("history.deleteAllConfirm"),
      t("common.confirm"),
      t("common.cancel"),
    );
    if (!ok) return;
    setDeletingAll(true);
    try {
      await onDeleteAll();
      toast.success(t("toast.deletedAll"));
    } finally {
      setDeletingAll(false);
    }
  };

  return (
    <section className="flex flex-1 flex-col gap-(--space-sm)">
      <div className="border-ink mb-(--space-sm) flex flex-wrap items-end justify-between gap-2 border-b-[3px] pb-(--space-xs)">
        <h2 className="font-dela text-lg uppercase">{title ?? t("files.recentFiles")}</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold">
            {t("files.total")}: {loading ? "…" : files.length}
          </span>
          {onDeleteAll && files.length > 0 && (
            <button
              type="button"
              onClick={handleDeleteAllClick}
              disabled={deletingAll || loading}
              className="border-ink hover:bg-ink/10 text-ink rounded border-2 px-3 py-1.5 text-xs font-bold uppercase transition-colors disabled:opacity-50"
            >
              {deletingAll ? "…" : t("history.deleteAll")}
            </button>
          )}
        </div>
      </div>

      <div className="border-ink flex flex-col gap-0 border-y-[3px]">
        <FileRow
          isHeader
          id={t("files.id")}
          name={t("files.name")}
          date={t("files.date")}
          size={t("files.size")}
          status={t("files.status")}
        />
        {loading ? (
          <div className="border-ink text-ink border-t py-6 text-center text-sm font-bold uppercase opacity-70">
            {t("status.processing")}
          </div>
        ) : files.length === 0 ? (
          <div className="border-ink border-t py-6 text-center text-sm opacity-80">
            {t("history.comingSoon")}
          </div>
        ) : (
          files.map((file) => (
            <FileRow
              key={file.id}
              id={file.id.slice(0, 8)}
              name={file.filename ?? file.original_filename ?? file.name ?? file.id}
              date={formatDate(file.created_at)}
              size={formatSize(file.file_size_bytes)}
              status={renderStatus(file, t, handleDownload)}
            />
          ))
        )}
      </div>
    </section>
  );
}

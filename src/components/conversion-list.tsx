"use client";

import { FileRow } from "@/components/file-row";
import { StatusBadge } from "@/components/status-badge";
import { ActionIcon } from "@/components/action-icon";
import { formatDate, formatSize } from "@/lib/format";
import type { ConversionItem } from "@/lib/api";

type TFunction = (key: string) => string;

type ConversionListProps = {
  files: ConversionItem[];
  loading: boolean;
  t: TFunction;
};

function renderStatus(status: string, t: TFunction) {
  const s = (status || "").toLowerCase();
  if (s === "completed" || s === "done") return <StatusBadge done>{t("status.ready")}</StatusBadge>;
  if (s === "processing" || s === "pending")
    return <StatusBadge>{t("status.processing")}</StatusBadge>;
  return <ActionIcon>{t("status.download")}</ActionIcon>;
}

export function ConversionList({ files, loading, t }: ConversionListProps) {
  return (
    <section className="flex flex-1 flex-col gap-(--space-sm)">
      <div className="border-ink mb-(--space-sm) flex items-end justify-between border-b-[3px] pb-(--space-xs)">
        <h2 className="font-dela text-lg uppercase">{t("files.recentFiles")}</h2>
        <span className="text-sm font-bold">
          {t("files.total")}: {loading ? "…" : files.length}
        </span>
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
              id={file.id}
              name={file.filename ?? file.original_filename ?? file.name ?? file.id}
              date={formatDate(file.created_at)}
              size={formatSize(file.file_size_bytes)}
              status={renderStatus(file.status, t)}
            />
          ))
        )}
      </div>
    </section>
  );
}

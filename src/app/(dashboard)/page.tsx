"use client";

import { useLanguage } from "@/contexts/language-context";
import { FileRow } from "@/components/file-row";
import { StatusBadge } from "@/components/status-badge";
import { ActionIcon } from "@/components/action-icon";
import { UploadZone } from "@/components/upload-zone";

const FILES = [
  {
    id: "01",
    name: "FINANCES_Q1_2024.PDF",
    date: "TODAY, 10:23 AM",
    size: "2.4 MB",
    status: "done" as const,
  },
  {
    id: "02",
    name: "WAREHOUSE_INVENTORY.PDF",
    date: "TODAY, 09:15 AM",
    size: "14.8 MB",
    status: "processing" as const,
  },
  {
    id: "03",
    name: "SALES_REPORT_SOUTH.PDF",
    date: "YESTERDAY",
    size: "890 KB",
    status: "download" as const,
  },
  {
    id: "04",
    name: "PAYROLL_MARCH.PDF",
    date: "DEC 12",
    size: "1.1 MB",
    status: "download" as const,
  },
];

export default function ConvertPage() {
  const { t } = useLanguage();

  function renderStatus(status: (typeof FILES)[0]["status"]) {
    switch (status) {
      case "done":
        return <StatusBadge done>{t("status.ready")}</StatusBadge>;
      case "processing":
        return <StatusBadge>{t("status.processing")}</StatusBadge>;
      default:
        return <ActionIcon>{t("status.download")}</ActionIcon>;
    }
  }

  return (
    <>
      <UploadZone />

      <section className="flex flex-1 flex-col gap-[var(--space-sm)]">
        <div
          className="mb-[var(--space-sm)] flex items-end justify-between pb-[var(--space-xs)]"
          style={{ borderBottom: "var(--border-thick)" }}
        >
          <h2 className="text-lg uppercase" style={{ fontFamily: "var(--font-dela), cursive" }}>
            {t("files.recentFiles")}
          </h2>
          <span className="text-sm font-bold">
            {t("files.total")}: {FILES.length}
          </span>
        </div>

        <div
          className="flex flex-col gap-0"
          style={{
            borderTop: "var(--border-thick)",
            borderBottom: "var(--border-thick)",
          }}
        >
          <FileRow
            isHeader
            id={t("files.id")}
            name={t("files.name")}
            date={t("files.date")}
            size={t("files.size")}
            status={t("files.status")}
          />
          {FILES.map((file) => (
            <FileRow
              key={file.id}
              id={file.id}
              name={file.name}
              date={file.date}
              size={file.size}
              status={renderStatus(file.status)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

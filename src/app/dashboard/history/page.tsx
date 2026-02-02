"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { ConversionList } from "@/components/conversion-list";
import { fetchHistory, deleteAllConversions, type ConversionItem } from "@/lib/api";

export default function HistoryPage() {
  const { t } = useLanguage();
  const { accessToken } = useAuth();
  const [files, setFiles] = useState<ConversionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshHistory = useCallback(() => {
    if (!accessToken) return;
    fetchHistory(accessToken)
      .then(setFiles)
      .catch(() => setFiles([]));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      queueMicrotask(() => {
        setFiles([]);
        setLoading(false);
      });
      return;
    }
    let cancelled = false;
    queueMicrotask(() => setLoading(true));
    fetchHistory(accessToken)
      .then((list) => {
        if (!cancelled) setFiles(list);
      })
      .catch(() => {
        if (!cancelled) setFiles([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const handleDeleteAll = useCallback(async () => {
    if (!accessToken) return;
    await deleteAllConversions(accessToken);
    refreshHistory();
  }, [accessToken, refreshHistory]);

  const displayFiles = accessToken ? files : [];
  const displayLoading = accessToken ? loading : false;

  return (
    <section className="flex flex-1 flex-col gap-(--space-md)">
      <header className="border-ink mb-(--space-sm) border-b-[3px] pb-(--space-sm)">
        <h1 className="font-dela text-xl uppercase md:text-2xl">{t("history.title")}</h1>
        <p className="mt-1 text-sm opacity-80">{t("history.subtitle")}</p>
      </header>
      <ConversionList
        files={displayFiles}
        loading={displayLoading}
        t={t}
        onDeleteAll={handleDeleteAll}
      />
    </section>
  );
}

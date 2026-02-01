"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { UploadZone } from "@/components/upload-zone";
import { ConversionList } from "@/components/conversion-list";
import { fetchHistory, type ConversionItem } from "@/lib/api";

export default function ConvertPage() {
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
    if (!accessToken) return;
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

  const displayFiles = accessToken ? files : [];
  const displayLoading = accessToken ? loading : false;

  return (
    <>
      <UploadZone onConvertSuccess={refreshHistory} />
      <ConversionList files={displayFiles} loading={displayLoading} t={t} />
    </>
  );
}

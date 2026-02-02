/**
 * API client for tabularis-server. Sends Supabase access_token in Authorization header.
 */

import axios from "axios";

// Default to same-origin and rely on Next.js `rewrites()` to proxy `/api/*` to tabularis-server.
// Direct browser calls to the backend often fail in production due to CORS.
// If you really need direct calls, set:
// - NEXT_PUBLIC_USE_DIRECT_API=true
// - NEXT_PUBLIC_API_URL=https://your-backend
const USE_DIRECT = process.env.NEXT_PUBLIC_USE_DIRECT_API === "true";
const API_BASE = USE_DIRECT ? process.env.NEXT_PUBLIC_API_URL || "" : "";

export type UserMe = {
  id: string;
  email: string | null;
  plan: string;
  conversions_used: number;
  conversions_limit: number;
  reset_at: string;
  created_at: string | null;
};

export type PdfInfo = {
  filename: string;
  total_pages: number;
  plan: string;
  max_select_pages: number;
  can_convert_all: boolean;
  free_max_pages: number;
};

export type ConversionItem = {
  id: string;
  filename?: string;
  name?: string;
  original_filename?: string;
  created_at: string;
  status: string;
  file_size_bytes?: number;
  size_bytes?: number;
};

function client(accessToken: string) {
  return axios.create({
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function fetchMe(accessToken: string): Promise<UserMe> {
  const { data } = await client(accessToken).get<UserMe>("/api/v1/me");
  return data;
}

export async function fetchHistory(accessToken: string): Promise<ConversionItem[]> {
  const { data } = await client(accessToken).get<ConversionItem[] | { items: ConversionItem[] }>(
    "/api/v1/history",
  );
  const items = Array.isArray(data) ? data : (data.items ?? []);
  // Normalize server shape (tabularis-server uses `size_bytes`).
  return items.map((it) => ({
    ...it,
    file_size_bytes: it.file_size_bytes ?? (it as unknown as { size_bytes?: number }).size_bytes,
  }));
}

export async function deleteConversion(accessToken: string, conversionId: string): Promise<void> {
  await client(accessToken).delete(`/api/v1/history/${conversionId}`);
}

export async function deleteAllConversions(accessToken: string): Promise<{ deleted: number }> {
  const { data } = await client(accessToken).delete<{ deleted: number }>("/api/v1/history");
  return data;
}

const PDF_TYPE = "application/pdf";

export function isPdfFile(file: File): boolean {
  return file.type === PDF_TYPE || file.name.toLowerCase().endsWith(".pdf");
}

export type ConvertResult = { blob: Blob; filename: string };

export async function inspectPdf(accessToken: string, file: File): Promise<PdfInfo> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await client(accessToken).post<PdfInfo>("/api/v1/convert/pdf-info", formData);
  return data;
}

export async function convertPdfToExcel(
  accessToken: string,
  file: File,
  pages?: string,
): Promise<ConvertResult> {
  const formData = new FormData();
  formData.append("file", file);
  if (pages) formData.append("pages", pages);
  const res = await client(accessToken).post("/api/v1/convert/pdf-to-excel", formData, {
    responseType: "blob",
  });
  const blob = res.data as Blob;
  const disposition = res.headers["content-disposition"];
  const filename =
    (typeof disposition === "string" && /filename="?([^";\n]+)"?/i.exec(disposition)?.[1]) ||
    file.name.replace(/\.pdf$/i, "") + ".xlsx";
  return { blob, filename };
}

export async function downloadConversionXlsx(
  accessToken: string,
  conversionId: string,
): Promise<ConvertResult> {
  const res = await client(accessToken).get(`/api/v1/convert/${conversionId}/download`, {
    responseType: "blob",
  });
  const blob = res.data as Blob;
  const disposition = res.headers["content-disposition"];
  const filename =
    (typeof disposition === "string" && /filename="?([^";\n]+)"?/i.exec(disposition)?.[1]) ||
    `conversion-${conversionId}.xlsx`;
  return { blob, filename };
}

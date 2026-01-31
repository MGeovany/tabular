/**
 * API client for tabularis-server. Sends Supabase access_token in Authorization header.
 */

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type UserMe = {
  id: string;
  email: string | null;
  plan: string;
  conversions_used: number;
  conversions_limit: number;
  created_at: string | null;
};

export type ConversionItem = {
  id: string;
  filename?: string;
  name?: string;
  original_filename?: string;
  created_at: string;
  status: string;
  file_size_bytes?: number;
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
    "/api/v1/history"
  );
  return Array.isArray(data) ? data : data.items ?? [];
}

// src/components/admin/adminApi.ts

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:7860").replace(/\/$/, "");

export async function apiFetch(pathOrUrl: string, init?: RequestInit) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${API_BASE}${pathOrUrl}`;
  return fetch(url, init);
}

export async function safeJson(res: Response) {
  const text = await res.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

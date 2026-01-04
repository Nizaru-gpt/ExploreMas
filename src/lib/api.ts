// src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7860";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(path: string, method: HttpMethod, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const rawText = await res.text();

  if (!res.ok) {
    try {
      const parsed = JSON.parse(rawText);
      throw new Error(parsed?.message || rawText || `HTTP ${res.status}`);
    } catch {
      throw new Error(rawText || `HTTP ${res.status}`);
    }
  }

  if (!rawText) return null as T;

  if (contentType.includes("application/json")) {
    return JSON.parse(rawText) as T;
  }

  return rawText as unknown as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body: unknown) => request<T>(path, "POST", body),
  put: <T>(path: string, body: unknown) => request<T>(path, "PUT", body),
  delete: <T>(path: string) => request<T>(path, "DELETE"),
};

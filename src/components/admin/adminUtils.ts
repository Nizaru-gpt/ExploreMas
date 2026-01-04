// src/components/admin/adminUtils.ts
import type { CategoryUI, ResourceKey } from "./adminTypes";

export const CAFE_TAGS = ["wifi", "socket", "ac", "24h", "parking", "studyFriendly"];
export const WISATA_TAGS = ["parking", "cheap", "instagrammable", "nature", "waterpark"];
export const KULINER_TAGS = ["parking", "cheap", "family", "halal", "spicy", "instagrammable"];

export const TAG_LABELS: Record<string, string> = {
  wifi: "Wifi Gratis",
  socket: "Banyak Colokan",
  ac: "Ber-AC",
  "24h": "Buka 24 Jam",
  parking: "Area Parkir Luas",
  studyFriendly: "Nugas Friendly",

  cheap: "Murah",
  instagrammable: "Spot Foto/Instagrammable",
  nature: "Pemandangan Alam",
  waterpark: "Wahana Air",

  family: "Cocok Keluarga",
  halal: "Halal",
  spicy: "Pedas",
};

export function toArrFromComma(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeStringArray(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string") {
    if (v.includes(",")) return toArrFromComma(v);
    if (v.includes(" - ")) return v.split(" - ").map((s) => s.trim()).filter(Boolean);
    return [v];
  }
  return [];
}

export function categoryToResource(cat: CategoryUI): ResourceKey {
  if (cat === "Wisata Alam") return "wisata_alam";
  if (cat === "Wisata Pendidikan") return "wisata_pendidikan";
  if (cat === "Cafe") return "tempat_nongkrong";
  return "kuliner";
}

export function defaultTagsByCategory(cat: CategoryUI | ""): string[] {
  if (cat === "Cafe") return CAFE_TAGS;
  if (cat === "Kuliner") return KULINER_TAGS;
  if (cat === "Wisata Alam" || cat === "Wisata Pendidikan") return WISATA_TAGS;
  return [];
}

/* ===========================
   TIME + PRICE HELPERS
   =========================== */

export function normalizeTimeToHHMM(input: string): string {
  const raw = (input || "").trim();
  if (!raw) return "";

  let s = raw.replace(/[.\s]/g, ":");

  if (/^\d+$/.test(s)) {
    if (s.length <= 2) {
      s = `${s.padStart(2, "0")}:00`;
    } else if (s.length === 3) {
      s = `0${s[0]}:${s.slice(1)}`;
    } else {
      s = `${s.slice(0, 2)}:${s.slice(2, 4)}`;
    }
  }

  const m = s.match(/^(\d{1,2}):(\d{1,2})$/);
  if (!m) return "";

  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return "";
  if (hh < 0 || hh > 23) return "";
  if (mm < 0 || mm > 59) return "";

  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function formatPriceInputID(input: string): string {
  let s = (input || "")
    .replace(/[–—]/g, "-")
    .replace(/[^\d.\-\s]/g, "");

  s = s.replace(/\s*-\s*/g, " - ");

  const parts = s.split(" - ").map((p) => p.trim()).filter((p) => p.length > 0);

  const fmtOne = (p: string) => {
    const digits = p.replace(/[^\d]/g, "");
    if (!digits) return "";
    const n = Number(digits);
    if (!Number.isFinite(n)) return "";
    return n.toLocaleString("id-ID");
  };

  if (parts.length === 0) return "";
  if (parts.length === 1) return fmtOne(parts[0]) || "";
  const a = fmtOne(parts[0]);
  const b = fmtOne(parts[1]);
  if (a && b) return `${a} - ${b}`;
  return a || b || "";
}

// ✅ BARU: parse range dari input harga
export function parseHtmRangeFromInput(input: string): { min: number; max: number; avg: number } {
  const s = (input || "").replace(/[–—]/g, "-");
  const parts = s.split("-").map((p) => p.trim()).filter(Boolean);

  const toNum = (p: string) => {
    const digits = p.replace(/[^\d]/g, "");
    const n = Number(digits || "0");
    return Number.isFinite(n) ? n : 0;
  };

  if (parts.length <= 1) {
    const v = toNum(parts[0] || "0");
    return { min: v, max: v, avg: v };
  }

  let a = toNum(parts[0]);
  let b = toNum(parts[1]);
  if (a > b) [a, b] = [b, a];

  const avg = Math.round((a + b) / 2);
  return { min: a, max: b, avg };
}

/**
 * (tetap ada) Parse harga jadi single integer (AVG)
 * biar gak ngerusak file lain yang mungkin masih pakai ini.
 */
export function parseHtmFromInput(input: string): number {
  const r = parseHtmRangeFromInput(input);
  return r.avg;
}

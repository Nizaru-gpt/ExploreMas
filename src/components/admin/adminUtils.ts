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

// helper normalize kalau backend kadang ngembaliin string / array
export function normalizeStringArray(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string") {
    // support data lama: "A - B - C" atau "A, B"
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

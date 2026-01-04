// src/components/admin/adminTypes.ts

export type CategoryUI = "Wisata Alam" | "Wisata Pendidikan" | "Cafe" | "Kuliner";
export type ResourceKey = "wisata_alam" | "wisata_pendidikan" | "tempat_nongkrong" | "kuliner";

export type AdminPlace = {
  id: number;
  name: string;
  category: CategoryUI;
  address: string;

  imageUrl?: string;

  // legacy single number
  price?: number;

  // ✅ range (baru)
  price_min?: number;
  price_max?: number;

  openTime?: string;
  closeTime?: string;

  // ✅ tambahan (untuk UI admin)
  is24Hours?: boolean;

  fasilitas?: string[];

  deskripsi?: string;
  link_gmaps?: string;

  cocok_untuk?: string[];
  menu_populer?: string[];

  trans_kode?: string | null;
  trans_jarak_meter?: number | null;
  trans_tarif_min?: number | null;
  trans_tarif_max?: number | null;

  trans_rute?: string[] | null;
};

export type PlaceForm = {
  name: string;
  category: CategoryUI | "";
  address: string;

  imageUrl: string;

  price: string;
  openTime: string;
  closeTime: string;

  // ✅ tambahan (checkbox 24 jam)
  is24Hours: boolean;

  deskripsi: string;
  link_gmaps: string;

  fasilitas: string[];

  cocok_untuk_text: string;
  menu_populer_text: string;

  trans_kode: string;
  trans_jarak_meter: string;
  trans_tarif_min: string;
  trans_tarif_max: string;

  trans_rute: string;
};

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  image_url: string;
  content: string;
  read_minutes: number;
};

export type NewsForm = {
  title: string;
  category: string;
  date: string;
  image_url: string;
  content: string;
};

// src/data/trans.ts
export type TransInfoItem = {
  id: "time" | "fare" | "duration";
  label: string;
  value: string;
  description: string;
};

export type TransCorridor = {
  id: string;
  name: string;
  code: string;
  distance: string;
  duration: string;
  iconLabel: string;
  stops: string[];
};

export const transInfoItems: TransInfoItem[] = [
  {
    id: "time",
    label: "Jam Operasional",
    value: "05:00 - 20:00 WIB",
    description: "Beroperasi setiap hari",
  },
  {
    id: "fare",
    label: "Tarif/Ongkos",
    value: "Rp 3.500 - Rp 7.000",
    description: "Tergantung rute & jarak",
  },
  {
    id: "duration",
    label: "Estimasi Waktu",
    value: "15 - 20 Menit",
    description: "Waktu tunggu rata-rata",
  },
];

export const transCorridors: TransCorridor[] = [
  {
    id: "koridor-1",
    code: "Koridor 1",
    name: "Terminal Purwokerto - Baturaden",
    distance: "18 km",
    duration: "45 menit",
    iconLabel: "🚌",
    stops: [
      "Terminal Purwokerto",
      "Alun-alun Purwokerto",
      "RS Margono Soekarjo",
      "Universitas Jenderal Soedirman",
      "Lokawisata Baturaden",
    ],
  },
  {
    id: "koridor-2",
    code: "Koridor 2",
    name: "Terminal Purwokerto - Grendeng",
    distance: "12 km",
    duration: "30 menit",
    iconLabel: "🚌",
    stops: [
      "Terminal Purwokerto",
      "Pasar Wage",
      "Stasiun Purwokerto",
      "Rita Mall",
      "Grendeng",
    ],
  },
  {
    id: "koridor-3",
    code: "Koridor 3",
    name: "Terminal Purwokerto - Sokaraja",
    distance: "15 km",
    duration: "35 menit",
    iconLabel: "🚌",
    stops: [
      "Terminal Purwokerto",
      "Alun-alun Purwokerto",
      "Satria Plaza",
      "Universitas Muhammadiyah Purwokerto",
      "Sokaraja",
    ],
  },
  {
    id: "koridor-4",
    code: "Koridor 4",
    name: "Terminal Purwokerto - Ajibarang",
    distance: "20 km",
    duration: "50 menit",
    iconLabel: "🚌",
    stops: [
      "Terminal Purwokerto",
      "Reism PON",
      "Berkoh",
      "Kebondalem",
      "Ajibarang",
    ],
  },
];

export const transImportantInfo = {
  facilities: [
    "AC dan tempat duduk yang nyaman",
    "CCTV keamanan",
    "GPS tracking",
    "Ramah difabel",
  ],
  howToUse: [
    "Tunggu bus di halte resmi",
    "Bayar saat naik ke bus",
    "Gunakan e-money untuk lebih cepat",
    "Duduk di tempat yang tersedia",
  ],
};

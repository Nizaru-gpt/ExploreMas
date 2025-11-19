// src/data/wisataDetails.ts
import cipendokImg from "../assets/images/wisata/cipendok.jpg";
import jenggalaImg from "../assets/images/wisata/jenggala.jpg";
import owabongImg from "../assets/images/wisata/owabong.jpg";

export interface WisataDetailData {
  slug: string;
  name: string;
  image: string;
  description: string;
  address: string;
  weekdayHours: string;
  weekendHours: string;
  priceRange: string;
  facilities: string[];
  activities: string[];
  goodFor: string[];
  featured: {
    natureView: boolean;
    familyFriendly: boolean;
    photoSpot: boolean;
    easyAccess: boolean;
  };
  trans: {
    corridor: string;
    distance: string;
    mainStop: string;
    routes: string[];
    fareMin: number;
    fareMax: number;
  };
  mapsUrl?: string;
}

export const wisataDetails: WisataDetailData[] = [
  {
    slug: "curug-cipendok",
    name: "Curug Cipendok",
    image: cipendokImg,
    description:
      "Air terjun tertinggi di Banyumas dengan ketinggian sekitar 92 meter. Udara sejuk, suara gemericik air, dan suasana hutan pinus bikin tempat ini cocok buat healing.",
    address:
      "Dusun III Lebaksiu, Karanganyar, Kec. Cilongok, Kabupaten Banyumas",
    weekdayHours: "08.30 – 16.30",
    weekendHours: "08.00 – 17.00",
    priceRange: "Rp 10.000 – 20.000 (belum termasuk parkir)",
    facilities: ["Area parkir", "Warung makan", "Toilet", "Gazebo / tempat duduk"],
    activities: ["Hunting foto", "Menikmati air terjun", "Trekking ringan"],
    goodFor: ["Liburan keluarga", "Healing tipis-tipis", "Fotografi alam"],
    featured: {
      natureView: true,
      familyFriendly: true,
      photoSpot: true,
      easyAccess: false,
    },
    trans: {
      corridor: "Koridor 1 – Terminal Bulupitu",
      distance: "± 25–30 menit berkendara dari pusat kota",
      mainStop: "Turun di kawasan Cilongok, lanjut ojek / kendaraan pribadi",
      routes: [
        "Terminal Bulupitu – Cilongok",
        "Cilongok – Curug Cipendok (kendaraan lanjutan)",
      ],
      fareMin: 4000,
      fareMax: 8000,
    },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Curug+Cipendok",
  },
  {
    slug: "wisata-alam-jenggala",
    name: "Wisata Alam Jenggala",
    image: jenggalaImg,
    description:
      "Destinasi alam dengan air terjun mini, aliran sungai jernih, dan suasana rimbun. Banyak spot foto ala outdoor yang instagrammable.",
    address:
      "Jl. Pangeran Limboro, Dusun III Kalipagu, Ketenger, Kec. Baturraden",
    weekdayHours: "07.30 – 18.00",
    weekendHours: "07.00 – 18.30",
    priceRange: "Rp 15.000 – 30.000 (tergantung paket)",
    facilities: ["Area parkir", "Food stall", "Toilet", "Spot foto", "Mushola"],
    activities: ["Hunting foto", "Main air", "Jalan santai di alam"],
    goodFor: ["Wisata keluarga", "Couple trip", "Content creator"],
    featured: {
      natureView: true,
      familyFriendly: true,
      photoSpot: true,
      easyAccess: true,
    },
    trans: {
      corridor: "Koridor 3 – Arah Baturraden",
      distance: "± 20–25 menit dari pusat kota",
      mainStop: "Turun di kawasan Baturraden, lanjut ojek / angkot lokal",
      routes: [
        "Terminal Bulupitu – Baturraden",
        "Baturraden – Wisata Alam Jenggala (kendaraan lanjutan)",
      ],
      fareMin: 4000,
      fareMax: 8000,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Wisata+Alam+Jenggala",
  },
  {
    slug: "owabong-water-park",
    name: "Owabong Water Park",
    image: owabongImg,
    description:
      "Taman bermain air populer di Banyumas dengan berbagai wahana seluncuran, kolam arus, wave pool, dan area bermain anak.",
    address:
      "Jl. Raya Owabong No.1, Dusun 2, Bojongsari, Kec. Bojongsari, Kabupaten Purbalingga",
    weekdayHours: "08.00 – 17.00",
    weekendHours: "08.00 – 18.00",
    priceRange: "Rp 21.000 – 25.000 (info bisa berubah sewaktu-waktu)",
    facilities: [
      "Area parkir luas",
      "Food court",
      "Toilet & kamar bilas",
      "Loker barang",
      "Mushola",
    ],
    activities: ["Bermain di wahana air", "Berenang", "Liburan keluarga"],
    goodFor: ["Family trip", "Anak-anak", "Rombongan sekolah"],
    featured: {
      natureView: false,
      familyFriendly: true,
      photoSpot: true,
      easyAccess: true,
    },
    trans: {
      corridor: "Koridor menuju Purbalingga / Bojongsari",
      distance: "± 45–60 menit dari pusat kota Purwokerto",
      mainStop: "Turun di kawasan Owabong / Bojongsari",
      routes: [
        "Purwokerto – Purbalingga (Trans / bus)",
        "Purbalingga – Owabong (angkutan lanjutan)",
      ],
      fareMin: 5000,
      fareMax: 15000,
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Owabong+Water+Park",
  },
];

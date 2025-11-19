import calfImg from "../assets/images/cafe/calf.jpg";
import coldbrewImg from "../assets/images/cafe/coldbrew.jpg";
import advoImg from "../assets/images/cafe/advo.jpg";

export type Facility =
  | "wifi"
  | "socket"
  | "ac"
  | "24h"
  | "parking"
  | "studyFriendly";

export interface Cafe {
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  detailInfo: string;
  priceRange: string;
  facilities: Facility[];
}


export const cafes: Cafe[] = [
  {
    name: "Kopi Calf",
    description:
      "Cafe cozy dengan suasana nyaman dan kopi specialty yang mantap! Perfect buat ngerjain tugas atau nongkrong santai.",
    imageUrl: calfImg,
    address: "Jl. Prof. Dr. Suharso No.53, Karangwangkal, Purwokerto",
    detailInfo: "[Senin–Jumat] 08.00 – 23.00 | [Sabtu–Minggu] 06.00 – 00.00",
    priceRange: "Rp 25.000 – Rp 50.000",
    facilities: ["wifi", "socket", "ac", "parking"],
  },
  {
    name: "Cold 'N Brew",
    description:
      "Cafe dengan interior hangat, menu kopi dan non-kopi lengkap. Nyaman buat kerja, diskusi, atau baca buku.",
    imageUrl: coldbrewImg,
    address: "Jl. Jend. Sudirman No.298, Karangwangkal, Purwokerto",
    detailInfo: "[Senin–Minggu] 24 jam",
    priceRange: "Rp 25.000 – Rp 50.000",
    facilities: ["wifi", "socket", "24h"],
  },
  {
    name: "Advo Cafe",
    description:
      "Cafe dengan view hijau dan suasana tenang. Cocok buat healing tipis-tipis sambil ngerjain tugas.",
    imageUrl: advoImg,
    address:
      "Jl. A. Yani No. 60, Karangwangkal, Kec. Purwokerto Utara, Purwokerto",
    detailInfo: "[Senin–Minggu] 10.00 – 23.00",
    priceRange: "Rp 10.000 – Rp 25.000",
    facilities: ["wifi", "socket", "parking"],
  },
  {
    name: "Kedai Sore Cafe",
    description:
      "Tempat nongkrong dengan suasana hangat, cocok untuk ngobrol santai bareng teman atau keluarga.",
    imageUrl: calfImg,
    address: "Jl. S Parman No.21, Purwokerto",
    detailInfo: "[Senin–Minggu] 15.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 40.000",
    facilities: ["wifi", "socket", "parking"],
  },
  {
    name: "Ruang Senja Coffee",
    description:
      "Cafe minimalis dengan banyak colokan dan wifi kencang. Favorit mahasiswa untuk nugas.",
    imageUrl: coldbrewImg,
    address: "Jl. HR Bunyamin No.5, Purwokerto",
    detailInfo: "[Senin–Jumat] 10.00 – 23.00",
    priceRange: "Rp 18.000 – Rp 45.000",
    facilities: ["wifi", "socket", "ac"],
  },
  {
    name: "Langit Kopi",
    description:
      "Rooftop cafe dengan pemandangan kota Purwokerto, cocok buat foto-foto dan nongkrong malam.",
    imageUrl: advoImg,
    address: "Jl. Gerilya Atas No.88, Purwokerto",
    detailInfo: "[Senin–Minggu] 17.00 – 00.00",
    priceRange: "Rp 25.000 – Rp 60.000",
    facilities: ["wifi", "ac", "parking"],
  },
  {
    name: "Bumi Kopi",
    description:
      "Cafe bernuansa kayu dan tanaman hijau yang adem, suasana tenang untuk kerja maupun baca buku.",
    imageUrl: calfImg,
    address: "Jl. Gerilya No.12, Purwokerto",
    detailInfo: "[Senin–Minggu] 09.00 – 22.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["wifi", "socket"],
  },
  {
    name: "Kopi Jalan",
    description:
      "Cafe kecil tapi ramai dengan menu kopi susu kekinian dan camilan ringan.",
    imageUrl: coldbrewImg,
    address: "Jl. Masjid No.7, Purwokerto",
    detailInfo: "[Senin–Sabtu] 10.00 – 22.00",
    priceRange: "Rp 15.000 – Rp 30.000",
    facilities: ["wifi", "parking"],
  },
  {
    name: "Teras Kopi",
    description:
      "Cafe outdoor dengan banyak area duduk di teras, cocok untuk nongkrong sore bareng teman.",
    imageUrl: advoImg,
    address: "Jl. Dr. Angka No.31, Purwokerto",
    detailInfo: "[Senin–Minggu] 16.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["wifi", "socket", "parking"],
  },
  {
    name: "Kopi Sudut Kota",
    description:
      "Cafe instagrammable di sudut persimpangan jalan dengan interior aesthetic dan banyak spot foto.",
    imageUrl: calfImg,
    address: "Jl. Overste Isdiman No.10, Purwokerto",
    detailInfo: "[Senin–Minggu] 11.00 – 23.00",
    priceRange: "Rp 22.000 – Rp 55.000",
    facilities: ["wifi", "socket", "ac", "parking"],
  },
  {
    name: "Pagi Hari Coffee",
    description:
      "Cafe yang buka lebih pagi, cocok untuk sarapan ringan dengan kopi hangat.",
    imageUrl: coldbrewImg,
    address: "Jl. Soeparjo Roestam No.4, Purwokerto",
    detailInfo: "[Senin–Jumat] 07.00 – 21.00",
    priceRange: "Rp 18.000 – Rp 35.000",
    facilities: ["wifi", "parking"],
  },
  {
    name: "Sisi Timur Cafe",
    description:
      "Cafe dengan jendela besar menghadap timur, cahaya pagi yang masuk bikin suasana nyaman.",
    imageUrl: advoImg,
    address: "Jl. KH Ahmad Dahlan No.19, Purwokerto",
    detailInfo: "[Senin–Sabtu] 09.00 – 22.00",
    priceRange: "Rp 20.000 – Rp 45.000",
    facilities: ["wifi", "socket", "ac"],
  },
  {
    name: "Kopi Kolektif",
    description:
      "Co-working cafe yang menyediakan ruang kerja bersama dengan fasilitas lengkap.",
    imageUrl: calfImg,
    address: "Jl. Tentara Pelajar No.2, Purwokerto",
    detailInfo: "[Senin–Minggu] 09.00 – 22.00",
    priceRange: "Rp 25.000 – Rp 60.000",
    facilities: ["wifi", "socket", "ac", "parking"],
  },
  {
    name: "Ruang Teduh",
    description:
      "Cafe dengan interior earthy tone dan musik lembut, cocok untuk yang cari ketenangan.",
    imageUrl: coldbrewImg,
    address: "Jl. Merdeka No.17, Purwokerto",
    detailInfo: "[Senin–Minggu] 10.00 – 22.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["wifi", "socket"],
  },
  {
    name: "Kopi Kampus",
    description:
      "Cafe dekat kampus dengan harga ramah mahasiswa dan banyak colokan di setiap meja.",
    imageUrl: advoImg,
    address: "Jl. Kampus Raya No.1, Purwokerto",
    detailInfo: "[Senin–Sabtu] 09.00 – 23.00",
    priceRange: "Rp 15.000 – Rp 30.000",
    facilities: ["wifi", "socket", "parking"],
  },
  {
    name: "Sore di Kota",
    description:
      "Cafe dengan view jalan utama, enak buat menikmati suasana kota menjelang malam.",
    imageUrl: calfImg,
    address: "Jl. Jend. Gatot Subroto No.8, Purwokerto",
    detailInfo: "[Senin–Minggu] 16.00 – 23.00",
    priceRange: "Rp 22.000 – Rp 45.000",
    facilities: ["wifi", "ac", "parking"],
  },
  {
    name: "Garden Brew",
    description:
      "Cafe bernuansa taman dengan banyak tanaman dan area duduk outdoor hijau.",
    imageUrl: coldbrewImg,
    address: "Jl. Beji No.29, Purwokerto",
    detailInfo: "[Senin–Minggu] 10.00 – 22.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["wifi", "parking"],
  },
  {
    name: "Kopi Tengah Kota",
    description:
      "Lokasi strategis di pusat kota, mudah dijangkau dan dekat dengan banyak tempat menarik.",
    imageUrl: advoImg,
    address: "Jl. Raya Tengah No.3, Purwokerto",
    detailInfo: "[Senin–Minggu] 09.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 45.000",
    facilities: ["wifi", "socket", "ac"],
  },
  {
    name: "Senja & Rasa",
    description:
      "Cafe yang terkenal dengan menu kopi susu gula aren dan suasana senja yang hangat.",
    imageUrl: calfImg,
    address: "Jl. Kalibener No.11, Purwokerto",
    detailInfo: "[Senin–Minggu] 15.00 – 23.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["wifi", "socket"],
  },
  {
    name: "Kopi Tepi Sawah",
    description:
      "Cafe dengan pemandangan persawahan, cocok untuk melepas penat dari suasana kota.",
    imageUrl: advoImg,
    address: "Jl. Raya Patikraja No.5, Banyumas",
    detailInfo: "[Sabtu–Minggu] 09.00 – 21.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["wifi", "parking"],
  },
];

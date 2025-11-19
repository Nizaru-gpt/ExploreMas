import React, { useState } from "react";

// === IMPORT FOTO MANUAL DARI HERO ===
import calfImg from "../assets/images/hero/calf.jpg";
import coldbrewImg from "../assets/images/hero/coldbrew.jpg";
import advoImg from "../assets/images/hero/advo.jpg";

// === TYPE DATA ===
type Facility = "wifi" | "socket" | "ac" | "24h" | "parking";

interface Cafe {
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  detailInfo: string;
  priceRange: string;
  facilities: Facility[];
}

// === DATA 20 CAFE ===
const cafes: Cafe[] = [
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

// === LABEL & ICON ===
const facilityLabel: Record<Facility, string> = {
  wifi: "Wifi Gratis",
  socket: "Colokan",
  ac: "AC",
  "24h": "24 Jam",
  parking: "Parkir",
};

const facilityIcon: Record<Facility, string> = {
  wifi: "📶",
  socket: "🔌",
  ac: "❄️",
  "24h": "🕒",
  parking: "🅿️",
};

const allFacilityFilters: Facility[] = ["wifi", "24h", "socket", "ac", "parking"];

const CafeRecommendation: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Facility | null>(null);

  const filteredCafes = cafes.filter((cafe) => {
    const matchSearch =
      cafe.name.toLowerCase().includes(search.toLowerCase()) ||
      cafe.description.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      !activeFilter || cafe.facilities.includes(activeFilter);

    return matchSearch && matchFilter;
  });

  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#001845]">
          Cafe Recommendation
        </h1>
        <p className="mt-2 text-slate-600">
          Discover the finest coffee spots in Purwokerto
        </p>

        {/* SEARCH */}
        <div className="mt-6 w-full rounded-full border border-slate-300 bg-white px-6 py-3 flex items-center gap-3 shadow-sm">
          <span className="text-lg">🔍</span>
          <input
            type="text"
            placeholder="Cari cafe favorit kamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm md:text-base text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* FILTER */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allFacilityFilters.map((f) => (
            <button
              key={f}
              onClick={() =>
                setActiveFilter(activeFilter === f ? null : f)
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                activeFilter === f
                  ? "bg-[#001845] text-white border-[#001845]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
              }`}
            >
              {facilityIcon[f]} {facilityLabel[f]}
            </button>
          ))}
        </div>

        {/* LIST: 1 → 2 → 4 kolom */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCafes.map((cafe) => (
            <div
              key={cafe.name}
              className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden"
            >
              <img src={cafe.imageUrl} className="w-full h-64 object-cover" />

              <div className="px-6 pt-5 pb-6">
                <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">
                  {cafe.name}
                </h2>

                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {cafe.description}
                </p>

                <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                  <p>📍 {cafe.address}</p>
                  <p>🕒 {cafe.detailInfo}</p>
                  <p>💸 {cafe.priceRange}</p>
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
                  {cafe.facilities.map((f) => (
                    <div
                      key={f}
                      className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
                    >
                      {facilityIcon[f]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredCafes.length === 0 && (
            <p className="col-span-full text-center text-slate-500 mt-6">
              Cafe tidak ditemukan. Coba kata kunci atau filter lain.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafeRecommendation;

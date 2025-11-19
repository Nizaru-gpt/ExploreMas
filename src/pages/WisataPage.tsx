// src/pages/WisataPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaParking,
  FaMoneyBillAlt,
  FaCamera,
  FaLeaf,
  FaWater,
} from "react-icons/fa";

// === IMPORT GAMBAR WISATA ===
import cipendokImg from "../assets/images/wisata/cipendok.jpg";
import jenggalaImg from "../assets/images/wisata/jenggala.jpg";
import owabongImg from "../assets/images/wisata/owabong.jpg";

// === TIPE DATA ===
type WisataTag = "parking" | "cheap" | "instagrammable" | "nature" | "waterpark";

interface Wisata {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  openingHours: string;
  priceRange: string;
  tags: WisataTag[];
}

// === DATA WISATA ===
const wisataList: Wisata[] = [
  {
    id: "curug-cipendok",
    name: "Curug Cipendok",
    description:
      "Air terjun tertinggi di Banyumas dengan ketinggian sekitar 92 meter. Spot foto keren dengan udara sejuk dan suasana alam yang masih asri.",
    imageUrl: cipendokImg,
    address:
      "Dusun III Lebaksiu, Karanganyar, Kec. Cilongok, Kabupaten Banyumas",
    openingHours: "Setiap hari · 08.30 – 16.30",
    priceRange: "Rp 10.000 – 20.000",
    tags: ["parking", "instagrammable", "nature", "cheap"],
  },
  {
    id: "wisata-alam-jenggala",
    name: "Wisata Alam Jenggala",
    description:
      "Wisata alam dengan air terjun mini, aliran sungai jernih, dan suasana rimbun. Cocok untuk wisata keluarga dan hunting foto alam.",
    imageUrl: jenggalaImg,
    address:
      "Jl. Pangeran Limboro, Dusun III Kalipagu, Ketenger, Kec. Baturraden",
    openingHours: "Setiap hari · 07.30 – 18.00",
    priceRange: "Rp 15.000 – 30.000",
    tags: ["parking", "instagrammable", "nature"],
  },
  {
    id: "owabong-water-park",
    name: "Owabong Water Park",
    description:
      "Taman bermain air populer dengan beragam wahana seluncuran, kolam arus, dan area bermain anak. Cocok untuk liburan keluarga.",
    imageUrl: owabongImg,
    address: "Jl. Raya Owabong No.1, Dusun 2, Bojongsari, Kec. Bojongsari",
    openingHours: "Setiap hari · 07.00 – 19.00",
    priceRange: "Rp 21.000 – 25.000",
    tags: ["parking", "instagrammable", "waterpark"],
  },
];

// === LABEL & ICON TAG ===
const tagConfig: Record<
  WisataTag,
  { label: string; icon: React.ReactNode }
> = {
  parking: { label: "Parkir", icon: <FaParking /> },
  cheap: { label: "Murah", icon: <FaMoneyBillAlt /> },
  instagrammable: { label: "Instagrammable", icon: <FaCamera /> },
  nature: { label: "Wisata Alam", icon: <FaLeaf /> },
  waterpark: { label: "Waterpark", icon: <FaWater /> },
};

const allTagFilters: WisataTag[] = [
  "parking",
  "cheap",
  "instagrammable",
  "nature",
  "waterpark",
];

const WisataPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<WisataTag | null>(null);

  const filteredWisata = wisataList.filter((w) => {
    const matchSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());

    const matchTag = !activeTag || w.tags.includes(activeTag);

    return matchSearch && matchTag;
  });

  return (
    // SECTION FULL-WIDTH, BACKGROUND SAMA DENGAN CAFE (bg-pageRadial)
    <section id="wisata" className="bg-pageRadial">
      <div className="flex justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-6xl">
          {/* HEADER */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#001845]">
            Nature &amp; Tourism
          </h1>
          <p className="mt-2 text-slate-600">
            Explore the natural beauty of Purwokerto
          </p>

          {/* SEARCH BAR */}
          <div className="mt-6 w-full rounded-full border border-slate-300 bg-white px-6 py-3 flex items-center gap-3 shadow-sm">
            <span className="text-lg">🔍</span>
            <input
              type="text"
              placeholder="Cari destinasi favorit kamu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm md:text-base text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* FILTER TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allTagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag(activeTag === tag ? null : tag)
                }
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                  activeTag === tag
                    ? "bg-[#001845] text-white border-[#001845]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
                }`}
              >
                <span className="text-sm">{tagConfig[tag].icon}</span>
                <span>{tagConfig[tag].label}</span>
              </button>
            ))}
          </div>

          {/* LIST WISATA – SLIDER HORIZONTAL */}
          <div className="mt-10 overflow-x-auto no-scrollbar">
            <div className="flex gap-6">
              {filteredWisata.map((w) => (
                <Link
                  key={w.id}
                  to={`/wisata/${w.id}`}
                  className="
                    bg-white rounded-[32px]
                    shadow-[0_20px_60px_rgba(15,23,42,0.16)]
                    overflow-hidden
                    hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.20)]
                    transition
                    min-w-[260px] sm:min-w-[300px] lg:min-w-[340px]
                  "
                >
                  <img
                    src={w.imageUrl}
                    alt={w.name}
                    className="w-full h-64 object-cover"
                  />

                  <div className="px-6 pt-5 pb-6">
                    <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">
                      {w.name}
                    </h2>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {w.description}
                    </p>

                    <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                      <p>📍 {w.address}</p>
                      <p>🕒 {w.openingHours}</p>
                      <p>💸 {w.priceRange}</p>
                    </div>

                    {/* ICONS BAWAH CARD */}
                    <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
                      {w.tags.map((tag) => (
                        <div
                          key={tag}
                          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs"
                        >
                          {tagConfig[tag].icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}

              {filteredWisata.length === 0 && (
                <p className="text-center text-slate-500 mt-6">
                  Tempat wisata tidak ditemukan. Coba kata kunci atau filter lain.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WisataPage;

import React, { useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  FaParking,
  FaMoneyBillAlt,
  FaCamera,
  FaLeaf,
  FaWater,
  FaBookOpen,
} from "react-icons/fa";

// ✅ pakai api.ts kamu
import { api } from "../lib/api";

// === TIPE FILTER/TAG (UI tetap sama) ===
type WisataTag =
  | "parking"
  | "cheap"
  | "instagrammable"
  | "nature"
  | "waterpark"
  | "education";

type ApiWisataRow = {
  id: number;
  nama_tempat: string;
  kategori: string;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;
  htm: number;
  link_gmaps: string;
  link_foto: string; // bisa base64 data:image/... atau url
  deskripsi?: string;
};

type WisataCard = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  openingHours: string;
  priceRange: string;
  tags: WisataTag[];
  kategoriSource: "alam" | "pendidikan";
};

const tagConfig: Record<WisataTag, { label: string; icon: React.ReactNode }> = {
  parking: { label: "Parkir", icon: <FaParking /> },
  cheap: { label: "Murah", icon: <FaMoneyBillAlt /> },
  instagrammable: { label: "Instagrammable", icon: <FaCamera /> },
  nature: { label: "Wisata Alam", icon: <FaLeaf /> },
  waterpark: { label: "Waterpark", icon: <FaWater /> },
  education: { label: "Edukasi", icon: <FaBookOpen /> },
};

const allTagFilters: WisataTag[] = [
  "parking",
  "cheap",
  "instagrammable",
  "nature",
  "waterpark",
  "education",
];

const fmtPrice = (htm: number) => {
  if (htm == null || htm < 0) return "—";
  if (htm === 0) return "Gratis";
  return `Rp ${htm.toLocaleString("id-ID")}`;
};

// heuristik tags biar filter & icon bawah card tetap “hidup”
const deriveTags = (
  row: ApiWisataRow,
  source: "alam" | "pendidikan"
): WisataTag[] => {
  const name = (row.nama_tempat || "").toLowerCase();
  const tags: WisataTag[] = [];

  if (source === "alam") tags.push("nature");
  if (source === "pendidikan") tags.push("education");

  if (row.htm >= 0 && row.htm <= 20000) tags.push("cheap");

  if (name.includes("water") || name.includes("owabong") || name.includes("kolam")) {
    tags.push("waterpark");
  }

  tags.push("parking");
  tags.push("instagrammable");

  return Array.from(new Set(tags));
};

const WisataPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<WisataTag | null>(null);
  const [rows, setRows] = useState<WisataCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // === DRAG SCROLL ===
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startXRef.current = e.clientX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const dx = e.clientX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - dx;
  };

  const handleMouseUpOrLeave = () => {
    if (!scrollRef.current) return;
    isDraggingRef.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setErr(null);

        // ✅ pakai api.ts (base dari VITE_API_BASE_URL)
        const [alam, pendidikan] = await Promise.all([
          api.get<ApiWisataRow[]>("/wisata_alam"),
          api.get<ApiWisataRow[]>("/wisata_pendidikan"),
        ]);

        const mapped: WisataCard[] = [
          ...(alam || []).map((r) => ({
            id: r.id,
            name: r.nama_tempat,
            description: r.deskripsi || "-",
            imageUrl: r.link_foto || "",
            address: r.alamat || "-",
            openingHours: `${r.jam_buka || "-"} – ${r.jam_tutup || "-"}`,
            priceRange: fmtPrice(r.htm),
            tags: deriveTags(r, "alam"),
            kategoriSource: "alam" as const,
          })),
          ...(pendidikan || []).map((r) => ({
            id: r.id,
            name: r.nama_tempat,
            description: r.deskripsi || "-",
            imageUrl: r.link_foto || "",
            address: r.alamat || "-",
            openingHours: `${r.jam_buka || "-"} – ${r.jam_tutup || "-"}`,
            priceRange: fmtPrice(r.htm),
            tags: deriveTags(r, "pendidikan"),
            kategoriSource: "pendidikan" as const,
          })),
        ];

        mapped.sort((a, b) => a.id - b.id);

        if (!cancelled) setRows(mapped);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Gagal ambil data wisata");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredWisata = useMemo(() => {
    return rows.filter((w) => {
      const matchSearch =
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.description.toLowerCase().includes(search.toLowerCase());

      const matchTag = !activeTag || w.tags.includes(activeTag);

      return matchSearch && matchTag;
    });
  }, [rows, search, activeTag]);

  return (
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
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
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

          {loading && <p className="mt-8 text-slate-600">Loading wisata...</p>}

          {err && !loading && (
            <p className="mt-8 text-red-600">Gagal ambil data: {err}</p>
          )}

          {!loading && !err && (
            <div
              ref={scrollRef}
              className="mt-10 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-6 overflow-x-auto pb-6 pr-6 cursor-grab select-none hide-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {filteredWisata.map((w) => (
                <Link
                  key={`${w.kategoriSource}-${w.id}`}
                  to={`/wisata/${w.id}`}
                  className="block rounded-[32px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001845]"
                >
                  <article className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.20)] transition">
                    <img
                      src={w.imageUrl}
                      alt={w.name}
                      className="w-full h-64 object-cover"
                    />

                    <div className="px-6 pt-5 pb-6 flex flex-1 flex-col">
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

                      <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3 mt-auto">
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
                  </article>
                </Link>
              ))}

              {filteredWisata.length === 0 && (
                <p className="text-center text-slate-500 mt-6">
                  Tempat wisata tidak ditemukan. Coba kata kunci atau filter lain.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WisataPage;

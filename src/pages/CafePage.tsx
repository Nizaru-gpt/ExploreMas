// src/pages/CafePage.tsx
import React, { useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";

// React Icons
import { FiWifi } from "react-icons/fi";
import { PiPlugBold } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaParking, FaBookOpen } from "react-icons/fa";

type Facility = "wifi" | "socket" | "ac" | "24h" | "parking" | "studyFriendly";

type ApiItem = Record<string, any>;

type CafeUI = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  detailInfo: string;
  priceRange: string;
  facilities: Facility[];
  kategori: "tempat nongkrong" | "kuliner" | string;
};

// === LABEL & ICON ===
const facilityLabel: Record<Facility, string> = {
  wifi: "Wifi Gratis",
  socket: "Colokan",
  ac: "AC",
  "24h": "24 Jam",
  parking: "Parkir",
  studyFriendly: "Nugas Friendly",
};

const facilityIcon: Record<Facility, React.ReactNode> = {
  wifi: <FiWifi />,
  socket: <PiPlugBold />,
  ac: <TbAirConditioning />,
  "24h": <MdAccessTimeFilled />,
  parking: <FaParking />,
  studyFriendly: <FaBookOpen />,
};

const allFacilityFilters: Facility[] = ["wifi", "24h", "socket", "ac", "parking", "studyFriendly"];

// buat slug dari nama cafe
const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const pickString = (obj: Record<string, any>, keys: string[], fallback = "") => {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return fallback;
};

const formatRupiah = (value: any) => {
  if (typeof value === "number") return `Rp ${value.toLocaleString("id-ID")}`;
  const s = String(value ?? "").trim();
  if (!s) return "";
  const n = Number(s);
  if (!Number.isNaN(n)) return `Rp ${n.toLocaleString("id-ID")}`;
  return s;
};

const mapCafe = (raw: ApiItem, idx: number): CafeUI => {
  const name = pickString(raw, ["nama_tempat", "name", "nama", "judul", "title"], `Cafe ${idx + 1}`);
  const id = String(raw.id ?? raw.uuid ?? raw.slug ?? raw.nama_tempat ?? slugify(name) ?? idx);

  const kategori = pickString(raw, ["kategori"], "tempat nongkrong");

  const jamBuka = pickString(raw, ["jam_buka", "opening_hours", "openingHours", "jam"], "");
  const jamTutup = pickString(raw, ["jam_tutup"], "");
  const detailInfo = jamBuka && jamTutup ? `${jamBuka} – ${jamTutup}` : jamBuka || "";

  const description =
    pickString(raw, ["deskripsi", "description", "desc"], "") || `Kategori: ${kategori}`;

  const imageUrl = pickString(raw, ["link_foto", "imageUrl", "image", "gambar", "foto"], "");

  const address = pickString(raw, ["alamat", "address", "lokasi"], "");

  const priceRange = formatRupiah(raw?.htm ?? raw?.harga ?? raw?.tiket);

  // facilities: backend belum ada => kosong
  const facilities: Facility[] = [];

  return {
    id,
    name,
    description,
    imageUrl,
    address,
    detailInfo,
    priceRange,
    facilities,
    kategori,
  };
};

const CafePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Facility[]>([]);

  // FILTER KATEGORI: Nongkrong / Kuliner
  const [activeKategori, setActiveKategori] = useState<"tempat nongkrong" | "kuliner" | null>(null);

  const [cafes, setCafes] = useState<CafeUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // === DRAG SCROLL STATE ===
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

  // === FETCH (gabung tempat_nongkrong + kuliner) ===
  useEffect(() => {
    let alive = true;

    const normalizeToArray = (data: any): ApiItem[] => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;
      if (data) return [data];
      return [];
    };

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const [resNongkrong, resKuliner] = await Promise.all([
          fetch("/api/tempat_nongkrong"),
          fetch("/api/get_kuliner"),
        ]);

        if (!resNongkrong.ok) throw new Error(`Gagal fetch tempat_nongkrong: ${resNongkrong.status}`);
        if (!resKuliner.ok) throw new Error(`Gagal fetch kuliner: ${resKuliner.status}`);

        const dataNongkrong = normalizeToArray(await resNongkrong.json());
        const dataKuliner = normalizeToArray(await resKuliner.json());

        const merged = [...dataNongkrong, ...dataKuliner].map(mapCafe);

        if (!alive) return;
        setCafes(merged);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Terjadi error saat mengambil data cafe/kuliner.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  // === MULTI FILTER fasilitas (UI asli) ===
  const toggleFilter = (f: Facility) => {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const hasFacilitiesData = useMemo(() => cafes.some((c) => c.facilities && c.facilities.length > 0), [cafes]);

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      const matchSearch =
        cafe.name.toLowerCase().includes(search.toLowerCase()) ||
        cafe.description.toLowerCase().includes(search.toLowerCase());

      // kategori filter (utama)
      const kategoriLower = (cafe.kategori || "").toLowerCase();
      const matchKategori = !activeKategori || kategoriLower === activeKategori;

      // fasilitas filter (hanya aktif kalau datanya ada)
      const matchFilter =
        activeFilters.length === 0 ||
        (hasFacilitiesData && activeFilters.every((f) => cafe.facilities.includes(f)));

      return matchSearch && matchKategori && matchFilter;
    });
  }, [cafes, search, activeKategori, activeFilters, hasFacilitiesData]);

  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#001845]">
          Cafe Recommendation
        </h1>
        <p className="mt-2 text-slate-600">Discover the finest coffee spots in Purwokerto</p>

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

        {/* FILTER KATEGORI (NONGKRONG / KULINER) */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveKategori(activeKategori === "tempat nongkrong" ? null : "tempat nongkrong")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
              activeKategori === "tempat nongkrong"
                ? "bg-[#001845] text-white border-[#001845]"
                : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
            }`}
          >
            Tempat Nongkrong
          </button>

          <button
            onClick={() => setActiveKategori(activeKategori === "kuliner" ? null : "kuliner")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
              activeKategori === "kuliner"
                ? "bg-[#001845] text-white border-[#001845]"
                : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
            }`}
          >
            Kuliner
          </button>
        </div>

        {/* FILTER fasilitas (UI asli tetap tampil) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {allFacilityFilters.map((f) => {
            const isActive = activeFilters.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                  isActive
                    ? "bg-[#001845] text-white border-[#001845]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
                }`}
                title={!hasFacilitiesData ? "Fasilitas belum tersedia di data backend" : ""}
              >
                {facilityIcon[f]} {facilityLabel[f]}
              </button>
            );
          })}
        </div>

        {/* STATUS */}
        {loading && <p className="mt-6 text-slate-600">Memuat data cafe/kuliner dari database...</p>}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <div className="mt-1 text-xs text-red-600">
              Cek: backend nyala, endpoint benar, dan proxy vite sudah jalan.
            </div>
          </div>
        )}

        {/* LIST */}
        {!loading && !error && (
          <div
            ref={scrollRef}
            className="mt-10 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-6 overflow-x-auto pb-6 pr-6 cursor-grab select-none hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {filteredCafes.map((cafe) => {
              const slug = slugify(cafe.name);

              return (
                <Link
                  key={cafe.id}
                  to={`/cafes/${slug}`}
                  className="block rounded-[32px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001845]"
                >
                  <article className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-full">
                    <img
                      src={cafe.imageUrl || "https://placehold.co/800x600?text=Cafe"}
                      className="w-full h-64 object-cover"
                      alt={cafe.name}
                      loading="lazy"
                    />

                    <div className="px-6 pt-5 pb-6 flex flex-1 flex-col">
                      <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">
                        {cafe.name}
                      </h2>

                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                        {cafe.description || "Belum ada deskripsi."}
                      </p>

                      <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                        <p>📍 {cafe.address}</p>
                        {cafe.detailInfo && <p>🕒 {cafe.detailInfo}</p>}
                        {cafe.priceRange && <p>💸 {cafe.priceRange}</p>}
                      </div>

                      {/* fasilitas bawah (kalau kosong, tetap tampil 1 ikon biar layout sama) */}
                      <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3 mt-auto">
                        {(cafe.facilities.length > 0 ? cafe.facilities : ["wifi" as Facility]).map((f) => (
                          <div
                            key={f}
                            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
                            title={facilityLabel[f]}
                          >
                            {facilityIcon[f]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}

            {filteredCafes.length === 0 && (
              <p className="text-center text-slate-500 mt-6">
                Cafe tidak ditemukan. Coba kata kunci atau filter lain.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CafePage;

import React, { useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";

// React Icons
import { FiWifi } from "react-icons/fi";
import { PiPlugBold } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaParking, FaBookOpen } from "react-icons/fa";

// ✅ pakai api.ts kamu
import { api } from "../lib/api";

// ====== TYPES (samain dengan FE kamu) ======
export type Facility = "wifi" | "socket" | "ac" | "24h" | "parking" | "studyFriendly";

// ====== LABEL & ICON (tetap) ======
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

// ✅ filter baru
type ListingMode = "cafe" | "kuliner";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ====== API TYPES (BE) ======
type TempatNongkrongApi = {
  id: number;
  nama_tempat: string;
  kategori: string;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;

  // ✅ legacy
  htm: number;

  // ✅ range baru
  htm_min?: number | null;
  htm_max?: number | null;

  link_gmaps: string;
  link_foto: string;
  deskripsi?: string | null;

  fasilitas?: string[] | null;
  menu_populer?: string[] | null;
  cocok_untuk?: string[] | null;

  trans_kode?: string | null;
  trans_jarak_meter?: number | null;
  trans_tarif_min?: number | null;
  trans_tarif_max?: number | null;
  trans_rute?: string[] | null;
};

type KulinerApi = {
  id: number;
  nama_tempat: string;
  kategori: string;
  alamat: string;

  // ✅ legacy
  htm: number;

  // ✅ range baru
  htm_min?: number | null;
  htm_max?: number | null;

  link_gmaps: string;
  link_foto: string;
  deskripsi?: string | null;

  fasilitas?: string[] | null;
  menu_populer?: string[] | null;
  cocok_untuk?: string[] | null;
  jam_buka?: string | null;
  jam_tutup?: string | null;

  trans_kode?: string | null;
  trans_jarak_meter?: number | null;
  trans_tarif_min?: number | null;
  trans_tarif_max?: number | null;
  trans_rute?: string[] | null;
};

// ====== UI MODEL ======
type CafeUI = {
  id: number;
  name: string;
  description: string;
  address: string;
  detailInfo: string;
  priceRange: string;
  imageUrl: string;
  facilities: Facility[];
  _type: ListingMode;
};

// ✅ formatter harga range (baru) + fallback legacy
const formatPriceRange = (min?: number | null, max?: number | null, legacyHtm?: number | null) => {
  const hasMin = typeof min === "number" && Number.isFinite(min);
  const hasMax = typeof max === "number" && Number.isFinite(max);

  const fmt = (n: number) => {
    try {
      return n.toLocaleString("id-ID");
    } catch {
      return String(n);
    }
  };

  // kalau ada range
  if (hasMin && hasMax) {
    if (min === 0 && max === 0) return "Gratis";
    if (min === max) return min === 0 ? "Gratis" : `Rp ${fmt(min)}`;
    return `Rp ${fmt(min)} - ${fmt(max)}`;
  }

  // fallback ke legacy htm
  const v = typeof legacyHtm === "number" && Number.isFinite(legacyHtm) ? legacyHtm : 0;
  if (v === 0) return "Gratis";
  if (v < 0) return "-";
  return `Rp ${fmt(v)}`;
};

// ====== infer fasilitas dari teks (fallback) ======
const inferFacilities = (text: string): Facility[] => {
  const t = (text || "").toLowerCase();
  const facilities: Facility[] = [];

  const has = (re: RegExp) => re.test(t);

  if (has(/\bwifi\b|wi-?fi|internet/)) facilities.push("wifi");
  if (has(/\bsocket\b|colokan|charger|charging|stopkontak/)) facilities.push("socket");
  if (has(/\bac\b|air\s?cond|air\s?conditioning|dingin/)) facilities.push("ac");
  if (has(/24\s?jam|24h|buka\s?24/)) facilities.push("24h");
  if (has(/\bparkir\b|parking/)) facilities.push("parking");
  if (has(/nugas|belajar|study|work|laptop|cowork/)) facilities.push("studyFriendly");

  if (facilities.length === 0) facilities.push("wifi", "socket");
  return Array.from(new Set(facilities));
};

// ✅ normalize fasilitas dari API (kalau ada)
const normalizeFacilitiesFromApi = (raw?: string[] | null, fallbackText?: string): Facility[] => {
  const allowed = new Set<Facility>(allFacilityFilters);

  if (Array.isArray(raw) && raw.length > 0) {
    const mapped = raw
      .map((x) => String(x).trim())
      .filter(Boolean)
      .map((x) => x as Facility)
      .filter((x) => allowed.has(x));

    if (mapped.length > 0) return Array.from(new Set(mapped));
  }

  // fallback kalau DB belum ada fasilitas
  return inferFacilities(fallbackText || "");
};

const CafePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Facility[]>([]);

  // ✅ filter baru: mode
  const [mode, setMode] = useState<ListingMode>("cafe");

  const [cafes, setCafes] = useState<CafeUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // === DRAG SCROLL STATE (tetap) ===
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

  const toggleFilter = (f: Facility) => {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  // ====== FETCH DATA (pakai api.ts) ======
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErr(null);

      try {
        if (mode === "cafe") {
          const rows = await api.get<TempatNongkrongApi[]>("/tempat_nongkrong");

          const mapped: CafeUI[] = rows.map((r) => {
            const name = r.nama_tempat ?? "-";
            const desc = (r.deskripsi ?? "") || "";
            const textForFacility = `${name} ${desc} ${r.kategori ?? ""}`;

            return {
              id: r.id,
              name,
              description: desc || "-",
              address: r.alamat ?? "-",
              detailInfo: `${r.jam_buka ?? "-"} - ${r.jam_tutup ?? "-"}`,
              // ✅ pakai range dulu, fallback ke htm
              priceRange: formatPriceRange(r.htm_min, r.htm_max, r.htm),
              imageUrl: r.link_foto || "https://via.placeholder.com/640x400?text=No+Image",
              facilities: normalizeFacilitiesFromApi(r.fasilitas, textForFacility),
              _type: "cafe",
            };
          });

          if (!cancelled) setCafes(mapped);
        } else {
          const rows = await api.get<KulinerApi[]>("/kuliner");

          const mapped: CafeUI[] = rows.map((r) => {
            const name = r.nama_tempat ?? "-";
            const desc = (r.deskripsi ?? "") || "";
            const textForFacility = `${name} ${desc} ${r.kategori ?? ""}`;

            const jb = r.jam_buka ?? "-";
            const jt = r.jam_tutup ?? "-";

            return {
              id: r.id,
              name,
              description: desc || "-",
              address: r.alamat ?? "-",
              detailInfo: `${jb} - ${jt}`,
              // ✅ pakai range dulu, fallback ke htm
              priceRange: formatPriceRange(r.htm_min, r.htm_max, r.htm),
              imageUrl: r.link_foto || "https://via.placeholder.com/640x400?text=No+Image",
              facilities: normalizeFacilitiesFromApi(r.fasilitas, textForFacility),
              _type: "kuliner",
            };
          });

          if (!cancelled) setCafes(mapped);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Gagal fetch data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode]);

  // ====== FILTERED (tetap) ======
  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      const matchSearch =
        cafe.name.toLowerCase().includes(search.toLowerCase()) ||
        cafe.description.toLowerCase().includes(search.toLowerCase());

      const matchFilter = activeFilters.length === 0 || activeFilters.every((f) => cafe.facilities.includes(f));

      return matchSearch && matchFilter;
    });
  }, [cafes, search, activeFilters]);

  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#001845]">Cafe Recommendation</h1>
        <p className="mt-2 text-slate-600">Discover the finest coffee spots in Purwokerto</p>

        {loading && <p className="mt-3 text-sm text-slate-500">Mengambil data dari server...</p>}
        {err && <p className="mt-3 text-sm text-red-600">Gagal ambil data: {err}</p>}

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

        {/* ✅ FILTER MODE */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setMode("cafe")}
            className={`rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
              mode === "cafe"
                ? "bg-[#001845] text-white border-[#001845]"
                : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
            }`}
          >
            Cafe
          </button>
          <button
            onClick={() => setMode("kuliner")}
            className={`rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
              mode === "kuliner"
                ? "bg-[#001845] text-white border-[#001845]"
                : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
            }`}
          >
            Kuliner
          </button>
        </div>

        {/* FILTER fasilitas */}
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
              >
                {facilityIcon[f]} {facilityLabel[f]}
              </button>
            );
          })}
        </div>

        {/* LIST */}
        <div
          ref={scrollRef}
          className="mt-10 grid grid-flow-col auto-cols-[260px] sm:auto-cols-[300px] lg:auto-cols-[320px] gap-6 overflow-x-auto pb-6 pr-6 cursor-grab select-none hide-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {filteredCafes.map((cafe) => {
            const slug = slugify(cafe.name);
            const to = `/cafes/${slug}?type=${cafe._type}`;

            return (
              <Link
                key={`${cafe._type}-${cafe.id}`}
                to={to}
                className="block rounded-[32px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001845]"
              >
                <article className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-full">
                  <img src={cafe.imageUrl} className="w-full h-64 object-cover" alt={cafe.name} />

                  <div className="px-6 pt-5 pb-6 flex flex-1 flex-col">
                    <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">{cafe.name}</h2>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{cafe.description}</p>

                    <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                      <p>📍 {cafe.address}</p>
                      <p>🕒 {cafe.detailInfo}</p>
                      <p>💸 {cafe.priceRange}</p>
                    </div>

                    <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3 mt-auto">
                      {cafe.facilities.map((f) => (
                        <div
                          key={f}
                          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
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

          {!loading && filteredCafes.length === 0 && (
            <p className="text-center text-slate-500 mt-6">Data tidak ditemukan. Coba kata kunci atau filter lain.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafePage;

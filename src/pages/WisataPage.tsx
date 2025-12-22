// src/pages/WisataPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaParking, FaMoneyBillAlt, FaCamera, FaLeaf, FaWater } from "react-icons/fa";

// === TIPE DATA TAG (UI asli tetap) ===
type WisataTag = "parking" | "cheap" | "instagrammable" | "nature" | "waterpark";

// === TIPE DATA UI ===
interface Wisata {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  openingHours: string;
  priceRange: string;
  tags: WisataTag[];
  kategori: "wisata alam" | "wisata pendidikan" | string;
}

type ApiItem = Record<string, any>;

// === LABEL & ICON TAG (UI asli tetap) ===
const tagConfig: Record<WisataTag, { label: string; icon: React.ReactNode }> = {
  parking: { label: "Parkir", icon: <FaParking /> },
  cheap: { label: "Murah", icon: <FaMoneyBillAlt /> },
  instagrammable: { label: "Instagrammable", icon: <FaCamera /> },
  nature: { label: "Wisata Alam", icon: <FaLeaf /> },
  waterpark: { label: "Waterpark", icon: <FaWater /> },
};

const allTagFilters: WisataTag[] = ["parking", "cheap", "instagrammable", "nature", "waterpark"];

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

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// map item BE -> UI
const mapWisata = (raw: ApiItem, idx: number): Wisata => {
  const name = pickString(raw, ["nama_tempat", "name", "nama", "judul", "title"], `Wisata ${idx + 1}`);
  const id = String(raw.id ?? raw.uuid ?? raw.slug ?? raw.nama_tempat ?? slugify(name) ?? idx);

  const kategori = pickString(raw, ["kategori"], "wisata alam");

  const jamBuka = pickString(raw, ["jam_buka", "openingHours", "opening_hours", "jam"], "");
  const jamTutup = pickString(raw, ["jam_tutup"], "");
  const openingHours = jamBuka && jamTutup ? `${jamBuka} – ${jamTutup}` : jamBuka || "";

  // Backend kamu tidak punya deskripsi => fallback kategori biar tidak kosong
  const description =
    pickString(raw, ["deskripsi", "description", "desc"], "") || `Kategori: ${kategori}`;

  const imageUrl = pickString(raw, ["link_foto", "imageUrl", "image", "gambar", "foto"], "");

  const address = pickString(raw, ["alamat", "address", "lokasi"], "");

  const priceRange = formatRupiah(raw?.htm ?? raw?.harga ?? raw?.tiket);

  // tags: backend belum ada => kosongkan biar UI tetap aman
  const tags: WisataTag[] = [];

  return {
    id,
    name,
    description,
    imageUrl,
    address,
    openingHours,
    priceRange,
    tags,
    kategori,
  };
};

const WisataPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<WisataTag | null>(null);

  // FILTER KATEGORI YANG KAMU MAU: Alam vs Pendidikan
  const [activeKategori, setActiveKategori] = useState<"wisata alam" | "wisata pendidikan" | null>(null);

  const [wisataList, setWisataList] = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch: gabung wisata_alam + wisata_pendidikan
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

        const [resAlam, resPendidikan] = await Promise.all([
          fetch("/api/wisata_alam"),
          fetch("/api/wisata_pendidikan"),
        ]);

        if (!resAlam.ok) throw new Error(`Gagal fetch wisata_alam: ${resAlam.status}`);
        if (!resPendidikan.ok) throw new Error(`Gagal fetch wisata_pendidikan: ${resPendidikan.status}`);

        const dataAlam = normalizeToArray(await resAlam.json());
        const dataPendidikan = normalizeToArray(await resPendidikan.json());

        const merged = [...dataAlam, ...dataPendidikan].map(mapWisata);

        if (!alive) return;
        setWisataList(merged);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Terjadi error saat mengambil data wisata.");
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

  // ini tetap buat UI asli: kalau tags kosong, filter tag jangan bikin kosong
  const hasTagsData = useMemo(() => wisataList.some((w) => w.tags && w.tags.length > 0), [wisataList]);

  const filteredWisata = useMemo(() => {
    return wisataList.filter((w) => {
      const matchSearch =
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.description.toLowerCase().includes(search.toLowerCase());

      // TAG FILTER (hanya aktif jika datanya ada)
      const matchTag = !activeTag || (hasTagsData && w.tags.includes(activeTag));

      // KATEGORI FILTER (ALAM/PENDIDIKAN) -> ini yang utama & pasti jalan
      const kategoriLower = (w.kategori || "").toLowerCase();
      const matchKategori =
        !activeKategori || kategoriLower === activeKategori;

      return matchSearch && matchTag && matchKategori;
    });
  }, [wisataList, search, activeTag, hasTagsData, activeKategori]);

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

          {/* FILTER KATEGORI (ALAM / PENDIDIKAN) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveKategori(activeKategori === "wisata alam" ? null : "wisata alam")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                activeKategori === "wisata alam"
                  ? "bg-[#001845] text-white border-[#001845]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
              }`}
            >
              <FaLeaf className="text-sm" />
              Wisata Alam
            </button>

            <button
              onClick={() =>
                setActiveKategori(activeKategori === "wisata pendidikan" ? null : "wisata pendidikan")
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                activeKategori === "wisata pendidikan"
                  ? "bg-[#001845] text-white border-[#001845]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
              }`}
            >
              <FaCamera className="text-sm" />
              Wisata Pendidikan
            </button>
          </div>

          {/* FILTER TAGS (UI asli tetap) */}
          <div className="mt-3 flex flex-wrap gap-2">
            {allTagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                  activeTag === tag
                    ? "bg-[#001845] text-white border-[#001845]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-[#001845]"
                }`}
                title={!hasTagsData ? "Tag belum tersedia di data backend" : ""}
              >
                <span className="text-sm">{tagConfig[tag].icon}</span>
                <span>{tagConfig[tag].label}</span>
              </button>
            ))}
          </div>

          {/* STATUS */}
          {loading && <p className="mt-6 text-slate-600">Memuat data wisata dari database...</p>}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
              <div className="mt-1 text-xs text-red-600">
                Cek: backend nyala, endpoint benar, dan proxy vite sudah jalan.
              </div>
            </div>
          )}

          {/* LIST WISATA – SLIDER HORIZONTAL */}
          {!loading && !error && (
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
                      src={w.imageUrl || "https://placehold.co/800x600?text=Wisata"}
                      alt={w.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />

                    <div className="px-6 pt-5 pb-6">
                      <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">
                        {w.name}
                      </h2>

                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                        {w.description || "Belum ada deskripsi."}
                      </p>

                      <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                        <p>📍 {w.address}</p>
                        {w.openingHours && <p>🕒 {w.openingHours}</p>}
                        {w.priceRange && <p>💸 {w.priceRange}</p>}
                      </div>

                      {/* ICONS BAWAH CARD (UI asli, tapi aman kalau tags kosong) */}
                      <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
                        {(w.tags.length > 0 ? w.tags : ["nature" as WisataTag]).map((tag) => (
                          <div
                            key={tag}
                            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs"
                            title={tagConfig[tag].label}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default WisataPage;

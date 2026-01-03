import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCamera,
  FiUsers,
  FiFeather,
} from "react-icons/fi";

// ✅ pakai api.ts kamu
import { api } from "../lib/api";

type ApiWisataRow = {
  id: number;
  nama_tempat: string;
  kategori: string;
  alamat: string;
  jam_buka: string;
  jam_tutup: string;
  htm: number;
  link_gmaps: string;
  link_foto: string;
  deskripsi?: string;
};

type DetailUI = {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
  weekdayHours: string;
  weekendHours: string;
  priceRange: string;
  mapsUrl?: string;

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
};

const fmtPrice = (htm: number) => {
  if (htm == null || htm < 0) return "—";
  if (htm === 0) return "Gratis";
  return `Rp ${htm.toLocaleString("id-ID")}`;
};

const WisataDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [data, setData] = useState<DetailUI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!numericId) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);

        // ✅ pakai api.ts
        let row: ApiWisataRow | null = null;

        try {
          row = await api.get<ApiWisataRow>(`/wisata_alam/${numericId}`);
        } catch {
          row = await api.get<ApiWisataRow>(`/wisata_pendidikan/${numericId}`);
        }

        const hours = `${row.jam_buka || "-"} – ${row.jam_tutup || "-"}`;

        const ui: DetailUI = {
          id: row.id,
          name: row.nama_tempat,
          description: row.deskripsi || "-",
          image: row.link_foto || "",
          address: row.alamat || "-",
          weekdayHours: hours,
          weekendHours: hours,
          priceRange: fmtPrice(row.htm),
          mapsUrl: row.link_gmaps || undefined,

          // fallback UI biar ga berubah layout
          facilities: [
            "Area Parkir",
            "Spot Foto",
            "Toilet",
            "Mushola",
            "Warung/UMKM",
            "Akses Kendaraan",
          ],
          activities: [
            "Hunting Foto",
            "Jalan Santai",
            "Wisata Keluarga",
            "Menikmati Alam",
          ],
          goodFor: ["Keluarga", "Teman", "Healing", "Konten Foto"],
          featured: {
            natureView: true,
            familyFriendly: true,
            photoSpot: true,
            easyAccess: true,
          },
          trans: {
            corridor: "Koridor 1",
            distance: "± 10–20 menit",
            mainStop: "Halte Terdekat",
            routes: ["Terminal → Alun-alun → Lokasi"],
            fareMin: 3000,
            fareMax: 5000,
          },
        };

        if (!cancelled) setData(ui);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [numericId]);

  const featuredItems = [
    { key: "natureView" as const, label: "Pemandangan Alam Indah", icon: <FiFeather /> },
    { key: "familyFriendly" as const, label: "Ramah Keluarga", icon: <FiUsers /> },
    { key: "photoSpot" as const, label: "Spot Foto Keren", icon: <FiCamera /> },
    { key: "easyAccess" as const, label: "Akses Mudah", icon: <FiMapPin /> },
  ];

  const handleOpenMaps = () => {
    if (data?.mapsUrl) window.open(data.mapsUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            <FiArrowLeft className="text-slate-700" />
            <span>Kembali</span>
          </button>
          <p className="text-slate-700">Loading detail...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            <FiArrowLeft className="text-slate-700" />
            <span>Kembali</span>
          </button>
          <p className="text-slate-700">Destinasi wisata tidak ditemukan.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl lg:max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <FiArrowLeft className="text-slate-700" />
          <span>Kembali</span>
        </button>

        <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <div className="h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden">
              <img src={data.image} alt={data.name} className="h-full w-full object-cover" />
            </div>

            <div className="space-y-4 px-5 pb-6 pt-4 md:px-7 md:pb-7 md:pt-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                  Tentang Destinasi Ini
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {data.description}
                </p>
              </div>

              <hr className="border-slate-200" />

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{data.address}</p>
                </div>

                <div className="flex gap-3">
                  <FiClock className="mt-0.5 shrink-0 text-slate-500" />
                  <div>
                    <p>[Senin – Jumat] {data.weekdayHours}</p>
                    <p>[Sabtu – Minggu] {data.weekendHours}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiDollarSign className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{data.priceRange}</p>
                </div>
              </div>

              <hr className="border-slate-200" />

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">Fasilitas &amp; Fitur</h3>
                <div className="grid grid-cols-2 gap-2 text-[12px] md:grid-cols-3">
                  {data.facilities.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center justify-center rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-[11px] font-medium text-indigo-900"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">Aktivitas Populer</h3>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {data.activities.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">Cocok Untuk</h3>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {data.goodFor.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4 md:gap-5">
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Highlight Destinasi
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {featuredItems
                  .filter((item) => data.featured[item.key])
                  .map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm"
                    >
                      <span className="text-slate-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Akses Trans Banyumas
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                  {data.trans.corridor}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {data.trans.distance}
                </span>
              </div>

              <div className="space-y-1 text-sm text-slate-700">
                <p className="font-medium">{data.trans.mainStop}</p>
                <p className="text-[13px] text-slate-500">Rute :</p>
                <ul className="ml-4 list-disc space-y-1 text-[13px]">
                  {data.trans.routes.map((rute) => (
                    <li key={rute}>{rute}</li>
                  ))}
                </ul>
              </div>

              <hr className="my-3 border-slate-200" />

              <div className="flex items-center justify-between text-sm text-slate-800">
                <span>Tarif Trans :</span>
                <span>
                  Rp {data.trans.fareMin.toLocaleString("id-ID")} – Rp{" "}
                  {data.trans.fareMax.toLocaleString("id-ID")}
                </span>
              </div>
            </section>

            <section className="mt-1 rounded-3xl bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.10)] md:px-6">
              <button
                onClick={handleOpenMaps}
                className="mb-2 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800 disabled:opacity-60"
                disabled={!data.mapsUrl}
              >
                Buka di Maps
              </button>
              <button className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                Simpan ke Wishlist
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WisataDetail;

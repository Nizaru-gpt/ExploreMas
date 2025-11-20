// src/pages/CafeDetail.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiWifi,
  FiWind,
  FiZap,
  FiCamera,
} from "react-icons/fi";
import { cafeDetails } from "../data/cafeDetails";

const CafeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const cafe = cafeDetails.find((c) => c.slug === slug);

  if (!cafe) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto w-full max-w-5xl lg:max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            <FiArrowLeft className="text-slate-700" />
            <span>Kembali</span>
          </button>
          <p className="text-slate-700">Cafe tidak ditemukan.</p>
        </div>
      </main>
    );
  }

  const featuredItems = [
    { key: "ac" as const, label: "Air Conditioner (AC)", icon: <FiWind /> },
    { key: "wifi" as const, label: "Free Wifi", icon: <FiWifi /> },
    { key: "manySockets" as const, label: "Banyak Colokan", icon: <FiZap /> },
    { key: "instaSpot" as const, label: "Instagrammable", icon: <FiCamera /> },
  ];

  const handleOpenMaps = () => {
    if (cafe.mapsUrl) {
      window.open(cafe.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <FiArrowLeft className="text-slate-700" />
          <span>Kembali</span>
        </button>

        <div className="grid gap-5 md:gap-6 lg:gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* LEFT – info utama */}
          <section className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            {/* Hero image */}
            <div className="h-[220px] md:h-[260px] lg:h-[280px] overflow-hidden">
              <img
                src={cafe.image}
                alt={cafe.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 px-5 pb-6 pt-4 md:px-7 md:pb-7 md:pt-5">
              {/* Tentang tempat */}
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900 md:text-[20px]">
                  Tentang Tempat Ini
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {cafe.description}
                </p>
              </div>

              <hr className="border-slate-200" />

              {/* Alamat, jam buka, harga */}
              <div className="space-y-3 text-[13px] text-slate-700 md:text-sm">
                <div className="flex gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{cafe.address}</p>
                </div>

                <div className="flex gap-3">
                  <FiClock className="mt-0.5 shrink-0 text-slate-500" />
                  <div>
                    <p>[Senin – Jumat] {cafe.weekdayHours}</p>
                    <p>[Sabtu – Minggu] {cafe.weekendHours}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiDollarSign className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{cafe.priceRange}</p>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Fasilitas tempat */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Fasilitas Tempat
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[12px] md:grid-cols-3">
                  {cafe.facilities.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center justify-center rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-[11px] font-medium text-indigo-900"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Menu populer */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Menu Populer
                </h3>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {cafe.popularMenu.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cocok untuk */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Cocok Untuk
                </h3>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {cafe.goodFor.map((item) => (
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

          {/* RIGHT – fasilitas unggulan + trans */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Fasilitas unggulan */}
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-[18px] font-semibold text-slate-900">
                Fasilitas Unggulan
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {featuredItems
                  .filter((item) => cafe.featured[item.key])
                  .map((item) => (
                    <button
                      key={item.key}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm"
                    >
                      <span className="text-slate-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
              </div>
            </section>

            {/* Akses Trans Banyumas */}
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-[18px] font-semibold text-slate-900">
                Akses Trans Banyumas
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                  {cafe.trans.corridor}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {cafe.trans.distance}
                </span>
              </div>

              <div className="space-y-1 text-sm text-slate-700">
                <p className="font-medium">{cafe.trans.mainStop}</p>
                <p className="text-[13px] text-slate-500">Rute :</p>
                <ul className="ml-4 list-disc space-y-1 text-[13px]">
                  {cafe.trans.routes.map((rute) => (
                    <li key={rute}>{rute}</li>
                  ))}
                </ul>
              </div>

              <hr className="my-3 border-slate-200" />

              <div className="flex items-center justify-between text-sm text-slate-800">
                <span>Tarif Trans :</span>
                <span>
                  Rp {cafe.trans.fareMin.toLocaleString("id-ID")} – Rp{" "}
                  {cafe.trans.fareMax.toLocaleString("id-ID")}
                </span>
              </div>
            </section>

            {/* Tombol bawah */}
            <section className="mt-1 rounded-3xl bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.10)] md:px-6">
              <button
                onClick={handleOpenMaps}
                className="mb-2 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800 disabled:opacity-60"
                disabled={!cafe.mapsUrl}
              >
                Buka di Maps
              </button>
              <button className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                Simpan ke Favorit
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CafeDetail;

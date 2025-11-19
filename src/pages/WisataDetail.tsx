// src/pages/WisataDetail.tsx
import React from "react";
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
import { wisataDetails } from "../data/wisataDetails";

const WisataDetail: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const destinasi = wisataDetails.find((w) => w.slug === slug);

  if (!destinasi) {
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

  const featuredItems = [
    {
      key: "natureView" as const,
      label: "Pemandangan Alam Indah",
      icon: <FiFeather />,
    },
    {
      key: "familyFriendly" as const,
      label: "Ramah Keluarga",
      icon: <FiUsers />,
    },
    {
      key: "photoSpot" as const,
      label: "Spot Foto Keren",
      icon: <FiCamera />,
    },
    {
      key: "easyAccess" as const,
      label: "Akses Mudah",
      icon: <FiMapPin />,
    },
  ];

  const handleOpenMaps = () => {
    if (destinasi.mapsUrl) {
      window.open(destinasi.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl lg:max-w-7xl">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <FiArrowLeft className="text-slate-700" />
          <span>Kembali</span>
        </button>

        <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* LEFT – info utama */}
          <section className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            {/* Hero image */}
            <div className="h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden">
              <img
                src={destinasi.image}
                alt={destinasi.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 px-5 pb-6 pt-4 md:px-7 md:pb-7 md:pt-5">
              {/* Tentang tempat */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                  Tentang Destinasi Ini
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {destinasi.description}
                </p>
              </div>

              <hr className="border-slate-200" />

              {/* Alamat, jam, tiket */}
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{destinasi.address}</p>
                </div>

                <div className="flex gap-3">
                  <FiClock className="mt-0.5 shrink-0 text-slate-500" />
                  <div>
                    <p>[Senin – Jumat] {destinasi.weekdayHours}</p>
                    <p>[Sabtu – Minggu] {destinasi.weekendHours}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiDollarSign className="mt-0.5 shrink-0 text-slate-500" />
                  <p>{destinasi.priceRange}</p>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Fasilitas / Fitur */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Fasilitas &amp; Fitur
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[12px] md:grid-cols-3">
                  {destinasi.facilities.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center justify-center rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-[11px] font-medium text-indigo-900"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Aktivitas populer */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Aktivitas Populer
                </h3>
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {destinasi.activities.map((item) => (
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
                  {destinasi.goodFor.map((item) => (
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

          {/* RIGHT – fitur unggulan + akses trans + maps */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Fitur unggulan */}
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Highlight Destinasi
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {featuredItems
                  .filter((item) => destinasi.featured[item.key])
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

            {/* Akses Trans Banyumas */}
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)] md:px-6 md:py-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Akses Trans Banyumas
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                  {destinasi.trans.corridor}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {destinasi.trans.distance}
                </span>
              </div>

              <div className="space-y-1 text-sm text-slate-700">
                <p className="font-medium">{destinasi.trans.mainStop}</p>
                <p className="text-[13px] text-slate-500">Rute :</p>
                <ul className="ml-4 list-disc space-y-1 text-[13px]">
                  {destinasi.trans.routes.map((rute) => (
                    <li key={rute}>{rute}</li>
                  ))}
                </ul>
              </div>

              <hr className="my-3 border-slate-200" />

              <div className="flex items-center justify-between text-sm text-slate-800">
                <span>Tarif Trans :</span>
                <span>
                  Rp {destinasi.trans.fareMin.toLocaleString("id-ID")} – Rp{" "}
                  {destinasi.trans.fareMax.toLocaleString("id-ID")}
                </span>
              </div>
            </section>

            {/* Tombol bawah */}
            <section className="mt-1 rounded-3xl bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.10)] md:px-6">
              <button
                onClick={handleOpenMaps}
                className="mb-2 w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-800 disabled:opacity-60"
                disabled={!destinasi.mapsUrl}
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

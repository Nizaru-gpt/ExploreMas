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
  deskripsi?: string | null;

  fasilitas?: string[] | null;
  cocok_untuk?: string[] | null;

  trans_kode?: string | null;
  trans_jarak_meter?: number | null;
  trans_tarif_min?: number | null;
  trans_tarif_max?: number | null;
  trans_rute?: string[] | null;
};

const fmtPrice = (n: number) => {
  if (n === 0) return "Gratis";
  return `Rp ${n.toLocaleString("id-ID")}`;
};

const WisataDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const numericId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [data, setData] = useState<ApiWisataRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!numericId) return;

    let alive = true;

    const run = async () => {
      try {
        setLoading(true);

        let row: ApiWisataRow | null = null;
        try {
          row = await api.get<ApiWisataRow>(`/wisata_alam/${numericId}`);
        } catch {
          row = await api.get<ApiWisataRow>(`/wisata_pendidikan/${numericId}`);
        }

        if (alive) setData(row);
      } catch {
        if (alive) setData(null);
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [numericId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <p>Data wisata tidak ditemukan.</p>
      </main>
    );
  }

  const is24h = data.jam_buka === "00:00" && data.jam_tutup === "23:59";
  const jamLabel = is24h ? "24 Jam" : `${data.jam_buka} – ${data.jam_tutup}`;

  const fasilitas = data.fasilitas ?? [];
  const cocokUntuk = data.cocok_untuk ?? [];

  const transAvailable =
    data.trans_kode ||
    data.trans_jarak_meter != null ||
    data.trans_tarif_min != null ||
    data.trans_tarif_max != null ||
    (data.trans_rute && data.trans_rute.length > 0);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        >
          <FiArrowLeft />
          <span>Kembali</span>
        </button>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* ===== KIRI ===== */}
          <section className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <div className="h-[240px] overflow-hidden">
              <img
                src={data.link_foto}
                alt={data.nama_tempat}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 px-6 pb-6 pt-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Tentang Tempat Ini
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {data.deskripsi || "-"}
                </p>
              </div>

              <hr />

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex gap-3">
                  <FiMapPin className="mt-0.5 text-slate-500" />
                  <p>{data.alamat}</p>
                </div>

                <div className="flex gap-3">
                  <FiClock className="mt-0.5 text-slate-500" />
                  <p>{jamLabel}</p>
                </div>

                <div className="flex gap-3">
                  <FiDollarSign className="mt-0.5 text-slate-500" />
                  <p>{fmtPrice(data.htm)}</p>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Fasilitas
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {fasilitas.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-900"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Cocok Untuk
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cocokUntuk.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== KANAN ===== */}
          <div className="flex flex-col gap-4">
            <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Highlight Wisata
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs">
                  <FiFeather />
                  Pemandangan Alam
                </div>
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs">
                  <FiCamera />
                  Spot Foto
                </div>
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs">
                  <FiUsers />
                  Ramah Keluarga
                </div>
              </div>
            </section>

            {transAvailable && (
              <section className="rounded-3xl bg-white px-5 py-4 shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Akses Trans Banyumas
                </h3>

                <div className="mb-2 flex justify-between text-xs">
                  <span className="rounded-full border px-3 py-1 font-semibold">
                    {data.trans_kode || "-"}
                  </span>
                  <span>
                    {data.trans_jarak_meter
                      ? `±${data.trans_jarak_meter} meter`
                      : "-"}
                  </span>
                </div>

                <p className="text-xs text-slate-500">Rute:</p>
                <ul className="ml-4 list-disc text-xs">
                  {(data.trans_rute || []).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>

                <hr className="my-3" />

                <div className="flex justify-between text-sm">
                  <span>Tarif:</span>
                  <span>
                    Rp {data.trans_tarif_min ?? 0} – Rp{" "}
                    {data.trans_tarif_max ?? 0}
                  </span>
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-white px-5 py-4 shadow">
              <button
                onClick={() => window.open(data.link_gmaps, "_blank")}
                className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Buka di Maps
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WisataDetail;

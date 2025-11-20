// src/components/trip/ItinerarySummary.tsx
import React from "react";
import { FiChevronLeft, FiClock, FiMapPin } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";

interface ItinerarySummaryProps {
  selectedDays: number;
  totalActivities: number;
  estimatedBudget: number;
  onBackToDuration: () => void;
  onBackToCategory: () => void;
}

const ItinerarySummary: React.FC<ItinerarySummaryProps> = ({
  selectedDays,
  totalActivities,
  estimatedBudget,
  onBackToDuration,
  onBackToCategory,
}) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white/90 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.14)] px-6 py-6 md:px-8 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Itinerary Siap!
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-[#001845] mt-1">
            Rundown Trip Kamu di Purwokerto
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Ini adalah rekomendasi itinerary berdasarkan kategori wisata dan durasi yang kamu pilih.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={onBackToDuration}
            className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-[#001845]"
          >
            <FiChevronLeft /> Ganti durasi
          </button>
          <button
            type="button"
            onClick={onBackToCategory}
            className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-[#001845]"
          >
            Ganti kategori
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-50 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
            <FiClock className="text-slate-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Durasi Trip</p>
            <p className="text-sm font-semibold text-[#001845]">
              {selectedDays} Hari
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
            <FiMapPin className="text-slate-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Total Aktivitas</p>
            <p className="text-sm font-semibold text-[#001845]">
              {totalActivities} Aktivitas
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
            <FaMoneyBillWave className="text-slate-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Estimasi Budget*</p>
            <p className="text-sm font-semibold text-[#001845]">
              {formatter.format(estimatedBudget)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        *Estimasi kasar berdasarkan rata-rata biaya per aktivitas. Sesuaikan dengan preferensi dan
        pilihan tempatmu ya!
      </p>
    </div>
  );
};

export default ItinerarySummary;

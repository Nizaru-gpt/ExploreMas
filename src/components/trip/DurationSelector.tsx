// src/components/trip/DurationSelector.tsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DurationSelectorProps {
  selectedDays: number;
  onSelectDays: (days: number) => void;
  onBackToCategory: () => void;
  onGenerate: () => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDays,
  onSelectDays,
  onBackToCategory,
  onGenerate,
}) => {
  return (
    <div className="bg-white/90 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.14)] px-6 py-6 md:px-8 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Langkah 2
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-[#001845] mt-1">
            Berapa Hari Kamu di Purwokerto?
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Durasi trip bakal menentukan berapa banyak aktivitas seru yang bisa kamu jelajahi.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToCategory}
          className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-[#001845]"
        >
          <FiChevronLeft /> Ganti kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
        {[1, 2, 3].map((day) => {
          const isActive = selectedDays === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDays(day)}
              className={`rounded-3xl border px-5 py-5 text-center transition shadow-sm hover:shadow-md ${
                isActive
                  ? "bg-[#001845] text-white border-[#001845]"
                  : "bg-white text-slate-800 border-slate-200 hover:border-[#001845]"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Durasi
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-semibold">{day}</span>
                <span className="text-sm">Hari</span>
              </div>
              <p
                className={`mt-2 text-xs ${
                  isActive ? "text-white/80" : "text-slate-500"
                }`}
              >
                {day === 1 && "Trip singkat tapi tetap maksimal!"}
                {day === 2 && "Sehari jalan-jalan, sehari santai dan kuliner."}
                {day === 3 && "Explore lebih dalam tanpa terburu-buru."}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToCategory}
          className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-[#001845]"
        >
          <FiChevronLeft /> Kembali ke kategori
        </button>

        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-[#001845] text-white hover:bg-[#001132] transition"
        >
          Lihat Itinerary
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DurationSelector;

// src/components/trip/CategorySelector.tsx
import React from "react";
import { TripCategory } from "../../types/trip";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { FaMountain, FaGraduationCap, FaUtensils, FaCoffee } from "react-icons/fa";

const CATEGORY_CONFIG: Record<
  TripCategory,
  { label: string; description: string; icon: React.ReactNode }
> = {
  alam: {
    label: "Wisata Alam",
    description: "Curug, telaga, dan udara sejuk pegunungan",
    icon: <FaMountain />,
  },
  pendidikan: {
    label: "Wisata Pendidikan",
    description: "Museum dan tempat wisata edukatif",
    icon: <FaGraduationCap />,
  },
  kuliner: {
    label: "Kuliner",
    description: "Kuliner lokal dan makanan khas Banyumas",
    icon: <FaUtensils />,
  },
  cafe: {
    label: "Cafe",
    description: "Cafe cozy buat nongkrong dan nugas",
    icon: <FaCoffee />,
  },
};

interface CategorySelectorProps {
  selectedCategories: TripCategory[];
  onToggleCategory: (cat: TripCategory) => void;
  onNext: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onToggleCategory,
  onNext,
}) => {
  const selectedCount = selectedCategories.length;

  return (
    <div className="bg-white/90 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.14)] px-6 py-6 md:px-8 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Langkah 1
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-[#001845] mt-1">
            Kamu Pengen Eksplor Wisata Apa?
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Pilih minimal satu kategori biar itinerary bisa disesuaikan sama gaya liburan kamu.
          </p>
        </div>
        <div className="text-right text-xs md:text-sm text-slate-500">
          <p>
            {selectedCount === 0
              ? "Belum ada kategori dipilih"
              : `${selectedCount} kategori dipilih`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {(Object.keys(CATEGORY_CONFIG) as TripCategory[]).map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const isActive = selectedCategories.includes(cat);

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onToggleCategory(cat)}
              className={`group text-left rounded-3xl border px-4 py-4 md:px-5 md:py-5 transition shadow-sm hover:shadow-md flex flex-col justify-between h-full ${
                isActive
                  ? "bg-[#001845] text-white border-[#001845]"
                  : "bg-white text-slate-800 border-slate-200 hover:border-[#001845]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-[#001845]"
                  }`}
                >
                  {cfg.icon}
                </div>
                {isActive && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-white/10">
                    <FiCheck className="text-xs" /> Dipilih
                  </span>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-sm md:text-base">
                  {cfg.label}
                </h3>
                <p
                  className={`mt-1 text-[11px] md:text-xs ${
                    isActive ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {cfg.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs md:text-sm text-slate-500">
          Tips: kamu bisa pilih lebih dari satu kategori, misalnya{" "}
          <span className="font-semibold">Alam + Kuliner</span>.
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={selectedCategories.length === 0}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition ${
            selectedCategories.length === 0
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-[#001845] text-white hover:bg-[#001132]"
          }`}
        >
          Lanjut Pilih Durasi
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;

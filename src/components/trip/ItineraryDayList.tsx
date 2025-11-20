// src/components/trip/ItineraryDayList.tsx
import React from "react";
import { ItineraryDay } from "../../types/trip";
import { FiClock, FiMapPin } from "react-icons/fi";
import { FaMountain, FaGraduationCap, FaUtensils, FaCoffee } from "react-icons/fa";

interface ItineraryDayListProps {
  itinerary: ItineraryDay[];
}

const ItineraryDayList: React.FC<ItineraryDayListProps> = ({ itinerary }) => {
  return (
    <>
      {itinerary.map((day) => (
        <div
          key={day.day}
          className="bg-white/90 rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.14)] overflow-hidden"
        >
          <div className="bg-[#001845] text-white px-6 py-4 md:px-8 md:py-4">
            <p className="text-xs md:text-sm font-medium">Hari {day.day}</p>
            <p className="text-[11px] md:text-xs text-white/80 mt-1">
              {day.activities.length} aktivitas seru menanti!
            </p>
          </div>

          <div className="px-4 py-4 md:px-6 md:py-5 space-y-3">
            {day.activities.map((act, idx) => (
              <div
                key={`${act.title}-${idx}`}
                className="flex items-stretch gap-3 rounded-2xl bg-slate-50 px-3 py-3 md:px-4 md:py-4"
              >
                {/* TIME */}
                <div className="flex flex-col items-center w-14">
                  <div className="text-xs font-semibold text-[#001845]">
                    {act.time}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500 flex items-center gap-1">
                    <FiClock className="text-[11px]" />
                    <span>{act.durationLabel}</span>
                  </div>
                </div>

                {/* MAIN CARD */}
                <div className="flex-1 flex flex-col gap-1 border-l border-slate-200 pl-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs text-white ${
                        act.category === "alam"
                          ? "bg-emerald-500"
                          : act.category === "pendidikan"
                          ? "bg-sky-500"
                          : act.category === "kuliner"
                          ? "bg-pink-500"
                          : "bg-amber-500"
                      }`}
                    >
                      {act.category === "alam" && <FaMountain />}
                      {act.category === "pendidikan" && <FaGraduationCap />}
                      {act.category === "kuliner" && <FaUtensils />}
                      {act.category === "cafe" && <FaCoffee />}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-[#001845]">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{act.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500 flex items-start gap-1.5">
                    <FiMapPin className="mt-[2px]" />
                    <span>{act.address}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-500">
                      {act.category === "cafe" || act.category === "kuliner"
                        ? "Cocok buat istirahat sambil makan / ngopi."
                        : "Waktu terbaik buat eksplor dan foto-foto."}
                    </p>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-[#001845]">
                        {act.priceLabel}
                      </p>
                      <p className="text-[11px] text-slate-500">Estimasi</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ItineraryDayList;

import React, { useState, useRef, MouseEvent } from "react";
import { cafes, Facility } from "../data/cafes";

// React Icons
import { FiWifi } from "react-icons/fi";
import { PiPlugBold } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaParking, FaBookOpen } from "react-icons/fa";

// === LABEL & ICON ===
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

const allFacilityFilters: Facility[] = [
  "wifi",
  "24h",
  "socket",
  "ac",
  "parking",
  "studyFriendly",
];

const CafePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Facility[]>([]);

  // === DRAG SCROLL STATE ===
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

  // === MULTI FILTER ===
  const toggleFilter = (f: Facility) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filteredCafes = cafes.filter((cafe) => {
    const matchSearch =
      cafe.name.toLowerCase().includes(search.toLowerCase()) ||
      cafe.description.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilters.length === 0 ||
      activeFilters.every((f) => cafe.facilities.includes(f));

    return matchSearch && matchFilter;
  });

  return (
    <div className="flex justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#001845]">
          Cafe Recommendation
        </h1>
        <p className="mt-2 text-slate-600">
          Discover the finest coffee spots in Purwokerto
        </p>

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

        {/* FILTER */}
        <div className="mt-4 flex flex-wrap gap-2">
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

        {/* LIST: 1 baris, horizontal scroll, card isi sejajar */}
        <div
          ref={scrollRef}
          className="mt-10 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-6 overflow-x-auto pb-6 pr-6 cursor-grab select-none hide-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {filteredCafes.map((cafe) => (
            <article
              key={cafe.name}
              className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.16)] overflow-hidden flex flex-col h-full"
            >
              <img src={cafe.imageUrl} className="w-full h-64 object-cover" />

              <div className="px-6 pt-5 pb-6 flex flex-1 flex-col">
                {/* JUDUL */}
                <h2 className="font-playfair text-lg md:text-xl font-semibold text-[#001845]">
                  {cafe.name}
                </h2>

                {/* DESKRIPSI */}
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {cafe.description}
                </p>

                {/* INFO DETAIL */}
                <div className="mt-4 border-t border-slate-200 pt-3 space-y-2 text-xs md:text-sm text-slate-600">
                  <p>📍 {cafe.address}</p>
                  <p>🕒 {cafe.detailInfo}</p>
                  <p>💸 {cafe.priceRange}</p>
                </div>

                {/* FASILITAS – selalu di paling bawah, sejajar antar card */}
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
          ))}

          {filteredCafes.length === 0 && (
            <p className="text-center text-slate-500 mt-6">
              Cafe tidak ditemukan. Coba kata kunci atau filter lain.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafePage;

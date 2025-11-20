// src/pages/TripPlanner.tsx
import React, { useMemo, useState } from "react";

// DATA
import { cafes } from "../data/cafes";
import { places, type Place } from "../data/wisata";

// TYPES
import { TripCategory, ItineraryDay } from "../types/trip";

// COMPONENTS
import CategorySelector from "../components/trip/CategorySelector";
import DurationSelector from "../components/trip/DurationSelector";
import ItinerarySummary from "../components/trip/ItinerarySummary";
import ItineraryDayList from "../components/trip/ItineraryDayList";

type TripPlace = {
  id: string;
  name: string;
  categories: TripCategory[];
  address: string;
  imageUrl: string;
  source: "place" | "cafe";
  description: string;
  priceRange?: string;
  tags?: string[];
};

const TIME_SLOTS = ["08:00", "09:30", "11:00", "13:30", "15:00", "17:00"];
const DURATION_LABELS = ["1 jam", "45 menit", "1,5 jam", "1 jam", "1,5 jam", "2 jam"];

// --------------------------------
// 🔧 Generate Itinerary
// --------------------------------
function buildItinerary(places: TripPlace[], days: number): ItineraryDay[] {
  const maxActivities = days * TIME_SLOTS.length;
  const limitedPlaces = places.slice(0, maxActivities);

  const result: ItineraryDay[] = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    activities: [],
  }));

  limitedPlaces.forEach((place, index) => {
    const dayIndex = index % days;
    const mainCategory = place.categories[0] ?? "alam";

    result[dayIndex].activities.push({
      time: "",
      title: place.name,
      subtitle:
        mainCategory === "cafe" || mainCategory === "kuliner"
          ? "Waktu santai & kuliner"
          : "Eksplor destinasi",
      address: place.address,
      category: mainCategory,
      priceLabel: place.priceRange ?? "Budget fleksibel",
      durationLabel: "",
    });
  });

  // Set jam & durasi
  result.forEach((day) => {
    day.activities.forEach((act, idx) => {
      const slotIndex = Math.min(idx, TIME_SLOTS.length - 1);
      act.time = TIME_SLOTS[slotIndex];
      act.durationLabel = DURATION_LABELS[slotIndex];
    });
  });

  return result;
}

function getEstimatedBudget(itinerary: ItineraryDay[]): number {
  const perActivityAvg = 25000;
  const totalActivities = itinerary.reduce(
    (acc, day) => acc + day.activities.length,
    0
  );
  return totalActivities * perActivityAvg;
}

// =====================================
// 🌟 MAIN COMPONENT
// =====================================
const TripPlanner: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategories, setSelectedCategories] = useState<TripCategory[]>([]);
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

  // ===============================
  // ✔ Gabungkan Wisata + Cafe
  // ===============================
  const tripPlaces = useMemo<TripPlace[]>(() => {
    const fromPlaces: TripPlace[] = places.map((p: Place, index: number) => {
      const cats: TripCategory[] = [];
      if (p.category === "Wisata Alam" || p.category === "Taman") cats.push("alam");
      if (p.category === "Wisata Pendidikan") cats.push("pendidikan");

      return {
        id: p.id ?? `place-${index}`,
        name: p.name,
        categories: cats,
        address: p.address,
        imageUrl: p.image,
        source: "place",
        description: p.tags?.join(" • ") || "Destinasi wisata",
        priceRange: p.priceRange,
        tags: p.tags,
      };
    });

    const fromCafes: TripPlace[] = cafes.map((cafe, index) => ({
      id: `cafe-${index}`,
      name: cafe.name,
      categories: ["cafe", "kuliner"],
      address: cafe.address,
      imageUrl: cafe.imageUrl,
      source: "cafe",
      description: cafe.description,
      priceRange: cafe.priceRange,
    }));

    return [...fromPlaces, ...fromCafes];
  }, []);

  // ===============================
  // ✔ Filter berdasarkan kategori
  // ===============================
  const filteredPlaces = useMemo(() => {
    if (selectedCategories.length === 0) return tripPlaces;

    return tripPlaces.filter((place) =>
      selectedCategories.some((cat) => place.categories.includes(cat))
    );
  }, [tripPlaces, selectedCategories]);

  // ===============================
  // HANDLERS
  // ===============================
  const handleToggleCategory = (cat: TripCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleNextFromStep1 = () => {
    if (selectedCategories.length === 0) return;
    setStep(2);
  };

  const handleGenerate = () => {
    const generated = buildItinerary(filteredPlaces, selectedDays);
    setItinerary(generated);
    setStep(3);
  };

  const totalActivities = itinerary.reduce(
    (acc, day) => acc + day.activities.length,
    0
  );
  const estimatedBudget = getEstimatedBudget(itinerary);

  // ===============================
  // RENDER SEBAGAI SECTION BIASA
  // ===============================
  return (
    <section className="bg-pageRadial">
      <div className="flex justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-6xl">
          {/* HEADER */}
          <header className="text-center mb-10">
            <p className="text-sm md:text-base text-slate-500 flex items-center justify-center gap-2">
              <span>✨</span>
              <span>ExploreMas Trip Planner</span>
              <span>✨</span>
            </p>
            <h1 className="mt-2 font-playfair text-3xl md:text-4xl font-bold text-[#001845]">
              Trip Planner
            </h1>
            <p className="mt-3 text-slate-600 text-sm md:text-base">
              Tentukan kategori wisata & durasinya —{" "}
              <br className="hidden md:block" />
              kami buatin itinerary lengkap buat kamu!
            </p>
          </header>

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm mb-6 text-slate-500">
            <span
              className={`px-3 py-1 rounded-full ${
                step === 1 ? "bg-[#001845] text-white" : "bg-white/70 text-slate-600"
              }`}
            >
              1. Pilih Kategori
            </span>
            <span>›</span>
            <span
              className={`px-3 py-1 rounded-full ${
                step === 2 ? "bg-[#001845] text-white" : "bg-white/70 text-slate-600"
              }`}
            >
              2. Pilih Durasi
            </span>
            <span>›</span>
            <span
              className={`px-3 py-1 rounded-full ${
                step === 3 ? "bg-[#001845] text-white" : "bg-white/70 text-slate-600"
              }`}
            >
              3. Itinerary
            </span>
          </div>

          {/* STEP CONTENT */}
          {step === 1 && (
            <CategorySelector
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              onNext={handleNextFromStep1}
            />
          )}

          {step === 2 && (
            <DurationSelector
              selectedDays={selectedDays}
              onSelectDays={setSelectedDays}
              onBackToCategory={() => setStep(1)}
              onGenerate={handleGenerate}
            />
          )}

          {step === 3 && (
            <div className="space-y-6">
              <ItinerarySummary
                selectedDays={selectedDays}
                totalActivities={totalActivities}
                estimatedBudget={estimatedBudget}
                onBackToDuration={() => setStep(2)}
                onBackToCategory={() => setStep(1)}
              />
              <ItineraryDayList itinerary={itinerary} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TripPlanner;

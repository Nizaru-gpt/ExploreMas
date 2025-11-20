// src/types/trip.ts
export type TripCategory = "alam" | "pendidikan" | "kuliner" | "cafe";

export type ItineraryActivity = {
  time: string;
  title: string;
  subtitle: string;
  address: string;
  category: TripCategory;
  priceLabel: string;
  durationLabel: string;
};

export type ItineraryDay = {
  day: number;
  activities: ItineraryActivity[];
};

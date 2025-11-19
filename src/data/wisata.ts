export type Category =
  | "Taman"
  | "Wisata Alam"
  | "Wisata Pendidikan";

export type PriceLevel = "Low" | "Medium" | "High";

export type Coordinates = { lat: number; lng: number };

export type Place = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  address: string;
  district?: string;
  coords?: Coordinates;
  openHours?: string;
  priceRange?: string;
  priceLevel?: PriceLevel;
  rating: number;
  reviews: number;
  tags: string[];
  phone?: string;
  website?: string;
  image: string;
  gallery?: string[];
};

export const places: Place[] = [
  {
    id: "p04",
    slug: "alun-alun-purwokerto",
    name: "Alun-alun Purwokerto",
    category: "Taman",
    address: "Jl. Jend. Sudirman, Purwokerto",
    coords: { lat: -7.4249, lng: 109.2306 },
    openHours: "24 Jam",
    priceRange: "Gratis",
    priceLevel: "Low",
    rating: 4.6,
    reviews: 1200,
    tags: ["Ramah Keluarga", "Kuliner Kaki Lima", "Olahraga"],
    image: "/src/assets/images/news/festival-budaya.jpg",
  },
  {
    id: "p05",
    slug: "lokawisata-baturaden",
    name: "Lokawisata Baturaden",
    category: "Wisata Alam",
    address: "Baturraden, Banyumas",
    coords: { lat: -7.3, lng: 109.22 },
    openHours: "07.00 – 17.00 WIB",
    priceRange: "Rp 20.000 – Rp 35.000",
    priceLevel: "Low",
    rating: 4.7,
    reviews: 8300,
    tags: ["Air Terjun", "Alam", "Selfie Spot"],
    image: "/src/assets/images/news/trans-armada.jpg",
  },
  {
    id: "p06",
    slug: "telaga-sunyi",
    name: "Telaga Sunyi",
    category: "Wisata Alam",
    address: "Karangmangu, Baturraden",
    coords: { lat: -7.31, lng: 109.23 },
    openHours: "07.00 – 17.00 WIB",
    priceRange: "Rp 10.000 – Rp 20.000",
    priceLevel: "Low",
    rating: 4.8,
    reviews: 2100,
    tags: ["Snorkeling", "Air Jernih", "Hutan Pinus"],
    image: "/src/assets/images/hangout/kopi-nalar.jpg",
  },
  {
    id: "p07",
    slug: "museum-wayang-banyumas",
    name: "Museum Wayang Banyumas",
    category: "Wisata Pendidikan",
    address: "Jl. Pakuningratan No. 1, Banyumas",
    coords: { lat: -7.514, lng: 109.292 },
    openHours: "08.00 – 15.00 WIB",
    priceRange: "Rp 5.000 – Rp 10.000",
    priceLevel: "Low",
    rating: 4.5,
    reviews: 420,
    tags: ["Edukasi", "Sejarah", "Koleksi Wayang"],
    image: "/src/assets/images/news/festival-budaya.jpg",
  },
  {
    id: "p08",
    slug: "curug-jenggala",
    name: "Curug Jenggala",
    category: "Wisata Alam",
    address: "Ketenger, Baturraden",
    coords: { lat: -7.322, lng: 109.25 },
    openHours: "07.00 – 17.00 WIB",
    priceRange: "Rp 10.000 – Rp 15.000",
    priceLevel: "Low",
    rating: 4.6,
    reviews: 1900,
    tags: ["Air Terjun", "Jembatan Cinta", "Foto"],
    image: "/src/assets/images/hangout/kedai-sore.jpg",
  },
];

export const topPlaces: Place[] = [
  places.find((p) => p.id === "p05")!,
  places.find((p) => p.id === "p06")!,
  places.find((p) => p.id === "p07")!,
];

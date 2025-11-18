export type NewsCategory = "Transportasi" | "Budaya" | "Pemerintahan" | "Pariwisata";

export type News = {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  readMinutes: number;
  excerpt: string;
  image: string;
  url?: string;
};

export const newsList: News[] = [
  {
    id: "n1",
    title: "Trans Banyumas Tambah Armada Baru",
    category: "Transportasi",
    date: "2025-10-18",
    readMinutes: 4,
    excerpt:
      "Dinas Perhubungan Kabupaten Banyumas menambah 10 unit bus baru untuk meningkatkan layanan Trans Banyumas dan memperluas jangkauan rute.",
    image: "/src/assets/images/news/trans-armada.jpg",
    url: "#",
  },
  {
    id: "n2",
    title: "Festival Budaya Banyumas 2025 Siap Digelar",
    category: "Budaya",
    date: "2025-10-20",
    readMinutes: 5,
    excerpt:
      "Pemerintah Kabupaten Banyumas mengumumkan Festival Budaya 2025 yang menghadirkan parade, kuliner tradisional, dan pertunjukan seni daerah.",
    image: "/src/assets/images/news/festival-budaya.jpg",
    url: "#",
  },
  {
    id: "n3",
    title: "Revitalisasi Alun-alun dan Ruang Terbuka Hijau",
    category: "Pemerintahan",
    date: "2025-11-02",
    readMinutes: 3,
    excerpt:
      "Program revitalisasi ruang terbuka hijau ditargetkan meningkatkan kualitas hidup warga serta mendukung aktivitas publik.",
    image: "/src/assets/images/news/festival-budaya.jpg",
    url: "#",
  },
  {
    id: "n4",
    title: "Penguatan Ekosistem Wisata Alam Baturraden",
    category: "Pariwisata",
    date: "2025-11-05",
    readMinutes: 4,
    excerpt:
      "Kolaborasi multipihak untuk menjaga kelestarian air terjun dan hutan pinus, sekaligus mendorong ekonomi kreatif lokal.",
    image: "/src/assets/images/news/trans-armada.jpg",
    url: "#",
  },
];

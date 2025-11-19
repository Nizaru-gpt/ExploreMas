import calfImg from "../assets/images/cafe/calf.jpg";
import advoImg from "../assets/images/cafe/advo.jpg";
import coldImg from "../assets/images/cafe/coldbrew.jpg";
import defaultImg from "../assets/images/hero/tugu.png";

export type CafeDetail = {
  slug: string;
  name: string;
  description: string;
  address: string;
  weekdayHours: string;
  weekendHours: string;
  priceRange: string;

  facilities: string[];
  popularMenu: string[];
  goodFor: string[];

  featured: {
    ac: boolean;
    wifi: boolean;
    manySockets: boolean;
    instaSpot: boolean;
  };

  trans: {
    corridor: string;
    distance: string;
    mainStop: string;
    routes: string[];
    fareMin: number;
    fareMax: number;
  };

  image: string;
  mapsUrl?: string;
};

export const cafeDetails: CafeDetail[] = [
  // 1. Kopi Calf
  {
    slug: "kopi-calf",
    name: "Kopi Calf",
    description:
      "Cafe cozy dengan suasana nyaman dan kopi specialty yang mantap. Enak buat nugas, meeting kecil, atau sekadar santai bareng teman.",
    address: "Jl. Prof. Dr. Suharso No.53, Karangwangkal, Purwokerto",
    weekdayHours: "08.00 – 23.00",
    weekendHours: "06.00 – 00.00",
    priceRange: "Rp 25.000 – Rp 50.000",
    facilities: [
      "WiFi Gratis",
      "Outdoor Area",
      "Colokan Banyak",
      "Parkir Motor & Mobil",
      "AC",
      "Musholla",
    ],
    popularMenu: ["Calf Premium", "Smooth Series", "Magic Tiramisu Cream", "Brewmalt"],
    goodFor: ["Kerja / Belajar", "Nongkrong", "Date"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±200 meter",
      mainStop: "Halte Unsoed / HR Bunyamin",
      routes: ["Terminal Bulupitu", "HR Bunyamin", "Alun-Alun", "Pasar Wage"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: calfImg,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kopi+Calf+Purwokerto",
  },

  // 2. Cold 'N Brew
  {
    slug: "cold-n-brew",
    name: "Cold 'N Brew",
    description:
      "Cafe dengan interior hangat, menu kopi dan non-kopi lengkap. Nyaman buat kerja, ngobrol, atau sekadar mampir sebentar.",
    address: "Jl. Jend. Sudirman No.298, Purwokerto",
    weekdayHours: "24 jam",
    weekendHours: "24 jam",
    priceRange: "Rp 25.000 – Rp 50.000",
    facilities: [
      "WiFi Gratis",
      "Colokan Banyak",
      "AC",
      "Parkir Motor & Mobil",
    ],
    popularMenu: ["Cold Brew Signature", "Caramel Latte", "Hazelnut Coffee"],
    goodFor: ["Kerja / Belajar", "Nongkrong Larut Malam"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±150 meter",
      mainStop: "Halte Jend. Sudirman",
      routes: ["Terminal Bulupitu", "GOR Satria", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: coldImg,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cold+N+Brew+Purwokerto",
  },

  // 3. Advo Cafe
  {
    slug: "advo-cafe",
    name: "Advo Cafe",
    description:
      "Cafe dengan view hijau dan suasana tenang. Cocok buat healing tipis-tipis sambil nugas atau ngobrol santai.",
    address:
      "Jl. A. Yani No.60, Karangwangkal, Kec. Purwokerto Utara, Purwokerto",
    weekdayHours: "10.00 – 23.00",
    weekendHours: "10.00 – 23.00",
    priceRange: "Rp 10.000 – Rp 25.000",
    facilities: [
      "WiFi Gratis",
      "Outdoor Area",
      "Colokan Banyak",
      "Parkir Motor & Mobil",
      "AC",
    ],
    popularMenu: ["Signature Latte", "Matcha Latte", "Cold Brew", "Snack Platter"],
    goodFor: ["Kerja / Belajar", "Nongkrong", "Me Time"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±250 meter",
      mainStop: "Halte Karangwangkal / A. Yani",
      routes: ["Terminal Bulupitu", "Unsoed", "Karangwangkal", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: advoImg,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Advo+Cafe+Purwokerto",
  },

  // 4. Kedai Sore Cafe
  {
    slug: "kedai-sore-cafe",
    name: "Kedai Sore Cafe",
    description:
      "Tempat nongkrong dengan suasana hangat, cocok untuk ngobrol santai bareng teman di waktu sore hingga malam.",
    address: "Jl. S. Parman No.21, Purwokerto",
    weekdayHours: "15.00 – 23.00",
    weekendHours: "15.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 40.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Es Kopi Susu", "Teh Manis Panas", "Gorengan Platter"],
    goodFor: ["Nongkrong Sore", "Buka Puasa", "Kumpul Teman"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-01 (Ajibarang – Pasar Pon)",
      distance: "±300 meter",
      mainStop: "Halte S. Parman",
      routes: ["Pasar Pon", "S. Parman", "Alun-Alun", "Terminal Ajibarang"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 5. Ruang Senja Coffee
  {
    slug: "ruang-senja-coffee",
    name: "Ruang Senja Coffee",
    description:
      "Cafe minimalis dengan banyak colokan dan wifi kencang. Favorit mahasiswa buat nugas sampai malam.",
    address: "Jl. HR Bunyamin No.5, Purwokerto",
    weekdayHours: "10.00 – 23.00",
    weekendHours: "10.00 – 23.00",
    priceRange: "Rp 18.000 – Rp 45.000",
    facilities: [
      "WiFi Gratis",
      "Colokan Banyak",
      "Parkir Motor & Mobil",
      "AC",
    ],
    popularMenu: ["Es Kopi Senja", "Choco Latte", "Camilan Ringan"],
    goodFor: ["Kerja / Belajar", "Nongkrong Malam"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±150 meter",
      mainStop: "Halte HR Bunyamin",
      routes: ["Terminal Bulupitu", "HR Bunyamin", "GOR Satria", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 6. Langit Kopi
  {
    slug: "langit-kopi",
    name: "Langit Kopi",
    description:
      "Rooftop cafe dengan pemandangan kota Purwokerto, cocok buat foto-foto dan nongkrong malam.",
    address: "Jl. Gerilya Atas No.88, Purwokerto",
    weekdayHours: "17.00 – 00.00",
    weekendHours: "17.00 – 00.00",
    priceRange: "Rp 25.000 – Rp 60.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Kopi Susu Langit", "Mocktail", "Snack Sharing"],
    goodFor: ["Nongkrong Malam", "Foto-foto", "Date"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-02 (Notog – Baturraden)",
      distance: "±400 meter",
      mainStop: "Halte Gerilya",
      routes: ["Terminal Notog", "Gerilya", "RS Margono", "Baturraden"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 7. Bumi Kopi
  {
    slug: "bumi-kopi",
    name: "Bumi Kopi",
    description:
      "Cafe bernuansa kayu dan tanaman hijau yang adem, suasana tenang untuk kerja atau baca buku.",
    address: "Jl. Gerilya No.12, Purwokerto",
    weekdayHours: "09.00 – 22.00",
    weekendHours: "09.00 – 22.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil", "AC"],
    popularMenu: ["Kopi Hitam Bumi", "Cappuccino", "Kue Harian"],
    goodFor: ["Kerja / Belajar", "Me Time"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-02 (Notog – Baturraden)",
      distance: "±300 meter",
      mainStop: "Halte Gerilya",
      routes: ["Terminal Notog", "Gerilya", "RS Margono", "Baturraden"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 8. Kopi Jalan
  {
    slug: "kopi-jalan",
    name: "Kopi Jalan",
    description:
      "Cafe kecil tapi ramai dengan menu kopi susu kekinian dan camilan ringan.",
    address: "Jl. Masjid No.7, Purwokerto",
    weekdayHours: "10.00 – 22.00",
    weekendHours: "10.00 – 22.00",
    priceRange: "Rp 15.000 – Rp 30.000",
    facilities: ["WiFi Gratis", "Parkir Motor & Mobil"],
    popularMenu: ["Es Kopi Jalan", "Kopi Susu Gula Aren", "French Fries"],
    goodFor: ["Nongkrong Cepat", "Take Away"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±200 meter",
      mainStop: "Halte Jalan Masjid",
      routes: ["Bulupitu", "Jalan Masjid", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 9. Teras Kopi
  {
    slug: "teras-kopi",
    name: "Teras Kopi",
    description:
      "Cafe outdoor dengan banyak area duduk di teras, cocok untuk nongkrong sore bareng teman.",
    address: "Jl. Dr. Angka No.31, Purwokerto",
    weekdayHours: "16.00 – 23.00",
    weekendHours: "16.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Es Kopi Teras", "Teh Tarik", "Snack Goreng"],
    goodFor: ["Nongkrong Sore", "Ngobrol Santai"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-01 (Ajibarang – Pasar Pon)",
      distance: "±250 meter",
      mainStop: "Halte Dr. Angka",
      routes: ["Pasar Pon", "Dr. Angka", "Alun-Alun", "Ajibarang"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 10. Kopi Sudut Kota
  {
    slug: "kopi-sudut-kota",
    name: "Kopi Sudut Kota",
    description:
      "Cafe instagrammable di sudut persimpangan jalan dengan interior aesthetic dan cozy.",
    address: "Jl. Overste Isdiman No.10, Purwokerto",
    weekdayHours: "11.00 – 23.00",
    weekendHours: "11.00 – 23.00",
    priceRange: "Rp 22.000 – Rp 55.000",
    facilities: ["WiFi Gratis", "Colokan Banyak", "Parkir Motor & Mobil", "AC"],
    popularMenu: ["Kopi Susu Kota", "Mocha", "Dessert Slice"],
    goodFor: ["Nongkrong", "Foto-foto"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±300 meter",
      mainStop: "Halte Overste Isdiman",
      routes: ["Bulupitu", "Overste Isdiman", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 11. Pagi Hari Coffce
  {
    slug: "pagi-hari-coffce",
    name: "Pagi Hari Coffce",
    description:
      "Cafe yang buka lebih pagi, cocok untuk sarapan ringan dengan kopi hangat.",
    address: "Jl. Soeparjo Roestam No.4, Purwokerto",
    weekdayHours: "07.00 – 21.00",
    weekendHours: "07.00 – 21.00",
    priceRange: "Rp 18.000 – Rp 35.000",
    facilities: ["WiFi Gratis", "Parkir Motor & Mobil", "AC"],
    popularMenu: ["Kopi Hitam Pagi", "Latte", "Roti Bakar"],
    goodFor: ["Sarapan", "Kerja Pagi"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: false,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-01 (Ajibarang – Pasar Pon)",
      distance: "±300 meter",
      mainStop: "Halte Soeparjo Roestam",
      routes: ["Ajibarang", "Pasar Pon", "Soeparjo Roestam"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 12. Sisi Timur Cafe
  {
    slug: "sisi-timur-cafe",
    name: "Sisi Timur Cafe",
    description:
      "Cafe dengan jendela besar menghadap timur, cahaya pagi yang masuk bikin suasana hangat.",
    address: "Jl. KH Ahmad Dahlan No.19, Purwokerto",
    weekdayHours: "09.00 – 22.00",
    weekendHours: "09.00 – 22.00",
    priceRange: "Rp 20.000 – Rp 45.000",
    facilities: ["WiFi Gratis", "Parkir Motor & Mobil", "AC"],
    popularMenu: ["Es Kopi Timur", "Americano", "Snack Box"],
    goodFor: ["Kerja / Belajar", "Nongkrong Pagi"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±250 meter",
      mainStop: "Halte KH Ahmad Dahlan",
      routes: ["Bulupitu", "KH Ahmad Dahlan", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 13. Kopi Kolcktif
  {
    slug: "kopi-kolcktif",
    name: "Kopi Kolcktif",
    description:
      "Co-working cafe yang menyediakan ruang kerja bersama dengan fasilitas lengkap.",
    address: "Jl. Tentara Pelajar No.2, Purwokerto",
    weekdayHours: "09.00 – 22.00",
    weekendHours: "09.00 – 22.00",
    priceRange: "Rp 25.000 – Rp 60.000",
    facilities: [
      "WiFi Gratis",
      "Colokan Banyak",
      "Parkir Motor & Mobil",
      "AC",
    ],
    popularMenu: ["Kopi Kolektif", "Manual Brew", "Snack Sharing"],
    goodFor: ["Kerja Tim", "Freelancer", "Meeting Kecil"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±200 meter",
      mainStop: "Halte Tentara Pelajar",
      routes: ["Bulupitu", "Tentara Pelajar", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 14. Ruang Teduh
  {
    slug: "ruang-teduh",
    name: "Ruang Teduh",
    description:
      "Cafe dengan interior earthy dan musik lembut, cocok untuk yang cari ketenangan.",
    address: "Jl. Merdeka No.17, Purwokerto",
    weekdayHours: "10.00 – 22.00",
    weekendHours: "10.00 – 22.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["WiFi Gratis", "AC", "Parkir Motor & Mobil"],
    popularMenu: ["Latte Teduh", "Chamomile Tea", "Cookies"],
    goodFor: ["Me Time", "Baca Buku"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-01 (Ajibarang – Pasar Pon)",
      distance: "±250 meter",
      mainStop: "Halte Merdeka",
      routes: ["Ajibarang", "Pasar Pon", "Merdeka"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 15. Kopi Kampus
  {
    slug: "kopi-kampus",
    name: "Kopi Kampus",
    description:
      "Cafe dekat kampus dengan harga ramah mahasiswa dan banyak colokan di setiap sudut.",
    address: "Jl. Kampus Raya No.1, Purwokerto",
    weekdayHours: "09.00 – 23.00",
    weekendHours: "09.00 – 23.00",
    priceRange: "Rp 15.000 – Rp 30.000",
    facilities: [
      "WiFi Gratis",
      "Colokan Banyak",
      "Parkir Motor & Mobil",
      "AC",
    ],
    popularMenu: ["Kopi Susu Kampus", "Es Teh Manis", "Mie Rebuss"],
    goodFor: ["Kerja / Belajar", "Nongkrong Mahasiswa"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: true,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-02 (Notog – Baturraden)",
      distance: "±150 meter",
      mainStop: "Halte Kampus",
      routes: ["Notog", "Kampus", "Unsoed", "Baturraden"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 16. Sore di Kota
  {
    slug: "sore-di-kota",
    name: "Sore di Kota",
    description:
      "Cafe dengan view jalan utama, enak buat menikmati suasana kota menjelang malam.",
    address: "Jl. Jend. Gatot Subroto No.8, Purwokerto",
    weekdayHours: "16.00 – 23.00",
    weekendHours: "16.00 – 23.00",
    priceRange: "Rp 22.000 – Rp 45.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Es Kopi Sore", "Mocktail", "Snack Platter"],
    goodFor: ["Nongkrong Sore", "Foto-foto"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±250 meter",
      mainStop: "Halte Gatot Subroto",
      routes: ["Bulupitu", "Gatot Subroto", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 17. Garden Brew
  {
    slug: "garden-brew",
    name: "Garden Brew",
    description:
      "Cafe bernuansa taman dengan banyak tanaman dan area duduk outdoor.",
    address: "Jl. Beji No.29, Purwokerto",
    weekdayHours: "10.00 – 22.00",
    weekendHours: "10.00 – 22.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Kopi Garden", "Lemon Tea", "Snack Goreng"],
    goodFor: ["Nongkrong", "Family Time"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-02 (Notog – Baturraden)",
      distance: "±300 meter",
      mainStop: "Halte Beji",
      routes: ["Notog", "Beji", "RS Margono", "Baturraden"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 18. Kopi Tengah Kota
  {
    slug: "kopi-tengah-kota",
    name: "Kopi Tengah Kota",
    description:
      "Lokasi strategis di pusat kota, mudah dijangkau dan dekat dengan banyak tempat penting.",
    address: "Jl. Raya Tengah No.3, Purwokerto",
    weekdayHours: "09.00 – 23.00",
    weekendHours: "09.00 – 23.00",
    priceRange: "Rp 20.000 – Rp 45.000",
    facilities: ["WiFi Gratis", "Parkir Motor & Mobil", "AC"],
    popularMenu: ["Kopi Susu Tengah", "Americano", "Snack Ringan"],
    goodFor: ["Meeting Santai", "Nongkrong"],
    featured: {
      ac: true,
      wifi: true,
      manySockets: false,
      instaSpot: false,
    },
    trans: {
      corridor: "TB-03 (Bulupitu – Kebondalem)",
      distance: "±150 meter",
      mainStop: "Halte Tengah Kota",
      routes: ["Bulupitu", "Tengah Kota", "Alun-Alun", "Kebondalem"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 19. Senja & Rasa
  {
    slug: "senja-rasa",
    name: "Senja & Rasa",
    description:
      "Cafe yang terkenal dengan menu kopi susu gula aren dan suasana senja yang hangat.",
    address: "Jl. Kalibener No.11, Purwokerto",
    weekdayHours: "15.00 – 23.00",
    weekendHours: "15.00 – 23.00",
    priceRange: "Rp 18.000 – Rp 40.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Kopi Senja", "Kopi Susu Gula Aren", "Snack Manis"],
    goodFor: ["Nongkrong Sore", "Date"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-01 (Ajibarang – Pasar Pon)",
      distance: "±250 meter",
      mainStop: "Halte Kalibener",
      routes: ["Ajibarang", "Kalibener", "Pasar Pon"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },

  // 20. Kopi Tepi Sawah
  {
    slug: "kopi-tepi-sawah",
    name: "Kopi Tepi Sawah",
    description:
      "Cafe dengan pemandangan persawahan, cocok untuk melepas penat dari suasana kota.",
    address: "Jl. Raya Patikraja No.5, Banyumas",
    weekdayHours: "09.00 – 21.00",
    weekendHours: "09.00 – 21.00",
    priceRange: "Rp 20.000 – Rp 50.000",
    facilities: ["WiFi Gratis", "Outdoor Area", "Parkir Motor & Mobil"],
    popularMenu: ["Kopi Sawah", "Teh Hangat", "Pisang Goreng"],
    goodFor: ["Family Time", "Me Time"],
    featured: {
      ac: false,
      wifi: true,
      manySockets: false,
      instaSpot: true,
    },
    trans: {
      corridor: "TB-02 (Notog – Baturraden)",
      distance: "±400 meter",
      mainStop: "Halte Patikraja",
      routes: ["Terminal Notog", "Patikraja", "Purwokerto", "Baturraden"],
      fareMin: 3500,
      fareMax: 5000,
    },
    image: defaultImg,
  },
];

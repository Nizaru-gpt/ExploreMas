import { useMemo, useState, FormEvent } from "react";
import { MapPin, Coffee, Mountain, Star, PlusCircle } from "lucide-react";

import InfoCard from "../components/ui/InfoCard";
import ChatbotAdminPanel from "../components/chatbot/ChatbotAdminPanel";

type Category = "Cafe" | "Wisata" | "Lainnya";

type AdminPlace = {
  id: number;
  name: string;
  category: Category;
  district: string;
  rating: number;
};

type NewPlaceForm = {
  name: string;
  category: "" | Category;
  district: string;
  rating: string;
};

// Data awal contoh
const initialPlaces: AdminPlace[] = [
  {
    id: 1,
    name: "Kopi Senja Purwokerto",
    category: "Cafe",
    district: "Purwokerto Utara",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Alun-Alun Purwokerto",
    category: "Wisata",
    district: "Purwokerto Timur",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Curug Cipendok",
    category: "Wisata",
    district: "Cilongok",
    rating: 4.8,
  },
];

export default function AdminDashboard() {
  const [places, setPlaces] = useState<AdminPlace[]>(initialPlaces);
  const [form, setForm] = useState<NewPlaceForm>({
    name: "",
    category: "",
    district: "",
    rating: "4.5",
  });
  const [error, setError] = useState("");

  const totalPlaces = places.length;
  const totalCafes = useMemo(
    () => places.filter((p) => p.category === "Cafe").length,
    [places]
  );
  const totalWisata = useMemo(
    () => places.filter((p) => p.category === "Wisata").length,
    [places]
  );
  const avgRating = useMemo(
    () =>
      places.length
        ? places.reduce((sum, p) => sum + p.rating, 0) / places.length
        : 0,
    [places]
  );

  const latestPlaces = useMemo(
    () => [...places].slice(-5).reverse(),
    [places]
  );

  function handleChange(field: keyof NewPlaceForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name || !form.category) {
      setError("Nama tempat dan kategori wajib diisi.");
      return;
    }

    const ratingNumber = Number(form.rating || "0");
    const newPlace: AdminPlace = {
      id: places.length ? places[places.length - 1].id + 1 : 1,
      name: form.name,
      category: form.category as Category,
      district: form.district || "-",
      rating: isNaN(ratingNumber) ? 0 : ratingNumber,
    };

    setPlaces((prev) => [...prev, newPlace]);
    setForm({
      name: "",
      category: "",
      district: "",
      rating: "4.5",
    });
    setError("");
  }

  return (
    <div className="min-h-screen bg-pageRadial">
      {/* HEADER */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="w-[min(1120px,92%)] mx-auto h-16 flex items-center justify-between px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brandSoft font-semibold">
              ExploreMas
            </p>
            <h1 className="text-lg font-semibold text-brand">
              Admin Dashboard
            </h1>
          </div>
          <div className="text-xs text-muted">
            Panel internal untuk mengelola data tempat, wisata &amp; chatbot.
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="py-10">
        <div className="w-[min(1120px,92%)] mx-auto px-6 space-y-10">
          {/* RINGKASAN STATISTIK TEMPAT */}
          <section>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brandSoft font-semibold">
                Overview
              </p>
              <h2 className="text-xl font-semibold text-brand">
                Ringkasan Data ExploreMas
              </h2>
              <p className="text-xs text-muted mt-1">
                Statistik singkat tempat yang terdaftar di sistem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoCard
                icon={<MapPin className="w-6 h-6" />}
                title={`${totalPlaces} Tempat`}
                text="Total tempat wisata & hangout yang tersimpan."
              />
              <InfoCard
                icon={<Coffee className="w-6 h-6" />}
                title={`${totalCafes} Cafe`}
                text="Jumlah cafe & tempat nongkrong."
              />
              <InfoCard
                icon={<Mountain className="w-6 h-6" />}
                title={`${totalWisata} Wisata`}
                text="Jumlah destinasi wisata yang tercatat."
              />
              <InfoCard
                icon={<Star className="w-6 h-6" />}
                title={`${avgRating.toFixed(1)} ★`}
                text="Rata-rata rating keseluruhan tempat."
              />
            </div>
          </section>

          {/* DAFTAR TEMPAT + FORM */}
          <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            {/* TABEL TEMPAT */}
            <div className="bg-white border border-border rounded-2xl shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-brand text-base">
                    Daftar Tempat Terbaru
                  </h2>
                  <p className="text-xs text-muted">
                    Menampilkan 5 tempat terakhir yang ditambahkan.
                  </p>
                </div>
                <span className="text-xs text-muted">
                  Total: {places.length} tempat
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted border-b border-border/80">
                    <tr className="align-middle">
                      <th className="py-2 pr-3">Nama</th>
                      <th className="py-2 px-3">Kategori</th>
                      <th className="py-2 px-3">Kecamatan</th>
                      <th className="py-2 px-3 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestPlaces.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-border/40 last:border-0"
                      >
                        <td className="py-2 pr-3 font-medium">{p.name}</td>
                        <td className="py-2 px-3 text-xs text-muted">
                          {p.category}
                        </td>
                        <td className="py-2 px-3 text-xs text-muted">
                          {p.district}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                            <Star className="w-3 h-3 fill-current" />
                            {p.rating.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {!latestPlaces.length && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-xs text-muted"
                        >
                          Belum ada data tempat.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FORM TAMBAH TEMPAT */}
            <div className="bg-white border border-border rounded-2xl shadow-soft p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-full bg-brand/5">
                  <PlusCircle className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h2 className="font-semibold text-brand text-base">
                    Tambah Tempat Baru
                  </h2>
                  <p className="text-xs text-muted">
                    Untuk prototipe: data hanya tersimpan di memori (belum ke
                    database).
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              <form className="grid gap-3 text-sm" onSubmit={handleSubmit}>
                <div className="grid gap-1">
                  <label className="font-medium">Nama Tempat</label>
                  <input
                    type="text"
                    className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
                    placeholder="Contoh: Kedai Senja Kopi"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="grid gap-1">
                  <label className="font-medium">Kategori</label>
                  <select
                    className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50 bg-white"
                    value={form.category}
                    onChange={(e) =>
                      handleChange("category", e.target.value)
                    }
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Wisata">Wisata</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="grid gap-1">
                  <label className="font-medium">Kecamatan</label>
                  <input
                    type="text"
                    className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
                    placeholder="Contoh: Purwokerto Selatan"
                    value={form.district}
                    onChange={(e) =>
                      handleChange("district", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-1">
                  <label className="font-medium">Rating</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
                    value={form.rating}
                    onChange={(e) =>
                      handleChange("rating", e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-black/70 text-sm font-medium hover:bg-black hover:text-white transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  Simpan Tempat
                </button>
              </form>
            </div>
          </section>

          {/* CHATBOT ADMIN PANEL */}
          <ChatbotAdminPanel />
        </div>
      </main>
    </div>
  );
}

// src/components/admin/AdminDashboardView.tsx
import { useMemo, useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Coffee,
  Mountain,
  PlusCircle,
  Search,
  LogOut,
  Trash2,
  Pencil,
  FileText,
  Newspaper,
  Upload,
} from "lucide-react";

import InfoCard from "../ui/InfoCard";
import ChatbotAdminPanel from "../chatbot/ChatbotAdminPanel";

import type { AdminPlace, PlaceForm, NewsItem, NewsForm, CategoryUI, ResourceKey } from "./adminTypes";
import { apiFetch, safeJson } from "./adminApi";
import {
  TAG_LABELS,
  defaultTagsByCategory,
  categoryToResource,
  toArrFromComma,
  normalizeStringArray,
  normalizeTimeToHHMM,
  formatPriceInputID,
  parseHtmRangeFromInput, // ✅ baru
} from "./adminUtils";

export default function AdminDashboardView() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"places" | "news">("places");
  const [places, setPlaces] = useState<AdminPlace[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState<{ resource: ResourceKey; id: number } | null>(null);

  const [uploading, setUploading] = useState(false);

  const [placeForm, setPlaceForm] = useState<PlaceForm>({
    name: "",
    category: "",
    address: "",
    imageUrl: "",
    price: "0",
    openTime: "",
    closeTime: "",
    deskripsi: "",
    link_gmaps: "",

    fasilitas: [],

    cocok_untuk_text: "",
    menu_populer_text: "",

    trans_kode: "",
    trans_jarak_meter: "",
    trans_tarif_min: "",
    trans_tarif_max: "",
    trans_rute: "",
  });

  const [newsForm, setNewsForm] = useState<NewsForm>({
    title: "",
    category: "",
    date: "",
    image_url: "",
    content: "",
  });

  const fetchData = async () => {
    try {
      const [resWA, resWP, resCafe, resKuliner] = await Promise.all([
        apiFetch("/wisata_alam"),
        apiFetch("/wisata_pendidikan"),
        apiFetch("/tempat_nongkrong"),
        apiFetch("/kuliner"),
      ]);

      const wa = resWA.ok ? ((await safeJson(resWA)) as any[]) || [] : [];
      const wp = resWP.ok ? ((await safeJson(resWP)) as any[]) || [] : [];
      const cafe = resCafe.ok ? ((await safeJson(resCafe)) as any[]) || [] : [];
      const kul = resKuliner.ok ? ((await safeJson(resKuliner)) as any[]) || [] : [];

      const mapCommon = (i: any, category: CategoryUI): AdminPlace => ({
        id: i.id,
        name: i.nama_tempat,
        category,
        address: i.alamat,
        imageUrl: i.link_foto,

        // legacy
        price: i.htm,

        // ✅ range baru
        price_min: typeof i.htm_min === "number" ? i.htm_min : undefined,
        price_max: typeof i.htm_max === "number" ? i.htm_max : undefined,

        openTime: i.jam_buka,
        closeTime: i.jam_tutup,
        fasilitas: normalizeStringArray(i.fasilitas),
        deskripsi: i.deskripsi || "",
        link_gmaps: i.link_gmaps || "",
        cocok_untuk: normalizeStringArray(i.cocok_untuk),
        menu_populer: normalizeStringArray(i.menu_populer),
        trans_kode: i.trans_kode ?? null,
        trans_jarak_meter: i.trans_jarak_meter ?? null,
        trans_tarif_min: i.trans_tarif_min ?? null,
        trans_tarif_max: i.trans_tarif_max ?? null,
        trans_rute: i.trans_rute ? normalizeStringArray(i.trans_rute) : null,
      });

      const merged: AdminPlace[] = [
        ...wa.map((i: any) => mapCommon(i, "Wisata Alam")),
        ...wp.map((i: any) => mapCommon(i, "Wisata Pendidikan")),
        ...cafe.map((i: any) => mapCommon(i, "Cafe")),
        ...kul.map((i: any) => mapCommon(i, "Kuliner")),
      ];

      setPlaces(merged);

      const resNews = await apiFetch("/api/news");
      if (resNews.ok) setNewsList(((await safeJson(resNews)) as any[]) || []);
    } catch (err) {
      console.error(err);
      setError("Gagal ambil data. Cek backend & console.");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTagsList = useMemo(() => defaultTagsByCategory(placeForm.category), [placeForm.category]);

  const filteredPlaces = useMemo(
    () => places.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [places, searchQuery]
  );

  const displayPlaces = searchQuery ? filteredPlaces : [...places].slice(-12).reverse();

  const stats = useMemo(() => {
    return {
      total: places.length,
      news: newsList.length,
      cafe: places.filter((p) => p.category === "Cafe").length,
      wisata: places.filter((p) => p.category.includes("Wisata")).length,
    };
  }, [places, newsList]);

  const handlePlaceChange = (field: keyof PlaceForm, value: string) => {
    setPlaceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFasilitasToggle = (tag: string) => {
    setPlaceForm((prev) => {
      const cur = prev.fasilitas || [];
      if (cur.includes(tag)) return { ...prev, fasilitas: cur.filter((t) => t !== tag) };
      return { ...prev, fasilitas: [...cur, tag] };
    });
  };

  const resetPlaceForm = () => {
    setIsEditing(false);
    setEditKey(null);
    setPlaceForm({
      name: "",
      category: "",
      address: "",
      imageUrl: "",
      price: "0",
      openTime: "",
      closeTime: "",
      deskripsi: "",
      link_gmaps: "",
      fasilitas: [],
      cocok_untuk_text: "",
      menu_populer_text: "",
      trans_kode: "",
      trans_jarak_meter: "",
      trans_tarif_min: "",
      trans_tarif_max: "",
      trans_rute: "",
    });
  };

  const handleUploadFile = async (file: File) => {
    setError("");
    setSuccessMsg("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await apiFetch("/api/upload", { method: "POST", body: fd });
      const body = await safeJson(res);

      if (!res.ok) {
        throw new Error(typeof body === "string" ? body : body?.message || "Upload gagal.");
      }

      const url = (body as any)?.url;
      if (!url) throw new Error("Response upload tidak ada field `url`.");

      setPlaceForm((prev) => ({ ...prev, imageUrl: String(url) }));
      setSuccessMsg("Upload berhasil. URL sudah terisi otomatis.");
    } catch (e: any) {
      setError(e?.message || "Upload error. Pastikan BE ada endpoint /api/upload.");
    } finally {
      setUploading(false);
    }
  };

  const handlePlaceSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      if (!placeForm.category) throw new Error("Kategori wajib dipilih.");

      const resource = categoryToResource(placeForm.category as CategoryUI);
      const isEdit = isEditing && editKey?.id != null;

      // ✅ PRICE: ambil min/max/avg
      const { min, max, avg } = parseHtmRangeFromInput(placeForm.price);

      // ✅ TIME: paksa HH:mm (24 jam)
      const oTime = normalizeTimeToHHMM(placeForm.openTime) || "08:00";
      const cTime = normalizeTimeToHHMM(placeForm.closeTime) || "22:00";

      const transRuteArr = toArrFromComma(placeForm.trans_rute);

      const payload = {
        nama_tempat: placeForm.name,
        kategori: resource,
        alamat: placeForm.address,
        jam_buka: oTime,
        jam_tutup: cTime,

        // ✅ kirim range
        htm_min: min,
        htm_max: max,

        // ✅ tetap kirim avg untuk kompatibilitas
        htm: avg,

        link_gmaps: placeForm.link_gmaps || "-",
        link_foto: placeForm.imageUrl || "",
        deskripsi: placeForm.deskripsi || "-",

        fasilitas: placeForm.fasilitas || [],
        cocok_untuk: toArrFromComma(placeForm.cocok_untuk_text),
        menu_populer: toArrFromComma(placeForm.menu_populer_text),

        trans_kode: placeForm.trans_kode ? placeForm.trans_kode : null,
        trans_jarak_meter: placeForm.trans_jarak_meter ? Number(placeForm.trans_jarak_meter) : null,
        trans_tarif_min: placeForm.trans_tarif_min ? Number(placeForm.trans_tarif_min) : null,
        trans_tarif_max: placeForm.trans_tarif_max ? Number(placeForm.trans_tarif_max) : null,
        trans_rute: transRuteArr,
      };

      const endpoint = isEdit ? `/${resource}/${editKey!.id}` : `/${resource}`;
      const method = isEdit ? "PUT" : "POST";

      const res = await apiFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(res);
      if (!res.ok) {
        throw new Error(typeof body === "string" ? body : (body as any)?.message || "Gagal menyimpan data.");
      }

      setSuccessMsg(isEdit ? "Data berhasil diupdate!" : "Data berhasil ditambahkan!");
      resetPlaceForm();
      await fetchData();
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPlace = (p: AdminPlace) => {
    setError("");
    setSuccessMsg("");
    setIsEditing(true);

    const resource = categoryToResource(p.category);
    setEditKey({ resource, id: p.id });
    setActiveTab("places");

    // ✅ tampilkan range kalau ada, kalau tidak fallback ke single
    const priceText =
      typeof p.price_min === "number" && typeof p.price_max === "number"
        ? formatPriceInputID(`${p.price_min} - ${p.price_max}`)
        : formatPriceInputID(String(p.price ?? 0));

    setPlaceForm({
      name: p.name,
      category: p.category,
      address: p.address,
      imageUrl: p.imageUrl || "",
      price: priceText,
      openTime: p.openTime || "",
      closeTime: p.closeTime || "",

      deskripsi: p.deskripsi || "",
      link_gmaps: p.link_gmaps || "",

      fasilitas: p.fasilitas || [],
      cocok_untuk_text: (p.cocok_untuk || []).join(", "),
      menu_populer_text: (p.menu_populer || []).join(", "),

      trans_kode: p.trans_kode ? String(p.trans_kode) : "",
      trans_jarak_meter: p.trans_jarak_meter != null ? String(p.trans_jarak_meter) : "",
      trans_tarif_min: p.trans_tarif_min != null ? String(p.trans_tarif_min) : "",
      trans_tarif_max: p.trans_tarif_max != null ? String(p.trans_tarif_max) : "",

      trans_rute: (p.trans_rute || []).join(", "),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePlace = async (p: AdminPlace) => {
    if (!confirm("Hapus tempat ini?")) return;

    setError("");
    setSuccessMsg("");

    try {
      const resource = categoryToResource(p.category);
      const res = await apiFetch(`/${resource}/${p.id}`, { method: "DELETE" });
      const body = await safeJson(res);

      if (!res.ok) throw new Error(typeof body === "string" ? body : (body as any)?.message || "Gagal delete.");

      setSuccessMsg("Data terhapus.");
      await fetchData();
    } catch (err: any) {
      setError(err?.message || String(err));
    }
  };

  const handleNewsChange = (field: keyof NewsForm, value: string) => {
    setNewsForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const payload = {
        title: newsForm.title,
        category: newsForm.category || "Umum",
        date: newsForm.date || new Date().toISOString().split("T")[0],
        image_url: newsForm.image_url,
        content: newsForm.content,
        read_minutes: 3,
      };

      const res = await apiFetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(res);
      if (!res.ok) throw new Error(typeof body === "string" ? body : (body as any)?.message || "Gagal memposting berita.");

      setSuccessMsg("Berita berhasil diterbitkan!");
      setNewsForm({ title: "", category: "", date: "", image_url: "", content: "" });
      await fetchData();
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Hapus berita ini?")) return;

    setError("");
    setSuccessMsg("");

    try {
      const res = await apiFetch(`/api/news/${id}`, { method: "DELETE" });
      const body = await safeJson(res);

      if (!res.ok) throw new Error(typeof body === "string" ? body : (body as any)?.message || "Gagal hapus berita.");

      setSuccessMsg("Berita dihapus.");
      await fetchData();
    } catch (err: any) {
      setError(err?.message || String(err));
    }
  };

  const handleLogout = () => {
    if (confirm("Keluar admin?")) {
      localStorage.removeItem("admin_role");
      localStorage.removeItem("exploremas_admin_token");
      localStorage.removeItem("exploremas_admin_session");
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-pageRadial font-sans text-slate-800">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
        <div className="w-[min(1120px,92%)] mx-auto h-16 flex items-center justify-between px-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Portal</p>
            <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut className="inline w-3 h-3 mr-1" /> Keluar
          </button>
        </div>
      </header>

      <main className="py-8 w-[min(1120px,92%)] mx-auto space-y-8 px-2">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard icon={<MapPin className="w-5 h-5" />} title={`${stats.total}`} text="Total Tempat" />
          <InfoCard icon={<Newspaper className="w-5 h-5" />} title={`${stats.news}`} text="Total Berita" />
          <InfoCard icon={<Coffee className="w-5 h-5" />} title={`${stats.cafe}`} text="Cafe" />
          <InfoCard icon={<Mountain className="w-5 h-5" />} title={`${stats.wisata}`} text="Wisata" />
        </section>

        <div className="flex gap-4 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("places")}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === "places"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <MapPin className="w-4 h-4" /> Kelola Tempat
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === "news"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Newspaper className="w-4 h-4" /> Kelola Berita
          </button>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">{error}</div>}
        {successMsg && (
          <div className="p-3 bg-green-50 text-green-600 text-xs rounded-lg border border-green-100">{successMsg}</div>
        )}

        {/* TAB PLACES */}
        {activeTab === "places" && (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
            {/* LIST */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Daftar Tempat</h3>
                <div className="relative">
                  <Search className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="pl-7 pr-3 py-1 text-xs border rounded-full w-40 focus:ring-1 focus:ring-slate-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-auto max-h-[650px]">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 border-b bg-slate-50 sticky top-0">
                    <tr>
                      <th className="p-2">Nama</th>
                      <th className="p-2">Kategori</th>
                      <th className="p-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayPlaces.map((p) => (
                      <tr key={`${p.category}-${p.id}`} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="p-2 font-medium">
                          {p.name}
                          <div className="text-[10px] text-slate-400 truncate w-[260px]">{p.address}</div>
                        </td>
                        <td className="p-2">
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full">{p.category}</span>
                        </td>
                        <td className="p-2 text-right space-x-1">
                          <button onClick={() => handleEditPlace(p)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeletePlace(p)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {displayPlaces.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-xs text-slate-400">
                          Tidak ada data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  {isEditing ? <Pencil className="w-4 h-4 text-blue-600" /> : <PlusCircle className="w-4 h-4 text-green-600" />}
                  {isEditing ? "Edit Tempat" : "Tambah Tempat"}
                </h3>

                {isEditing && (
                  <button onClick={resetPlaceForm} className="text-xs text-red-500">
                    Batal
                  </button>
                )}
              </div>

              <form onSubmit={handlePlaceSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold">Nama Tempat</label>
                  <input className="w-full border rounded p-2 text-sm" value={placeForm.name} onChange={(e) => handlePlaceChange("name", e.target.value)} />
                </div>

                <div>
                  <label className="text-xs font-semibold">Kategori</label>
                  <select
                    className="w-full border rounded p-2 text-sm bg-white"
                    value={placeForm.category}
                    onChange={(e) => handlePlaceChange("category", e.target.value)}
                    disabled={isEditing}
                  >
                    <option value="">Pilih...</option>
                    <option value="Wisata Alam">Wisata Alam</option>
                    <option value="Wisata Pendidikan">Wisata Pendidikan</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Kuliner">Kuliner</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold">Alamat</label>
                  <input className="w-full border rounded p-2 text-sm" value={placeForm.address} onChange={(e) => handlePlaceChange("address", e.target.value)} />
                </div>

                {/* JAM */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold">Jam Buka</label>
                    <input
                      type="text"
                      inputMode="text"
                      className="w-full border rounded p-2 text-sm"
                      placeholder="HH:mm (contoh 08:00)"
                      value={placeForm.openTime}
                      onKeyDown={(e) => {
                        const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
                        if (allowed.includes(e.key)) return;
                        if (e.ctrlKey || e.metaKey) return;
                        if (/[\d:.\s]/.test(e.key)) return;
                        e.preventDefault();
                      }}
                      onChange={(e) => handlePlaceChange("openTime", e.target.value)}
                      onBlur={() => setPlaceForm((p) => ({ ...p, openTime: normalizeTimeToHHMM(p.openTime) }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Jam Tutup</label>
                    <input
                      type="text"
                      inputMode="text"
                      className="w-full border rounded p-2 text-sm"
                      placeholder="HH:mm (contoh 22:00)"
                      value={placeForm.closeTime}
                      onKeyDown={(e) => {
                        const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
                        if (allowed.includes(e.key)) return;
                        if (e.ctrlKey || e.metaKey) return;
                        if (/[\d:.\s]/.test(e.key)) return;
                        e.preventDefault();
                      }}
                      onChange={(e) => handlePlaceChange("closeTime", e.target.value)}
                      onBlur={() => setPlaceForm((p) => ({ ...p, closeTime: normalizeTimeToHHMM(p.closeTime) }))}
                    />
                  </div>
                </div>

                {/* HARGA */}
                <div>
                  <label className="text-xs font-semibold">HTM / Harga</label>
                  <input
                    type="text"
                    inputMode="text"
                    className="w-full border rounded p-2 text-sm"
                    value={placeForm.price}
                    placeholder="contoh: 25.000 - 50.000"
                    onKeyDown={(e) => {
                      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
                      if (allowed.includes(e.key)) return;
                      if (e.ctrlKey || e.metaKey) return;
                      if (/[\d.\-\s]/.test(e.key)) return;
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[–—]/g, "-");
                      handlePlaceChange("price", raw);
                    }}
                    onBlur={() => setPlaceForm((p) => ({ ...p, price: formatPriceInputID(p.price) }))}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Deskripsi</label>
                  <textarea
                    rows={3}
                    className="w-full border rounded p-2 text-sm"
                    value={placeForm.deskripsi}
                    onChange={(e) => handlePlaceChange("deskripsi", e.target.value)}
                    placeholder="Ringkasan singkat..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Link GMaps</label>
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={placeForm.link_gmaps}
                    onChange={(e) => handlePlaceChange("link_gmaps", e.target.value)}
                    placeholder="https://maps.google.com/..."
                  />
                </div>

                {/* Upload + URL */}
                <div className="pt-2 border-t border-dashed border-slate-200">
                  <label className="text-xs font-semibold block mb-2">Foto</label>

                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border bg-slate-50 hover:bg-slate-100">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload File"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUploadFile(f);
                        }}
                      />
                    </label>

                    <span className="text-[11px] text-slate-500">atau isi URL manual di bawah</span>
                  </div>

                  <input
                    className="mt-2 w-full border rounded p-2 text-sm"
                    placeholder="https://... (link_foto)"
                    value={placeForm.imageUrl}
                    onChange={(e) => handlePlaceChange("imageUrl", e.target.value)}
                  />

                  {placeForm.imageUrl && (
                    <div className="mt-2 rounded-lg border overflow-hidden">
                      <img src={placeForm.imageUrl} alt="preview" className="w-full h-40 object-cover" />
                    </div>
                  )}
                </div>

                {/* Fasilitas */}
                {currentTagsList.length > 0 && (
                  <div className="pt-2 border-t border-dashed border-slate-200">
                    <label className="text-xs font-semibold block mb-2">Fasilitas (DB: fasilitas[])</label>
                    <div className="grid grid-cols-2 gap-2">
                      {currentTagsList.map((tag) => (
                        <div
                          key={tag}
                          onClick={() => handleFasilitasToggle(tag)}
                          className={`cursor-pointer flex items-center gap-2 p-2 rounded border text-xs transition ${
                            (placeForm.fasilitas || []).includes(tag)
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              (placeForm.fasilitas || []).includes(tag) ? "bg-white border-white" : "bg-white border-slate-300"
                            }`}
                          >
                            {(placeForm.fasilitas || []).includes(tag) && <div className="w-2 h-2 bg-slate-900 rounded-[1px]" />}
                          </div>
                          <span>{TAG_LABELS[tag] || tag}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 italic">
                      *Ini dikirim ke backend sebagai <b>fasilitas: string[]</b>
                    </p>
                  </div>
                )}

                {/* Cocok untuk + Menu populer */}
                <div className="pt-2 border-t border-dashed border-slate-200">
                  <label className="text-xs font-semibold">Cocok Untuk</label>
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={placeForm.cocok_untuk_text}
                    onChange={(e) => handlePlaceChange("cocok_untuk_text", e.target.value)}
                    placeholder="contoh: keluarga, anak, mahasiswa (pisah koma)"
                  />

                  {(placeForm.category === "Cafe" || placeForm.category === "Kuliner") && (
                    <>
                      <label className="text-xs font-semibold block mt-3">Menu Populer (DB: menu_populer[])</label>
                      <input
                        className="w-full border rounded p-2 text-sm"
                        value={placeForm.menu_populer_text}
                        onChange={(e) => handlePlaceChange("menu_populer_text", e.target.value)}
                        placeholder="contoh: espresso, latte, roti bakar (pisah koma)"
                      />
                    </>
                  )}
                </div>

                {/* Trans Banyumas */}
                <div className="pt-2 border-t border-dashed border-slate-200">
                  <label className="text-xs font-semibold block mb-2">Trans Banyumas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-500">Kode</label>
                      <input
                        className="w-full border rounded p-2 text-sm"
                        value={placeForm.trans_kode}
                        onChange={(e) => handlePlaceChange("trans_kode", e.target.value)}
                        placeholder="mis: T1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">Jarak (meter)</label>
                      <input
                        className="w-full border rounded p-2 text-sm"
                        value={placeForm.trans_jarak_meter}
                        onChange={(e) => handlePlaceChange("trans_jarak_meter", e.target.value)}
                        placeholder="mis: 1200"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">Tarif Min</label>
                      <input
                        className="w-full border rounded p-2 text-sm"
                        value={placeForm.trans_tarif_min}
                        onChange={(e) => handlePlaceChange("trans_tarif_min", e.target.value)}
                        placeholder="mis: 3000"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">Tarif Max</label>
                      <input
                        className="w-full border rounded p-2 text-sm"
                        value={placeForm.trans_tarif_max}
                        onChange={(e) => handlePlaceChange("trans_tarif_max", e.target.value)}
                        placeholder="mis: 5000"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="text-[11px] text-slate-500">Rute</label>
                    <textarea
                      rows={2}
                      className="w-full border rounded p-2 text-sm"
                      value={placeForm.trans_rute}
                      onChange={(e) => handlePlaceChange("trans_rute", e.target.value)}
                      placeholder="mis: Terminal - Alun-alun - ... "
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-2 rounded font-semibold text-sm hover:bg-black disabled:bg-slate-400 mt-4"
                >
                  {isLoading ? "Menyimpan..." : isEditing ? "Update Data" : "Simpan Data"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB NEWS: tidak diubah */}
        {activeTab === "news" && (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-4">Arsip Berita</h3>
              <div className="overflow-auto max-h-[560px]">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-400 border-b bg-slate-50">
                    <tr>
                      <th className="p-2">Judul</th>
                      <th className="p-2">Tanggal</th>
                      <th className="p-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsList.map((n) => (
                      <tr key={n.id} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="p-2 font-medium">
                          {n.title}
                          <div className="text-[10px] text-slate-400">{n.category}</div>
                        </td>
                        <td className="p-2 text-xs text-slate-500">{n.date}</td>
                        <td className="p-2 text-right">
                          <button onClick={() => handleDeleteNews(n.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {newsList.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-xs text-slate-400">
                          Belum ada berita.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Terbitkan Berita
              </h3>

              <form onSubmit={handleNewsSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold">Judul Berita</label>
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={newsForm.title}
                    onChange={(e) => handleNewsChange("title", e.target.value)}
                    placeholder="Contoh: Festival Banyumas 2024"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold">Kategori</label>
                    <input
                      className="w-full border rounded p-2 text-sm"
                      value={newsForm.category}
                      onChange={(e) => handleNewsChange("category", e.target.value)}
                      placeholder="Wisata/Event"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">Tanggal</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2 text-sm"
                      value={newsForm.date}
                      onChange={(e) => handleNewsChange("date", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold">Link Foto Cover</label>
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={newsForm.image_url}
                    onChange={(e) => handleNewsChange("image_url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Isi Singkat / Ringkasan</label>
                  <textarea
                    rows={4}
                    className="w-full border rounded p-2 text-sm"
                    value={newsForm.content}
                    onChange={(e) => handleNewsChange("content", e.target.value)}
                    placeholder="Tulis deskripsi berita..."
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-2 rounded font-semibold text-sm hover:bg-black disabled:bg-slate-400"
                >
                  {isLoading ? "Publishing..." : "Terbitkan Berita"}
                </button>
              </form>
            </div>
          </div>
        )}

        <ChatbotAdminPanel />
      </main>
    </div>
  );
}

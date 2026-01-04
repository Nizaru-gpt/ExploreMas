import React, { useMemo } from "react";
import { newsList } from "../../data/news";

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

function catBadge(cat: string) {
  // soft + clean (tanpa bikin norak)
  const base =
    "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-sm bg-white/85";
  const dot = "h-2 w-2 rounded-full";

  switch (cat) {
    case "Transportasi":
      return {
        cls: `${base} border-sky-200 text-sky-700 bg-sky-50/80`,
        dotCls: `${dot} bg-sky-500`,
      };
    case "Budaya":
      return {
        cls: `${base} border-violet-200 text-violet-700 bg-violet-50/80`,
        dotCls: `${dot} bg-violet-500`,
      };
    case "Pemerintahan":
      return {
        cls: `${base} border-emerald-200 text-emerald-700 bg-emerald-50/80`,
        dotCls: `${dot} bg-emerald-500`,
      };
    case "Pariwisata":
      return {
        cls: `${base} border-amber-200 text-amber-700 bg-amber-50/80`,
        dotCls: `${dot} bg-amber-500`,
      };
    default:
      return {
        cls: `${base} border-slate-200 text-slate-700 bg-slate-50/80`,
        dotCls: `${dot} bg-slate-500`,
      };
  }
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
      {children}
    </span>
  );
}

function FeaturedNewsCard({
  img,
  cat,
  title,
  date,
  min,
  excerpt,
  url,
}: {
  img: string;
  cat: string;
  title: string;
  date: string;
  min: number;
  excerpt: string;
  url?: string;
}) {
  const b = catBadge(cat);

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener,noreferrer" : undefined}
      className="group block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] hover:shadow-[0_26px_70px_rgba(15,23,42,0.14)] transition"
    >
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        {/* Image */}
        <div className="relative h-[240px] md:h-full min-h-[260px] overflow-hidden bg-slate-100">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/10 to-transparent" />

          <div className="absolute left-5 top-5">
            <span className={b.cls}>
              <span className={b.dotCls} />
              {cat}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
            {title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <MetaPill>📅 {formatDate(date)}</MetaPill>
            <MetaPill>⏱ {min} menit</MetaPill>
          </div>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Baca Selengkapnya →
            </span>
          </div>

          {/* subtle accent bar */}
          <div className="mt-6 h-[10px] w-full rounded-full bg-gradient-to-r from-slate-100 to-transparent" />
        </div>
      </div>
    </a>
  );
}

function NewsCard({
  img,
  cat,
  title,
  date,
  min,
  excerpt,
  url,
}: {
  img: string;
  cat: string;
  title: string;
  date: string;
  min: number;
  excerpt: string;
  url?: string;
}) {
  const b = catBadge(cat);

  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener,noreferrer" : undefined}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition"
    >
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute top-3 left-3">
          <span className={b.cls}>
            <span className={b.dotCls} />
            {cat}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-[1.05rem] font-semibold text-slate-900 leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <MetaPill>📅 {formatDate(date)}</MetaPill>
          <MetaPill>⏱ {min} menit</MetaPill>
        </div>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">Update</span>
          <span className="text-brand2 font-semibold text-sm inline-flex items-center gap-1">
            Baca <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function NewsList() {
  const { featured, rest } = useMemo(() => {
    const sorted = [...newsList].sort((a, b) => (a.date < b.date ? 1 : -1));
    return { featured: sorted[0] ?? null, rest: sorted.slice(1) };
  }, []);

  return (
    <div className="w-[min(1120px,92%)] mx-auto mt-10 md:mt-16 px-6">
      {/* Header kecil biar ga kosong & lebih “niat” */}
      <div className="mb-6">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#001845]">
          Explore News
        </h2>
        <p className="mt-1 text-slate-600 text-sm md:text-base">
          Update terbaru seputar Banyumas yang tetap ringkas & enak dibaca.
        </p>
      </div>

      {/* Featured */}
      {featured && (
        <div className="mb-6">
          <FeaturedNewsCard
            img={featured.image}
            cat={featured.category}
            title={featured.title}
            date={featured.date}
            min={featured.readMinutes}
            excerpt={featured.excerpt}
            url={featured.url}
          />
        </div>
      )}

      {/* Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rest.map((n) => (
          <NewsCard
            key={n.id}
            img={n.image}
            cat={n.category}
            title={n.title}
            date={n.date}
            min={n.readMinutes}
            excerpt={n.excerpt}
            url={n.url}
          />
        ))}
      </div>
    </div>
  );
}

import { newsList } from "../../data/news";

function NewsCard({
  img,
  cat,
  title,
  date,
  min,
  excerpt,
}: {
  img: string;
  cat: string;
  title: string;
  date: string;
  min: number;
  excerpt: string;
}) {
  return (
    <article className="bg-white border border-border rounded-2xl shadow-soft overflow-hidden">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-[180px] object-cover"
        />
        <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-[#EFF4FF] text-brand2 font-semibold text-sm">
          {cat}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[1.1rem] font-semibold">{title}</h3>
        <div className="text-muted flex gap-4 my-2">
          <span>
            📅{" "}
            {new Date(date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>⏱ {min} menit</span>
        </div>
        <p className="text-muted">{excerpt}</p>
        <a href="#" className="text-brand2 font-semibold">
          Baca Selengkapnya →
        </a>
      </div>
    </article>
  );
}

export default function NewsList() {
  return (
    <div className="w-[min(1120px,92%)] mx-auto mt-10 md:mt-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {newsList.map((n) => (
          <NewsCard
            key={n.id}
            img={n.image}
            cat={n.category}
            title={n.title}
            date={n.date}
            min={n.readMinutes}
            excerpt={n.excerpt}
          />
        ))}
      </div>
    </div>
  );
}

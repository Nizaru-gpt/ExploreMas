import { topPlaces } from "../../data/wisata";

function RankBadge({ i }: { i: number }) {
  return (
    <div className="absolute top-3 left-3 bg-brand2 text-white px-2 py-1 rounded-full font-bold shadow-soft">
      #{i}
    </div>
  );
}

export default function RecommendationList() {
  return (
    <section className="w-[min(1120px,92%)] mx-auto mt-10 md:mt-14">
      {/* Heading (optional, biar rapih) */}
      {/* <h2 className="text-2xl md:text-3xl font-extrabold text-text">Explore Better With Recommendation</h2> */}

      {/* SCROLLER */}
      <div
        className="
          relative mt-4
          overflow-hidden
        "
      >
        {/* gradient hint kiri/kanan (opsional) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          className="
            reco-scroller flex gap-6 flex-nowrap
            overflow-x-auto no-scrollbar scroll-smooth
            snap-x snap-mandatory
            px-1 py-2
          "
        >
          {topPlaces.map((p, idx) => (
            <article
              key={p.id}
              className="
                bg-white border border-border rounded-2xl shadow-soft overflow-hidden
                snap-start shrink-0
                /* MOBILE: 85% layar biar enak diswipe */
                w-[85%]
                /* TABLET: ~60% layar */
                sm:w-[60%]
                /* DESKTOP: PAS 3 CARD/VIEW => (100% - 2*gap)/3  -> gap=1.5rem=24px */
                lg:w-[calc((100%-48px)/3)]
              "
            >
              <div className="relative">
                <img src={p.image} alt={p.name} className="w-full h-[200px] sm:h-[220px] object-cover" />
                <RankBadge i={idx + 1} />
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full font-bold shadow-soft flex items-center gap-1">
                  <span className="text-warning">★</span> {p.rating.toFixed(1)}
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#EFF4FF] text-brand2 font-semibold text-sm">
                  {p.category}
                </span>
                <h3 className="mt-2 text-[1.1rem] font-semibold">{p.name}</h3>
                <div className="text-muted">{p.reviews} reviews</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

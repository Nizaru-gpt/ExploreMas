import transHero from "../../assets/images/trans/trans-hero.jpg";
import iconTime from "../../assets/images/trans/icon-time.png";
import iconFare from "../../assets/images/trans/icon-fare.png";
import iconDuration from "../../assets/images/trans/icon-duration.png";

import SectionHeading from "../layout/SectionHeading";
import { transInfoItems, type TransInfoItem } from "../../data/trans";

const iconMap: Record<TransInfoItem["id"], string> = {
  time: iconTime,
  fare: iconFare,
  duration: iconDuration,
};

export default function TransIntro() {
  return (
    <section className="bg-surface py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-8">
          {/* Heading */}
          <div>
            <SectionHeading
              eyebrow="Transportasi Publik"
              title="Trans Banyumas"
              align="left"
            />
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Sistem transportasi yang menghubungkan berbagai wilayah di Kabupaten Banyumas
              dengan nyaman, aman, dan terjangkau.
            </p>
          </div>

          {/* Hero image */}
          <div className="overflow-hidden rounded-3xl bg-muted/40">
            <img
              src={transHero}
              alt="Interior bus Trans Banyumas"
              className="h-52 w-full object-cover md:h-64"
            />
          </div>

          {/* Info cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3 place-items-center">
            {transInfoItems.map((item: TransInfoItem) => (
              <article
                key={item.id}
                className="w-full max-w-[320px] bg-white px-5 py-5 rounded-2xl shadow-soft ring-1 ring-slate-100 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 shadow-sm">
                    <img
                      src={iconMap[item.id]}
                      alt={item.label}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {item.label}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-base font-semibold text-slate-900">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[12px] text-slate-500">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

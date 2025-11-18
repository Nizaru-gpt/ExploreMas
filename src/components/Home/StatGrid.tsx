import { useState } from "react";
import StatCard from "../ui/StatCard";

import stats1 from "../../assets/images/stats/stats-1.png";
import stats2 from "../../assets/images/stats/stats-2.png";
import stats3 from "../../assets/images/stats/stats-3.png";
import shape1 from "../../assets/images/stats/shape-1.png";

type Id = "people" | "area" | "tour";
type Variant = "left" | "center" | "right";

const DATA: Record<
  Id,
  { icon: string; top: string; bottom: string; opacity: number }
> = {
  people: { icon: stats1, top: "1,2 Juta", bottom: "Penduduk", opacity: 0.73 },
  area: { icon: stats2, top: "275 Km²", bottom: "Luas Wilayah", opacity: 0.74 },
  tour: { icon: stats3, top: "50+", bottom: "Destinasi Wisata", opacity: 0.7 },
};

const CARD = {
  left: { w: 220, h: 220 },
  center: { w: 280, h: 280 },
  right: { w: 220, h: 220 },
} as const;

const GAP_X = 90;

export default function StatGrid() {
  const [pos, setPos] = useState<Record<Id, Variant>>({
    people: "left",
    area: "center",
    tour: "right",
  });

  const xOf = (v: Variant) => {
    const cW = CARD.center.w;
    if (v === "center") return 0;
    const sW = CARD[v].w;
    const delta = (cW / 2) + GAP_X + (sW / 2);
    return v === "left" ? -delta : delta;
  };

  const yOf = (v: Variant) => {
    if (v === "center") return 0;
    const cH = CARD.center.h;
    const sH = CARD[v].h;
    return (cH - sH) / 2;
  };

  const moveToCenter = (id: Id) => {
    if (pos[id] === "center") return;
    const currentCenter = (Object.keys(pos) as Id[]).find(
      (k) => pos[k] === "center",
    )!;
    const side = pos[id];
    setPos({ ...pos, [id]: "center", [currentCenter]: side });
  };

  return (
    <div className="relative w-[min(1120px,92%)] mx-auto mt-14 mb-2000 md:mb-16">
      <img
        src={shape1}
        alt=""
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          left: "-265px",
          top: "20px",
          width: "360px",
          height: "auto",
          opacity: 0.9,
          zIndex: 0,
        }}
      />

      <div
        className="relative mx-auto"
        style={{ height: CARD.center.h, zIndex: 1 }}
      >
        {(["people", "area", "tour"] as Id[]).map((id) => {
          const v = pos[id];
          const s = CARD[v];
          const active = v === "center";

          return (
            <div
              key={id}
              className="absolute"
              style={{
                left: `calc(50% + ${xOf(v)}px - ${s.w / 2}px)`,
                top: yOf(v),
                width: s.w,
                height: s.h,
                transition:
                  "left 420ms cubic-bezier(0.25,0.8,0.25,1), top 420ms cubic-bezier(0.25,0.8,0.25,1)",
                zIndex: active ? 2 : 1,
              }}
            >
              <StatCard
                variant={v}
                iconSrc={DATA[id].icon}
                iconSize={active ? 116 : 94}
                topText={DATA[id].top}
                bottomText={DATA[id].bottom}
                iconOpacity={DATA[id].opacity}
                active={active}
                onClick={() => moveToCenter(id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

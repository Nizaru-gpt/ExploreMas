import type { TransCorridor } from "../../data/trans";

type Props = {
  corridor: TransCorridor;
};

export default function CorridorCard({ corridor }: Props) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          {corridor.code}
        </span>
        <span className="text-lg" aria-hidden="true">
          {corridor.iconLabel}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        {corridor.name}
      </h3>

      <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>{corridor.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⏱</span>
          <span>{corridor.duration}</span>
        </div>
      </div>

      <div className="mt-5 text-sm text-slate-700">
        <p className="mb-2 font-medium">Halte yang dilalui:</p>
        <ul className="space-y-3">
          {corridor.stops.map((stop: string, index: number) => {
            const isLast = index === corridor.stops.length - 1;
            return (
              <li key={stop} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="h-4 w-4 rounded-full border-2 border-blue-500 bg-white shadow-sm" />
                  {!isLast && (
                    <span className="mt-1 h-6 w-[2px] rounded-full bg-blue-200" />
                  )}
                </div>
                <span className="pt-0.5 text-slate-700">{stop}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

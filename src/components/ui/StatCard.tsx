type Variant = "left" | "center" | "right";

type Props = {
  variant: Variant;
  iconSrc: string;
  iconSize: number;
  topText: string;
  bottomText: string;
  iconOpacity?: number;
  active?: boolean;      
  onClick?: () => void;
};

const SIZE = {
  left:   { w: 250, h: 250 },
  center: { w: 320, h: 320 },
  right:  { w: 250, h: 250 },
} as const;

const TINT = { left: "#EEF6FF", center: "#D0E4FF", right: "#EEF6FF" } as const;

/** Kotak putih di belakang ikon — kecil di sisi, membesar sedikit saat center */
const BOX_ACTIVE = { w: 115, h: 104, top: 30, dx: 16, r: { tl: 18, tr: 10, br: 14, bl: 10 } };
const BOX_SIDE   = { w: 92,  h: 80,  top: 28, dx: 12, r: { tl: 16, tr: 8,  br: 12, bl: 8  } };

/** Quarter biru — HANYA untuk card aktif (tengah) */
const Q_ACTIVE = { size: 112, left: -30, bottom: 45, overlap: 16, radius: 56 };

// Shadow item tipis (tanpa panel putih/kuning)
const SHADOW_CARD       = "0 8px 14px rgba(0,0,0,0.22)";
const SHADOW_BOX_ACTIVE = "0 4px 10px rgba(0,0,0,0.12)";
const SHADOW_BOX_SIDE   = "0 2px 6px rgba(0,0,0,0.08)";

export default function StatCard({
  variant,
  iconSrc,
  iconSize,
  topText,
  bottomText,
  iconOpacity = 0.73,
  active = false,
  onClick,
}: Props) {
  const s = SIZE[variant];
  const B = active ? BOX_ACTIVE : BOX_SIDE;

  return (
    <div className="relative" style={{ width: s.w, height: s.h }}>
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 outline-none border-0 focus:outline-none"
        aria-label={`${topText} ${bottomText}`}
      >
        <div className="relative h-full w-full rounded-[56px]">
          {/* Quarter biru hanya render saat card aktif (tengah) */}
          {active && (
            <div
              className="absolute"
              style={{
                left: Q_ACTIVE.left,
                bottom: -(Q_ACTIVE.size - Q_ACTIVE.bottom) + Q_ACTIVE.overlap,
                width: Q_ACTIVE.size,
                height: Q_ACTIVE.size,
                backgroundColor: "#6F96D1",
                borderTopLeftRadius: Q_ACTIVE.radius,
                borderBottomRightRadius: 12,
              }}
              aria-hidden
            />
          )}

          {/* Kartu */}
          <div
            className="relative z-[1] flex h-full w-full flex-col items-center justify-center rounded-[56px]"
            style={{
              backgroundColor: active ? TINT.center : TINT[variant],
              transform: active ? "scale(1.04)" : "scale(1)",
              boxShadow: SHADOW_CARD,
              transition: "background-color 300ms ease, transform 240ms ease",
            }}
          >
            {/* 🔲 Kotak putih (kecil di sisi, sedikit membesar saat center) */}
            <div
              className="absolute transition-all duration-300"
              style={{
                left: `calc(50% + ${B.dx}px)`,
                top: B.top,
                width: B.w,
                height: B.h,
                backgroundColor: "#fff",
                borderTopLeftRadius: B.r.tl,
                borderTopRightRadius: B.r.tr,
                borderBottomRightRadius: B.r.br,
                borderBottomLeftRadius: B.r.bl,
                transform: "translateX(-50%)",
                boxShadow: active ? SHADOW_BOX_ACTIVE : SHADOW_BOX_SIDE,
              }}
              aria-hidden
            />

            {/* Ikon */}
            <img
              src={iconSrc}
              alt=""
              onClick={onClick}
              className="relative z-10 select-none pointer-events-auto"
              style={{ width: iconSize, height: iconSize, opacity: iconOpacity, cursor: "pointer" }}
            />

            {/* Teks */}
            <div className="mt-3 text-center">
              <div className="text-[20px] font-extrabold tracking-tight text-text">{topText}</div>
              <div className="mt-1 text-[16px] font-semibold text-text">{bottomText}</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

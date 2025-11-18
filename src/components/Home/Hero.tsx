import brushUrl from "/src/assets/images/hero/brush.png";
import tuguUrl from "/src/assets/images/hero/tugu.png";
import cloud1Url from "/src/assets/images/hero/cloud-1.png";
import cloud2Url from "/src/assets/images/hero/cloud-2.png";
import cloud3Url from "/src/assets/images/hero/cloud-3.png";
import shapeLeftUrl from "/src/assets/images/hero/shape-left.png";
import shapeRightUrl from "/src/assets/images/hero/shape-right.png";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-visible pt-14 pb-6 md:min-h-[720px] xl:min-h-[820px]"
      style={{ ["--brush-url" as any]: `url(${brushUrl})` }}
    >
      {/* ===== SHAPES (BELAKANG) ===== */}
      <img
        src={shapeLeftUrl}
        alt=""
        aria-hidden
        className="
          pointer-events-none select-none absolute z-0
          left-[-120px] top-[10px] w-[520px] opacity-90
          md:left-[-105px] md:top-[6px] md:w-[560px]
          xl:left-[2px] xl:top-[-100px] xl:w-[600px]
        "
      />
      <img
        src={shapeRightUrl}
        alt=""
        aria-hidden
        className="
          pointer-events-none select-none absolute z-0
          right-[-80px] bottom-[-100px] w-[660px] opacity-90
          md:right-[-72px] md:bottom-[-110px] md:w-[720px]
          xl:right-[1px] xl:bottom-[-50px] xl:w-[780px]
        "
      />

      {/* ===== CLOUD-3 (bawah Purwokerto) ===== */}
      <img
        src={cloud3Url}
        alt=""
        aria-hidden
        className="
          absolute z-0 top-[362px] left-[318px] w-[400px]
          opacity-[0.36] blur-[4px] drop-shadow
          md:top-[356px] md:left-[330px]
          xl:top-[310px] xl:left-[350px] xl:w-[360px]
        "
      />

      {/* ===== GRID KONTEN ===== */}
      <div className="relative z-10 w-[min(1120px,92%)] mx-auto grid grid-cols-1 md:grid-cols-[1.06fr_.94fr] items-end gap-6 px-6">

        {/* ===== TEKS ===== */}
        <div className="md:pt-[16px] -translate-y-[208px] md:-translate-y-[224px] xl:-translate-y-[236px] z-10">
          <p className="font-semibold tracking-wide text-[#181E4B]/80">
            THE BEST CHOICE FOR EMBRACING A SLOW–LIVING LIFESTYLE.
          </p>

          <h1 className="font-playfair font-extrabold tracking-[-0.01em]
                         leading-[1.06] text-[clamp(2.2rem,4.2vw,3.3rem)]
                         text-[#181E4B]">
            <span className="block">
              Live Slow, <span className="underline-brush">Feel More</span>,
            </span>
            <span className="block">Discover</span>
            <span className="block">
              <span className="font-black">Purwokerto.</span>
            </span>
          </h1>

          <p className="max-w-[560px] mt-10 text-[#5E6282]">
            Rested in the heart of Java, Purwokerto humbles in its grace.
            Favored by wanderers who seek calm, it delights not in grandeur
            but in gentle living.
          </p>

          {/* ===== BUTTON About US ===== */}
          <div className="mt-6 inline-block relative">
            {/* Glow kuning */}
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2
               bottom-[-8px] w-[160px] h-[40px] rounded-full
               bg-[radial-gradient(closest-side,rgba(255,210,150,0.35),rgba(255,210,150,0)_80%)]
               blur-[8px]"
            />

            {/* Tombol utama */}
            <a
              href="#about"
              className="relative z-10 inline-block rounded-[22px] px-8 py-3
               bg-[#0f1f56] text-white font-semibold
               shadow-[0_8px_22px_rgba(12,27,76,0.35)]
               hover:opacity-95
               transition duration-200"
            >
              About US
            </a>
          </div>


        </div>

        {/* ===== KOLOM KANAN: TUGU + CLOUD ===== */}
        <div className="relative flex justify-end -translate-y-[84px] md:-translate-y-[96px] xl:-translate-y-[108px] z-20">

          {/* CLOUD-1 — kiri tugu, sedikit lebih atas */}
          <img
            src={cloud1Url}
            alt=""
            aria-hidden
            className="
              absolute z-0 top-[-28px] right-[calc(100%-10px)] w-[400px]
              opacity-[0.36] blur-[4px] drop-shadow
              md:top-[-26px] md:right-[calc(100%-12px)] md:w-[420px]
              xl:top-[20px] xl:right-[calc(100%-340px)] xl:w-[340px]
            "
          />

          {/* CLOUD-2 — kanan tugu, sedikit lebih bawah */}
          <img
            src={cloud2Url}
            alt=""
            aria-hidden
            className="
              absolute z-0 top-[62px] left-[calc(100%-10px)] w-[400px]
              opacity-[0.36] blur-[4px] drop-shadow
              md:top-[70px] md:left-[calc(100%-14px)] md:w-[420px]
              xl:top-[150px] xl:left-[calc(100%-250px)] xl:w-[340px]
            "
          />

          {/* TUGU */}
          <img
            src={tuguUrl}
            alt="Tugu Purwokerto"
            className="
              relative z-20 select-none
              w-[min(580px,38vw)] h-auto translate-x-[16px]
              md:w-[min(500px,40vw)] md:translate-x-[18px]
              xl:w-[min(700px,42vw)] xl:translate-x-[20px]
            "
          />
        </div>
      </div>
    </section>
  );
}

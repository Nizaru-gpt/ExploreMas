export default function ServiceIntro() {
  return (
    <section className="w-full">
      {/* Heading di tengah */}
      <div className="w-[min(1120px,92%)] mx-auto px-6 text-center mb-3">
        <p className="text-muted font-semibold">Welcome to</p>
        <h2 className="font-playfair text-brand text-[2rem] md:text-[2.2rem] font-extrabold tracking-wide">
          PURWOKERTO
        </h2>
      </div>

      {/* Panel biru — full width */}
      <div
        className="w-screen relative left-[50%] right-[50%] -mx-[50vw] border-t border-b border-border shadow-soft"
        style={{ backgroundColor: "rgba(208,228,255,0.57)" }}
      >
        <div className="w-[min(880px,90%)] mx-auto py-8 text-center">
          <p className="text-text font-semibold mb-2 text-[1.1rem]">
            Tentang Purwokerto
          </p>
          <p className="text-muted leading-relaxed">
            Purwokerto adalah ibu kota Kabupaten Banyumas yang terletak di wilayah barat daya
            Provinsi Jawa Tengah. Kota ini merupakan pusat ekonomi, pendidikan, dan pariwisata di
            kawasan Barlingmascakeb (Banyumas, Purbalingga, Banjarnegara, Cilacap, dan Kebumen).
          </p>
        </div>
      </div>
    </section>
  );
}

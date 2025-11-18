export default function Footer() {
  return (
    <footer className="bg-[#0E1524] text-[#DFE6FB] mt-10 pt-10 pb-6">
      <div className="w-[min(1120px,92%)] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1.2fr_1.2fr_1.2fr] gap-6 px-6">
        <div>
          <strong className="block mb-2">Pemkab Banyumas</strong>
          <p className="text-[#B9C4E2]">
            Pemerintah Kabupaten Banyumas berkomitmen untuk memberikan pelayanan terbaik bagi masyarakat dan memajukan daerah.
          </p>
        </div>
        <div>
          <strong className="block mb-2">Kontak</strong>
          <p>Jl. Banyumas, Purwokerto, Jawa Tengah 53114</p>
          <p>(0281) 123456</p>
          <p>info@banyumaskab.go.id</p>
        </div>
        <div>
          <strong className="block mb-2">Link Cepat</strong>
          <p>Tentang Kami</p><p>Berita</p><p>Galeri</p><p>PPID</p><p>Karir</p>
        </div>
        <div>
          <strong className="block mb-2">Media Sosial</strong>
          <p>Ikuti kami di media sosial untuk update terbaru</p>
          <div className="flex gap-3 opacity-90 mt-2">
            <span></span><span></span><span></span><span>▶</span>
          </div>
        </div>
      </div>
      <div className="w-[min(1120px,92%)] mx-auto mt-4 border-t border-white/10 pt-3 text-center text-[#9FB0D7] px-6">
        © 2025 Pemerintah Kabupaten Banyumas. All rights reserved.
      </div>
    </footer>
  );
}

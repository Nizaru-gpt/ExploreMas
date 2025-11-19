import { ChevronDown } from "lucide-react";

const linkBase =
  "relative pb-1 text-sm md:text-base text-black whitespace-nowrap " +
  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
  "after:w-0 after:bg-black after:transition-[width] after:duration-300 hover:after:w-full";

const navItems = [
  { id: "home", label: "Home" },
  { id: "services", label: "Layanan" },
  { id: "recommendations", label: "Rekomendasi" },
  { id: "news", label: "Berita" },
  { id: "trans", label: "Trans Banyumas" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // offset dikurangi tinggi navbar (±80px) biar pas
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8FBFF]/80 backdrop-blur border-b border-border font-[Montserrat]">
      <div className="w-[min(1120px,92%)] mx-auto h-20 flex items-center justify-between px-6">
        {/* LOGO / NAMA WEBSITE */}
        <div className="font-playfair text-xl md:text-2xl font-extrabold text-[#001845]">
          ExploreMas
        </div>

        {/* NAV LINKS (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-black font-medium whitespace-nowrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={linkBase}
            >
              {item.label}
            </button>
          ))}

          {/* Login & bahasa (optional, biar mirip desain) */}
          <div className="ml-6 flex items-center gap-3 text-sm">
            <button className="text-black hover:opacity-70 transition">
              Login
            </button>
            <button className="px-4 py-1.5 border border-black/70 rounded-full text-sm text-black font-medium hover:bg-black hover:text-white transition">
              Sign up
            </button>
            <button className="flex items-center gap-1 text-black hover:opacity-70 transition">
              EN <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* versi mobile: simple button (bisa kamu upgrade nanti) */}
        <div className="md:hidden text-sm text-black">
          Menu
        </div>
      </div>
    </header>
  );
}

import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const linkBase =
  "relative pb-1 text-sm md:text-base whitespace-nowrap " +
  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
  "after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full";

type NavItem = {
  id: "home" | "recommendations" | "trans" | "trip-planner";
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "recommendations", label: "Rekomendasi" },
  { id: "trans", label: "Trans Banyumas" },
  { id: "trip-planner", label: "Trip Planner" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 80; // offset navbar
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm font-[Montserrat]">
      <div className="w-[min(1120px,92%)] mx-auto h-20 flex items-center justify-between px-6">
        {/* LOGO / NAMA WEBSITE */}
        <button
          onClick={() => scrollToSection("home")}
          className="font-playfair text-xl md:text-2xl font-extrabold text-[#001845]"
        >
          ExploreMas
        </button>

        {/* NAV LINKS (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-black font-medium whitespace-nowrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={linkBase + " text-black"}
            >
              {item.label}
            </button>
          ))}

          {/* Login & bahasa */}
          <div className="ml-6 flex items-center gap-3 text-sm">
            <Link
              to="/login"
              className="text-black hover:opacity-70 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-1.5 border border-black/70 rounded-full text-sm text-black font-medium hover:bg-black hover:text-white transition"
            >
              Sign up
            </Link>

            <button className="flex items-center gap-1 text-black hover:opacity-70 transition">
              EN <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* versi mobile: simple button */}
        <div className="md:hidden text-sm text-black">Menu</div>
      </div>
    </header>
  );
}

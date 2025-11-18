import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const linkBase =
  "relative pb-1 text-black whitespace-nowrap " +
  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] " +
  "after:w-0 after:bg-black after:transition-[width] after:duration-300 hover:after:w-full";
const linkActive = linkBase + " after:w-full font-semibold";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-0 border-0 font-[Montserrat]">
      <div className="w-[min(1120px,92%)] mx-auto h-20 flex items-center justify-end px-6">
        <nav className="flex items-center gap-6 text-black font-medium whitespace-nowrap">
          <NavLink to="/" end className={({ isActive }) => (isActive ? linkActive : linkBase)}>
            Home
          </NavLink>
          <NavLink to="/destinations" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
            Destinations
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
            Berita
          </NavLink>
          <NavLink to="/trans" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
            Trans Banyumas
          </NavLink>

          {/* kanan */}
          <div className="flex items-center gap-6 ml-6">
            {/* LOGIN – teks polos */}
            <button className="text-black hover:opacity-70 transition">
              Login
            </button>

            {/* SIGN UP – outline style */}
            <button className="px-4 py-1.5 border border-black/70 rounded-md text-black font-medium hover:bg-black hover:text-white transition">
              Sign up
            </button>

            {/* EN – teks polos */}
            <button className="flex items-center gap-1 text-black hover:opacity-70 transition">
              EN <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

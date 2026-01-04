import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { isLoggedIn } from "../../lib/auth";
import Swal from "sweetalert2";
import chatbotMascot from "../../assets/images/maskot/chatbot.png";
import loginMascot from "../../assets/images/maskot/login.png";
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

  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  const navigate = useNavigate();

  const [logged, setLogged] = useState(isLoggedIn());
  const [name, setName] = useState(() => localStorage.getItem("exploremas_username") || "");

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sync = () => {
      setLogged(isLoggedIn());
      setName(localStorage.getItem("exploremas_username") || "");
    };

    window.addEventListener("authChanged", sync as EventListener);
    window.addEventListener("focus", sync);

    return () => {
      window.removeEventListener("authChanged", sync as EventListener);
      window.removeEventListener("focus", sync);
    };
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // ✅ hanya tambah SweetAlert (logic logout tetap sama)
  const handleLogout = async () => {
    const res = await Swal.fire({
      title: "Logout?",
      text: "Kamu yakin mau keluar?",
      imageUrl: chatbotMascot,
      imageWidth: 150,
      imageAlt: "Chatbot mascot",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (!res.isConfirmed) return;

    // (LOGIC ASLI)
    localStorage.removeItem("exploremas_token");
    localStorage.removeItem("exploremas_session");
    localStorage.removeItem("exploremas_username");

    setOpen(false);
    window.dispatchEvent(new Event("authChanged"));

    await Swal.fire({
      title: "Berhasil logout",
      text: "Sampai jumpa lagi 👋",
      imageUrl: loginMascot,
      imageWidth: 150,
      imageAlt: "Chatbot mascot",
      showConfirmButton: false,
      timer: 1200,
    });

    navigate("/", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm font-[Montserrat]">
      <div className="w-[min(1120px,92%)] mx-auto h-20 flex items-center justify-between px-6">
        {/* LOGO */}
        <button
          onClick={() => scrollToSection("home")}
          className="font-playfair text-xl md:text-2xl font-extrabold text-[#001845]"
        >
          ExploreMas
        </button>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-6 text-black font-medium">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={linkBase}>
              {item.label}
            </button>
          ))}

          {/* AUTH (tanpa EN) */}
          <div className="ml-10 flex items-center text-sm">
            {!logged ? (
              <>
                <Link to="/login" className="hover:opacity-70 mr-4">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-1.5 border border-black/70 rounded-full hover:bg-black hover:text-white transition"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div ref={ref} className="relative flex flex-col items-center">
                {/* Welcome text */}
                <span onClick={() => setOpen((v) => !v)} className="cursor-pointer hover:opacity-70 transition">
                  Welcome{(name || "").trim() ? `, ${name}` : ""}
                </span>

                {/* Logout kotak lurus tepat di bawah Welcome */}
                {open && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 bg-black text-white text-sm rounded-md shadow-md hover:bg-black/90 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* MOBILE */}
        <div className="md:hidden text-sm">Menu</div>
      </div>
    </header>
  );
}

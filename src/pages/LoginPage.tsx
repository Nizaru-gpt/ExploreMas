import React, { useState, FormEvent } from "react";
import loginMascot from "../assets/images/maskot/login.png"; // gambar di halaman (ASLI)
import Swal from "sweetalert2"; // ✅ SweetAlert

import { useLocation, useNavigate } from "react-router-dom";
import { setSessionLoggedIn, setToken } from "../lib/auth";
import { api } from "../lib/api";

type LoginResponse = any;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const payload = {
        username: email,
        password,
      };

      const data: LoginResponse = await api.post<LoginResponse>("/login", payload);

      if (typeof data === "string") {
        setSessionLoggedIn();
      } else {
        const token =
          data?.token ||
          data?.access_token ||
          data?.data?.token ||
          data?.data?.access_token;

        if (token) {
          setToken(String(token));
        } else {
          setSessionLoggedIn();
        }
      }

      // ✅ simpan username (biar Navbar bisa Welcome, nama)
      localStorage.setItem("exploremas_username", email);
      window.dispatchEvent(new Event("authChanged"));

      // ✅ SweetAlert sukses (pakai login.png yang valid)
      await Swal.fire({
        title: "Login berhasil!",
        text: "Selamat datang kembali 👋",
        imageUrl: loginMascot,
        imageWidth: 150,
        imageAlt: "Login mascot",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = String(err?.message || "Username atau password salah");

      // ✅ SweetAlert gagal (pakai login.png yang valid)
      await Swal.fire({
        title: "Login gagal",
        text: msg,
        imageUrl: loginMascot,
        imageWidth: 150,
        imageAlt: "Login mascot",
        confirmButtonText: "OK",
      });

      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  const emailError = showErrors && !email;
  const passwordError = showErrors && !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f5f4ff]">
      <div className="w-[min(420px,92%)] bg-white shadow-[0_18px_45px_rgba(12,27,76,0.14)] rounded-3xl p-8 border border-[#E3E6F5]">
        {/* ===== MASKOT LOGIN ===== */}
        <div className="flex justify-center -mt-20 mb-2">
          <img src={loginMascot} alt="Login Mascot" className="w-[120px] h-auto" />
        </div>

        {/* ===== HEADER ===== */}
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#5E6282] uppercase">
            Welcome back
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#181E4B]">
            Masuk ke akunmu
          </h1>
          <p className="text-xs mt-2 text-[#5E6282]">
            Lanjutkan eksplorasi dan nikmati slow–living di Purwokerto.
          </p>
        </div>

        {/* ERROR BAR */}
        {apiError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {apiError}
          </div>
        )}

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[#181E4B]">Email</label>
            <input
              type="text"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none transition
              ${
                emailError
                  ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                  : "border-[#E3E6F5] focus:border-[#0f1f56] focus:ring-1 focus:ring-[#0f1f56]/40"
              } bg-white`}
              placeholder="username atau email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (showErrors) setShowErrors(false);
                if (apiError) setApiError(null);
              }}
            />
            {emailError && (
              <p className="text-[11px] text-[#b91c1c]">
                Email tidak boleh kosong.
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[#181E4B]">Kata sandi</label>
            <input
              type="password"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none transition
              ${
                passwordError
                  ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                  : "border-[#E3E6F5] focus:border-[#0f1f56] focus:ring-1 focus:ring-[#0f1f56]/40"
              } bg-white`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (showErrors) setShowErrors(false);
                if (apiError) setApiError(null);
              }}
            />
            {passwordError && (
              <p className="text-[11px] text-[#b91c1c]">
                Kata sandi tidak boleh kosong.
              </p>
            )}
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-[11px] mt-1">
            <label className="inline-flex items-center gap-2 text-[#5E6282]">
              <input type="checkbox" className="rounded border-[#E3E6F5]" />
              <span>Ingat saya</span>
            </label>
            <button type="button" className="text-[#0f1f56] hover:underline">
              Lupa kata sandi?
            </button>
          </div>

          {/* Button */}
          <div className="mt-4 relative">
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[180px] h-[42px] rounded-full
              bg-[radial-gradient(closest-side,rgba(255,210,150,0.42),rgba(255,210,150,0)_78%)]
              blur-[10px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full rounded-2xl py-2.5 text-sm font-semibold
              bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]
              hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-[11px] text-[#5E6282]">
          Belum punya akun?{" "}
          <a href="/register" className="font-semibold text-[#0f1f56] hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

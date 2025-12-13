import React, { useState, FormEvent } from "react";
import loginMascot from "../assets/images/maskot/login.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setShowErrors(true);
      return;
    }

    console.log("Login with:", { email, password });
  };

  const emailError = showErrors && !email;
  const passwordError = showErrors && !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f5f4ff]">
      <div className="w-[min(420px,92%)] bg-white shadow-[0_18px_45px_rgba(12,27,76,0.14)] rounded-3xl p-8 border border-[#E3E6F5]">

        {/* ===== MASKOT LOGIN ===== */}
        <div className="flex justify-center -mt-20 mb-2">
          <img
            src={loginMascot}
            alt="Login Mascot"
            className="w-[120px] h-auto"
          />
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

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[#181E4B]">
              Email
            </label>
            <input
              type="email"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none transition
              ${
                emailError
                  ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                  : "border-[#E3E6F5] focus:border-[#0f1f56] focus:ring-1 focus:ring-[#0f1f56]/40"
              } bg-white`}
              placeholder="nama@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (showErrors) setShowErrors(false);
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
            <label className="block text-xs font-medium text-[#181E4B]">
              Kata sandi
            </label>
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
            <button
              type="button"
              className="text-[#0f1f56] hover:underline"
            >
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
              className="relative z-10 w-full rounded-2xl py-2.5 text-sm font-semibold
              bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]
              hover:opacity-95 active:scale-[0.99] transition"
            >
              Masuk
            </button>
          </div>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-[11px] text-[#5E6282]">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="font-semibold text-[#0f1f56] hover:underline"
          >
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

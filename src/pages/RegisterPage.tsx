import React, { useState, FormEvent } from "react";
import registerMascot from "../assets/images/maskot/register.png";

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirm || !agree || password !== confirm) {
      setShowErrors(true);
      return;
    }

    console.log("Register with:", { fullName, email, password });
  };

  const nameError = showErrors && !fullName;
  const emailError = showErrors && !email;
  const passwordError = showErrors && !password;
  const confirmError = showErrors && (!confirm || confirm !== password);
  const agreeError = showErrors && !agree;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f5f4ff]">
      <div className="w-[min(440px,94%)] bg-white shadow-[0_18px_45px_rgba(12,27,76,0.14)] rounded-3xl p-8 border border-[#E3E6F5]">

        {/* ===== MASKOT REGISTER ===== */}
        <div className="flex justify-center -mt-20 mb-2">
          <img
            src={registerMascot}
            alt="Register Mascot"
            className="w-[125px] h-auto"
          />
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#5E6282] uppercase">
            Join the journey
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#181E4B]">
            Buat akun baru
          </h1>
          <p className="text-xs mt-2 text-[#5E6282]">
            Mulai merencanakan perjalanan dan nikmati ritme slow–living di Purwokerto.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[#181E4B]">
              Nama lengkap
            </label>
            <input
              type="text"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none transition
              ${
                nameError
                  ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                  : "border-[#E3E6F5] focus:border-[#0f1f56] focus:ring-1 focus:ring-[#0f1f56]/40"
              } bg-white`}
              placeholder="Nama kamu"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (showErrors) setShowErrors(false);
              }}
            />
            {nameError && (
              <p className="text-[11px] text-[#b91c1c]">
                Nama lengkap tidak boleh kosong.
              </p>
            )}
          </div>

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
              placeholder="Minimal 6 karakter"
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

          {/* Konfirmasi Password */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-[#181E4B]">
              Konfirmasi kata sandi
            </label>
            <input
              type="password"
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none transition
              ${
                confirmError
                  ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                  : "border-[#E3E6F5] focus:border-[#0f1f56] focus:ring-1 focus:ring-[#0f1f56]/40"
              } bg-white`}
              placeholder="Ulangi kata sandi"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (showErrors) setShowErrors(false);
              }}
            />
            {confirmError && (
              <p className="text-[11px] text-[#b91c1c]">
                Konfirmasi kata sandi tidak cocok.
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="space-y-1">
            <label className="flex items-start gap-2 text-[11px] text-[#5E6282]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  if (showErrors) setShowErrors(false);
                }}
                className="mt-[2px] rounded border-[#E3E6F5]"
              />
              <span>
                Saya menyetujui syarat & ketentuan serta kebijakan privasi.
              </span>
            </label>
            {agreeError && (
              <p className="text-[11px] text-[#b91c1c]">
                Kamu harus menyetujui syarat & ketentuan.
              </p>
            )}
          </div>

          {/* Button */}
          <div className="mt-4 relative">
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[190px] h-[44px] rounded-full
              bg-[radial-gradient(closest-side,rgba(255,210,150,0.44),rgba(255,210,150,0)_78%)]
              blur-[10px]"
            />
            <button
              type="submit"
              className="relative z-10 w-full rounded-2xl py-2.5 text-sm font-semibold
              bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]
              hover:opacity-95 active:scale-[0.99] transition"
            >
              Buat akun
            </button>
          </div>
        </form>

        {/* Link ke login */}
        <p className="mt-6 text-center text-[11px] text-[#5E6282]">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="font-semibold text-[#0f1f56] hover:underline"
          >
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

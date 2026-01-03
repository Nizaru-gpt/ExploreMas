// src/pages/AdminLoginPage.tsx
import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiShield } from "react-icons/fi";
import { api } from "../lib/api";
import { setAdminSessionLoggedIn, setAdminToken } from "../lib/adminAuth";

type LoginResponse = any;

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showErrors, setShowErrors] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from || "/admin";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      // ✅ khusus admin
      // axios-like: response biasanya { data: ... }
      const res = await api.post<LoginResponse>("/admin_login", {
        username,
        password,
      });

      const data: any = (res as any)?.data ?? res;

      // siap kalau suatu saat BE ngasih token
      const token =
        data?.token ||
        data?.access_token ||
        data?.data?.token ||
        data?.data?.access_token;

      if (token) setAdminToken(String(token));
      else setAdminSessionLoggedIn();

      // ✅ INI PENTING: dipakai AdminDashboard untuk security check
      localStorage.setItem("role", "admin");

      navigate(from, { replace: true });
    } catch (err: any) {
      setApiError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const userError = showErrors && !username;
  const passError = showErrors && !password;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-[#f4f7ff] to-[#eef2ff]">
      <div className="w-[min(460px,96%)]">
        {/* Header kecil */}
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-[#0f1f56] text-white flex items-center justify-center shadow-[0_16px_34px_rgba(12,27,76,0.25)]">
            <FiShield className="text-xl" />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#5E6282] uppercase">
            Admin Portal
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#181E4B]">
            Login Dashboard
          </h1>
          <p className="text-xs mt-2 text-[#5E6282]">
            Masuk untuk mengelola data ExploreMas (CRUD, berita, chatbot, dll).
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E3E6F5] shadow-[0_18px_45px_rgba(12,27,76,0.12)] p-7 md:p-8 relative overflow-hidden">
          {/* dekorasi soft (tidak ganggu) */}
          <span
            aria-hidden
            className="absolute -top-20 -right-24 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(15,31,86,0.14),rgba(15,31,86,0)_70%)]"
          />
          <span
            aria-hidden
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,210,150,0.22),rgba(255,210,150,0)_70%)]"
          />

          {apiError && (
            <div className="relative mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative space-y-4">
            {/* Username */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#181E4B]">
                Username Admin
              </label>
              <div
                className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 transition bg-white
                ${
                  userError
                    ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                    : "border-[#E3E6F5] focus-within:border-[#0f1f56] focus-within:ring-1 focus-within:ring-[#0f1f56]/40"
                }`}
              >
                <FiUser className="text-[#5E6282]" />
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  placeholder="contoh: admin01"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (showErrors) setShowErrors(false);
                    if (apiError) setApiError(null);
                  }}
                />
              </div>
              {userError && (
                <p className="text-[11px] text-[#b91c1c]">
                  Username tidak boleh kosong.
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#181E4B]">
                Password
              </label>
              <div
                className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 transition bg-white
                ${
                  passError
                    ? "border-[#f87171] ring-1 ring-[#fca5a5]"
                    : "border-[#E3E6F5] focus-within:border-[#0f1f56] focus-within:ring-1 focus-within:ring-[#0f1f56]/40"
                }`}
              >
                <FiLock className="text-[#5E6282]" />
                <input
                  type="password"
                  className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (showErrors) setShowErrors(false);
                    if (apiError) setApiError(null);
                  }}
                />
              </div>
              {passError && (
                <p className="text-[11px] text-[#b91c1c]">
                  Password tidak boleh kosong.
                </p>
              )}
            </div>

            {/* Button */}
            <div className="mt-4 relative">
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[210px] h-[46px] rounded-full
                bg-[radial-gradient(closest-side,rgba(255,210,150,0.40),rgba(255,210,150,0)_78%)]
                blur-[10px]"
              />
              <button
                type="submit"
                disabled={loading}
                className="relative z-10 w-full rounded-2xl py-2.5 text-sm font-semibold
                bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]
                hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Masuk Admin"}
              </button>
            </div>

            {/* footer kecil */}
            <div className="pt-2 text-center">
              <p className="text-[11px] text-[#5E6282]">
                Bukan admin?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#0f1f56] hover:underline"
                >
                  Login user
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* note kecil bawah */}
        <p className="mt-4 text-center text-[11px] text-[#5E6282]">
          ExploreMas Admin © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;

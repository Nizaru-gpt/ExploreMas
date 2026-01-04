import React, { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

type Step = "request" | "verify";

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(1, name.length - 2))}@${domain}`;
};

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("request");

  // ✅ auto-fill email dari register/login terakhir (kalau ada)
  const [email, setEmail] = useState(() => localStorage.getItem("exploremas_last_email") || "");

  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showErrors, setShowErrors] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailError = showErrors && !email;
  const otpError = showErrors && otp.length !== 6;
  const passError = showErrors && newPass.length < 8;
  const confirmError = showErrors && confirm !== newPass;

  const canResend = useMemo(
    () => step === "verify" && email.includes("@"),
    [step, email]
  );

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setApiError(null);
    setInfo(null);

    if (!email) return;

    setLoading(true);
    try {
      await api.post("/auth/forgot_password", { email });

      // ✅ simpan juga di sini biar konsisten
      localStorage.setItem("exploremas_last_email", email);

      setStep("verify");
      setShowErrors(false);
      setInfo(`Kode OTP dikirim ke ${maskEmail(email)}`);
    } catch (err: any) {
      setApiError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setApiError(null);
    setInfo(null);

    if (!email || otp.length !== 6 || newPass.length < 8 || confirm !== newPass) return;

    setLoading(true);
    try {
      await api.post("/auth/reset_password", {
        email,
        otp,
        new_password: newPass,
      });

      setInfo("Password berhasil diganti, silakan login.");
      setTimeout(() => navigate("/login"), 700);
    } catch (err: any) {
      setApiError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    setApiError(null);
    try {
      await api.post("/auth/forgot_password", { email });
      setInfo(`OTP baru dikirim ke ${maskEmail(email)}`);
    } catch (err: any) {
      setApiError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[min(460px,94%)] bg-white rounded-3xl p-8 border border-[#E3E6F5]
      shadow-[0_18px_45px_rgba(12,27,76,0.14)]"
    >
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#5E6282] uppercase">
          reset access
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#181E4B]">
          Lupa kata sandi
        </h1>
        <p className="text-xs mt-2 text-[#5E6282]">
          Kami akan mengirim OTP ke email kamu.
        </p>
      </div>

      {apiError && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          {apiError}
        </div>
      )}

      {info && (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
          {info}
        </div>
      )}

      {step === "request" && (
        <form onSubmit={handleRequest} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm outline-none
              ${emailError ? "border-red-400" : "border-[#E3E6F5] focus:ring-1 focus:ring-[#0f1f56]/40"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl py-2.5 text-sm font-semibold
              bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]"
          >
            {loading ? "Mengirim OTP..." : "Kirim OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full text-[11px] text-[#0f1f56] font-semibold hover:underline"
          >
            Kembali ke login
          </button>
        </form>
      )}

      {step === "verify" && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="text-xs text-[#5E6282]">
            OTP dikirim ke <b>{maskEmail(email)}</b>
            <button
              type="button"
              onClick={handleResend}
              className="ml-2 text-[#0f1f56] font-semibold hover:underline"
            >
              Kirim ulang
            </button>
          </div>

          <input
            maxLength={6}
            inputMode="numeric"
            placeholder="Kode OTP"
            className={`w-full text-center tracking-[0.35em] rounded-2xl border px-3.5 py-2.5 text-sm
              ${otpError ? "border-red-400" : "border-[#E3E6F5]"}`}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />

          <input
            type="password"
            placeholder="Password baru"
            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm
              ${passError ? "border-red-400" : "border-[#E3E6F5]"}`}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <input
            type="password"
            placeholder="Konfirmasi password"
            className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm
              ${confirmError ? "border-red-400" : "border-[#E3E6F5]"}`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl py-2.5 text-sm font-semibold
              bg-[#0f1f56] text-white shadow-[0_12px_28px_rgba(12,27,76,0.35)]"
          >
            {loading ? "Memverifikasi..." : "Reset password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;

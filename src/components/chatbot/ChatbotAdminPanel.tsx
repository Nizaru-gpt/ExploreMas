// src/components/chatbot/ChatbotAdminPanel.tsx
import { FormEvent, useMemo, useState } from "react";
import {
  MessageCircle,
  PlusCircle,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useChat } from "../../context/ChatContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ChatbotAdminPanel() {
  const { stats, faqs, topFaqs, addFaq, deleteFaq } = useChat();

  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqError, setFaqError] = useState("");

  function handleFaqSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      setFaqError("Pertanyaan (kata kunci) dan jawaban wajib diisi.");
      return;
    }
    addFaq(faqQuestion, faqAnswer);
    setFaqQuestion("");
    setFaqAnswer("");
    setFaqError("");
  }

  // data untuk diagram
  const chartData = useMemo(
    () => [
      {
        key: "user",
        label: "Pertanyaan User",
        value: stats.totalUserMessages,
      },
      {
        key: "bot",
        label: "Jawaban Bot",
        value: stats.totalBotMessages,
      },
      {
        key: "faq",
        label: "Jawaban FAQ",
        value: stats.totalFaqMatched,
      },
    ],
    [stats]
  );

  return (
    <section className="bg-white border border-border rounded-2xl shadow-soft p-5 space-y-6">
      {/* HEADER CHATBOT */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-brand/5">
            <MessageCircle className="w-5 h-5 text-brand" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brandSoft font-semibold">
              Chatbot
            </p>
            <h2 className="text-base font-semibold text-brand">
              Insight MasBot &amp; FAQ
            </h2>
            <p className="text-xs text-muted mt-1 max-w-xl">
              Pantau performa chatbot dan atur pertanyaan–jawaban yang akan
              dijawab otomatis oleh MasBot.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-border">
            Total FAQ:
            <span className="font-semibold text-brand">{faqs.length}</span>
          </span>
        </div>
      </div>

      {/* STAT & DIAGRAM */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.5fr)] items-stretch">
        {/* 4 KARTU STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="border border-border rounded-xl px-3 py-2 bg-slate-50/60">
            <p className="text-muted mb-1">Total Sesi</p>
            <p className="text-lg font-semibold text-brand">
              {stats.totalSessions}
            </p>
          </div>
          <div className="border border-border rounded-xl px-3 py-2 bg-slate-50/60">
            <p className="text-muted mb-1">Pertanyaan User</p>
            <p className="text-lg font-semibold text-brand">
              {stats.totalUserMessages}
            </p>
          </div>
          <div className="border border-border rounded-xl px-3 py-2 bg-slate-50/60">
            <p className="text-muted mb-1">Jawaban Bot</p>
            <p className="text-lg font-semibold text-brand">
              {stats.totalBotMessages}
            </p>
          </div>
          <div className="border border-border rounded-xl px-3 py-2 bg-slate-50/60">
            <p className="text-muted mb-1">Jawaban dari FAQ</p>
            <p className="text-lg font-semibold text-brand">
              {stats.totalFaqMatched}
            </p>
          </div>
        </div>

        {/* DIAGRAM LINE / AREA CHART DENGAN RECHARTS */}
        <div className="border border-border rounded-xl px-4 py-3 bg-slate-50/80 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              <p className="text-xs font-semibold text-brand">
                Diagram Aktivitas Chatbot
              </p>
            </div>
            <span className="text-[10px] text-muted">
              Ringkasan interaksi MasBot
            </span>
          </div>

          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="chatbotArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4C74B9" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#4C74B9" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#64748B" }}
                />
                <Tooltip
                  cursor={{ stroke: "#CBD5F5", strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E2E8F0",
                    fontSize: 11,
                  }}
                  labelStyle={{ fontWeight: 600, color: "#0F172A" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#chatbotArea)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4C74B9"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-3 text-[10px] text-muted">
            Grafik memperlihatkan perbandingan jumlah pertanyaan user, jawaban
            bot, dan jawaban yang diambil dari FAQ. Cocok untuk melihat tren
            penggunaan MasBot secara cepat.
          </p>
        </div>
      </div>

      {/* FORM FAQ + LIST FAQ */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] items-start pt-4 border-t border-border/60 mt-4">
        {/* FORM TAMBAH FAQ */}
        <div>
          <h3 className="text-sm font-semibold text-brand mb-2">
            Tambah Pertanyaan &amp; Jawaban Baru
          </h3>
          <p className="text-xs text-muted mb-3">
            <span className="font-semibold">Pertanyaan</span> diisi dengan{" "}
            <span className="font-semibold">kata kunci</span> yang biasa
            diketik user (misalnya:{" "}
            <span className="italic">“jadwal trans banyumas”</span>). Jika chat
            user mengandung kata kunci itu, MasBot akan menjawab dengan jawaban
            yang kamu isi di bawah.
          </p>

          {faqError && (
            <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {faqError}
            </div>
          )}

          <form className="grid gap-2 text-xs" onSubmit={handleFaqSubmit}>
            <div className="grid gap-1">
              <label className="font-medium">Kata kunci pertanyaan</label>
              <input
                className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
                placeholder="Contoh: jadwal trans banyumas"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <label className="font-medium">Jawaban chatbot</label>
              <textarea
                className="border border-border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50 min-h-[90px]"
                placeholder="Tulis jawaban lengkap yang ingin ditampilkan MasBot."
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-black/70 text-xs font-medium hover:bg-black hover:text-white transition"
            >
              <PlusCircle className="w-4 h-4" />
              Simpan FAQ
            </button>
          </form>
        </div>

        {/* LIST FAQ TERATAS */}
        <div>
          <h3 className="text-sm font-semibold text-brand mb-2">
            Pertanyaan yang Paling Sering Dipakai
          </h3>
          <p className="text-xs text-muted mb-3">
            Berdasarkan seberapa sering jawaban FAQ digunakan oleh chatbot.
          </p>

          {topFaqs.length === 0 ? (
            <p className="text-xs text-muted">
              Belum ada data FAQ. Tambahkan pertanyaan terlebih dahulu.
            </p>
          ) : (
            <ul className="space-y-2 text-xs">
              {topFaqs.map((f) => (
                <li
                  key={f.id}
                  className="border border-border rounded-lg px-3 py-2 flex justify-between gap-3 bg-slate-50/60"
                >
                  <div>
                    <p className="font-semibold mb-1">{f.question}</p>
                    <p className="text-muted line-clamp-3">{f.answer}</p>
                    <p className="text-[10px] text-muted mt-1">
                      Dipakai{" "}
                      <span className="font-semibold">{f.timesUsed}x</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteFaq(f.id)}
                    className="self-start text-[11px] text-red-500 hover:text-red-600 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

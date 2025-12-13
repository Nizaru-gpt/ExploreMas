// src/components/chat/ChatPopup.tsx
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useChat } from "../../context/ChatContext";

import botLogo from "../../assets/images/maskot/logo.png";
import botMascot from "../../assets/images/maskot/chatbot.png";

type Sender = "user" | "bot";

interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
  time: string;
}

const quickQuestions = [
  "Kuliner khas Purwokerto apa aja?",
  "Rekomendasi cafe buat nugas di Purwokerto",
  "Wisata dekat Purwokerto yang wajib",
  "Oleh-oleh khas Purwokerto",
];

function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Local Purwokerto knowledge base (regex -> answer).
 * Ini sengaja dibuat “banyak & lengkap” supaya demo bot terasa pintar
 * meskipun tanpa API.
 */
const PURWOKERTO_KB: Array<{ re: RegExp; a: string }> = [
  // Sapaan / help
  {
    re: /\b(halo|hai|hi|hello|pagi|siang|sore|malam)\b/i,
    a: "Halo! 👋 Aku MasBot. Kamu mau cari info seputar Purwokerto apa nih: kuliner, wisata, transport, penginapan, atau itinerary?",
  },
  {
    re: /\b(bisa bantu|tolong|help|bantuan|panduan)\b/i,
    a: "Siap! Coba ketik misalnya: “kuliner Purwokerto”, “wisata Baturraden”, “oleh-oleh”, “hotel murah”, “itinerary 2 hari”, atau “transport dalam kota”.",
  },

  // Kuliner
  {
    re: /\b(kuliner|makan|makanan|rekomendasi makan|tempat makan)\b/i,
    a: [
      "Ini beberapa **kuliner & tempat makan populer di Purwokerto** (pilih yang sesuai selera ya 😄):",
      "",
      "🍜 **Soto Sokaraja** (dekat Purwokerto): kuah gurih + ketupat, sering pakai sambal kacang. Kamu bisa cari warung soto sokaraja yang rame di jalur Sokaraja.",
      "🥗 **Gecot (Tahu Gecot)**: tahu + bumbu kacang pedas-manis, cocok buat ngemil sore.",
      "🍢 **Mendoan Banyumas**: wajib! paling enak hangat, cocol sambal kecap/cabai rawit.",
      "🍗 **Ayam Goreng / Ayam Bakar kampung**: banyak warung enak di area kota dan jalur Baturraden.",
      "🍛 **Nasi megono / tempe mendol**: menu rumahan yang sering ada di warung pagi.",
      "",
      "Kalau kamu kasih preferensi (pedas/tidak, halal, budget, rame/tenang), aku bisa pilihin yang paling pas.",
    ].join("\n"),
  },
  {
    re: /\b(soto)\b/i,
    a: "Kalau kamu cari **soto khas sekitar Purwokerto**, yang paling ikonik itu **Soto Sokaraja**. Biasanya disajikan dengan ketupat + kuah soto gurih, dan sering ada sambal/bumbu kacang khas. Mau aku rekomendasikan gaya soto yang kamu suka: bening atau gurih kental?",
  },
  {
    re: /\b(mendoan)\b/i,
    a: "Yes! **Mendoan Banyumas** itu wajib coba. Tips: pesan yang **masih hangat** (setengah matang), cocol sambal kecap + irisan cabai rawit. Enak banget buat temen teh/kopi.",
  },
  {
    re: /\b(gecot|tahu gecot)\b/i,
    a: "**Tahu Gecot** itu jajanan khas: tahu goreng + bumbu kacang pedas-manis + kuah tipis. Biasanya dijual sore-malam. Kamu cari yang pedas nendang atau pedas santai?",
  },
  {
    re: /\b(sate|satai)\b/i,
    a: "Kalau kamu pengin sate di Purwokerto: biasanya ada opsi **sate ayam/bebek/kambing** di area pusat kota dan jalur ramai malam. Saran: cari yang rame pengunjung (rotasi daging cepat) biar lebih fresh.",
  },

  // Cafe / nongkrong
  {
    re: /\b(cafe|kopi|coffee|nongkrong|nugas|wfc)\b/i,
    a: [
      "Rekomendasi **cafe buat nugas/nongkrong di Purwokerto** (umum yang sering dicari):",
      "",
      "☕ **Kopi Calf** – sering jadi pilihan buat nugas (ambil spot yang colokan-friendly).",
      "☕ **Cold 'N Brew** – vibe santai, cocok buat ngobrol + kerja ringan.",
      "☕ **Advo Cafe** – banyak yang suka buat nongkrong ramean.",
      "",
      "Mau yang **tenang** atau yang **ramai & estetik**? Aku bisa rekomendasiin berdasarkan kebutuhanmu.",
    ].join("\n"),
  },

  // Wisata umum
  {
    re: /\b(wisata|jalan-jalan|rekreasi|healing|liburan|tour)\b/i,
    a: [
      "Ini beberapa **wisata favorit dekat Purwokerto**:",
      "",
      "🏞️ **Baturraden** – kawasan sejuk, banyak spot alam & keluarga.",
      "🌲 **Hutan Pinus / spot alam** di jalur Baturraden – cocok foto & piknik ringan.",
      "🌉 **Curug (air terjun)** – banyak pilihan curug di sekitar Banyumas, biasanya perlu jalan sedikit.",
      "🏙️ **Taman kota** – enak buat sorean, olahraga, atau kulineran.",
      "",
      "Kalau kamu sebut: kamu bawa keluarga/teman/pasangan + mau yang ringan atau trekking, aku bikinin rute yang pas.",
    ].join("\n"),
  },
  {
    re: /\b(baturraden|baturaden)\b/i,
    a: [
      "**Baturraden** itu andalan wisata dekat Purwokerto 🌿",
      "",
      "Yang bisa kamu lakukan:",
      "• Cari spot **sejuk & view** (pagi/sore paling enak).",
      "• Kulineran di jalur Baturraden (banyak warung & cafe).",
      "• Kalau mau alam, lanjut ke **curug** atau spot hutan/pinus.",
      "",
      "Mau versi **family-friendly** atau **petualangan (curug/trekking)**?",
    ].join("\n"),
  },
  {
    re: /\b(curug|air terjun|waterfall)\b/i,
    a: "Kalau kamu suka alam, area sekitar Purwokerto/Baturraden punya banyak **curug (air terjun)**. Biasanya perlu jalan kaki pendek-sedang, jadi pakai sepatu nyaman ya. Kamu mau yang aksesnya gampang (ramah keluarga) atau yang agak trekking?",
  },

  // Transport
  {
    re: /\b(transport|angkutan|naik apa|keliling kota|kendaraan|ojek|grab|gojek)\b/i,
    a: [
      "Untuk **transport di Purwokerto** biasanya pilihan paling praktis:",
      "",
      "🚗 **Ojek online / taksi online** (paling mudah & cepat).",
      "🚌 **Angkutan/transport lokal** ada di beberapa jalur, tapi biasanya orang lebih pilih online karena fleksibel.",
      "🚶‍♂️ Untuk area pusat kota tertentu bisa jalan kaki kalau jarak dekat.",
      "",
      "Kamu start dari mana? (stasiun/terminal/hotel) biar aku arahin opsi paling enak.",
    ].join("\n"),
  },
  {
    re: /\b(stasiun|kereta|railway)\b/i,
    a: "Kalau kamu datang naik kereta, tujuan umumnya **Stasiun Purwokerto**. Dari sana gampang cari ojek/taksi online buat ke pusat kota atau ke arah Baturraden. Kamu mau lanjut ke mana setelah turun stasiun?",
  },
  {
    re: /\b(terminal|bus)\b/i,
    a: "Kalau naik bus, biasanya turun di terminal/area pemberhentian bus. Lanjut paling praktis pakai ojek/taksi online. Kamu turun di titik mana? biar aku bantu rute singkatnya.",
  },
  {
    re: /\b(cara ke baturraden|ke baturraden|ke baturaden|ke baturraden dari)\b/i,
    a: [
      "Cara paling gampang **ke Baturraden dari kota Purwokerto**:",
      "",
      "1) **Ojek/taksi online** – paling praktis (tinggal set titik tujuan Baturraden/spot wisatanya).",
      "2) **Kendaraan pribadi/sewa** – enak kalau rombongan/ingin fleksibel pindah spot.",
      "",
      "Kalau kamu kasih titik start (misal stasiun/alun-alun/hotel), aku bantu estimasi rute logisnya ya.",
    ].join("\n"),
  },

  // Penginapan
  {
    re: /\b(hotel|penginapan|homestay|kost harian|inap|stay)\b/i,
    a: [
      "Cari **penginapan di Purwokerto**? Biar pas, pilih dulu tipenya:",
      "",
      "💸 **Budget**: cari yang dekat pusat kota biar akses makan & transport gampang.",
      "🧳 **Mid-range**: nyaman, biasanya dekat area strategis.",
      "🌿 **View/sejuk**: area arah Baturraden cocok kalau mau suasana dingin.",
      "",
      "Kamu prefer: dekat stasiun / dekat kampus / dekat Baturraden / budget berapa per malam?",
    ].join("\n"),
  },

  // Oleh-oleh
  {
    re: /\b(oleh-oleh|souvenir|buah tangan)\b/i,
    a: [
      "Oleh-oleh khas sekitar Purwokerto/Banyumas yang sering dicari:",
      "",
      "🍌 **Getuk goreng Sokaraja** – manis legit, favorit banget buat oleh-oleh.",
      "🥜 **Kacang / cemilan tradisional** – banyak pilihan di toko oleh-oleh.",
      "🍘 **Keripik/olahan lokal** – cocok buat dibawa perjalanan.",
      "🍽️ **Mendoan (mentah siap goreng)** – beberapa tempat jual versi siap masak.",
      "",
      "Kamu mau oleh-oleh yang **tahan lama** atau yang **fresh**?",
    ].join("\n"),
  },

  // Kampus / edukasi
  {
    re: /\b(kampus|universitas|unsoed|uns(o)?ed|kuliah)\b/i,
    a: "Di Purwokerto ada kampus besar seperti **Universitas Jenderal Soedirman (Unsoed)**. Area sekitar kampus biasanya ramai kuliner & kos-kosan. Kamu cari info kampusnya atau cari tempat makan/tinggal di sekitar kampus?",
  },

  // Tempat nongkrong / taman
  {
    re: /\b(alun-alun|taman|car free day|cfd)\b/i,
    a: "Kalau mau santai: **taman kota/alun-alun** biasanya enak buat sorean. Kalau ada **Car Free Day**, biasanya ramai jajanan & aktivitas pagi. Kamu rencana pergi hari apa?",
  },

  // Itinerary
  {
    re: /\b(itinerary|rencana|trip|jadwal|2 hari|3 hari|1 hari|seharian)\b/i,
    a: [
      "Nih contoh **itinerary 1 hari di Purwokerto** (versi santai):",
      "",
      "☀️ Pagi: sarapan (soto/warung lokal) + ngopi sebentar",
      "🌿 Siang: jalan ke Baturraden / spot alam ringan",
      "🍽️ Sore: kulineran (mendoan, gecot, sate) + taman kota",
      "🌙 Malam: cari tempat makan yang rame + oleh-oleh",
      "",
      "Kalau kamu kasih: berangkat jam berapa, bawa siapa, dan suka alam/kuliner, aku bikinin itinerary yang lebih spesifik.",
    ].join("\n"),
  },

  // Cuaca / waktu terbaik
  {
    re: /\b(cuaca|musim|waktu terbaik|best time|bulan)\b/i,
    a: "Area Purwokerto–Baturraden cenderung nyaman, tapi kalau kamu mau ke curug/alam, paling enak saat cuaca cerah biar jalur nggak licin. Kamu rencana pergi kapan? (bulan/minggu ini?)",
  },

  // Default fallback Purwokerto
  {
    re: /.*/i,
    a: "Aku bisa bantu info seputar Purwokerto: **kuliner, wisata, cafe, transport, penginapan, oleh-oleh, itinerary**. Coba ketik salah satu: “kuliner”, “Baturraden”, “oleh-oleh”, “hotel”, atau “itinerary 2 hari”. 😊",
  },
];

async function callLocalBot(prompt: string): Promise<string> {
  // typing delay
  await new Promise((r) => setTimeout(r, 700));

  // keep your older features too (Trans Banyumas, rating, dll)
  if (/trans\s*banyumas|koridor|halte|bus\b/i.test(prompt)) {
    return "Trans Banyumas punya beberapa koridor utama. Kamu bisa cek detail rute & halte di section Trans Banyumas ya 😊";
  }
  if (/rating|kasih rating|beri rating/i.test(prompt)) {
    return "Kamu bisa kasih rating destinasi langsung dari halaman detail tempat tersebut di website ini ⭐";
  }

  // Purwokerto KB
  for (const item of PURWOKERTO_KB) {
    if (item.re.test(prompt)) return item.a;
  }

  return "Noted! 😊";
}

const ChatPopup: React.FC = () => {
  const { open, setOpen, getFaqAnswer, registerUserMessage, registerBotMessage } =
    useChat();

  // ✅ HAPUS bubble awal: mulai dari kosong
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // animasi open/close (tanpa ubah posisi popup)
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!open) {
      setInput("");
      setIsTyping(false);
    }
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: any) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, setOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    registerUserMessage();

    try {
      // 1) cek dulu ke FAQ dari context
      const faqAnswer = getFaqAnswer(trimmed);
      let botReplyText: string;
      let fromFaq = false;

      if (faqAnswer) {
        botReplyText = faqAnswer;
        fromFaq = true;
      } else {
        // 2) fallback ke local bot (Purwokerto KB + lainnya)
        botReplyText = await callLocalBot(trimmed);
        fromFaq = false;
      }

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botReplyText,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
      registerBotMessage(fromFaq);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* klik di luar popup => close (tanpa mengubah posisi popup) */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onMouseDown={() => setOpen(false)}
      />

      {/* POPUP: posisi tetap */}
      <div
        className={`
          fixed bottom-24 right-3 md:right-6
          w-[92vw] max-w-md
          h-[480px] md:h-[520px]
          bg-white rounded-[32px]
          shadow-[0_20px_60px_rgba(15,23,42,0.25)]
          border border-slate-200
          z-50
          flex flex-col
          transform transition-all duration-200
          ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.99]"}
        `}
        onMouseDown={(e) => e.stopPropagation()} // klik di dalam tidak menutup
      >
        {/* HEADER */}
        <div className="bg-[#4C74B9] text-white px-4 py-3 flex items-center gap-3 rounded-t-[32px]">
          <img
            src={botLogo}
            className="w-9 h-9 rounded-full bg-white/80 p-1"
            alt="Bot Logo"
          />
          <div>
            <p className="font-semibold">MasBot</p>
            <p className="text-xs text-green-200">● Online</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-white/80 hover:text-white"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 p-4 space-y-3 bg-slate-50/70 overflow-y-auto">
          {/* MASKOT CENTER + PENGANTAR (MasBot, bubble nggak nutupin maskot) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-[96px] h-[96px] flex items-center justify-center">
                {/* bubble */}
                <div
                  className="
                    absolute -top-6 right-0
                    bg-slate-900 text-white text-[10px]
                    px-3 py-1.5 rounded-full shadow
                    z-10
                  "
                >
                  Lagi mau cari apa?
                </div>

                {/* maskot */}
                <img
                  src={botMascot}
                  className="w-20 h-20 relative z-0"
                  alt="Bot Mascot"
                />
              </div>

              <p className="mt-3 text-[15px] leading-snug font-medium text-pink-500">
                Halo! 👋 Aku <span className="font-semibold">MasBot</span>, siap bantu cari info seputar{" "}
                <span className="font-semibold">Purwokerto</span>
              </p>
            </div>
          </div>

          {/* chat bubbles */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#4C74B9] text-white rounded-br-xl"
                    : "bg-white text-slate-800 rounded-bl-xl"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    msg.sender === "user"
                      ? "text-blue-100 text-right"
                      : "text-slate-400 text-left"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4C74B9]/10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4C74B9] animate-pulse" />
              </div>
              <p className="text-xs text-slate-500">MasBot sedang mengetik…</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* FOOTER */}
        <div className="px-3 py-2 border-t border-slate-200 bg-white rounded-b-[32px]">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickQuestions.map((text) => (
              <button
                key={text}
                onClick={() => sendMessage(text)}
                className="border border-slate-300 bg-white px-3 py-1 rounded-full text-[11px] text-slate-700 hover:bg-slate-100"
              >
                {text}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-full text-sm outline-none focus:ring-1 focus:ring-[#4C74B9]"
            />
            <button
              onClick={() => sendMessage(input)}
              className="p-2 text-lg text-[#4C74B9] hover:text-[#365596]"
              aria-label="Send"
              title="Send"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPopup;

// src/components/chat/ChatPopup.tsx
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useChat } from "../../context/ChatContext";
import { api } from "../../lib/api";

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
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

async function callGroqViaBE(prompt: string): Promise<string> {
  const res = await api.post<{ answer: string }>("/api/chat/llm", { prompt });
  return (res as any)?.answer || "Maaf, aku belum bisa jawab itu.";
}

const ChatPopup: React.FC = () => {
  const {
    open,
    setOpen,
    getFaqAnswer,
    registerUserMessage,
    registerBotMessage,
    logChatToServer,
  } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
      // 1) FAQ match dulu
      const faqHit = getFaqAnswer(trimmed);

      let botReplyText = "";
      let fromFaq = false;

      if (faqHit) {
        botReplyText = faqHit.answer;
        fromFaq = true;
      } else {
        // 2) kalau tidak ada FAQ -> Groq via BE
        botReplyText = await callGroqViaBE(trimmed);
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

      // 3) log ke server
      await logChatToServer(trimmed, botReplyText, fromFaq);
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
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}
        onMouseDown={() => setOpen(false)}
      />

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
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="bg-[#4C74B9] text-white px-4 py-3 flex items-center gap-3 rounded-t-[32px]">
          <img src={botLogo} className="w-9 h-9 rounded-full bg-white/80 p-1" alt="Bot Logo" />
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

        <div className="flex-1 p-4 space-y-3 bg-slate-50/70 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-4 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-[96px] h-[96px] flex items-center justify-center">
                <div className="absolute -top-6 right-0 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-full shadow z-10">
                  Lagi mau cari apa?
                </div>
                <img src={botMascot} className="w-20 h-20 relative z-0" alt="Bot Mascot" />
              </div>

              <p className="mt-3 text-[15px] leading-snug font-medium text-pink-500">
                Halo! 👋 Aku <span className="font-semibold">MasBot</span>, siap bantu cari info seputar{" "}
                <span className="font-semibold">Purwokerto</span>
              </p>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#4C74B9] text-white rounded-br-xl"
                    : "bg-white text-slate-800 rounded-bl-xl"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className={`mt-1 text-[10px] ${msg.sender === "user" ? "text-blue-100 text-right" : "text-slate-400 text-left"}`}>
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

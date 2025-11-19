import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { useChat } from "../../context/ChatContext";
import botIcon from "../../assets/images/hero/chatbot.png";

type Sender = "user" | "bot";

interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
  time: string;
}

const quickQuestions = [
  "Info Trans Banyumas",
  "Rekomendasi cafe di Purwokerto",
  "Tempat wisata dekat Baturaden",
  "Cara kasih rating destinasi",
];

// helper jam
function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// dummy bot (nanti bisa diganti API Grok)
async function callLocalBot(prompt: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1000));

  if (/trans/i.test(prompt)) {
    return "Trans Banyumas punya 4 koridor utama. Kamu bisa cek detail rutenya di section Trans Banyumas ya 😊";
  }
  if (/cafe/i.test(prompt)) {
    return "Beberapa cafe populer: Kopi Calf, Cold 'N Brew, Advo Cafe. Semua cocok buat nugas dan nongkrong.";
  }
  if (/wisata/i.test(prompt)) {
    return "Untuk wisata, kamu bisa kunjungi Baturaden, Small World, dan Taman Andhang Pangrenan.";
  }
  if (/rating/i.test(prompt)) {
    return "Kamu bisa kasih rating destinasi langsung dari halaman detail tempat tersebut di website ini ⭐";
  }

  return "Noted! Untuk saat ini aku masih versi demo, tapi aku akan bantu jawab sebisaku 😄";
}

const ChatPopup: React.FC = () => {
  const { open, setOpen } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "Halo! 👋 Aku asisten virtual Purwokerto Fun. Ada yang bisa aku bantu?",
      time: getCurrentTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!open) {
      setInput("");
      setIsTyping(false);
    }
  }, [open]);

  if (!open) return null;

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

    try {
      const botReplyText = await callLocalBot(trimmed);

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botReplyText,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
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

  return (
    <div
      className="
        fixed bottom-24 right-3 md:right-6
        w-[92vw] max-w-md
        h-[480px] md:h-[520px]
        bg-white rounded-[32px]
        shadow-[0_20px_60px_rgba(15,23,42,0.25)]
        border border-slate-200
        z-50
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="bg-[#4C74B9] text-white px-4 py-3 flex items-center gap-3 rounded-t-[32px]">
        <img
          src={botIcon}
          className="w-9 h-9 rounded-full bg-white/80 p-1"
        />
        <div>
          <p className="font-semibold">MasBot</p>
          <p className="text-xs text-green-200">● Online</p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* BODY (SCROLL) */}
      <div className="flex-1 p-4 space-y-3 bg-slate-50/70 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#4C74B9] text-white rounded-br-xl"
                  : "bg-white text-slate-800 rounded-bl-xl"
              }`}
            >
              <p>{msg.text}</p>
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
            <p className="text-xs text-slate-500">
              MasBot sedang mengetik…
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER */}
      <div className="px-3 py-2 border-t border-slate-200 bg-white rounded-b-[32px]">
        {/* Quick questions */}
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

        {/* Input */}
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
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;

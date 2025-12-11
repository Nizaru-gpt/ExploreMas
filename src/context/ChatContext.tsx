// src/context/ChatContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";

export type FaqEntry = {
  id: number;
  question: string;   // disimpan sebagai kata kunci (lowercase)
  answer: string;
  timesUsed: number;
  createdAt: string;
};

export type ChatStats = {
  totalSessions: number;
  totalUserMessages: number;
  totalBotMessages: number;
  totalFaqMatched: number;
};

type ChatContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // FAQ & statistik
  faqs: FaqEntry[];
  topFaqs: FaqEntry[];
  stats: ChatStats;

  addFaq: (question: string, answer: string) => void;
  deleteFaq: (id: number) => void;
  getFaqAnswer: (prompt: string) => string | null;
  registerUserMessage: () => void;
  registerBotMessage: (fromFaq: boolean) => void;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatProviderProps = {
  children: ReactNode;
};

// FAQ awal contoh
const initialFaqs: FaqEntry[] = [
  {
    id: 1,
    question: "trans banyumas",
    answer:
      "Trans Banyumas memiliki beberapa koridor utama. Kamu bisa lihat detail rute & halte di halaman Trans Banyumas di ExploreMas 😊",
    timesUsed: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    question: "rekomendasi cafe",
    answer:
      "Beberapa rekomendasi cafe di Purwokerto: Kopi Calf, Cold 'N Brew, Advo Cafe. Cek juga halaman Cafe untuk pilihan lengkapnya.",
    timesUsed: 0,
    createdAt: new Date().toISOString(),
  },
];

export function ChatProvider({ children }: ChatProviderProps) {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState<FaqEntry[]>(initialFaqs);
  const [stats, setStats] = useState<ChatStats>({
    totalSessions: 0,
    totalUserMessages: 0,
    totalBotMessages: 0,
    totalFaqMatched: 0,
  });

  // hitung FAQ paling sering dipakai
  const topFaqs = useMemo(
    () => [...faqs].sort((a, b) => b.timesUsed - a.timesUsed).slice(0, 5),
    [faqs]
  );

  // setiap kali chat dibuka dari tertutup -> terbuka, hitung sebagai sesi baru
  useEffect(() => {
    let prev = false;
    return () => {
      prev = open;
    };
  }, []);

  useEffect(() => {
    // sederhana: tiap kali open berubah dari false ke true, tambah sesi
    setStats((prev) => ({
      ...prev,
      totalSessions: open ? prev.totalSessions + 1 : prev.totalSessions,
    }));
  }, [open]);

  function addFaq(question: string, answer: string) {
    const q = question.trim().toLowerCase();
    const a = answer.trim();
    if (!q || !a) return;

    const newFaq: FaqEntry = {
      id: faqs.length ? faqs[faqs.length - 1].id + 1 : 1,
      question: q,
      answer: a,
      timesUsed: 0,
      createdAt: new Date().toISOString(),
    };

    setFaqs((prev) => [...prev, newFaq]);
  }

  function deleteFaq(id: number) {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  }

  // cari jawaban FAQ berdasar kata kunci yang mengandung
  function getFaqAnswer(prompt: string): string | null {
    const lower = prompt.toLowerCase();

    const matched = faqs.find((f) =>
      lower.includes(f.question.toLowerCase())
    );

    if (!matched) return null;

    // update hit FAQ
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === matched.id ? { ...f, timesUsed: f.timesUsed + 1 } : f
      )
    );

    setStats((prev) => ({
      ...prev,
      totalFaqMatched: prev.totalFaqMatched + 1,
    }));

    return matched.answer;
  }

  function registerUserMessage() {
    setStats((prev) => ({
      ...prev,
      totalUserMessages: prev.totalUserMessages + 1,
    }));
  }

  function registerBotMessage(fromFaq: boolean) {
    setStats((prev) => ({
      ...prev,
      totalBotMessages: prev.totalBotMessages + 1,
      totalFaqMatched: prev.totalFaqMatched + (fromFaq ? 1 : 0),
    }));
  }

  return (
    <ChatContext.Provider
      value={{
        open,
        setOpen,
        faqs,
        topFaqs,
        stats,
        addFaq,
        deleteFaq,
        getFaqAnswer,
        registerUserMessage,
        registerBotMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return ctx;
}

// src/context/ChatContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { api } from "../lib/api";

export type FaqEntry = {
  id: number;
  question: string; // kata kunci (lowercase)
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

  sessionId: string | null;

  faqs: FaqEntry[];
  topFaqs: FaqEntry[];
  stats: ChatStats;

  addFaq: (question: string, answer: string) => Promise<void>;
  deleteFaq: (id: number) => Promise<void>;

  // match FAQ local (from DB list)
  getFaqAnswer: (prompt: string) => { answer: string; faqId: number } | null;

  refreshStats: () => Promise<void>;
  logChatToServer: (question: string, answer: string, fromFaq: boolean) => Promise<void>;

  registerUserMessage: () => void;
  registerBotMessage: (_fromFaq: boolean) => void;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatProviderProps = { children: ReactNode };

function makeSessionId() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as any;
  if (g?.crypto?.randomUUID) return g.crypto.randomUUID();
  return `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [stats, setStats] = useState<ChatStats>({
    totalSessions: 0,
    totalUserMessages: 0,
    totalBotMessages: 0,
    totalFaqMatched: 0,
  });

  const prevOpenRef = useRef<boolean>(false);

  const topFaqs = useMemo(
    () => [...faqs].sort((a, b) => (b.timesUsed || 0) - (a.timesUsed || 0)).slice(0, 5),
    [faqs]
  );

  const refreshStats = async () => {
    try {
      const res = await api.get<ChatStats>("/api/chat/stats");
      setStats({
        totalSessions: Number((res as any)?.totalSessions ?? 0),
        totalUserMessages: Number((res as any)?.totalUserMessages ?? 0),
        totalBotMessages: Number((res as any)?.totalBotMessages ?? 0),
        totalFaqMatched: Number((res as any)?.totalFaqMatched ?? 0),
      });
    } catch (e) {
      console.error("refreshStats error:", e);
    }
  };

  const refreshFaqs = async () => {
    try {
      const rows = await api.get<any[]>("/api/faqs");
      const mapped: FaqEntry[] = (rows || []).map((r) => ({
        id: Number(r.id),
        question: String(r.question || "").toLowerCase(),
        answer: String(r.answer || ""),
        timesUsed: Number(r.times_used ?? r.timesUsed ?? 0),
        createdAt: String(r.created_at ?? r.createdAt ?? new Date().toISOString()),
      }));
      setFaqs(mapped);
    } catch (e) {
      console.error("refreshFaqs error:", e);
      setFaqs([]); // biar UI tetap jalan
    }
  };

  const addFaq = async (question: string, answer: string) => {
    const q = question.trim();
    const a = answer.trim();
    if (!q || !a) return;

    await api.post("/api/faqs", { question: q, answer: a });
    await refreshFaqs();
  };

  const deleteFaq = async (id: number) => {
    await api.delete(`/api/faqs/${id}`);
    await refreshFaqs();
  };

  // match FAQ berdasar keyword
  function getFaqAnswer(prompt: string): { answer: string; faqId: number } | null {
    const lower = prompt.toLowerCase();
    const matched = faqs.find((f) => lower.includes(f.question.toLowerCase()));
    if (!matched) return null;

    // hit di DB (async, tanpa nge-block)
    api.post(`/api/faqs/${matched.id}/hit`, {}).then(refreshFaqs).catch(() => {});

    return { answer: matched.answer, faqId: matched.id };
  }

  const logChatToServer = async (question: string, answer: string, fromFaq: boolean) => {
    const sid = sessionId || makeSessionId();
    if (!sessionId) setSessionId(sid);

    try {
      await api.post("/api/chat/log", {
        session_id: sid,
        question,
        answer,
        from_faq: fromFaq,
      });
      await refreshStats();
    } catch (e) {
      console.error("logChatToServer error:", e);
    }
  };

  // on mount: load faq + stats
  useEffect(() => {
    refreshFaqs();
    refreshStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // new session when open: false -> true
  useEffect(() => {
    const prev = prevOpenRef.current;
    if (!prev && open) setSessionId(makeSessionId());
    prevOpenRef.current = open;
  }, [open]);

  function registerUserMessage() {}
  function registerBotMessage(_fromFaq: boolean) {}

  return (
    <ChatContext.Provider
      value={{
        open,
        setOpen,
        sessionId,
        faqs,
        topFaqs,
        stats,
        addFaq,
        deleteFaq,
        getFaqAnswer,
        refreshStats,
        logChatToServer,
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
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}

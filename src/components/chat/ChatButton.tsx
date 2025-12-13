// src/components/chat/ChatButton.tsx
import { useChat } from "../../context/ChatContext";
import botIcon from "../../assets/images/maskot/popup.png";

const ChatButton: React.FC = () => {
  const { setOpen } = useChat();

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Buka Chatbot"
      className="
        fixed bottom-6 right-6 z-50
        w-[74px] h-[74px] rounded-full
        bg-[#0f1f56]
        shadow-[0_18px_45px_rgba(12,27,76,0.35)]
        transition
        hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(12,27,76,0.45)]
        active:translate-y-0 active:scale-[0.98]
        flex items-center justify-center
      "
    >
      {/* glow warm (khas hero) */}
      <span
        aria-hidden
        className="
          absolute inset-0 rounded-full
          bg-[radial-gradient(closest-side,rgba(255,210,150,0.55),rgba(255,210,150,0)_70%)]
          blur-[10px] opacity-90
        "
      />

      {/* ring putih biar ikon "sticker" lebih nyatu */}
      <span
        aria-hidden
        className="
          absolute inset-[3px] rounded-full
          bg-white
          shadow-[inset_0_0_0_2px_rgba(255,255,255,0.75)]
        "
      />

      {/* icon */}
      <img
        src={botIcon}
        alt="ExploreMas Chatbot"
        className="
          relative z-10
          w-[52px] h-[52px]
          drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]
          transition
          hover:rotate-2
        "
      />
    </button>
  );
};

export default ChatButton;

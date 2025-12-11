// src/components/chat/ChatButton.tsx
import { useChat } from "../../context/ChatContext"; // <- pastikan path ini
import botIcon from "../../assets/images/hero/chatbot.png";

const ChatButton: React.FC = () => {
  const { setOpen } = useChat();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg bg-white flex items-center justify-center border border-slate-200 hover:shadow-xl transition"
    >
      <img src={botIcon} alt="MasBot" className="w-10 h-10" />
    </button>
  );
};

export default ChatButton;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CafePage from "./pages/CafePage";
import CafeDetail from "./pages/CafeDetail";
import TransBanyumas from "./pages/TransBanyumas";

import WisataPage from "./pages/WisataPage";
import WisataDetail from "./pages/WisataDetail";

import { ChatProvider } from "./context/ChatContext";
import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* CAFE */}
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/cafes/:slug" element={<CafeDetail />} />

        {/* WISATA */}
        <Route path="/wisata" element={<WisataPage />} />
        <Route path="/wisata/:slug" element={<WisataDetail />} />

        {/* TRANS BANYUMAS */}
        <Route path="/trans" element={<TransBanyumas />} />
      </Routes>

      {/* GLOBAL CHAT BOT */}
      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

// src/App.tsx
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// CAFE
import CafePage from "./pages/CafePage";
import CafeDetail from "./pages/CafeDetail";

// TRANS BANYUMAS
import TransBanyumas from "./pages/TransBanyumas";

// WISATA
import WisataPage from "./pages/WisataPage";
import WisataDetail from "./pages/WisataDetail";

// GLOBAL CHAT
import { ChatProvider } from "./context/ChatContext";
import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* HOME (semua section termasuk Trip Planner ada di sini) */}
        <Route path="/" element={<Home />} />

        {/* CAFE */}
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/cafes/:slug" element={<CafeDetail />} />

        {/* WISATA */}
        <Route path="/wisata" element={<WisataPage />} />
        <Route path="/wisata/:slug" element={<WisataDetail />} />

        {/* TRANS BANYUMAS */}
        <Route path="/trans" element={<TransBanyumas />} />

        {/* ❌ Tidak ada route /trip-planner, karena Trip Planner adalah section di Home */}
      </Routes>

      {/* GLOBAL CHAT BOT */}
      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

// src/App.tsx
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import CafePage from "./pages/CafePage";
import CafeDetail from "./pages/CafeDetail";

import TransBanyumas from "./pages/TransBanyumas";

import WisataPage from "./pages/WisataPage";
import WisataDetail from "./pages/WisataDetail";

import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";

// ✅ IMPORT ChatProvider DARI CONTEXT
import { ChatProvider } from "./context/ChatContext";

// 🔥 Import Dashboard Admin
import AdminDashboard from "./pages/AdminDashboard";

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

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* GLOBAL CHAT BOT */}
      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

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

// CHAT
import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";

// CONTEXT CHAT
import { ChatProvider } from "./context/ChatContext";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";

// AUTH
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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

        {/* (OPSIONAL) FALLBACK 404 → Arahkan ke Home dulu */}
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>

      {/* GLOBAL CHAT BOT */}
      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

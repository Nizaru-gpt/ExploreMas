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
import AdminLoginPage from "./pages/AdminLoginPage";

// AUTH
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ✅ FORGOT PASSWORD (NEW)
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// ✅ Protected Routes
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

function App() {
  return (
    <ChatProvider>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH USER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ FORGOT PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* CAFE */}
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/cafes/:slug" element={<CafeDetail />} />

        {/* WISATA */}
        <Route path="/wisata" element={<WisataPage />} />
        <Route path="/wisata/:id" element={<WisataDetail />} />

        {/* TRANS BANYUMAS */}
        <Route path="/trans" element={<TransBanyumas />} />

        {/* ADMIN AUTH */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN (protected khusus admin) */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* (Opsional) contoh kalau nanti ada route user protected lain */}
        {/*
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        */}
      </Routes>

      {/* GLOBAL CHAT BOT */}
      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

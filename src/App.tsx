import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CafeRecommendation from "./pages/CafePage";
import TransBanyumas from "./pages/TransBanyumas";
import { ChatProvider } from "./context/ChatContext";
import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";
import CafeDetail from "./pages/CafeDetail"; // ⬅️ TAMBAH INI

function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafes" element={<CafeRecommendation />} />
        <Route path="/cafes/:slug" element={<CafeDetail />} /> {/* ⬅️ ROUTE BARU */}
        <Route path="/trans" element={<TransBanyumas />} />
      </Routes>

      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

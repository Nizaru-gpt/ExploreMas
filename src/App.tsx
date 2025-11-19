import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CafeRecommendation from "./pages/CafeRecommendation";
import TransBanyumas from "./pages/TransBanyumas";
import { ChatProvider } from "./context/ChatContext";
import ChatButton from "./components/chat/ChatButton";
import ChatPopup from "./components/chat/ChatPopup";

function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafes" element={<CafeRecommendation />} />
        <Route path="/trans" element={<TransBanyumas />} />
      </Routes>

      <ChatButton />
      <ChatPopup />
    </ChatProvider>
  );
}

export default App;

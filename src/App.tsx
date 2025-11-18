import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import TransBanyumas from "./pages/TransBanyumas";

export default function App() {
  return (
    <div className="bg-[#F8FBFF] min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trans" element={<TransBanyumas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

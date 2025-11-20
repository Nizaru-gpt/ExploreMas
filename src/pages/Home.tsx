import Navbar from "../components/layout/Navbar";
import Hero from "../components/Home/Hero";
import ServiceIntro from "../components/Home/ServiceIntro";
import StatGrid from "../components/Home/StatGrid";
import NewsList from "../components/Home/NewsList";
import TransIntro from "../components/Home/TransIntro";
import CorridorGrid from "../components/trans/CorridorGrid";
import TransImportantInfo from "../components/trans/TransImportantInfo";
import CafeSection from "../components/Home/CafeSection";
import WisataSection from "./WisataPage";
import TripPlanner from "./TripPlanner";

export default function Home() {
  return (
    <div className="bg-[#F8FBFF] min-h-screen">
      <Navbar />

      {/* padding top buat geser isi supaya tidak ketutup navbar */}
      <main className="pt-20 pb-24 space-y-24 md:space-y-32">
        {/* HERO */}
        <section id="home">
          <Hero />
        </section>

        {/* OUR SERVICE + STATISTIC (bagian tengah panel biru + icon2) */}
        <section id="services" className="mt-10">
          <ServiceIntro />
          <div className="mt-12">
            <StatGrid />
          </div>
        </section>

        {/* REKOMENDASI (Explore Better With Recommendation) */}
        <section id="recommendations">
          <CafeSection />
          <WisataSection />
        </section>

        {/* BERITA */}
        <section id="news">
          <NewsList />
        </section>

        {/* TRANS BANYUMAS (digabung dari page TransBanyumas) */}
        <section id="trans">
          <TransIntro />
          <CorridorGrid />
          <TransImportantInfo />
        </section>

        {/* TRIP PLANNER – diletakkan di bawah section lain */}
        <section id="trip-planner">
          <TripPlanner />
        </section>
      </main>
    </div>
  );
}

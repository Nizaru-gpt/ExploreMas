import Navbar from "../components/layout/Navbar";
import Hero from "../components/Home/Hero";
import ServiceIntro from "../components/Home/ServiceIntro";
import StatGrid from "../components/Home/StatGrid";
import NewsList from "../components/Home/NewsList";
import RecommendationList from "../components/Home/RecommendationList";

export default function Home() {
  return (
    <div className="bg-[#F8FBFF] min-h-screen">
      <Navbar />
      <main className="pt-20 pb-24">
        <Hero />

        <div className="mt-20">
          <ServiceIntro />
        </div>

        <div className="mt-24">
          <StatGrid />
        </div>

        <div className="mt-40 md:mt-48">
          <NewsList />
        </div>

        <div className="mt-24">
          <RecommendationList />
        </div>
      </main>
    </div>
  );
}

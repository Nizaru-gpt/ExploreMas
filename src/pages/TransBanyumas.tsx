import TransIntro from "../components/Home/TransIntro";
import CorridorGrid from "../components/trans/CorridorGrid";
import TransImportantInfo from "../components/trans/TransImportantInfo";
import RecommendationList from "../components/Home/RecommendationList";

export default function TransBanyumas() {
  return (
    <div className="bg-[#F8FBFF]">
      <main className="pt-10">
        <TransIntro />
        <CorridorGrid />
        <TransImportantInfo />
        <section className="bg-surface pt-4 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <RecommendationList />
          </div>
        </section>
      </main>
    </div>
  );
}

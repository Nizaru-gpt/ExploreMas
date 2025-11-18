import SectionHeading from "../layout/SectionHeading";
import { transCorridors, type TransCorridor } from "../../data/trans";
import CorridorCard from "./CorridorCard";

export default function CorridorGrid() {
  return (
    <section className="bg-surface py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Peta Rute Trans Banyumas" align="center" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {transCorridors.map((corridor: TransCorridor) => (
            <CorridorCard key={corridor.id} corridor={corridor} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { transImportantInfo } from "../../data/trans";

export default function TransImportantInfo() {
  return (
    <section className="bg-blue-50 py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-6 text-center text-base font-semibold text-slate-800">
          Informasi Penting
        </h2>
        <div className="grid gap-8 text-sm text-slate-700 md:grid-cols-2">
          <div>
            <p className="mb-3 font-medium">Fasilitas Bus:</p>
            <ul className="space-y-2">
              {transImportantInfo.facilities.map((item: string) => (
                <li key={item} className="flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium">Cara Naik Trans Banyumas:</p>
            <ul className="space-y-2">
              {transImportantInfo.howToUse.map((item: string) => (
                <li key={item} className="flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

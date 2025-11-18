export default function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-[260px] w-full mx-auto bg-white border border-border rounded-xl shadow-soft p-4 h-[130px] flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <div className="text-xl">{icon}</div>
        <strong className="text-sm">{title}</strong>
      </div>
      <div className="text-muted text-xs mt-1">{text}</div>
    </div>
  );
}

type Props = {
  title: string;
  subtitle?: string;  // subjudul kecil
  eyebrow?: string;   // teks kecil di atas title
  desc?: string;      // deskripsi paragraf panjang
  align?: "left" | "center"; // tambahan: untuk alignment section
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  desc,
  align = "left",
}: Props) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        isCenter ? "text-center" : "text-left",
        "mb-6",
      ].join(" ")}
    >
      {/* Eyebrow (opsional, teks kecil di atas title) */}
      {eyebrow && (
        <p className="text-muted font-semibold mb-1">{eyebrow}</p>
      )}

      {/* Title utama */}
      <h2 className="font-playfair text-brand text-[2rem] font-extrabold tracking-wide">
        {title}
      </h2>

      {/* Subtitle kecil */}
      {subtitle && (
        <p className="mt-2 text-text font-semibold">{subtitle}</p>
      )}

      {/* Deskripsi panjang */}
      {desc && (
        <p
          className={[
            "text-muted mt-3",
            isCenter ? "max-w-[880px] mx-auto" : "",
          ].join(" ")}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

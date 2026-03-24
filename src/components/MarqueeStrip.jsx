const ITEMS = [
  "Free Returns",
  "Ethically Made",
  "Natural Fibres",
  "Carbon Neutral",
];

export default function MarqueeStrip() {
  return (
    <div className="border-y border-[#e8e2db] bg-[#2c2c2c] overflow-hidden py-3">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex gap-12 items-center whitespace-nowrap"
        style={{ animation: "marquee 18s linear infinite" }}
      >
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <span
              key={`marquee-${i}`}
              className="flex items-center gap-12 text-[11px] tracking-widest uppercase text-[#c8a96e]"
            >
              {ITEMS.map((item, j) => (
                <span key={`${item}-${j}`} className="flex items-center gap-12">
                  <span>{item}</span>
                  <span>✦</span>
                </span>
              ))}
            </span>
          ))}
      </div>
    </div>
  );
}

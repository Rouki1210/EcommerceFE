import { tw } from "../../assets/theme/theme";

const ITEMS = [
  "Free Returns",
  "Ethically Made",
  "Natural Fibres",
  "Carbon Neutral",
];

export default function MarqueeStrip() {
  return (
    <div className={tw.marqueeStrip}>
      <div className={tw.marqueeTrack}>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <span key={`marquee-${i}`} className={tw.marqueeGroup}>
              {ITEMS.map((item, j) => (
                <span key={`${item}-${j}`} className={tw.marqueeUnit}>
                  <span>{item}</span>
                  <span className={tw.marqueeStar}>✦</span>
                </span>
              ))}
            </span>
          ))}
      </div>
    </div>
  );
}

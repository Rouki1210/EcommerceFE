import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const VALUES = [
  {
    icon: "✦",
    title: "Quiet Luxury",
    desc: "We believe true elegance needs no announcement. Our pieces whisper rather than shout — refined, timeless, and effortlessly worn.",
  },
  {
    icon: "◈",
    title: "Ethical Craft",
    desc: "Every garment is made in small batches by skilled artisans who are paid fairly. We choose people over speed, always.",
  },
  {
    icon: "❋",
    title: "Natural Materials",
    desc: "From Mongolian cashmere to Portuguese linen, we source only natural fibres that age beautifully and return gracefully to the earth.",
  },
  {
    icon: "◎",
    title: "Carbon Conscious",
    desc: "We offset 100% of our shipping emissions, use recycled packaging, and publish a yearly sustainability report with full transparency.",
  },
];

const MILESTONES = [
  {
    year: "2018",
    text: "Maison is founded in Paris by two friends with a shared belief that luxury should be quiet, considered, and kind.",
  },
  {
    year: "2019",
    text: "Our first capsule collection — 12 pieces in natural fibres — sells out in 48 hours. We realise we've touched something real.",
  },
  {
    year: "2021",
    text: "We become carbon-neutral across all operations and partner with three family-run ateliers in Portugal and Japan.",
  },
  {
    year: "2023",
    text: "Maison opens its first physical space in Hanoi, a calm room where you can touch, try, and take your time.",
  },
  {
    year: "2025",
    text: "10,000 customers across 40 countries. Still small. Still intentional. Still here for the long run.",
  },
];

export default function OurStoryPage() {
  usePageTitle("Our Story");

  return (
    <>
      <div className={tw.storyHero}>
        <h1 className={cx("heading", tw.storyHeroTitle)}>Our Story</h1>
        <p className={tw.storyHeroSubtitle}>
          Simple pieces for considered living. We design, craft, and deliver
          with intention at every step.
        </p>
      </div>

      <section className={tw.storySection}>
        <h2 className={cx("heading", tw.storySectionTitle)}>Our Values</h2>
        <div className={tw.storyValuesGrid}>
          {VALUES.map((value) => (
            <div key={value.title} className={tw.storyValueItem}>
              <div className={tw.storyValueIcon}>{value.icon}</div>
              <h3 className={tw.storyValueTitle}>{value.title}</h3>
              <p className={tw.storyValueDesc}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={tw.storyTimelineSection}>
        <h2 className={cx("heading", tw.storySectionTitle)}>Timeline</h2>
        <div>
          {MILESTONES.map((m) => (
            <div key={m.year} className={tw.storyTimelineItem}>
              <div className={tw.storyTimelineYear}>{m.year}</div>
              <div className={tw.storyTimelineText}>{m.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={tw.storyCtaSection}>
        <p className={tw.storyCtaText}>Ready to experience slow fashion?</p>
        <Link to="/women" className={tw.storyCtaBtn}>
          Explore Collection
        </Link>
      </section>
    </>
  );
}

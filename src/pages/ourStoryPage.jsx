import { Link } from "react-router-dom";

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
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2c2c2c] to-[#4a3f35] px-6 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Our Story
        </h1>
        <p className="text-base text-[#bbb] max-w-2xl mx-auto">
          Simple pieces for considered living. We design, craft, and deliver
          with intention at every step.
        </p>
      </div>

      {/* Values Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10 text-[#2c2c2c]">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center">
              <div className="text-4xl mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#2c2c2c] mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-[#999] leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-[#e5e5e5]">
        <h2 className="text-3xl font-bold mb-10 text-[#2c2c2c]">
          Timeline
        </h2>
        <div>
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="grid grid-cols-[100px_1fr] gap-8 mb-8 items-start"
            >
              <div className="text-2xl font-semibold text-[#c8a96e]">
                {m.year}
              </div>
              <div className="text-base text-[#2c2c2c] leading-relaxed pt-1">
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-[#e5e5e5]">
        <p className="text-base text-[#999] mb-6">
          Ready to experience slow fashion?
        </p>
        <Link
          to="/collection/women"
          className="inline-block px-8 py-3.5 bg-[#c8a96e] text-[#f5f0eb] rounded font-semibold text-sm transition-all duration-300 hover:bg-[#b8935f] hover:-translate-y-0.5 shadow-md"
        >
          Explore Collection
        </Link>
      </section>
    </>
  );
}

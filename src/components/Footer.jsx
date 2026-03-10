import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  "New Arrivals": "/",
  Women: "/women",
  Men: "/men",
  Sale: "/sale",
  "Our Story": "/our-story",
};

const FOOTER_COLS = [
  {
    title: "Shop",
    links: ["New Arrivals", "Women", "Men", "Sale"],
  },
  {
    title: "Help",
    links: [
      "Shipping & Returns",
      "Sizing Guide",
      "Care Instructions",
      "Contact Us",
    ],
  },
  {
    title: "Company",
    links: ["Our Story", "Sustainability", "Careers", "Press"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e2db] bg-[#f5f0eb]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-4 rounded-full bg-[#c8a96e] inline-block" />
            <span className="heading text-lg text-[#2c2c2c]">Maison</span>
          </div>
          <p className="text-xs text-[#aaa] leading-relaxed">
            Quiet luxury for the considered life. Crafted with care, worn with
            intention.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] tracking-widest uppercase text-[#888] mb-4">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  {FOOTER_LINKS[link] ? (
                    <Link
                      to={FOOTER_LINKS[link]}
                      className="text-xs text-[#aaa] hover:text-[#2c2c2c] transition-colors"
                    >
                      {link}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-xs text-[#aaa] hover:text-[#2c2c2c] transition-colors"
                    >
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#e8e2db] px-6 py-4 max-w-6xl mx-auto flex justify-between items-center">
        <p className="text-[10px] text-[#bbb] tracking-wide">
          © 2025 Maison. All rights reserved.
        </p>
        <p className="text-[10px] text-[#bbb] tracking-wide">
          Designed with care.
        </p>
      </div>
    </footer>
  );
}

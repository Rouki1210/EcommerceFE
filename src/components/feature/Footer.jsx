import { Link } from "react-router-dom";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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
    <footer className={cx(tw.footer, tw.footerRoot)}>
      <div className={tw.footerContainer}>
        <div className={tw.footerGrid}>
          <div className={tw.footerBrand}>
            <div className={tw.footerBrandRow}>
              <span className={tw.footerBrandDot} />
              <span className={cx("heading", tw.footerBrandName)}>Maison</span>
            </div>
            <p className={tw.footerBrandText}>
              Quiet luxury for the considered life. Crafted with care, worn with
              intention.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className={tw.footerColumnTitle}>{col.title}</p>
              <ul className={tw.footerList}>
                {col.links.map((link) => (
                  <li key={link}>
                    {FOOTER_LINKS[link] ? (
                      <Link to={FOOTER_LINKS[link]} className={tw.footerLink}>
                        {link}
                      </Link>
                    ) : (
                      <span className={tw.footerMuted}>{link}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

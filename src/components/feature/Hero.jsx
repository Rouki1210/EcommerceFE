import { Link } from "react-router-dom";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function Hero({ onShopNow }) {
  return (
    <section className={tw.heroSection}>
      <div className={tw.heroText}>
        <p className={tw.heroEyebrow}>Spring Collection 2025</p>
        <h1 className={cx("heading", tw.heroTitle)}>
          Dressed in
          <br />
          <em>quiet</em>
          <br />
          luxury.
        </h1>
        <p className={tw.heroLead}>
          Thoughtfully crafted pieces for the unhurried life. Natural fibres,
          considered cuts, enduring quality.
        </p>
        <div className={tw.heroActions}>
          <button onClick={onShopNow} className={tw.heroPrimaryBtn}>
            Shop Now
          </button>
          <Link to="/our-story" className={tw.heroStoryLink}>
            Our Story
          </Link>
        </div>
      </div>

      <div className={tw.heroMedia}>
        <div className={tw.heroImageCard}>
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
            alt="model"
            className={tw.heroImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

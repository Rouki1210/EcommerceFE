import { Link } from "react-router-dom";
import { tw } from "../../assets/theme/theme";
import HeroModelCard from "../base/HeroModelCard";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const HERO_MODEL_IMAGES = {
  primary:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
  secondary:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=480&fit=crop",
};

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
        <HeroModelCard
          src={HERO_MODEL_IMAGES.primary}
          alt="model in yellow outfit"
        />
        <HeroModelCard
          src={HERO_MODEL_IMAGES.secondary}
          alt="model in teal outfit"
          variant="secondary"
        />
      </div>
    </section>
  );
}

export default Hero;

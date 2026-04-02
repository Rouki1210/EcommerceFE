import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function EditorialBanner({ onCtaClick }) {
  return (
    <section className={tw.editorialSection}>
      <div className={tw.editorialPanel}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop"
          alt="editorial"
          className={tw.editorialImage}
        />

        <div className={tw.editorialContent}>
          <p className={tw.editorialEyebrow}>Limited Offer</p>
          <h2 className={cx("heading", tw.editorialTitle)}>
            10% off your
            <br />
            first order.
          </h2>
          <p className={tw.editorialText}>
            Use code <span className={tw.editorialCode}>SAVE10</span>
            at checkout.
          </p>
          <button onClick={onCtaClick} className={tw.editorialBtn}>
            Shop & Save
          </button>
        </div>
      </div>
    </section>
  );
}

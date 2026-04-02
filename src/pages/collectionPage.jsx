import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/feature/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function CollectionPage({ gender, title, subtitle }) {
  usePageTitle(title);
  const { addToCart } = useOutletContext();
  const { products } = useProducts();

  const baseProducts = products.filter(
    (p) => p.gender === gender || p.gender === "unisex",
  );

  const categories = ["All", ...new Set(baseProducts.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? baseProducts
      : baseProducts.filter((p) => p.category === activeCategory);

  const getFilterBtnClassName = (cat) =>
    cx(
      tw.productFilterBtn,
      activeCategory === cat
        ? tw.productFilterBtnActive
        : tw.productFilterBtnIdle,
    );

  return (
    <>
      <div className={tw.collectionHero}>
        <div className={tw.collectionHeroInner}>
          <p className={cx(tw.collectionLabel, tw.collectionFade)}>
            Maison · {gender === "women" ? "Womenswear" : "Menswear"}
          </p>
          <h1
            className={cx(
              "heading",
              tw.collectionTitle,
              tw.collectionFade,
              tw.collectionFade1,
            )}
          >
            {title}
          </h1>
          <p
            className={cx(
              tw.collectionSubtitle,
              tw.collectionFade,
              tw.collectionFade2,
            )}
          >
            {subtitle}
          </p>
        </div>
        <div className={cx(tw.collectionCircle, tw.collectionCircleLg)} />
        <div className={cx(tw.collectionCircle, tw.collectionCircleSm)} />
      </div>

      <section className={tw.pageSection}>
        <div className={tw.collectionMeta}>
          <p className={tw.collectionCount}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className={tw.collectionFilters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={getFilterBtnClassName(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className={tw.productGridList}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className={tw.collectionEmpty}>
            <p className={cx("heading", tw.collectionEmptyTitle)}>
              No items found
            </p>
            <p className={tw.collectionEmptyText}>
              Try a different category filter
            </p>
          </div>
        )}
      </section>
    </>
  );
}

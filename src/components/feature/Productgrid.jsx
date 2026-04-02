import { useState } from "react";
import { CATEGORIES } from "../../data/constants";
import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function ProductGrid({ onAddToCart }) {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => {
          const cat =
            typeof p.category === "object" ? p.category?.name : p.category;
          return cat === activeCategory;
        });

  const getFilterBtnClassName = (cat) =>
    cx(
      tw.productFilterBtn,
      activeCategory === cat
        ? tw.productFilterBtnActive
        : tw.productFilterBtnIdle,
    );

  return (
    <section id="products" className={tw.productGridSection}>
      <div className={tw.productGridHead}>
        <div className={tw.productGridIntro}>
          <p className={tw.productGridEyebrow}>Curated Picks</p>
          <h2 className={cx("heading", tw.productGridTitle)}>New Arrivals</h2>
        </div>

        <div className={tw.productGridFilters}>
          {CATEGORIES.map((cat) => (
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

      <div className={tw.productGridList}>
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <div className={tw.productGridMoreWrap}>
        <button className={tw.productGridMoreBtn}>View All Collection</button>
      </div>
    </section>
  );
}

export default ProductGrid;

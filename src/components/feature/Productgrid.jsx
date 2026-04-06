import { useMemo } from "react";
import { CATEGORIES } from "../../data/constants";
import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import {
  filterCatalogProducts,
  useCatalogSearchAndCategory,
} from "../../hooks/useCatalogQueryState";
import { tw } from "../../assets/theme/theme";
import { cx } from "@lib/cx";

function ProductGrid({
  onAddToCart,
  onOpenQuickView,
  products: productsProp,
  categories = CATEGORIES,
  initialCategory = "All",
  title = "New Arrivals",
  eyebrow = "Curated Picks",
  sectionId = "products",
  onViewAll,
  syncSearchWithUrl = true,
  syncCategoryWithUrl = true,
  searchParamKey = "q",
  categoryParamKey = "category",
}) {
  const { products: fetchedProducts } = useProducts();
  const products = Array.isArray(productsProp) ? productsProp : fetchedProducts;
  const {
    categoriesWithAll,
    activeCategory,
    setActiveCategory,
    normalizedQuery,
  } = useCatalogSearchAndCategory({
    categories,
    initialCategory,
    syncSearchWithUrl,
    syncCategoryWithUrl,
    searchParamKey,
    categoryParamKey,
  });

  const filtered = useMemo(() => {
    return filterCatalogProducts(products, {
      activeCategory,
      normalizedQuery,
    });
  }, [activeCategory, normalizedQuery, products]);

  const handleCategoryChange = (nextCategory) => {
    setActiveCategory(nextCategory);
  };

  const getFilterBtnClassName = (cat) =>
    cx(
      tw.productFilterBtn,
      activeCategory === cat
        ? tw.productFilterBtnActive
        : tw.productFilterBtnIdle,
    );

  return (
    <section id={sectionId} className={tw.productGridSection}>
      <div className={tw.productGridHead}>
        <div className={tw.productGridIntro}>
          <p className={tw.productGridEyebrow}>{eyebrow}</p>
          <h2 className={cx("heading", tw.productGridTitle)}>{title}</h2>
        </div>

        <div className={tw.productGridFilters}>
          {categoriesWithAll.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
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
            onOpenQuickView={onOpenQuickView}
          />
        ))}
      </div>

      <div className={tw.productGridMoreWrap}>
        <button
          type="button"
          onClick={() => onViewAll?.()}
          className={tw.productGridMoreBtn}
        >
          View All Collection
        </button>
      </div>
    </section>
  );
}

export default ProductGrid;

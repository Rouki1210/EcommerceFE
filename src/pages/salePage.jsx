import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/feature/ProductCard";
import {
  filterCatalogProducts,
  useCatalogNumberParam,
  useCatalogSearchAndCategory,
} from "../hooks/useCatalogQueryState";
import { useProducts } from "../hooks/useProducts";
import { tw } from "../assets/theme/theme";
import { cx } from "@lib/cx";

const DISCOUNT_TIERS = [80, 90, 100];
const SALE_CATEGORY_SCOPE = ["All"];

export default function SalePage() {
  const { value: selectedDiscount, setValue: setSelectedDiscount } =
    useCatalogNumberParam({
      paramKey: "discount",
      allowedValues: DISCOUNT_TIERS,
      fallback: null,
    });
  const { normalizedQuery } = useCatalogSearchAndCategory({
    categories: SALE_CATEGORY_SCOPE,
    syncCategoryWithUrl: false,
    syncSearchWithUrl: true,
    searchParamKey: "q",
  });
  const { addToCart, openProductModal } = useOutletContext();
  const { products = [] } = useProducts();

  const saleProducts = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        Number(p.originalPrice) > Number(p.price) ||
        String(p.badge || "").toLowerCase() === "sale",
    );
    if (selectedDiscount) {
      filtered = filtered.filter((p) => {
        if (
          !p.originalPrice ||
          !p.price ||
          Number(p.originalPrice) <= Number(p.price)
        ) {
          return false;
        }
        const discountPercent = Math.round(
          ((Number(p.originalPrice) - Number(p.price)) /
            Number(p.originalPrice)) *
            100,
        );
        return discountPercent >= selectedDiscount;
      });
    }

    if (normalizedQuery) {
      filtered = filterCatalogProducts(filtered, { normalizedQuery });
    }

    return filtered;
  }, [selectedDiscount, products, normalizedQuery]);

  const handleDiscountChange = (nextDiscount) => {
    setSelectedDiscount(nextDiscount);
  };

  const getTierBtnClassName = (value) =>
    cx(
      tw.saleFilterBtn,
      selectedDiscount === value
        ? tw.saleFilterBtnActive
        : tw.saleFilterBtnIdle,
    );

  return (
    <>
      <div className={tw.saleBanner}>
        <h1 className={tw.saleBannerTitle}>End of Season Sale</h1>
        <p className={tw.saleBannerText}>
          Up to 70% off our favourite pieces. Limited time only.
        </p>
      </div>

      <div className={tw.saleFilters}>
        <button
          type="button"
          onClick={() => handleDiscountChange(null)}
          className={getTierBtnClassName(null)}
        >
          All Discounts
        </button>
        {DISCOUNT_TIERS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => handleDiscountChange(d)}
            className={getTierBtnClassName(d)}
          >
            {d}% and up
          </button>
        ))}
      </div>

      {saleProducts.length > 0 ? (
        <div className={tw.saleGrid}>
          {saleProducts.map((product) => (
            <div key={product.id} className={tw.saleCardWrap}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onOpenQuickView={openProductModal}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={tw.saleEmpty}>
          No products found for the selected discount.
        </div>
      )}
    </>
  );
}

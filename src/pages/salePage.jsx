import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/feature/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const DISCOUNT_TIERS = [80, 90, 100];

export default function SalePage() {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const navigate = useNavigate();
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
    return filtered;
  }, [selectedDiscount, products]);

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
          onClick={() => setSelectedDiscount(null)}
          className={getTierBtnClassName(null)}
        >
          All Discounts
        </button>
        {DISCOUNT_TIERS.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiscount(d)}
            className={getTierBtnClassName(d)}
          >
            {d}% and up
          </button>
        ))}
      </div>

      {saleProducts.length > 0 ? (
        <div className={tw.saleGrid}>
          {saleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className={tw.saleCardWrap}
            >
              <ProductCard product={product} />
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

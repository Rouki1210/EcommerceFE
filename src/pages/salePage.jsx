import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const DISCOUNT_TIERS = [80, 90, 100];

export default function SalePage() {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();

  const saleProducts = useMemo(() => {
    let filtered = products.filter((p) => Math.random() > 0.6);
    if (selectedDiscount) {
      filtered = filtered.filter((p) => {
        const discountPercent =
          Math.floor(Math.random() * 50) + selectedDiscount;
        return discountPercent >= selectedDiscount;
      });
    }
    return filtered.slice(0, 12);
  }, [selectedDiscount, products]);

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#c8a96e] to-[#8b7355] py-16 px-6 text-center text-white">
        <h1 className="text-5xl font-bold mb-3 leading-tight">
          End of Season Sale
        </h1>
        <p className="text-base opacity-90">
          Up to 70% off our favourite pieces. Limited time only.
        </p>
      </div>

      {/* Discount Filters */}
      <div className="max-w-5xl mx-auto py-10 px-6 flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => setSelectedDiscount(null)}
          className={`px-5 py-2 border-2 rounded text-sm font-medium transition-all ${
            selectedDiscount === null
              ? "filter-button-active"
              : "filter-button-inactive"
          }`}
        >
          All Discounts
        </button>
        {DISCOUNT_TIERS.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiscount(d)}
            className={`px-5 py-2 border-2 rounded text-sm font-medium transition-all ${
              selectedDiscount === d
                ? "filter-button-active"
                : "filter-button-inactive"
            }`}
          >
            {d}% and up
          </button>
        ))}
      </div>

      {/* Products Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        {saleProducts.length > 0 ? (
          <div className="product-grid">
            {saleProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-[#999]">
            <p>No products found for the selected discount.</p>
          </div>
        )}
      </section>
    </>
  );
}

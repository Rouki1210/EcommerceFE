import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/feature/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";

export default function CollectionPage({ gender, title, subtitle }) {
  usePageTitle(title);
  const { addToCart, openProductModal } = useOutletContext();
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

  return (
    <>
      <style>{`
                @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
                .fade-in { animation: slideUp 0.55s ease both; }
            `}</style>

      {/* ── Hero Banner ── */}
      <div className="hero-banner">
        <div className="hero-banner-inner">
          <p className="text-label fade-in">
            Maison · {gender === "women" ? "Womenswear" : "Menswear"}
          </p>
          <h1
            className="text-heading fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            {title}
          </h1>
          <p
            className="text-subtitle fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {subtitle}
          </p>
        </div>
        {/* Decorative circles */}
        <div className="hero-circle hero-circle-lg" />
        <div className="hero-circle hero-circle-sm" />
      </div>

      {/* ── Product Section ── */}
      <section className="section">
        <div className="section-flex section-flex-row">
          <p className="text-muted">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn${activeCategory === cat ? " filter-btn-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="grid-products">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetail={openProductModal}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-muted">
            <p className="heading text-2xl mb-2">No items found</p>
            <p className="text-sm">Try a different category filter</p>
          </div>
        )}
      </section>
    </>
  );
}

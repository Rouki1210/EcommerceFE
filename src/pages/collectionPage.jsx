import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard";
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
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #4a3f35 100%)",
          minHeight: 260,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-3 fade-in">
            Maison · {gender === "women" ? "Womenswear" : "Menswear"}
          </p>
          <h1
            className="heading text-5xl text-white mb-3 fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            {title}
          </h1>
          <p
            className="text-[#bbb] text-sm max-w-md fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Decorative circles */}
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "#c8a96e" }}
        />
        <div
          className="absolute -right-8 -bottom-20 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#c8a96e" }}
        />
      </div>

      {/* ── Product Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Category filter + count */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <p className="text-sm text-[#999]">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-[#2c2c2c] text-[#f5f0eb] border border-[#2c2c2c]"
                    : "bg-white text-[#888] border border-[#e5e5e5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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
          <div className="py-24 text-center text-[#bbb]">
            <p className="heading text-2xl mb-2">No items found</p>
            <p className="text-sm">Try a different category filter</p>
          </div>
        )}
      </section>
    </>
  );
}

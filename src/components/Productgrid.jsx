import { useState } from "react";
import { CATEGORIES } from "../data/constants";
import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

function ProductGrid({ onAddToCart, onViewDetail }) {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => {
          const cat = typeof p.category === "object" ? p.category?.name : p.category;
          return cat === activeCategory;
        });

  return (
    <section id="products" className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-2">
            Curated Picks
          </p>
          <h2 className="heading text-3xl text-[#2c2c2c]">New Arrivals</h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all"
              style={{
                background: activeCategory === cat ? "#2c2c2c" : "white",
                color: activeCategory === cat ? "#f5f0eb" : "#888",
                border:
                  activeCategory === cat
                    ? "1px solid #2c2c2c"
                    : "1px solid #e5e5e5",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="card-grid grid grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-12 text-center">
        <button className="border border-[#2c2c2c] text-[#2c2c2c] px-10 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#2c2c2c] hover:text-white transition-all">
          View All Collection
        </button>
      </div>
    </section>
  );
}

export default ProductGrid;

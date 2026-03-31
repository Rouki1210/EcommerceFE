import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const navigate = useNavigate();

  const needsSizeSelection = product.sizes && product.sizes.length >= 2;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (needsSizeSelection) {
      setShowSizes(true);
    } else {
      onAddToCart({ ...product, selectedSize: product.sizes?.[0] ?? null });
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  const handleSelectSize = (e, size) => {
    e.stopPropagation();
    const colorPart = product.variant?.split(" / ")[0] ?? product.name;
    onAddToCart({
      ...product,
      variant: `${colorPart} / ${size}`,
      selectedSize: size,
    });
    setAdded(true);
    setShowSizes(false);
    setTimeout(() => setAdded(false), 1800);
  };

  const goToDetail = () => navigate(`/product/${product.id}`);

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 12px 40px rgba(44,44,44,0.1)"
          : "0 2px 12px rgba(44,44,44,0.05)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizes(false);
      }}
      onClick={goToDetail}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-3 left-3 z-10 text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: product.badge === "Sale" ? "#c0392b" : "#2c2c2c",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f0eb] aspect-[5/6]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className="bg-[#2c2c2c] text-white px-5 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-[#c8a96e] transition-all mb-2"
          >
            {needsSizeSelection
              ? "Select Size"
              : added
                ? "Added!"
                : "Quick Add"}
          </button>

          {/* Size selection */}
          {showSizes && product.sizes && (
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSelectSize(e, size)}
                  className="bg-white text-[#2c2c2c] px-3 py-1 rounded-full text-xs border border-[#2c2c2c] hover:bg-[#c8a96e] hover:text-white transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="heading text-[15px] text-[#2c2c2c] mb-1 truncate">
          {product.name}
        </p>
        <p className="text-xs text-[#aaa] mb-2 truncate">{product.variant}</p>
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-[#2c2c2c] font-medium">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#c0392b] line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

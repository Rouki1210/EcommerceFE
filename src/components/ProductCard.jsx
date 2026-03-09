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
        <div
          className="absolute inset-x-0 bottom-0 p-3"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Size picker */}
          {showSizes && !added ? (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(245,240,235,0.96)",
                backdropFilter: "blur(4px)",
                borderRadius: "14px",
                padding: "8px 10px",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#9a8c7e",
                  marginBottom: "7px",
                  textAlign: "center",
                }}
              >
                Select Size
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSelectSize(e, size)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: 500,
                      border: "1px solid #2c2c2c",
                      background: "transparent",
                      color: "#2c2c2c",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2c2c2c";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#2c2c2c";
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              {/* View Details */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToDetail();
                }}
                className="flex-1 py-2.5 rounded-xl text-xs tracking-widest uppercase font-medium transition-all"
                style={{
                  background: "rgba(245,240,235,0.92)",
                  color: "#2c2c2c",
                  backdropFilter: "blur(4px)",
                }}
              >
                Details
              </button>

              {/* Quick Add */}
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-2.5 rounded-xl text-xs tracking-widest uppercase font-medium transition-all"
                style={{
                  background: added ? "#3a7a4a" : "#2c2c2c",
                  color: "#fff",
                }}
              >
                {added ? "Added ✓" : "Quick Add"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <p className="text-[10px] tracking-widest text-[#aaa] uppercase mb-0.5">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <p className="heading text-[15px] text-[#2c2c2c] leading-snug">
            {product.name}
          </p>
          <div className="text-right">
            {product.originalPrice && (
              <p className="text-[11px] text-[#bbb] line-through leading-none mb-0.5">
                ${product.originalPrice}
              </p>
            )}
            <p
              className="heading text-[15px] leading-none"
              style={{ color: product.originalPrice ? "#c0392b" : "#2c2c2c" }}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

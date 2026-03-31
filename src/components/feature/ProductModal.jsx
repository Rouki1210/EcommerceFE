import { useEffect, useState } from "react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product?.sizes?.length) setSelectedSize(product.sizes[0]);
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, product]);

  if (!product) return null;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  const careSteps = product.care ? product.care.split(" · ") : [];

  const handleAddToCart = () => {
    const colorPart = product.variant?.split(" / ")[0] ?? product.name;
    const updatedVariant = selectedSize
      ? `${colorPart} / ${selectedSize}`
      : product.variant;
    onAddToCart({ ...product, variant: updatedVariant, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,24,20,0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#faf8f5",
          borderRadius: "2px",
          maxWidth: "820px",
          width: "100%",
          maxHeight: "90vh",
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "22px",
            color: "#aaa",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ×
        </button>
        {/* ...existing code... */}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 border-b border-[#e5e5e5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 bg-transparent border-none cursor-pointer flex justify-between items-center text-base font-semibold text-[#2c2c2c] transition-all hover:text-[#c8a96e]"
      >
        <span>{title}</span>
        <span
          className={`inline-block transition-transform duration-300 text-[#c8a96e] text-xl ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-4 pt-0 text-[#999]">{children}</div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useOutletContext();
  const { products, loading } = useProducts();
  const product = products.find((p) => String(p.id) === String(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? null);
  const [added, setAdded] = useState(false);

  usePageTitle(product?.name || "Product");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-10 h-10 border-4 border-[#e5e5e5] border-t-[#c8a96e] rounded-full animate-spin" />
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-8">
        <h1 className="heading text-2xl">Product not found</h1>
        <p className="text-muted">The item you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          Back to Home
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((Number(product.originalPrice) - Number(product.price)) /
          Number(product.originalPrice)) *
          100,
      )
    : null;

  const handleAddToCart = () => {
    const colorPart = product.variant?.split(" / ")[0] ?? product.name;
    const updatedVariant = selectedSize
      ? `${colorPart} / ${selectedSize}`
      : product.variant;
    addToCart({ ...product, variant: updatedVariant, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="section">
      <button onClick={() => navigate(-1)} className="btn btn-link mb-8">
        ← Back
      </button>

      <div className="grid grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[500px] h-auto rounded-xl shadow-card"
          />
        </div>

        {/* Info Section */}
        <div>
          <p className="text-label mb-4">{product.category}</p>

          <h1 className="text-heading text-4xl mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="mb-6 mt-4">
            {product.originalPrice ? (
              <div className="flex gap-4 items-center">
                <span className="text-lg text-muted line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-[#2c2c2c]">
                  ${Number(product.price).toFixed(2)}
                </span>
                {discount && (
                  <span className="px-2 py-1 bg-[#c0392b] text-white rounded text-xs font-semibold">
                    Save {discount}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#2c2c2c]">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-muted leading-relaxed mb-6">
            {product.description ||
              "Premium quality product with exceptional craftsmanship."}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#2c2c2c] mb-3">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] px-3 py-2 rounded text-sm font-semibold transition-all border ${
                      selectedSize === size ? "filter-btn-active" : "filter-btn"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="btn btn-secondary w-full text-base font-bold"
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          {added && (
            <p className="mt-4 p-3 bg-[#27ae60]/20 text-[#27ae60] rounded text-sm font-semibold">
              Item added successfully
            </p>
          )}

          <div className="mt-8 border-t border-[#e5e5e5] pt-8">
            <Accordion title="Description">
              <p className="text-sm text-muted leading-relaxed">
                {product.description}
              </p>
            </Accordion>
            <Accordion title="Specifications">
              <ul className="text-sm text-muted leading-relaxed">
                <li>Material: Premium Quality</li>
                <li>Care: Machine wash cold</li>
                <li>Fit: True to size</li>
              </ul>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p className="text-sm text-muted leading-relaxed">
                Free shipping on orders over $
                {import.meta.env.VITE_REACT_APP_SHIPPING_THRESHOLD || 100}
                returns accepted.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

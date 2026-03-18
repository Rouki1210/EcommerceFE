import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";
import { colors, shadows, keyframes, animations } from "../assets/theme/theme";

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        marginBottom: "1rem",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "1rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "600",
          color: colors.text,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = colors.gold)}
        onMouseLeave={(e) => (e.target.style.color = colors.text)}
      >
        <span>{title}</span>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            color: colors.gold,
            fontSize: "20px",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div
          style={{ padding: "1rem", paddingTop: "0", color: colors.textMuted }}
        >
          {children}
        </div>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: `3px solid ${colors.border}`,
            borderTop: `3px solid ${colors.gold}`,
            borderRadius: "50%",
            animation: `spin 1s linear infinite`,
          }}
        />
        <p style={{ color: colors.textMuted }}>Loading...</p>
        <style>{keyframes}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: "1.5rem",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: colors.text }}>
          Product not found
        </h1>
        <p style={{ color: colors.textMuted }}>
          The item you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            backgroundColor: colors.bgSecondary,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.border;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.bgSecondary;
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
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
    <>
      <style>{keyframes}</style>
      <div
        style={{
          padding: "2rem 1rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "2rem",
            padding: "8px 12px",
            background: "transparent",
            border: "none",
            color: colors.gold,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = colors.goldDark)}
          onMouseLeave={(e) => (e.target.style.color = colors.gold)}
        >
          ← Back
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Image Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "8px",
                ...shadows.card,
              }}
            />
          </div>

          {/* Info Section */}
          <div>
            <p
              style={{
                fontSize: "12px",
                color: colors.gold,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              {product.category}
            </p>

            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "1rem",
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </h1>

            <div style={{ marginBottom: "1.5rem", marginTop: "1rem" }}>
              {product.originalPrice ? (
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: colors.textMuted,
                      textDecoration: "line-through",
                    }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: colors.text,
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  {discount && (
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: colors.error,
                        color: "#fff",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Save {discount}%
                    </span>
                  )}
                </div>
              ) : (
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: "14px",
                color: colors.textMuted,
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              {product.description ||
                "Premium quality product with exceptional craftsmanship."}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.text,
                    marginBottom: "0.75rem",
                  }}
                >
                  Size
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        minWidth: "50px",
                        padding: "8px 12px",
                        backgroundColor:
                          selectedSize === size ? colors.gold : colors.bgCard,
                        color:
                          selectedSize === size ? colors.bgCard : colors.text,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== size) {
                          e.target.style.backgroundColor = colors.bgSecondary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size) {
                          e.target.style.backgroundColor = colors.bgCard;
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: colors.gold,
                color: colors.bgCard,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "700",
                transition: "all 0.3s ease",
                ...shadows.button,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.goldDark;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.gold;
                e.target.style.transform = "translateY(0)";
              }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            {added && (
              <p
                style={{
                  marginTop: "1rem",
                  padding: "12px",
                  backgroundColor: colors.success + "20",
                  color: colors.success,
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Item added successfully
              </p>
            )}

            <div
              style={{
                marginTop: "2rem",
                borderTop: `1px solid ${colors.border}`,
                paddingTop: "2rem",
              }}
            >
              <Accordion title="Description">
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {product.description}
                </p>
              </Accordion>
              <Accordion title="Specifications">
                <ul
                  style={{
                    fontSize: "14px",
                    color: colors.textMuted,
                    lineHeight: 1.8,
                  }}
                >
                  <li>Material: Premium Quality</li>
                  <li>Care: Machine wash cold</li>
                  <li>Fit: True to size</li>
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  Free shipping on orders over $
                  {process.env.REACT_APP_SHIPPING_THRESHOLD || 100}. 30-day
                  returns accepted.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

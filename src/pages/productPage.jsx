import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  const bodyStyle = { maxHeight: open ? "1000px" : "0" };

  return (
    <div className={tw.productPageAcc}>
      <button onClick={() => setOpen(!open)} className={tw.productPageAccBtn}>
        <span>{title}</span>
        <span
          className={tw.productPageAccIcon}
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div className={tw.productPageAccBody} style={bodyStyle}>
        <div>{children}</div>
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
      <div className={tw.saleEmpty}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={tw.saleEmpty}>
        <h1 className={cx("heading", tw.collectionEmptyTitle)}>
          Product not found
        </h1>
        <p className={tw.collectionEmptyText}>
          The item you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate("/")} className={tw.productGridMoreBtn}>
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
    <div className={tw.pageSection}>
      <button
        onClick={() => navigate(-1)}
        className={cx("btn btn-link", tw.productPageBack)}
      >
        ← Back
      </button>

      <div className={tw.productPageLayout}>
        <div className={tw.productPageImageWrap}>
          <img
            src={product.image}
            alt={product.name}
            className={tw.productPageImage}
          />
        </div>

        <div className={tw.productPageInfo}>
          <p className={tw.productPageCategory}>{product.category}</p>

          <h1 className={cx("heading", tw.productPageTitle)}>{product.name}</h1>

          <div className={tw.productPagePriceRow}>
            {product.originalPrice ? (
              <>
                <span className={tw.productPageOldPrice}>
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
                <span className={tw.productPagePrice}>
                  ${Number(product.price).toFixed(2)}
                </span>
                {discount && (
                  <span className={tw.productPageDiscount}>
                    Save {discount}%
                  </span>
                )}
              </>
            ) : (
              <span className={tw.productPagePrice}>
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className={tw.productPageDesc}>
            {product.description ||
              "Premium quality product with exceptional craftsmanship."}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className={tw.productPageSizeBlock}>
              <p className={tw.productPageSizeLabel}>Size</p>
              <div className={tw.productPageSizeList}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cx(
                      tw.productPageSizeBtn,
                      selectedSize === size && tw.productPageSizeBtnActive,
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAddToCart} className={tw.productPageAddBtn}>
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          {added && (
            <p className={tw.productPageAdded}>Item added successfully</p>
          )}

          <div className={tw.productPageDetails}>
            <Accordion title="Description">
              <p>{product.description}</p>
            </Accordion>
            <Accordion title="Specifications">
              <ul>
                <li>Material: Premium Quality</li>
                <li>Care: Machine wash cold</li>
                <li>Fit: True to size</li>
              </ul>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p>
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

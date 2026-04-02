import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const navigate = useNavigate();

  const needsSizeSelection = product.sizes && product.sizes.length >= 2;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (typeof onAddToCart !== "function") {
      goToDetail();
      return;
    }

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

  const handleDetail = (e) => {
    e.stopPropagation();
    goToDetail();
  };

  const cardClassName = cx(tw.productCardRoot, hovered && tw.productCardRaised);
  const badgeClassName = cx(
    tw.productCardBadge,
    product.badge === "Sale" && tw.productCardBadgeSale,
  );
  const imageClassName = cx(
    tw.productCardImage,
    hovered && tw.productCardImageZoom,
  );
  const overlayClassName = cx(
    tw.productCardOverlay,
    hovered && tw.productCardOverlayVisible,
  );

  return (
    <div
      className={cardClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizes(false);
      }}
      onClick={goToDetail}
    >
      {product.badge && <div className={badgeClassName}>{product.badge}</div>}

      <div className={tw.productCardMedia}>
        <img
          src={product.image}
          alt={product.name}
          className={imageClassName}
        />

        <div className={overlayClassName}>
          <button onClick={handleQuickAdd} className={tw.productCardQuickAdd}>
            {needsSizeSelection
              ? "Select Size"
              : added
                ? "Added!"
                : "Quick Add"}
          </button>
          <button onClick={handleDetail} className={tw.productCardDetailBtn}>
            Detail
          </button>

          {showSizes && product.sizes && (
            <div className={tw.productCardSizeRow}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSelectSize(e, size)}
                  className={tw.productCardSizeBtn}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={tw.productCardBody}>
        <p className={cx("heading", tw.productCardName)}>{product.name}</p>
        <p className={tw.productCardVariant}>{product.variant}</p>
        <div className={tw.productCardPriceRow}>
          <span className={tw.productCardPrice}>
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className={tw.productCardOldPrice}>
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

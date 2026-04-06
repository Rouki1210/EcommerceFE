import { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tw } from "../../assets/theme/theme";
import { cx } from "@lib/cx";
import ProductPriceRow from "../base/ProductPriceRow";
import { buildVariantWithSize } from "../base/productUiConfig";

const ProductCard = forwardRef(function ProductCard(
  {
    product,
    onAddToCart,
    onOpenQuickView,
    onOpenDetail,
    disableCardNavigation = false,
    addToCartFeedbackDuration = 1800,
  },
  ref,
) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const addFeedbackTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const safeSizes = Array.isArray(product?.sizes)
    ? product.sizes.filter(Boolean)
    : [];
  const needsSizeSelection = safeSizes.length >= 2;
  const canAddToCart = typeof onAddToCart === "function";

  useEffect(() => {
    return () => {
      if (addFeedbackTimeoutRef.current) {
        clearTimeout(addFeedbackTimeoutRef.current);
      }
    };
  }, []);

  if (!product) {
    return null;
  }

  const setAddedWithTimeout = () => {
    if (addFeedbackTimeoutRef.current) {
      clearTimeout(addFeedbackTimeoutRef.current);
    }

    setAdded(true);
    addFeedbackTimeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, addToCartFeedbackDuration);
  };

  const createCartPayload = (size) => ({
    ...product,
    selectedSize: size ?? null,
    variant: buildVariantWithSize(product, size ?? null),
  });

  const goToDetail = () => {
    if (typeof onOpenDetail === "function") {
      onOpenDetail(product);
      return;
    }

    if (product?.id === undefined || product?.id === null) {
      return;
    }

    navigate(`/product/${product.id}`);
  };

  const openQuickView = () => {
    if (typeof onOpenQuickView !== "function") {
      return false;
    }

    onOpenQuickView(product);
    return true;
  };

  const handleCardClick = () => {
    if (disableCardNavigation) return;
    goToDetail();
  };

  const handleCardKeyDown = (event) => {
    if (disableCardNavigation) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  const handleQuickAdd = (event) => {
    event.stopPropagation();

    if (!canAddToCart) {
      if (!openQuickView()) {
        goToDetail();
      }
      return;
    }

    if (needsSizeSelection) {
      setShowSizes((prev) => !prev);
      return;
    }

    const fallbackSize = safeSizes[0] ?? null;
    onAddToCart(createCartPayload(fallbackSize));
    setAddedWithTimeout();
  };

  const handleSelectSize = (event, size) => {
    event.stopPropagation();
    if (!canAddToCart) return;

    onAddToCart(createCartPayload(size));
    setShowSizes(false);
    setAddedWithTimeout();
  };

  const handleDetail = (event) => {
    event.stopPropagation();

    if (!openQuickView()) {
      goToDetail();
    }
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
  const quickAddLabel = needsSizeSelection
    ? showSizes
      ? "Choose Size"
      : "Select Size"
    : added
      ? "Added!"
      : "Quick Add";

  return (
    <div
      ref={ref}
      className={cardClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizes(false);
      }}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={disableCardNavigation ? undefined : "button"}
      tabIndex={disableCardNavigation ? undefined : 0}
      aria-label={
        disableCardNavigation
          ? undefined
          : `Open product ${product.name ?? "details"}`
      }
    >
      {product.badge && <div className={badgeClassName}>{product.badge}</div>}

      <div className={tw.productCardMedia}>
        <img
          src={product.image}
          alt={product.name || "Product image"}
          className={imageClassName}
        />

        <div className={overlayClassName}>
          <button
            type="button"
            onClick={handleQuickAdd}
            className={tw.productCardQuickAdd}
          >
            {quickAddLabel}
          </button>
          <button
            type="button"
            onClick={handleDetail}
            className={tw.productCardDetailBtn}
          >
            {typeof onOpenQuickView === "function" ? "Quick View" : "Detail"}
          </button>

          {showSizes && safeSizes.length > 0 && (
            <div className={tw.productCardSizeRow}>
              {safeSizes.map((size) => (
                <button
                  type="button"
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
        <ProductPriceRow
          price={product.price}
          originalPrice={product.originalPrice}
          rowClassName={tw.productCardPriceRow}
          priceClassName={tw.productCardPrice}
          oldPriceClassName={tw.productCardOldPrice}
          currentFirst
          showDiscount={false}
        />
      </div>
    </div>
  );
});

export default ProductCard;

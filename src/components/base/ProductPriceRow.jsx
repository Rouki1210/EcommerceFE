import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";
import { getDiscountPercent, toPrice } from "./productUiConfig";

const styles = sortCx({
  row: "flex flex-wrap items-center gap-2",
  currentPrice: "text-lg font-semibold text-[#2c2c2c]",
  oldPrice: "text-sm text-[#999] line-through",
  discount:
    "rounded-full bg-[#f5f0eb] px-2 py-0.5 text-xs font-medium text-[#8b7355]",
  missingPrice: "text-sm text-[#666]",
});

const ProductPriceRow = forwardRef(function ProductPriceRow(
  {
    as: Element = "div",
    price,
    originalPrice,
    rowClassName,
    priceClassName,
    oldPriceClassName,
    discountClassName,
    discountPrefix = "Save",
    currencySymbol = "$",
    missingPriceText = "Price unavailable",
    currentFirst = false,
    showDiscount = true,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const numericPrice = Number(price);
  const numericOriginalPrice = Number(originalPrice);
  const hasCurrentPrice = Number.isFinite(numericPrice);
  const hasOriginalPrice =
    Number.isFinite(numericOriginalPrice) &&
    Number.isFinite(numericPrice) &&
    numericOriginalPrice > numericPrice;
  const discount = hasOriginalPrice
    ? getDiscountPercent(numericPrice, numericOriginalPrice)
    : 0;
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !rowClassName;
  const currentPriceText = hasCurrentPrice
    ? `${currencySymbol}${toPrice(numericPrice)}`
    : missingPriceText;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.row, rowClassName)}
    >
      {currentFirst ? (
        <span
          className={cx(
            shouldUseVariants &&
              (hasCurrentPrice ? styles.currentPrice : styles.missingPrice),
            priceClassName,
          )}
        >
          {currentPriceText}
        </span>
      ) : null}

      {hasOriginalPrice ? (
        <span
          className={cx(
            shouldUseVariants && styles.oldPrice,
            oldPriceClassName,
          )}
        >
          {currencySymbol}
          {toPrice(numericOriginalPrice)}
        </span>
      ) : null}

      {!currentFirst ? (
        <span
          className={cx(
            shouldUseVariants &&
              (hasCurrentPrice ? styles.currentPrice : styles.missingPrice),
            priceClassName,
          )}
        >
          {currentPriceText}
        </span>
      ) : null}

      {showDiscount && discount ? (
        <span
          className={cx(
            shouldUseVariants && styles.discount,
            discountClassName,
          )}
        >
          {discountPrefix} {discount}%
        </span>
      ) : null}
    </Element>
  );
});

export default ProductPriceRow;

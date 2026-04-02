import { getDiscountPercent, toPrice } from "./productUiConfig";

export default function ProductPriceRow({
  price,
  originalPrice,
  rowClassName,
  priceClassName,
  oldPriceClassName,
  discountClassName,
  discountPrefix = "Save",
  currentFirst = false,
}) {
  const hasOriginalPrice = Number(originalPrice) > Number(price);
  const discount = getDiscountPercent(price, originalPrice);

  return (
    <div className={rowClassName}>
      {currentFirst && (
        <span className={priceClassName}>${toPrice(price)}</span>
      )}

      {hasOriginalPrice && (
        <span className={oldPriceClassName}>${toPrice(originalPrice)}</span>
      )}

      {!currentFirst && (
        <span className={priceClassName}>${toPrice(price)}</span>
      )}

      {discount && (
        <span className={discountClassName}>
          {discountPrefix} {discount}%
        </span>
      )}
    </div>
  );
}

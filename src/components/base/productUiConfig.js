export const PRODUCT_UI_COPY = {
  loading: "Loading...",
  notFoundTitle: "Product not found",
  notFoundMessage: "The item you're looking for doesn't exist.",
  backToHome: "Back to Home",
  back: "← Back",
  defaultDescription: "Premium quality product with exceptional craftsmanship.",
  sizeLabel: "Size",
  selectSizeLabel: "Select size",
  addToCartPage: "Add to Cart",
  addToCartModal: "Add to cart",
  addedToCartPage: "✓ Added to Cart",
  addedToCartModal: "Added ✓",
  addedNoticePage: "Item added successfully",
  accordionDescription: "Description",
  accordionSpecifications: "Specifications",
  accordionShipping: "Shipping & Returns",
  specifications: [
    "Material: Premium Quality",
    "Care: Machine wash cold",
    "Fit: True to size",
  ],
};

export const getCategoryLabel = (category) =>
  typeof category === "object" ? category?.name : category;

export const toPrice = (value) => Number(value).toFixed(2);

export const getDiscountPercent = (price, originalPrice) => {
  const priceNum = Number(price);
  const originalNum = Number(originalPrice);

  if (!originalNum || Number.isNaN(originalNum) || originalNum <= priceNum) {
    return null;
  }

  return Math.round(((originalNum - priceNum) / originalNum) * 100);
};

export const buildVariantWithSize = (product, selectedSize) => {
  const colorPart = product.variant?.split(" / ")[0] ?? product.name;
  return selectedSize ? `${colorPart} / ${selectedSize}` : product.variant;
};

export const getShippingText = (shippingThreshold) =>
  `Free shipping on orders over $${shippingThreshold}. 30-day returns accepted.`;

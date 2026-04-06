const DEFAULT_SHIPPING_THRESHOLD = 100;
const DEFAULT_SHIPPING_FEE = 15;
const DEFAULT_PROMO_CODE = "SAVE10";
const DEFAULT_PROMO_RATE = 0.1;

const toSafeNumber = (value, fallback = 0) => {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
};

export const normalizePromoCode = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase();

export const isValidPromoCode = (value, expectedCode = DEFAULT_PROMO_CODE) =>
  normalizePromoCode(value) === normalizePromoCode(expectedCode);

export const getCartItemQty = (item) => {
  const qty = toSafeNumber(item?.qty, 0);
  return qty > 0 ? qty : 0;
};

export const getCartItemUnitPrice = (item) => toSafeNumber(item?.price, 0);

export const getCartItemLineTotal = (item) =>
  getCartItemUnitPrice(item) * getCartItemQty(item);

export const getCartItemCount = (items) => {
  const safeItems = Array.isArray(items) ? items : [];
  return safeItems.reduce((sum, item) => sum + getCartItemQty(item), 0);
};

export const getCartSubtotal = (items) => {
  const safeItems = Array.isArray(items) ? items : [];
  return safeItems.reduce((sum, item) => sum + getCartItemLineTotal(item), 0);
};

const resolveShippingThreshold = (shippingThreshold) => {
  const threshold = toSafeNumber(shippingThreshold, DEFAULT_SHIPPING_THRESHOLD);
  return threshold > 0 ? threshold : DEFAULT_SHIPPING_THRESHOLD;
};

const resolveShippingFee = (shippingFee) => {
  const fee = toSafeNumber(shippingFee, DEFAULT_SHIPPING_FEE);
  return fee >= 0 ? fee : DEFAULT_SHIPPING_FEE;
};

export const getShippingAmount = (
  subtotal,
  {
    shippingThreshold = DEFAULT_SHIPPING_THRESHOLD,
    shippingFee = DEFAULT_SHIPPING_FEE,
  } = {},
) => {
  const resolvedSubtotal = toSafeNumber(subtotal, 0);
  const threshold = resolveShippingThreshold(shippingThreshold);
  const fee = resolveShippingFee(shippingFee);

  return resolvedSubtotal >= threshold ? 0 : fee;
};

export const getFreeShippingProgress = (
  subtotal,
  { shippingThreshold = DEFAULT_SHIPPING_THRESHOLD } = {},
) => {
  const resolvedSubtotal = toSafeNumber(subtotal, 0);
  const threshold = resolveShippingThreshold(shippingThreshold);
  const progressPct = Math.min((resolvedSubtotal / threshold) * 100, 100);
  const remainingForFreeShipping = Math.max(threshold - resolvedSubtotal, 0);

  return {
    progressPct,
    remainingForFreeShipping,
    shippingThreshold: threshold,
  };
};

export const calculateCartPricing = (
  items,
  {
    promoApplied = false,
    promoRate = DEFAULT_PROMO_RATE,
    shippingThreshold = DEFAULT_SHIPPING_THRESHOLD,
    shippingFee = DEFAULT_SHIPPING_FEE,
  } = {},
) => {
  const subtotal = getCartSubtotal(items);
  const safePromoRate = toSafeNumber(promoRate, DEFAULT_PROMO_RATE);
  const discount = promoApplied ? subtotal * safePromoRate : 0;
  const shipping = getShippingAmount(subtotal, {
    shippingThreshold,
    shippingFee,
  });
  const total = subtotal - discount + shipping;

  return {
    subtotal,
    discount,
    shipping,
    total,
    promoApplied: Boolean(promoApplied),
  };
};

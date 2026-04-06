export const formatAdminCurrency = (value, fallback = "$0") => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return value || fallback;
  }

  return `$${amount.toLocaleString()}`;
};

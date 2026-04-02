import Box from "./Box";

export default function OrderDetailsGrid({
  items,
  className,
  itemClassName,
  labelClassName,
  valueClassName,
  emptyText,
  emptyClassName,
}) {
  if (!Array.isArray(items) || items.length === 0) {
    if (!emptyText) return null;
    return <p className={emptyClassName}>{emptyText}</p>;
  }

  return (
    <Box className={className}>
      {items.map((item) => (
        <Box key={item.label} className={itemClassName}>
          <p className={labelClassName}>{item.label}</p>
          <p className={valueClassName}>{item.value}</p>
        </Box>
      ))}
    </Box>
  );
}

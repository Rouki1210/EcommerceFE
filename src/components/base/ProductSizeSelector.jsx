import Button from "./Button";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function ProductSizeSelector({
  label,
  sizes,
  selectedSize,
  onSelect,
  wrapperClassName,
  labelClassName,
  listClassName,
  buttonClassName,
  activeButtonClassName,
}) {
  if (!sizes?.length) return null;

  return (
    <div className={wrapperClassName}>
      {label && <p className={labelClassName}>{label}</p>}
      <div className={listClassName}>
        {sizes.map((size) => (
          <Button
            key={size}
            type="button"
            onClick={() => onSelect?.(size)}
            className={cx(
              buttonClassName,
              selectedSize === size && activeButtonClassName,
            )}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}

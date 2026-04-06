import { forwardRef } from "react";
import Button from "./Button";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  wrapper: "space-y-2",
  label: "text-xs font-medium uppercase tracking-wider text-[#666]",
  list: "flex flex-wrap gap-2",
  button: "min-w-10 rounded-full px-3 py-1.5 text-xs font-medium",
  buttonActive: "bg-[#2c2c2c] text-white",
  buttonIdle: "bg-[#f5f0eb] text-[#2c2c2c]",
  buttonDisabled: "cursor-not-allowed opacity-40",
});

const normalizeOption = (size, index) => {
  if (size && typeof size === "object") {
    const value = String(size.value ?? size.label ?? index);
    const label = String(size.label ?? size.value ?? index);

    return {
      key: size.id ?? value,
      value,
      label,
      disabled: Boolean(size.disabled),
      raw: size,
    };
  }

  const stringValue = String(size);

  return {
    key: stringValue,
    value: stringValue,
    label: stringValue,
    disabled: false,
    raw: size,
  };
};

const resolveSelectedValue = (selectedSize) => {
  if (selectedSize && typeof selectedSize === "object") {
    return String(selectedSize.value ?? selectedSize.label ?? "");
  }

  return String(selectedSize ?? "");
};

const ProductSizeSelector = forwardRef(function ProductSizeSelector(
  {
    as: Element = "div",
    label,
    sizes,
    selectedSize,
    onSelect,
    emitOptionObject = false,
    wrapperClassName,
    labelClassName,
    listClassName,
    buttonClassName,
    activeButtonClassName,
    idleButtonClassName,
    disabledButtonClassName,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const normalizedOptions = Array.isArray(sizes)
    ? sizes.map((size, index) => normalizeOption(size, index)).filter(Boolean)
    : [];

  if (!normalizedOptions.length) {
    return null;
  }

  const selectedValue = resolveSelectedValue(selectedSize);
  const shouldUseVariants =
    typeof useVariantStyles === "boolean"
      ? useVariantStyles
      : !wrapperClassName;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.wrapper, wrapperClassName)}
    >
      {label ? (
        <p className={cx(shouldUseVariants && styles.label, labelClassName)}>
          {label}
        </p>
      ) : null}
      <div className={cx(shouldUseVariants && styles.list, listClassName)}>
        {normalizedOptions.map((option) => {
          const isActive = selectedValue === option.value;

          return (
            <Button
              key={option.key}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) return;

                onSelect?.(emitOptionObject ? option.raw : option.value);
              }}
              className={cx(
                shouldUseVariants && styles.button,
                shouldUseVariants &&
                  (isActive ? styles.buttonActive : styles.buttonIdle),
                shouldUseVariants && option.disabled && styles.buttonDisabled,
                buttonClassName,
                isActive ? activeButtonClassName : idleButtonClassName,
                option.disabled && disabledButtonClassName,
              )}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </Element>
  );
});

export default ProductSizeSelector;

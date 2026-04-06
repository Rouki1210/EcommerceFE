import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";
import Box from "./Box";

const styles = sortCx({
  root: "grid gap-3 sm:grid-cols-2",
  item: "rounded-xl border border-[#ece7e0] bg-white p-3",
  label: "mb-1 text-[11px] font-medium uppercase tracking-wider text-[#666]",
  value: "text-sm font-medium text-[#2c2c2c]",
  empty: "text-sm text-[#666]",
});

const fallbackText = "--";

const OrderDetailsGrid = forwardRef(function OrderDetailsGrid(
  {
    as: RootElement = Box,
    itemAs: ItemElement = Box,
    emptyAs: EmptyElement = "p",
    items,
    className,
    itemClassName,
    labelClassName,
    valueClassName,
    emptyText,
    emptyClassName,
    getItemKey,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  if (!safeItems.length) {
    if (!emptyText) return null;

    return (
      <EmptyElement
        ref={ref}
        className={cx(shouldUseVariants && styles.empty, emptyClassName)}
      >
        {emptyText}
      </EmptyElement>
    );
  }

  return (
    <RootElement
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, className)}
    >
      {safeItems.map((item, index) => {
        const fallbackKey = `${item?.label ?? "item"}-${index}`;
        const resolvedKey =
          typeof getItemKey === "function"
            ? getItemKey(item, index)
            : (item?.id ?? item?.key ?? fallbackKey);

        return (
          <ItemElement
            key={resolvedKey}
            className={cx(shouldUseVariants && styles.item, itemClassName)}
          >
            <p
              className={cx(shouldUseVariants && styles.label, labelClassName)}
            >
              {item?.label ?? fallbackText}
            </p>
            <p
              className={cx(shouldUseVariants && styles.value, valueClassName)}
            >
              {item?.value ?? fallbackText}
            </p>
          </ItemElement>
        );
      })}
    </RootElement>
  );
});

export default OrderDetailsGrid;

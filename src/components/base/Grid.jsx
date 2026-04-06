import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "grid",
  },
  columns: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  },
  presets: {
    cards: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    split: "grid-cols-1 md:grid-cols-2",
  },
  gaps: {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  },
  aligns: {
    start: "items-start",
    center: "items-center",
    stretch: "items-stretch",
  },
});

const toColumnKey = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return String(Math.min(Math.max(Math.round(numericValue), 1), 4));
};

const Grid = forwardRef(function Grid(
  {
    as: Element = "div",
    children,
    columns,
    preset,
    gap,
    align,
    className,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;
  const columnKey = toColumnKey(columns);

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        shouldUseVariants && styles.common.root,
        shouldUseVariants && preset && styles.presets[preset],
        shouldUseVariants && columnKey && styles.columns[columnKey],
        shouldUseVariants && gap && styles.gaps[gap],
        shouldUseVariants && align && styles.aligns[align],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Grid;

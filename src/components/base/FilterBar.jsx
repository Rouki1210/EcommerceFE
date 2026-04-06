import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "w-full rounded-2xl border border-[#ece7e0] bg-white",
  },
  layouts: {
    row: "flex items-center",
    stack: "flex flex-col",
  },
  gaps: {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  },
  paddings: {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  },
  tones: {
    default: "bg-white text-[#2c2c2c]",
    subtle: "bg-[#faf8f5] text-[#2c2c2c]",
    dark: "border-[#2c2c2c] bg-[#2c2c2c] text-white",
  },
});

const FilterBar = forwardRef(function FilterBar(
  {
    as: Element = "div",
    children,
    layout,
    gap,
    padding,
    tone,
    className,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        shouldUseVariants && styles.common.root,
        shouldUseVariants && layout && styles.layouts[layout],
        shouldUseVariants && gap && styles.gaps[gap],
        shouldUseVariants && padding && styles.paddings[padding],
        shouldUseVariants && tone && styles.tones[tone],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default FilterBar;

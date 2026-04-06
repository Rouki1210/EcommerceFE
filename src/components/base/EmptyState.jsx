import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "flex w-full flex-col justify-center rounded-2xl border border-dashed px-6 text-center",
  },
  alignments: {
    left: "items-start text-left",
    center: "items-center text-center",
  },
  densities: {
    sm: "py-8",
    md: "py-10",
    lg: "py-14",
  },
  tones: {
    default: "border-[#ece7e0] bg-[#fffdf9] text-[#2c2c2c]",
    subtle: "border-[#e5e5e5] bg-white text-[#666]",
    dark: "border-[#2c2c2c] bg-[#2c2c2c] text-white",
  },
});

const EmptyState = forwardRef(function EmptyState(
  {
    as: Element = "div",
    children,
    align = "center",
    density = "md",
    tone = "default",
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
        shouldUseVariants && styles.alignments[align],
        shouldUseVariants && styles.densities[density],
        shouldUseVariants && styles.tones[tone],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default EmptyState;

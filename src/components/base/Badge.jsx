import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "inline-flex items-center rounded-full font-medium leading-none",
  },
  variants: {
    neutral: "bg-[#ece7e0] text-[#2c2c2c]",
    accent: "bg-[#f2e6cf] text-[#8b7355]",
    success: "bg-[#eaf7ef] text-[#1f8b4c]",
    warning: "bg-[#fff4e5] text-[#b26a00]",
    danger: "bg-[#fdeceb] text-[#c0392b]",
  },
  sizes: {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  },
});

const Badge = forwardRef(function Badge(
  {
    as: Element = "span",
    children,
    variant = "neutral",
    size = "md",
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
        shouldUseVariants && styles.variants[variant],
        shouldUseVariants && styles.sizes[size],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Badge;

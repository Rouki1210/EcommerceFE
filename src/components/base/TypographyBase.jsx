import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  sizes: {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  },
  weights: {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  tones: {
    default: "text-[#2c2c2c]",
    muted: "text-[#666]",
    subtle: "text-[#999]",
    accent: "text-[#c8a96e]",
  },
});

const TypographyBase = forwardRef(function TypographyBase(
  {
    as: Element = "span",
    children,
    size = "md",
    weight,
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
        shouldUseVariants && styles.sizes[size],
        shouldUseVariants && weight && styles.weights[weight],
        shouldUseVariants && tone && styles.tones[tone],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default TypographyBase;

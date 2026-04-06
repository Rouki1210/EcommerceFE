import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  variants: {
    body: "text-sm leading-6 text-[#2c2c2c]",
    bodyMuted: "text-sm leading-6 text-[#666]",
    label: "text-[10px] font-medium uppercase tracking-widest text-[#666]",
    headingSm: "font-serif text-lg font-medium text-[#2c2c2c]",
    headingMd: "font-serif text-2xl font-semibold text-[#2c2c2c]",
    headingLg: "font-serif text-4xl font-bold text-[#2c2c2c]",
    caption: "text-xs text-[#999]",
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
    danger: "text-[#c0392b]",
    success: "text-[#27ae60]",
  },
});

const DEFAULT_TAG_BY_VARIANT = {
  headingLg: "h1",
  headingMd: "h2",
  headingSm: "h3",
};

const Typography = forwardRef(function Typography(
  {
    as,
    variant = "body",
    weight,
    tone,
    children,
    className,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const Component = as ?? DEFAULT_TAG_BY_VARIANT[variant] ?? "span";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Component
      {...props}
      ref={ref}
      className={cx(
        shouldUseVariants && styles.variants[variant],
        shouldUseVariants && weight && styles.weights[weight],
        shouldUseVariants && tone && styles.tones[tone],
        className,
      )}
    >
      {children}
    </Component>
  );
});

export default Typography;

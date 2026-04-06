import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "rounded-2xl border transition duration-150 ease-linear",
  },
  variants: {
    primary: "border-[#e5e5e5] bg-white text-[#2c2c2c]",
    subtle: "border-[#ece7e0] bg-[#f5f0eb] text-[#2c2c2c]",
    dark: "border-[#2c2c2c] bg-[#2c2c2c] text-white",
    ghost: "border-transparent bg-transparent",
  },
  states: {
    interactive:
      "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,169,110,0.12)]",
  },
  contentPadding: {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  },
});

const Card = forwardRef(function Card(
  {
    as: Element = "div",
    children,
    variant = "primary",
    interactive = false,
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
        shouldUseVariants && interactive && styles.states.interactive,
        className,
      )}
    >
      {children}
    </Element>
  );
});

export const CardContent = forwardRef(function CardContent(
  {
    as: Element = "div",
    children,
    padding = "md",
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
        shouldUseVariants && styles.contentPadding[padding],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Card;

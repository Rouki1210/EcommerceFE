import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "relative w-full overflow-hidden rounded-2xl border px-4 py-4 sm:px-6 sm:py-5",
  },
  tones: {
    default: "border-[#ece7e0] bg-[#f9f5ef] text-[#2c2c2c]",
    accent: "border-[#e5d4b0] bg-[#fff9ef] text-[#6f5a34]",
    dark: "border-[#2c2c2c] bg-[#2c2c2c] text-white",
  },
  elevations: {
    none: "shadow-none",
    sm: "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
    md: "shadow-[0_10px_24px_rgba(0,0,0,0.08)]",
  },
});

const Banner = forwardRef(function Banner(
  {
    as: Element = "div",
    children,
    tone = "default",
    elevation = "none",
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
        shouldUseVariants && styles.tones[tone],
        shouldUseVariants && styles.elevations[elevation],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Banner;

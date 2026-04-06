import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "w-full",
  },
  spacing: {
    sm: "py-6",
    md: "py-10",
    lg: "py-14",
  },
  widths: {
    content: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8",
    wide: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
    full: "w-full",
  },
  tones: {
    default: "bg-transparent",
    subtle: "bg-[#f9f5ef]",
    dark: "bg-[#2c2c2c] text-white",
  },
});

const Section = forwardRef(function Section(
  {
    as: Element = "section",
    children,
    spacing,
    width,
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
        shouldUseVariants && spacing && styles.spacing[spacing],
        shouldUseVariants && width && styles.widths[width],
        shouldUseVariants && tone && styles.tones[tone],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Section;

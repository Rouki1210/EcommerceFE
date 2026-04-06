import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    horizontal: "w-full border-0 border-t border-[#e5e5e5]",
    vertical: "h-full w-px bg-[#e5e5e5]",
  },
  inset: {
    sm: "mx-2",
    md: "mx-4",
    lg: "mx-6",
  },
});

const Divider = forwardRef(function Divider(
  { orientation = "horizontal", inset, className, useVariantStyles, ...props },
  ref,
) {
  const isVertical = orientation === "vertical";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  if (isVertical) {
    return (
      <div
        {...props}
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={cx(
          shouldUseVariants && styles.common.vertical,
          shouldUseVariants && inset && styles.inset[inset],
          className,
        )}
      />
    );
  }

  return (
    <hr
      {...props}
      ref={ref}
      className={cx(
        shouldUseVariants && styles.common.horizontal,
        shouldUseVariants && inset && styles.inset[inset],
        className,
      )}
    />
  );
});

export default Divider;

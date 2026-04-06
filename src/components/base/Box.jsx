import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  display: {
    block: "block",
    inline: "inline-block",
    flex: "flex",
    grid: "grid",
  },
  gaps: {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  },
});

const Box = forwardRef(function Box(
  {
    as: Element = "div",
    children,
    display,
    gap,
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
        shouldUseVariants && display && styles.display[display],
        shouldUseVariants && gap && styles.gaps[gap],
        className,
      )}
    >
      {children}
    </Element>
  );
});

export default Box;

import { forwardRef } from "react";
import { tw } from "../../assets/theme/theme";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  root: "relative overflow-hidden rounded-3xl border border-[#ece7e0] bg-white",
  variants: {
    primary: "",
    secondary: "sm:translate-y-8",
  },
  image: "h-full w-full object-cover",
  fallback:
    "flex min-h-[280px] items-center justify-center text-sm text-[#666]",
});

const HeroModelCard = forwardRef(function HeroModelCard(
  {
    as: Element = "div",
    src,
    alt = "model",
    variant = "primary",
    className,
    imageClassName,
    fallbackText = "Image unavailable",
    useVariantStyles,
    children,
    ...props
  },
  ref,
) {
  const isSecondary = variant === "secondary";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(
        shouldUseVariants && styles.root,
        shouldUseVariants && styles.variants[variant],
        tw.heroImageCard,
        isSecondary && tw.heroImageCardSecondary,
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cx(
            shouldUseVariants && styles.image,
            tw.heroImage,
            imageClassName,
          )}
        />
      ) : (
        <div
          className={cx(shouldUseVariants && styles.fallback, imageClassName)}
        >
          {fallbackText}
        </div>
      )}
      {children}
    </Element>
  );
});

export default HeroModelCard;

import { cloneElement, forwardRef, isValidElement } from "react";
import { AriaButton } from "@lib/aria";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  common: {
    root: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition duration-100 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/50",
    label: "inline-flex items-center",
    icon: "size-4 shrink-0",
    spinner:
      "size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent",
  },
  sizes: {
    xs: { root: "h-8 px-2.5 text-xs" },
    sm: { root: "h-9 px-3 text-sm" },
    md: { root: "h-10 px-4 text-sm" },
    lg: { root: "h-11 px-5 text-base" },
    xl: { root: "h-12 px-6 text-base" },
  },
  colors: {
    primary: { root: "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]" },
    secondary: {
      root: "border border-[#e5e5e5] bg-white text-[#2c2c2c] hover:border-[#c8a96e] hover:text-[#c8a96e]",
    },
    tertiary: { root: "bg-transparent text-[#2c2c2c] hover:bg-[#f5f0eb]" },
    "link-gray": {
      root: "h-auto rounded-none p-0 bg-transparent text-[#666] underline-offset-4 hover:underline",
    },
    "link-color": {
      root: "h-auto rounded-none p-0 bg-transparent text-[#c8a96e] underline-offset-4 hover:underline",
    },
    "primary-destructive": {
      root: "bg-[#c0392b] text-white hover:bg-[#a03024]",
    },
    "secondary-destructive": {
      root: "border border-[#f2d4d1] bg-white text-[#c0392b] hover:bg-[#fdf2f1]",
    },
    "tertiary-destructive": {
      root: "bg-transparent text-[#c0392b] hover:bg-[#fdf2f1]",
    },
    "link-destructive": {
      root: "h-auto rounded-none p-0 bg-transparent text-[#c0392b] underline-offset-4 hover:underline",
    },
  },
  states: {
    disabled: "disabled:cursor-not-allowed disabled:opacity-50",
    loading: "cursor-wait",
  },
});

function renderIcon(icon, className) {
  if (!icon) return null;

  if (typeof icon === "function") {
    const Icon = icon;
    return <Icon data-icon className={className} aria-hidden="true" />;
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      "data-icon": icon.props?.["data-icon"] ?? true,
      className: cx(className, icon.props?.className),
      "aria-hidden": icon.props?.["aria-hidden"] ?? true,
    });
  }

  return (
    <span className={className} aria-hidden="true">
      {icon}
    </span>
  );
}

const Button = forwardRef(function Button(
  {
    children,
    type = "button",
    size,
    color,
    iconLeading,
    iconTrailing,
    isDisabled = false,
    isLoading = false,
    showTextWhileLoading = false,
    useVariantStyles,
    className,
    disabled,
    onPress,
    onClick,
    ...props
  },
  ref,
) {
  const resolvedSize = size ?? "md";
  const resolvedColor = color ?? "primary";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;
  const isButtonDisabled = Boolean(disabled || isDisabled || isLoading);

  const handlePress = (event) => {
    if (typeof onPress === "function") {
      onPress(event);
      return;
    }

    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  const showContent = showTextWhileLoading || !isLoading;

  return (
    <AriaButton
      {...props}
      ref={ref}
      type={type}
      isDisabled={isButtonDisabled}
      onPress={handlePress}
      aria-busy={isLoading || undefined}
      data-loading={isLoading ? "true" : undefined}
      className={cx(
        styles.common.root,
        styles.states.disabled,
        isLoading && styles.states.loading,
        shouldUseVariants && styles.sizes[resolvedSize]?.root,
        shouldUseVariants && styles.colors[resolvedColor]?.root,
        className,
      )}
    >
      {isLoading ? <span className={styles.common.spinner} /> : null}
      {showContent ? renderIcon(iconLeading, styles.common.icon) : null}
      {showContent && children ? (
        <span className={styles.common.label}>{children}</span>
      ) : null}
      {showContent ? renderIcon(iconTrailing, styles.common.icon) : null}
    </AriaButton>
  );
});

export default Button;

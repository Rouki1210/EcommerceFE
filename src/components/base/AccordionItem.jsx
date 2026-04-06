import { forwardRef, useId, useState } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  root: "border-b border-[#ece7e0]",
  button:
    "flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-medium text-[#2c2c2c]",
  title: "flex-1",
  icon: "inline-flex items-center justify-center text-base transition-transform duration-300",
  body: "overflow-hidden transition-[max-height] duration-300",
  bodyInner: "pb-4 text-sm text-[#2c2c2c]",
});

const AccordionItem = forwardRef(function AccordionItem(
  {
    title,
    children,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    disabled = false,
    rootClassName,
    buttonClassName,
    titleClassName,
    iconClassName,
    bodyClassName,
    bodyInnerClassName,
    expandedMaxHeight = "1000px",
    collapsedMaxHeight = "0",
    useVariantStyles,
    ...props
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof isOpen === "boolean";
  const open = isControlled ? isOpen : internalOpen;
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !rootClassName;
  const stableId = useId().replace(/:/g, "");
  const buttonId = `accordion-button-${stableId}`;
  const panelId = `accordion-panel-${stableId}`;

  const handleToggle = () => {
    if (disabled) return;

    const nextOpen = !open;
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <div
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, rootClassName)}
      data-open={open ? "true" : "false"}
    >
      <button
        id={buttonId}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={panelId}
        className={cx(shouldUseVariants && styles.button, buttonClassName)}
      >
        <span className={cx(shouldUseVariants && styles.title, titleClassName)}>
          {title}
        </span>
        <span
          className={cx(shouldUseVariants && styles.icon, iconClassName)}
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cx(shouldUseVariants && styles.body, bodyClassName)}
        style={{ maxHeight: open ? expandedMaxHeight : collapsedMaxHeight }}
      >
        <div
          className={cx(
            shouldUseVariants && styles.bodyInner,
            bodyInnerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

export default AccordionItem;

import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  overlay: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
  panel:
    "w-full max-w-xl rounded-xl border border-[#e5e5e5] bg-white text-[#2c2c2c] shadow-2xl",
  shell: "fixed inset-0 z-50 flex items-center justify-center p-4",
  title: "px-6 py-4 border-b border-[#ece7e0] font-semibold text-lg",
  content: "p-6",
  actions: "px-6 py-4 border-t border-[#ece7e0] flex gap-3 justify-end",
});

const Modal = forwardRef(function Modal(
  {
    children,
    isOpen,
    onClose,
    closeOnBackdrop = true,
    className,
    overlayClassName,
    shellClassName,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const isControlled =
    typeof isOpen === "boolean" || typeof onClose === "function";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  if (!isControlled) {
    return (
      <div
        {...props}
        ref={ref}
        className={cx(shouldUseVariants && styles.panel, className)}
      >
        {children}
      </div>
    );
  }

  if (isOpen === false) {
    return null;
  }

  const handleOverlayClick = () => {
    if (!closeOnBackdrop) return;
    if (typeof onClose === "function") onClose();
  };

  return (
    <>
      <div
        className={cx(shouldUseVariants && styles.overlay, overlayClassName)}
        onClick={handleOverlayClick}
      />
      <div className={cx(shouldUseVariants && styles.shell, shellClassName)}>
        <div
          {...props}
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cx(shouldUseVariants && styles.panel, className)}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
});

export const DialogTitle = forwardRef(function DialogTitle(
  { as: Element = "div", children, className, useVariantStyles, ...props },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.title, className)}
    >
      {children}
    </Element>
  );
});

export const DialogContent = forwardRef(function DialogContent(
  { as: Element = "div", children, className, useVariantStyles, ...props },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.content, className)}
    >
      {children}
    </Element>
  );
});

export const DialogActions = forwardRef(function DialogActions(
  { as: Element = "div", children, className, useVariantStyles, ...props },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Element
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.actions, className)}
    >
      {children}
    </Element>
  );
});

export default Modal;

import { cloneElement, forwardRef, isValidElement } from "react";
import { AriaInput, AriaLabel, AriaText, AriaTextField } from "@lib/aria";
import { cx, sortCx } from "@lib/cx";

const styles = sortCx({
  sizes: {
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-11 text-base",
  },
  adornments: {
    leadingPadding: "pl-10",
    trailingPadding: "pr-10",
    leadingWrap:
      "pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#999]",
    trailingWrap: "absolute inset-y-0 right-3 flex items-center",
    icon: "size-4",
  },
});

function renderAffix(affix, className) {
  if (!affix) return null;

  if (typeof affix === "function") {
    const Affix = affix;
    return <Affix data-icon className={className} aria-hidden="true" />;
  }

  if (isValidElement(affix)) {
    return cloneElement(affix, {
      "data-icon": affix.props?.["data-icon"] ?? true,
      className: cx(className, affix.props?.className),
      "aria-hidden": affix.props?.["aria-hidden"] ?? true,
    });
  }

  return (
    <span className={className} aria-hidden="true">
      {affix}
    </span>
  );
}

const Input = forwardRef(function Input(
  {
    label,
    hint,
    tooltip,
    error,
    icon,
    startAdornment,
    endAdornment,
    size = "md",
    isDisabled,
    isInvalid,
    isRequired,
    disabled,
    className,
    containerClassName,
    inputWrapperClassName,
    labelClassName = "form-label",
    hintClassName = "text-xs text-[#666]",
    errorClassName = "form-error-text",
    useVariantStyles = true,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const resolvedSize = styles.sizes[size] ? size : "md";
  const resolvedError =
    typeof error === "string" && error.trim().length > 0 ? error : "";
  const fieldInvalid =
    Boolean(resolvedError) ||
    Boolean(isInvalid) ||
    ariaInvalid === true ||
    ariaInvalid === "true";
  const fieldDisabled = Boolean(disabled || isDisabled);
  const leadingAffix = icon || startAdornment;
  const hasLeadingAffix = Boolean(leadingAffix);
  const hasTrailingAffix = Boolean(endAdornment);

  const inputClassName = cx(
    fieldInvalid ? "form-input-error" : "form-input-default",
    useVariantStyles && styles.sizes[resolvedSize],
    hasLeadingAffix && styles.adornments.leadingPadding,
    hasTrailingAffix && styles.adornments.trailingPadding,
    fieldDisabled && "cursor-not-allowed opacity-60",
    className,
  );

  const inputElement = (
    <AriaInput
      {...props}
      ref={ref}
      aria-invalid={fieldInvalid || undefined}
      disabled={fieldDisabled}
      className={inputClassName}
    />
  );

  const hasWrapper = Boolean(
    label ||
    hint ||
    resolvedError ||
    hasLeadingAffix ||
    hasTrailingAffix ||
    containerClassName ||
    inputWrapperClassName ||
    tooltip,
  );

  if (!hasWrapper) {
    return inputElement;
  }

  return (
    <AriaTextField
      isRequired={isRequired}
      isInvalid={fieldInvalid}
      isDisabled={fieldDisabled}
      className={containerClassName}
    >
      {label ? (
        <AriaLabel className={labelClassName} title={tooltip}>
          {label}
        </AriaLabel>
      ) : null}

      <div className={cx("relative", inputWrapperClassName)}>
        {hasLeadingAffix ? (
          <span className={styles.adornments.leadingWrap}>
            {renderAffix(leadingAffix, styles.adornments.icon)}
          </span>
        ) : null}

        {inputElement}

        {hasTrailingAffix ? (
          <span className={styles.adornments.trailingWrap}>{endAdornment}</span>
        ) : null}
      </div>

      {resolvedError ? (
        <AriaText slot="errorMessage" className={errorClassName}>
          {resolvedError}
        </AriaText>
      ) : null}

      {!resolvedError && hint ? (
        <AriaText slot="description" className={hintClassName}>
          {hint}
        </AriaText>
      ) : null}
    </AriaTextField>
  );
});

export default Input;

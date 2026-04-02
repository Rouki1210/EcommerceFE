// Base Input component
const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Input({
  label,
  error,
  className,
  containerClassName,
  inputWrapperClassName,
  labelClassName = "form-label",
  endAdornment,
  disabled,
  ...props
}) {
  const inputClassName = cx(
    error ? "form-input-error" : "form-input-default",
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  const inputElement = (
    <input
      {...props}
      disabled={disabled}
      className={inputClassName}
      aria-invalid={Boolean(error)}
    />
  );

  const hasWrapper = Boolean(
    label || error || endAdornment || containerClassName,
  );

  if (!hasWrapper) {
    return inputElement;
  }

  return (
    <div className={containerClassName}>
      {label ? <label className={labelClassName}>{label}</label> : null}

      {endAdornment ? (
        <div className={cx("relative", inputWrapperClassName)}>
          {inputElement}
          {endAdornment}
        </div>
      ) : (
        inputElement
      )}

      {error ? <p className="form-error-text">{error}</p> : null}
    </div>
  );
}

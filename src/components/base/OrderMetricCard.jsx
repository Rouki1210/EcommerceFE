import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";
import Card from "./Card";

const styles = sortCx({
  root: "flex flex-col gap-2 rounded-2xl border border-[#ece7e0] bg-white p-5",
  label: "text-[11px] font-medium uppercase tracking-wider text-[#666]",
  value: "text-2xl font-semibold text-[#2c2c2c]",
});

const OrderMetricCard = forwardRef(function OrderMetricCard(
  {
    as,
    label,
    value,
    className,
    labelClassName,
    valueClassName,
    useVariantStyles,
    ...props
  },
  ref,
) {
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Card
      {...props}
      as={as}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, className)}
    >
      <p className={cx(shouldUseVariants && styles.label, labelClassName)}>
        {label}
      </p>
      <p className={cx(shouldUseVariants && styles.value, valueClassName)}>
        {value}
      </p>
    </Card>
  );
});

export default OrderMetricCard;

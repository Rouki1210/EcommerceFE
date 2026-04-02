import Card from "./Card";

export default function OrderMetricCard({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}) {
  return (
    <Card className={className}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </Card>
  );
}

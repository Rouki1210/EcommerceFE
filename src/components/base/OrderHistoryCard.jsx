import Badge from "./Badge";
import Box from "./Box";
import Button from "./Button";
import Card from "./Card";

export default function OrderHistoryCard({
  code,
  placedAt,
  status,
  fields,
  onTrack,
  className,
  headerClassName,
  identityClassName,
  codeClassName,
  dateClassName,
  statusBadgeClassName,
  fieldsGridClassName,
  fieldClassName,
  fieldLabelClassName,
  fieldValueClassName,
  actionsClassName,
  trackButtonClassName,
  trackButtonLabel = "Track order",
}) {
  return (
    <Card className={className}>
      <Box className={headerClassName}>
        <Box className={identityClassName}>
          <p className={codeClassName}>{code}</p>
          <p className={dateClassName}>{placedAt}</p>
        </Box>

        <Badge className={statusBadgeClassName}>{status}</Badge>
      </Box>

      <Box className={fieldsGridClassName}>
        {fields.map((field) => (
          <Box key={field.label} className={fieldClassName}>
            <p className={fieldLabelClassName}>{field.label}</p>
            <p className={fieldValueClassName}>{field.value}</p>
          </Box>
        ))}
      </Box>

      <Box className={actionsClassName}>
        <Button
          type="button"
          onClick={onTrack}
          className={trackButtonClassName}
        >
          {trackButtonLabel}
        </Button>
      </Box>
    </Card>
  );
}

import { forwardRef } from "react";
import { cx, sortCx } from "@lib/cx";
import Badge from "./Badge";
import Box from "./Box";
import Button from "./Button";
import Card from "./Card";

const styles = sortCx({
  root: "rounded-2xl border border-[#ece7e0] bg-white p-5",
  header: "mb-4 flex items-start justify-between gap-3",
  identity: "space-y-1",
  code: "text-sm font-semibold text-[#2c2c2c]",
  date: "text-xs text-[#666]",
  statusBadge: "self-start",
  fieldsGrid: "mb-4 grid gap-2 sm:grid-cols-3",
  field: "space-y-1",
  fieldLabel: "text-[11px] uppercase tracking-wider text-[#666]",
  fieldValue: "text-sm font-medium text-[#2c2c2c]",
  emptyFields: "text-sm text-[#666]",
  actions: "flex justify-end",
  trackButton: "min-w-[120px]",
});

const fallbackText = "--";

const OrderHistoryCard = forwardRef(function OrderHistoryCard(
  {
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
    trackButtonDisabled = false,
    emptyFieldsText = "No order details available.",
    useVariantStyles,
    ...props
  },
  ref,
) {
  const safeFields = Array.isArray(fields) ? fields.filter(Boolean) : [];
  const canTrack = typeof onTrack === "function";
  const shouldUseVariants =
    typeof useVariantStyles === "boolean" ? useVariantStyles : !className;

  return (
    <Card
      {...props}
      ref={ref}
      className={cx(shouldUseVariants && styles.root, className)}
    >
      <Box className={cx(shouldUseVariants && styles.header, headerClassName)}>
        <Box
          className={cx(
            shouldUseVariants && styles.identity,
            identityClassName,
          )}
        >
          <p className={cx(shouldUseVariants && styles.code, codeClassName)}>
            {code || fallbackText}
          </p>
          <p className={cx(shouldUseVariants && styles.date, dateClassName)}>
            {placedAt || fallbackText}
          </p>
        </Box>

        <Badge
          className={cx(
            shouldUseVariants && styles.statusBadge,
            statusBadgeClassName,
          )}
        >
          {status || fallbackText}
        </Badge>
      </Box>

      <Box
        className={cx(
          shouldUseVariants && styles.fieldsGrid,
          fieldsGridClassName,
        )}
      >
        {safeFields.length ? (
          safeFields.map((field, index) => {
            const label = field?.label ?? fallbackText;
            const value = field?.value ?? fallbackText;
            const key = field?.id ?? field?.key ?? `${label}-${index}`;

            return (
              <Box
                key={key}
                className={cx(
                  shouldUseVariants && styles.field,
                  fieldClassName,
                )}
              >
                <p
                  className={cx(
                    shouldUseVariants && styles.fieldLabel,
                    fieldLabelClassName,
                  )}
                >
                  {label}
                </p>
                <p
                  className={cx(
                    shouldUseVariants && styles.fieldValue,
                    fieldValueClassName,
                  )}
                >
                  {value}
                </p>
              </Box>
            );
          })
        ) : (
          <p
            className={cx(
              shouldUseVariants && styles.emptyFields,
              fieldValueClassName,
            )}
          >
            {emptyFieldsText}
          </p>
        )}
      </Box>

      <Box
        className={cx(shouldUseVariants && styles.actions, actionsClassName)}
      >
        <Button
          type="button"
          onClick={canTrack ? onTrack : undefined}
          disabled={!canTrack || trackButtonDisabled}
          className={cx(
            shouldUseVariants && styles.trackButton,
            trackButtonClassName,
          )}
        >
          {trackButtonLabel}
        </Button>
      </Box>
    </Card>
  );
});

export default OrderHistoryCard;

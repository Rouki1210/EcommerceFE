import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  Box,
  Button,
  Card,
  OrderDetailsGrid,
  OrderTrackingTimeline,
  tw,
} from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const TRACKING_STEPS = [
  { label: "Order Placed", icon: "✓", sub: "We've received your order" },
  { label: "Processing", icon: "⚙", sub: "Preparing your items" },
  { label: "Shipped", icon: "📦", sub: "On its way to you" },
  { label: "Out for Delivery", icon: "🚚", sub: "Almost there" },
  { label: "Delivered", icon: "🏠", sub: "Enjoy your purchase" },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const toDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "--";
  }
  return String(value);
};

const toNumberOrNull = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const resolveFallbackOrderSummary = (state, currentStep) => {
  const cart = Array.isArray(state?.cart) ? state.cart : [];
  const firstItem = cart[0];

  const itemName =
    firstItem?.name ?? firstItem?.productName ?? firstItem?.title ?? "--";

  const quantity = cart.reduce((sum, item) => {
    const qty = Number(item?.quantity ?? item?.qty ?? 1);
    return sum + (Number.isFinite(qty) ? qty : 0);
  }, 0);

  return {
    code: state?.orderCode ?? "--",
    status: state?.orderStatus ?? TRACKING_STEPS[currentStep]?.label ?? "--",
    productName: itemName,
    itemsCount: quantity || cart.length || "--",
    total: toNumberOrNull(state?.total),
    placedAt: state?.placedAt ?? "--",
  };
};

const resolveOrderSummary = (state, currentStep) => {
  if (!state?.orderSummary) {
    return resolveFallbackOrderSummary(state, currentStep);
  }

  const summary = state.orderSummary;

  return {
    code: summary?.code ?? summary?.id ?? "--",
    status: summary?.status ?? TRACKING_STEPS[currentStep]?.label ?? "--",
    productName: summary?.productName ?? "--",
    itemsCount: summary?.itemsCount ?? "--",
    total: toNumberOrNull(summary?.total),
    placedAt: summary?.placedAt ?? summary?.createdAtLabel ?? "--",
  };
};

const buildOrderSummaryDetails = (summary) => [
  { label: "Order Code", value: toDisplayValue(summary.code) },
  { label: "Status", value: toDisplayValue(summary.status) },
  { label: "Item", value: toDisplayValue(summary.productName) },
  { label: "Quantity", value: toDisplayValue(summary.itemsCount) },
  {
    label: "Total",
    value:
      summary.total === null ? "--" : currencyFormatter.format(summary.total),
  },
  { label: "Placed At", value: toDisplayValue(summary.placedAt) },
];

const buildTrackingDetails = (shippingInfo) => {
  if (!shippingInfo) {
    return [];
  }

  const address = [
    shippingInfo.address,
    shippingInfo.city,
    shippingInfo.country,
  ]
    .filter(Boolean)
    .join(", ");

  return [
    { label: "Recipient", value: shippingInfo.fullName || "--" },
    { label: "Email", value: shippingInfo.email || "--" },
    { label: "Address", value: address || "--" },
    { label: "Phone", value: shippingInfo.phone || "--" },
  ];
};

export default function OrderTracking() {
  usePageTitle("Order Tracking");

  const { state } = useLocation();
  const navigate = useNavigate();
  const currentStep = Number.isFinite(state?.currentStep)
    ? state.currentStep
    : 0;
  const orderSummary = useMemo(
    () => resolveOrderSummary(state, currentStep),
    [state, currentStep],
  );
  const orderSummaryDetails = useMemo(
    () => buildOrderSummaryDetails(orderSummary),
    [orderSummary],
  );
  const trackingDetails = useMemo(
    () => buildTrackingDetails(state?.shippingInfo),
    [state?.shippingInfo],
  );

  return (
    <Box className={tw.trackingPage}>
      <h1 className={cx("heading", tw.trackingTitle)}>Order Status</h1>

      <OrderTrackingTimeline
        steps={TRACKING_STEPS}
        currentStep={currentStep}
        className={tw.trackingTimeline}
        lineBgClassName={tw.trackingLineBg}
        lineProgressClassName={tw.trackingLineProgress}
        stepListClassName={tw.trackingStepList}
        stepItemClassName={tw.trackingStepItem}
        stepDotClassName={tw.trackingStepDot}
        stepDotDoneClassName={tw.trackingStepDotDone}
        stepDotActiveClassName={tw.trackingStepDotActive}
        stepDotIdleClassName={tw.trackingStepDotIdle}
        stepTextClassName={tw.trackingStepText}
        stepLabelClassName={tw.trackingStepLabel}
        stepSubClassName={tw.trackingStepSub}
      />

      <Card className={tw.trackingCard}>
        <h2 className={tw.trackingCardTitle}>Order Details</h2>

        <OrderDetailsGrid
          items={orderSummaryDetails}
          className={tw.trackingInfoGrid}
          itemClassName={tw.trackingInfoItem}
          labelClassName={tw.trackingInfoLabel}
          valueClassName={tw.trackingInfoValue}
          emptyClassName={tw.trackingInfoEmpty}
        />

        <div className={tw.trackingSectionGap}>
          <h3 className={tw.trackingSectionTitle}>Shipping Information</h3>

          <OrderDetailsGrid
            items={trackingDetails}
            className={tw.trackingInfoGrid}
            itemClassName={tw.trackingInfoItem}
            labelClassName={tw.trackingInfoLabel}
            valueClassName={tw.trackingInfoValue}
            emptyText="No shipping information available for this order."
            emptyClassName={tw.trackingInfoEmpty}
          />
        </div>

        <Button
          type="button"
          onClick={() => navigate("/")}
          className={tw.trackingHomeBtn}
        >
          Back to Home
        </Button>
      </Card>
    </Box>
  );
}

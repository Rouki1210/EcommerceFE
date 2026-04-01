import { useLocation, useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const STEPS = [
  { label: "Order Placed", icon: "✓", sub: "We've received your order" },
  { label: "Processing", icon: "⚙", sub: "Preparing your items" },
  { label: "Shipped", icon: "📦", sub: "On its way to you" },
  { label: "Out for Delivery", icon: "🚚", sub: "Almost there" },
  { label: "Delivered", icon: "🏠", sub: "Enjoy your purchase" },
];

export default function OrderTracking() {
  usePageTitle("Order Tracking");

  const { state } = useLocation();
  const navigate = useNavigate();
  const currentStep = state?.currentStep ?? 0;
  const progressHeight = `${(currentStep / (STEPS.length - 1)) * 100}%`;

  return (
    <div className={tw.trackingPage}>
      <h1 className={cx("heading", tw.trackingTitle)}>Order Status</h1>

      <div className={tw.trackingTimeline}>
        <div className={tw.trackingLineBg} />

        <div
          className={tw.trackingLineProgress}
          style={{ height: progressHeight }}
        />

        <div className={tw.trackingStepList}>
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            const dotClassName = cx(
              tw.trackingStepDot,
              isDone
                ? tw.trackingStepDotDone
                : isActive
                  ? tw.trackingStepDotActive
                  : tw.trackingStepDotIdle,
            );

            return (
              <div key={step.label} className={tw.trackingStepItem}>
                <div className={dotClassName}>{isDone ? "✓" : step.icon}</div>
                <div className={tw.trackingStepText}>
                  <div className={tw.trackingStepLabel}>{step.label}</div>
                  <div className={tw.trackingStepSub}>{step.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={tw.trackingCard}>
        <h2 className={tw.trackingCardTitle}>Order Details</h2>

        {state?.shippingInfo && (
          <div className={tw.trackingInfoGrid}>
            <div className={tw.trackingInfoItem}>
              <p className={tw.trackingInfoLabel}>Recipient</p>
              <p className={tw.trackingInfoValue}>
                {state.shippingInfo.fullName}
              </p>
            </div>
            <div className={tw.trackingInfoItem}>
              <p className={tw.trackingInfoLabel}>Email</p>
              <p className={tw.trackingInfoValue}>{state.shippingInfo.email}</p>
            </div>
            <div className={tw.trackingInfoItem}>
              <p className={tw.trackingInfoLabel}>Address</p>
              <p className={tw.trackingInfoValue}>
                {state.shippingInfo.address}, {state.shippingInfo.city}
              </p>
            </div>
            <div className={tw.trackingInfoItem}>
              <p className={tw.trackingInfoLabel}>Phone</p>
              <p className={tw.trackingInfoValue}>{state.shippingInfo.phone}</p>
            </div>
          </div>
        )}

        <button onClick={() => navigate("/")} className={tw.trackingHomeBtn}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";

const STEPS = [
  { label: "Order Placed", icon: "✓", sub: "We've received your order" },
  { label: "Processing", icon: "⚙", sub: "Preparing your items" },
  { label: "Shipped", icon: "📦", sub: "On its way to you" },
  { label: "Out for Delivery", icon: "🚚", sub: "Almost there" },
  { label: "Delivered", icon: "🏠", sub: "Enjoy your purchase" },
];

export default function OrderTracking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentStep = state?.currentStep ?? 0;

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#2c2c2c] mb-8">Order Status</h1>

        {/* Timeline */}
        <div className="relative py-8 mb-8">
          {/* Background line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#e5e5e5]" />

          {/* Progress line */}
          <div
            className="absolute left-[19px] top-0 w-0.5 bg-[#c8a96e] transition-all duration-600"
            style={{
              height: `${(currentStep / (STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="relative z-10 flex flex-col gap-8">
            {STEPS.map((step, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;
              const bgColor = isDone
                ? "bg-[#2c2c2c]"
                : isActive
                  ? "bg-[#c8a96e]"
                  : "bg-[#e5e5e5]";
              const borderClass =
                isDone || isActive ? "" : "border-2 border-[#e5e5e5]";
              const textColor =
                isDone || isActive ? "text-white" : "text-[#999]";

              return (
                <div key={step.label} className="flex gap-6">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-0 -mt-2 ${bgColor} ${borderClass} ${textColor}`}
                  >
                    {isDone ? "✓" : step.icon}
                  </div>
                  <div className="pt-1 flex-1">
                    <div className="text-base font-semibold text-[#2c2c2c] mb-1">
                      {step.label}
                    </div>
                    <div className="text-sm text-[#999]">{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#f5f0eb] rounded-lg p-8 mt-8 shadow-lg">
          <h2 className="text-base font-semibold text-[#2c2c2c] mb-4">
            Order Details
          </h2>

          {state?.shippingInfo && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#999] mb-1">
                  RECIPIENT
                </p>
                <p className="text-sm text-[#2c2c2c]">
                  {state.shippingInfo.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#999] mb-1">EMAIL</p>
                <p className="text-sm text-[#2c2c2c]">
                  {state.shippingInfo.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#999] mb-1">
                  ADDRESS
                </p>
                <p className="text-sm text-[#2c2c2c]">
                  {state.shippingInfo.address}, {state.shippingInfo.city}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#999] mb-1">PHONE</p>
                <p className="text-sm text-[#2c2c2c]">
                  {state.shippingInfo.phone}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#c8a96e] text-[#f5f0eb] rounded font-semibold text-sm transition-all duration-300 hover:bg-[#b8935f] hover:-translate-y-0.5 shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

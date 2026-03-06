import { useLocation, useNavigate } from "react-router-dom";

const STEPS = [
  { label: "Order Placed", icon: "✓", sub: "We've received your order" },
  { label: "Processing", icon: "⚙", sub: "Preparing your items" },
  { label: "Shipped", icon: "📦", sub: "On its way to you" },
  { label: "Out for Delivery", icon: "🚚", sub: "Almost there" },
  { label: "Delivered", icon: "🏠", sub: "Enjoy your purchase" },
];

function StatusTimeline({ currentStep = 0 }) {
  return (
    <div style={{ position: "relative", padding: "8px 0" }}>
      {/* Connector line */}
      <div
        style={{
          position: "absolute",
          left: "19px",
          top: "28px",
          bottom: "28px",
          width: "2px",
          background: "#ede8e1",
          zIndex: 0,
        }}
      />
      {/* Active progress */}
      <div
        style={{
          position: "absolute",
          left: "19px",
          top: "28px",
          width: "2px",
          height: `${(currentStep / (STEPS.length - 1)) * 100}%`,
          background: "#c8a96e",
          zIndex: 1,
          transition: "height 0.6s ease",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {STEPS.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          const pending = i > currentStep;
          return (
            <div
              key={step.label}
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: done ? "14px" : active ? "16px" : "14px",
                  background: done ? "#2c2c2c" : active ? "#c8a96e" : "white",
                  border: pending ? "2px solid #ede8e1" : "none",
                  color: done || active ? "white" : "#ccc",
                  boxShadow: active
                    ? "0 0 0 4px rgba(200,169,110,0.2)"
                    : "none",
                  transition: "all 0.3s",
                }}
              >
                {done ? "✓" : step.icon}
              </div>

              {/* Text */}
              <div style={{ paddingTop: "8px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: active ? 600 : 400,
                    color: pending ? "#ccc" : "#2c2c2c",
                    marginBottom: "2px",
                  }}
                >
                  {step.label}
                  {active && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        background: "#fdf6ea",
                        color: "#c8a96e",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        fontWeight: 500,
                      }}
                    >
                      Current
                    </span>
                  )}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: pending ? "#ddd" : "#9a8c7e",
                  }}
                >
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderTracking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart ?? [];
  const total = state?.total ?? 0;
  const subtotal = state?.subtotal ?? 0;
  const shipping = state?.shipping ?? 0;
  const discount = state?.discount ?? 0;
  const promoApplied = state?.promoApplied ?? false;
  const shippingInfo = state?.shippingInfo ?? {};

  const orderNumber =
    state?.orderNumber ?? "MSN-" + Math.floor(100000 + Math.random() * 900000);
  const estimatedDate = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  /* currentStep: 0 = Order Placed (right after checkout) */
  const currentStep = 0;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f9f6f2",
          padding: "40px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* ── Confirmation banner ── */}
          <div
            className="fade-up"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "36px 40px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#eaf4ee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "24px",
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#c8a96e",
                  marginBottom: "4px",
                }}
              >
                Thank you for your order
              </p>
              <h1
                className="heading"
                style={{
                  fontSize: "26px",
                  color: "#2c2c2c",
                  marginBottom: "4px",
                }}
              >
                Order Confirmed
              </h1>
              <p style={{ fontSize: "13px", color: "#9a8c7e" }}>
                Order{" "}
                <strong style={{ color: "#2c2c2c" }}>{orderNumber}</strong>
                {" · "}Estimated delivery:{" "}
                <strong style={{ color: "#2c2c2c" }}>{estimatedDate}</strong>
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 22px",
                background: "transparent",
                border: "1px solid #2c2c2c",
                borderRadius: "8px",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2c2c2c",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2c2c2c";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#2c2c2c";
              }}
            >
              Continue Shopping
            </button>
          </div>

          {/* ── Two-column layout ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* LEFT — tracking timeline + items */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Tracking timeline */}
              <div
                className="fade-up"
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
                  animationDelay: "0.06s",
                }}
              >
                <div style={{ marginBottom: "24px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#c8a96e",
                      marginBottom: "4px",
                    }}
                  >
                    Live Status
                  </p>
                  <h2
                    className="heading"
                    style={{ fontSize: "20px", color: "#2c2c2c" }}
                  >
                    Order Tracking
                  </h2>
                </div>
                <StatusTimeline currentStep={currentStep} />
              </div>

              {/* Shipping info */}
              <div
                className="fade-up"
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
                  animationDelay: "0.1s",
                }}
              >
                <h2
                  className="heading"
                  style={{
                    fontSize: "18px",
                    color: "#2c2c2c",
                    marginBottom: "20px",
                  }}
                >
                  Shipping Address
                </h2>
                {shippingInfo.notes && (
                  <div
                    style={{
                      marginBottom: "16px",
                      padding: "12px 14px",
                      background: "#fdf8f0",
                      borderRadius: "10px",
                      borderLeft: "3px solid #c8a96e",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#9a8c7e",
                        marginBottom: "4px",
                      }}
                    >
                      Order Notes
                    </p>
                    <p style={{ fontSize: "13px", color: "#2c2c2c" }}>
                      {shippingInfo.notes}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  {[
                    { label: "Full Name", value: shippingInfo.fullName || "—" },
                    { label: "Phone", value: shippingInfo.phone || "—" },
                    { label: "Email", value: shippingInfo.email || "—" },
                    { label: "Address", value: shippingInfo.address || "—" },
                    { label: "City", value: shippingInfo.city || "—" },
                    { label: "Country", value: shippingInfo.country || "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p
                        style={{
                          fontSize: "10px",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#9a8c7e",
                          marginBottom: "3px",
                        }}
                      >
                        {label}
                      </p>
                      <p style={{ fontSize: "14px", color: "#2c2c2c" }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — order summary */}
            <div
              className="fade-up"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
                position: "sticky",
                top: "24px",
                animationDelay: "0.12s",
              }}
            >
              <h2
                className="heading"
                style={{
                  fontSize: "18px",
                  color: "#2c2c2c",
                  marginBottom: "20px",
                }}
              >
                Order Summary
              </h2>

              {/* Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                {cart.length === 0 ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#bbb",
                      textAlign: "center",
                      padding: "16px 0",
                    }}
                  >
                    No items
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId ?? item.id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "52px",
                            height: "52px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: "#2c2c2c",
                            color: "white",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.qty}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#2c2c2c",
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#aaa",
                            marginTop: "2px",
                          }}
                        >
                          {item.variant}
                        </p>
                      </div>
                      <p
                        className="heading"
                        style={{
                          fontSize: "13px",
                          color: "#2c2c2c",
                          flexShrink: 0,
                        }}
                      >
                        ${(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#f0ebe4",
                  marginBottom: "16px",
                }}
              />

              {/* Totals */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "13px",
                  color: "#777",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Subtotal</span>
                  <span style={{ color: "#2c2c2c" }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {promoApplied && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#3a7a4a",
                    }}
                  >
                    <span>Promo (SAVE10)</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Shipping</span>
                  <span
                    style={{ color: shipping === 0 ? "#3a7a4a" : "#2c2c2c" }}
                  >
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>
              </div>

              <div
                style={{
                  height: "1px",
                  background: "#f0ebe4",
                  margin: "16px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  className="heading"
                  style={{ fontSize: "16px", color: "#2c2c2c" }}
                >
                  Total
                </span>
                <span
                  className="heading"
                  style={{ fontSize: "22px", color: "#2c2c2c" }}
                >
                  $
                  {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Payment method placeholder */}
              <div
                style={{
                  marginTop: "20px",
                  background: "#f9f6f2",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#9a8c7e"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <div>
                  <p style={{ fontSize: "11px", color: "#9a8c7e" }}>
                    Payment method
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#2c2c2c",
                      fontWeight: 500,
                    }}
                  >
                    •••• •••• •••• ——
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

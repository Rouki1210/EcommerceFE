import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SHIPPING_THRESHOLD } from "../data/constants";
import { colors, shadows, keyframes } from "../assets/theme/theme";

const COUNTRIES = [
  "Vietnam",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Japan",
  "South Korea",
  "Australia",
  "Canada",
  "Singapore",
];

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart ?? [];
  const subtotal = state?.subtotal ?? 0;
  const discount = state?.discount ?? 0;
  const shipping = state?.shipping ?? 0;
  const total = state?.total ?? 0;
  const promoApplied = state?.promoApplied ?? false;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Vietnam",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[+\d\s\-()]{7,20}$/.test(form.phone)) {
      e.phone = "Please enter a valid phone number";
    }
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    navigate("/order-tracking", {
      state: {
        cart,
        subtotal,
        discount,
        shipping,
        total,
        promoApplied,
        shippingInfo: form,
      },
    });
  };

  return (
    <div style={{ background: "#f9f6f2", minHeight: "100vh" }}>
      <style>{keyframes}</style>

      <div
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px" }} className="fade-in">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#aaa",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: "12px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = colors.text)}
            onMouseLeave={(e) => (e.target.style.color = "#aaa")}
            onClick={() =>
              navigate("/shopping-cart", {
                state: {
                  cart,
                  subtotal,
                  discount,
                  shipping,
                  total,
                  promoApplied,
                },
              })
            }
          >
            ← Back to Cart
          </button>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: colors.gold,
              marginBottom: "4px",
            }}
          >
            Step 2 of 3
          </p>
          <h1
            style={{
              fontSize: "32px",
              color: colors.text,
              marginTop: "12px",
              fontFamily: "Playfair Display, serif",
              fontWeight: "bold",
            }}
          >
            Delivery Information
          </h1>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "28px",
            marginTop: "24px",
          }}
          className="slide-up"
        >
          {[
            { num: 1, label: "Cart", done: true },
            { num: 2, label: "Delivery", active: true },
            { num: 3, label: "Confirmation", done: false },
          ].map((step, i) => (
            <div
              key={step.num}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  background: step.done
                    ? colors.text
                    : step.active
                      ? colors.gold
                      : "white",
                  color: step.done || step.active ? "white" : "#ccc",
                  border:
                    step.done || step.active
                      ? "none"
                      : `1.5px solid ${colors.border}`,
                }}
              >
                {step.done ? "✓" : step.num}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  color: step.active
                    ? colors.text
                    : step.done
                      ? "#9a8c7e"
                      : "#ccc",
                  fontWeight: step.active ? "600" : "400",
                }}
              >
                {step.label}
              </span>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    width: "40px",
                    margin: "0 4px",
                    background: step.done ? colors.text : colors.border,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Layout */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Form Cards */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Contact Section */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "32px",
                ...shadows.card,
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: colors.text,
                  marginBottom: "20px",
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "600",
                }}
              >
                Contact Information
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {/* Full Name */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Nguyen Van A"
                    type="text"
                    autoComplete="name"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: errors.fullName
                        ? `1px solid ${colors.error}`
                        : `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: errors.fullName ? "#fff5f5" : colors.bgInput,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                      if (!errors.fullName)
                        e.target.style.borderColor = colors.gold;
                    }}
                    onMouseLeave={(e) => {
                      if (!errors.fullName)
                        e.target.style.borderColor = colors.border;
                    }}
                  />
                  {errors.fullName && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: colors.error,
                        marginTop: "4px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    type="email"
                    autoComplete="email"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: errors.email
                        ? `1px solid ${colors.error}`
                        : `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: errors.email ? "#fff5f5" : colors.bgInput,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.email && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: colors.error,
                        marginTop: "4px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+84 xxx xxx xxx"
                    type="tel"
                    autoComplete="tel"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: errors.phone
                        ? `1px solid ${colors.error}`
                        : `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: errors.phone ? "#fff5f5" : colors.bgInput,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.phone && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: colors.error,
                        marginTop: "4px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "32px",
                ...shadows.card,
              }}
              className="slide-up"
            >
              <h2
                style={{
                  fontSize: "18px",
                  color: colors.text,
                  marginBottom: "20px",
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "600",
                }}
              >
                Shipping Address
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {/* Street Address */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Street Address *
                  </label>
                  <input
                    id="address"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="123 Main Street"
                    type="text"
                    autoComplete="street-address"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: errors.address
                        ? `1px solid ${colors.error}`
                        : `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: errors.address ? "#fff5f5" : colors.bgInput,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.address && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: colors.error,
                        marginTop: "4px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    City *
                  </label>
                  <input
                    id="city"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Ho Chi Minh City"
                    type="text"
                    autoComplete="address-level2"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: errors.city
                        ? `1px solid ${colors.error}`
                        : `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: errors.city ? "#fff5f5" : colors.bgInput,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.city && (
                    <p
                      style={{
                        fontSize: "11px",
                        color: colors.error,
                        marginTop: "4px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: colors.textDim,
                      marginBottom: "6px",
                      fontWeight: "500",
                    }}
                  >
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: `1px solid ${colors.border}`,
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: colors.text,
                      background: colors.bgInput,
                      outline: "none",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: colors.textDim,
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Delivery Notes (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: colors.text,
                    background: colors.bgInput,
                    outline: "none",
                    fontFamily: "DM Sans, sans-serif",
                    resize: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              ...shadows.card,
              position: "sticky",
              top: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                color: colors.text,
                marginBottom: "16px",
                fontWeight: "600",
              }}
            >
              ORDER SUMMARY
            </h3>

            {cart.length > 0 && (
              <div
                style={{
                  marginBottom: "16px",
                  paddingBottom: "16px",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {cart.map((item, idx) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ color: colors.textDim }}>
                      {item.name} x {item.quantity}
                    </span>
                    <span style={{ color: colors.text, fontWeight: "500" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                padding: "8px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ color: colors.textDim }}>Subtotal</span>
              <span style={{ color: colors.text }}>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  padding: "8px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.success }}>Discount</span>
                <span style={{ color: colors.success }}>
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                padding: "8px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ color: colors.textDim }}>Shipping</span>
              <span style={{ color: colors.text }}>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                fontWeight: "600",
                padding: "16px 0",
                color: colors.text,
              }}
            >
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: colors.text,
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "16px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#1a1a1a")}
              onMouseLeave={(e) => (e.target.style.background = colors.text)}
            >
              Proceed to Confirmation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

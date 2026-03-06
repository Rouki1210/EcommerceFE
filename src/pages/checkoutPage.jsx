import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SHIPPING_THRESHOLD } from "../data/constants";

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

function FormField({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "10px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#9a8c7e",
          marginBottom: "6px",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${hasError ? "#c0392b" : "#e5e5e5"}`,
  borderRadius: "12px",
  fontSize: "14px",
  color: "#2c2c2c",
  background: "#fafafa",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
});

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Cart & pricing data passed from /shopping-cart
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
      // Scroll to first error
      const firstErrKey = Object.keys(errs)[0];
      document.getElementById(firstErrKey)?.focus();
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
        shippingInfo: { ...form },
      },
    });
  };

  const styledInput = (key, extraProps = {}) => (
    <input
      id={key}
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      onFocus={() => setFocusedField(key)}
      onBlur={() => setFocusedField(null)}
      style={{
        ...inputStyle(!!errors[key]),
        borderColor:
          focusedField === key
            ? "#2c2c2c"
            : errors[key]
              ? "#c0392b"
              : "#e5e5e5",
      }}
      {...extraProps}
    />
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation: fadeUp 0.5s ease 0.06s both; }
        .fade-up-2 { animation: fadeUp 0.5s ease 0.12s both; }
        select option { color: #2c2c2c; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f9f6f2",
          padding: "40px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          {/* ── Header ── */}
          <div className="fade-up" style={{ marginBottom: "32px" }}>
            <button
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2c2c2c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
            >
              ← Back to Cart
            </button>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "4px",
              }}
            >
              Step 2 of 3
            </p>
            <h1
              className="heading"
              style={{ fontSize: "32px", color: "#2c2c2c" }}
            >
              Delivery Information
            </h1>
          </div>

          {/* ── Progress bar ── */}
          <div className="fade-up" style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
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
                        fontWeight: 600,
                        background: step.done
                          ? "#2c2c2c"
                          : step.active
                            ? "#c8a96e"
                            : "white",
                        color: step.done || step.active ? "white" : "#ccc",
                        border:
                          !step.done && !step.active
                            ? "1.5px solid #e0e0e0"
                            : "none",
                      }}
                    >
                      {step.done ? "✓" : step.num}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: step.active
                          ? "#2c2c2c"
                          : step.done
                            ? "#9a8c7e"
                            : "#ccc",
                        fontWeight: step.active ? 600 : 400,
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: step.done ? "#2c2c2c" : "#e0e0e0",
                        width: "40px",
                        margin: "0 4px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 360px",
                gap: "24px",
                alignItems: "start",
              }}
            >
              {/* LEFT — form */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Contact info card */}
                <div
                  className="fade-up-1"
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "32px",
                    boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
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
                    Contact Information
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormField
                        label="Full Name *"
                        id="fullName"
                        error={errors.fullName}
                      >
                        {styledInput("fullName", {
                          placeholder: "e.g. Nguyen Van A",
                          type: "text",
                          autoComplete: "name",
                        })}
                      </FormField>
                    </div>
                    <FormField
                      label="Email Address *"
                      id="email"
                      error={errors.email}
                    >
                      {styledInput("email", {
                        placeholder: "your@email.com",
                        type: "email",
                        autoComplete: "email",
                      })}
                    </FormField>
                    <FormField
                      label="Phone Number *"
                      id="phone"
                      error={errors.phone}
                    >
                      {styledInput("phone", {
                        placeholder: "+84 xxx xxx xxx",
                        type: "tel",
                        autoComplete: "tel",
                      })}
                    </FormField>
                  </div>
                </div>

                {/* Shipping address card */}
                <div
                  className="fade-up-2"
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "32px",
                    boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormField
                        label="Address *"
                        id="address"
                        error={errors.address}
                      >
                        {styledInput("address", {
                          placeholder:
                            "House number, street name, district, city",
                          type: "text",
                          autoComplete: "street-address",
                        })}
                      </FormField>
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormField
                        label="Country"
                        id="country"
                        error={errors.country}
                      >
                        <select
                          id="country"
                          value={form.country}
                          onChange={(e) => set("country", e.target.value)}
                          onFocus={() => setFocusedField("country")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            ...inputStyle(false),
                            borderColor:
                              focusedField === "country"
                                ? "#2c2c2c"
                                : "#e5e5e5",
                            cursor: "pointer",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239a8c7e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                            paddingRight: "36px",
                          }}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <FormField
                        label="Order Notes (optional)"
                        id="notes"
                        error={errors.notes}
                      >
                        <textarea
                          id="notes"
                          value={form.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          onFocus={() => setFocusedField("notes")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Special delivery instructions, gift message, etc."
                          rows={3}
                          style={{
                            ...inputStyle(false),
                            borderColor:
                              focusedField === "notes" ? "#2c2c2c" : "#e5e5e5",
                            resize: "vertical",
                            minHeight: "80px",
                            fontFamily: "inherit",
                          }}
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — order summary */}
              <div
                className="fade-up-2"
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
                  position: "sticky",
                  top: "24px",
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

                {/* Items list */}
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

                <div
                  style={{
                    height: "1px",
                    background: "#f0ebe4",
                    marginBottom: "16px",
                  }}
                />

                {/* Price breakdown */}
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
                    marginBottom: "24px",
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

                {/* Free shipping banner */}
                {subtotal >= SHIPPING_THRESHOLD && (
                  <div
                    style={{
                      background: "#eaf4ee",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>🎉</span>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#3a7a4a",
                        fontWeight: 500,
                      }}
                    >
                      You've unlocked free shipping!
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "#2c2c2c",
                    color: "white",
                    border: "none",
                    borderRadius: "16px",
                    padding: "16px",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#111";
                    e.currentTarget.style.letterSpacing = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#2c2c2c";
                    e.currentTarget.style.letterSpacing = "3px";
                  }}
                >
                  Place Order →
                </button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#bbb",
                    marginTop: "12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Secure checkout · SSL encrypted
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

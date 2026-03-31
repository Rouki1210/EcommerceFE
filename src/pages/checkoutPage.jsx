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

const FormInput = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  focusedField,
  type = "text",
  placeholder,
  autoComplete,
}) => {
  const isError = !!error;
  const isFocused = focusedField === id;

  return (
    <div>
      <label className="label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input${isError ? " input-error" : ""}${isFocused ? " border-[#c8a96e]" : ""}`}
      />
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};

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
        currentStep: 1,
      },
    });
  };

  return (
    <div className="section bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
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
          className="btn btn-link mb-3"
        >
          ← Back to Cart
        </button>
        <p className="muted mb-1">Step 2 of 3</p>
        <h1 className="heading heading-lg mt-3">Delivery Information</h1>
      </div>

      {/* Progress Bar */}
      <div className="flex-center gap-2 mb-8">
        {[
          { num: 1, label: "Cart", done: true },
          { num: 2, label: "Delivery", active: true },
          { num: 3, label: "Confirmation", done: false },
        ].map((step, i) => (
          <div key={step.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex-center text-xs font-semibold transition-colors ${
                step.done
                  ? "bg-[#2c2c2c] text-white"
                  : step.active
                    ? "bg-[#c8a96e] text-white"
                    : "bg-transparent border border-sub text-muted"
              }`}
            >
              {step.done ? "✓" : step.num}
            </div>
            <span
              className={`text-xs ${
                step.active ? "font-semibold text-main" : "text-muted"
              }`}
            >
              {step.label}
            </span>
            {i < 2 && (
              <div
                className={`flex-1 h-px w-10 mx-1 ${
                  step.done ? "bg-[#2c2c2c]" : "bg-[#e5e5e5]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Layout */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Contact Card */}
          <div className="card">
            <h2 className="heading-md mb-6">Contact Information</h2>
            <div className="flex flex-col gap-4">
              <FormInput
                id="fullName"
                label="Full Name *"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                error={errors.fullName}
                focusedField={focusedField}
                placeholder="e.g. Nguyen Van A"
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  error={errors.email}
                  focusedField={focusedField}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                <FormInput
                  id="phone"
                  label="Phone Number *"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  error={errors.phone}
                  focusedField={focusedField}
                  placeholder="+84 xxx xxx xxx"
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="card">
            <h2 className="heading-md mb-6">Shipping Address</h2>
            <div className="flex flex-col gap-4">
              <FormInput
                id="address"
                label="Street Address *"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                error={errors.address}
                focusedField={focusedField}
                placeholder="123 Main Street"
                autoComplete="street-address"
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  id="city"
                  label="City/Area *"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  onFocus={() => setFocusedField("city")}
                  onBlur={() => setFocusedField(null)}
                  error={errors.city}
                  focusedField={focusedField}
                  placeholder="Ho Chi Minh City"
                  autoComplete="address-level2"
                />
                <div>
                  <label className="label">Country *</label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="input w-full"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="card">
            <label className="label">Order Notes (Optional)</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              placeholder="Add any special instructions..."
              rows="4"
              className="input w-full resize-none font-inherit"
            />
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="card p-6 h-fit sticky top-5">
          <h3 className="heading mb-4">Order Summary</h3>

          <div className="flex-between text-xs text-muted py-2 border-b border-sub">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex-between text-xs text-success py-2 border-b border-sub">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex-between text-xs text-muted py-2 border-b border-sub">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex-between text-lg font-semibold py-4 text-main">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Place Order
          </button>

          <p className="text-center text-xs text-muted mt-3">
            Free shipping on orders over ${SHIPPING_THRESHOLD}
          </p>
        </div>
      </form>
    </div>
  );
}

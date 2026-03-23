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
      <label className="form-label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${isError ? "form-input-error" : "form-input-default"} ${
          isFocused ? "border-[#c8a96e]" : ""
        }`}
      />
      {error && <p className="form-error-text">{error}</p>}
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
    <div className="page-container bg-white min-h-screen">
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
          className="btn-back-link mb-3"
        >
          ← Back to Cart
        </button>
        <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-1 font-semibold">
          Step 2 of 3
        </p>
        <h1 className="text-4xl text-[#2c2c2c] mt-3 font-bold">
          Delivery Information
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 items-center mb-8">
        {[
          { num: 1, label: "Cart", done: true },
          { num: 2, label: "Delivery", active: true },
          { num: 3, label: "Confirmation", done: false },
        ].map((step, i) => (
          <div key={step.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step.done
                  ? "bg-[#2c2c2c] text-white"
                  : step.active
                    ? "bg-[#c8a96e] text-white"
                    : "bg-transparent border border-[#e5e5e5] text-[#999]"
              }`}
            >
              {step.done ? "✓" : step.num}
            </div>
            <span
              className={`text-xs ${
                step.active ? "font-semibold text-[#2c2c2c]" : "text-[#999]"
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
          <div className="bg-[#f5f0eb] rounded-xl p-8 shadow-lg">
            <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
              Contact Information
            </h2>
            <div className="space-y-4">
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
          <div className="bg-[#f5f0eb] rounded-xl p-8 shadow-lg">
            <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
              Shipping Address
            </h2>
            <div className="space-y-4">
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
                  <label className="form-label">Country *</label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="form-input-default w-full"
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
          <div className="bg-[#f5f0eb] rounded-xl p-8 shadow-lg">
            <label className="form-label">Order Notes (Optional)</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              placeholder="Add any special instructions..."
              rows="4"
              className="form-input-default w-full resize-none font-inherit"
            />
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="bg-[#f5f0eb] rounded-xl p-6 h-fit sticky top-5 shadow-lg">
          <h3 className="text-base text-[#2c2c2c] mb-4 font-semibold">
            Order Summary
          </h3>

          <div className="flex justify-between text-xs text-[#999] py-2 border-b border-[#e5e5e5]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-xs text-[#27ae60] py-2 border-b border-[#e5e5e5]">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-xs text-[#999] py-2 border-b border-[#e5e5e5]">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold py-4 text-[#2c2c2c]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button type="submit" className="btn-primary-enabled w-full">
            Place Order
          </button>

          <p className="text-center text-xs text-[#999] mt-3">
            Free shipping on orders over ${SHIPPING_THRESHOLD}
          </p>
        </div>
      </form>
    </div>
  );
}

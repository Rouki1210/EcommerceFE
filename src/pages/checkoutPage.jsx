import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SHIPPING_THRESHOLD } from "../data/constants";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";
import { cx } from "@lib/cx";


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
  error,
  type = "text",
  placeholder,
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cx(
          error ? "form-input-error" : "form-input-default",
          "focus:border-[#c8a96e]",
        )}
      />
      {error && <p className="form-error-text">{error}</p>}
    </div>
  );
};

export default function CheckoutPage() {
  usePageTitle("Checkout");

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
    <div className={tw.checkoutPage}>
      <div>
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
          className={cx("btn-link", tw.checkoutBack)}
        >
          Back to cart
        </button>
        <p className={tw.checkoutStep}>Step 2 of 3</p>
        <h1 className={cx("heading", tw.checkoutTitle)}>
          Delivery Information
        </h1>
      </div>

      <div className={tw.checkoutProgress}>
        {[
          { num: 1, label: "Cart", done: true },
          { num: 2, label: "Delivery", active: true },
          { num: 3, label: "Confirmation", done: false },
        ].map((step, i) => (
          <div key={step.num} className={tw.checkoutProgressItem}>
            <div
              className={cx(
                tw.checkoutProgressDot,
                step.done
                  ? tw.checkoutProgressDotDone
                  : step.active
                    ? tw.checkoutProgressDotActive
                    : tw.checkoutProgressDotIdle,
              )}
            >
              {step.done ? "✓" : step.num}
            </div>
            <span
              className={cx(
                tw.checkoutProgressLabel,
                step.active
                  ? tw.checkoutProgressLabelActive
                  : tw.checkoutProgressLabelIdle,
              )}
            >
              {step.label}
            </span>
            {i < 2 && (
              <div
                className={cx(
                  tw.checkoutProgressLine,
                  step.done
                    ? tw.checkoutProgressLineDone
                    : tw.checkoutProgressLineIdle,
                )}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={tw.checkoutLayout}>
        <div className={tw.checkoutMain}>
          <div className={tw.checkoutCard}>
            <h2 className={cx("heading", tw.checkoutCardTitle)}>
              Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              <FormInput
                id="fullName"
                label="Full Name *"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                error={errors.fullName}
                placeholder="e.g. Nguyen Van A"
              />
              <div className={tw.checkoutFormGrid2}>
                <FormInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  error={errors.email}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                <FormInput
                  id="phone"
                  label="Phone Number *"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  error={errors.phone}
                  placeholder="+84 xxx xxx xxx"
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>

          <div className={tw.checkoutCard}>
            <h2 className={cx("heading", tw.checkoutCardTitle)}>
              Shipping Address
            </h2>
            <div className="flex flex-col gap-4">
              <FormInput
                id="address"
                label="Street Address *"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                error={errors.address}
                placeholder="123 Main Street"
                autoComplete="street-address"
              />
              <div className={tw.checkoutFormGrid2}>
                <FormInput
                  id="city"
                  label="City/Area *"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  error={errors.city}
                  placeholder="Ho Chi Minh City"
                  autoComplete="address-level2"
                />
                <div>
                  <label htmlFor="country" className="form-label">
                    Country *
                  </label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="form-input-default focus:border-[#c8a96e]"
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

          <div className={tw.checkoutCard}>
            <label htmlFor="notes" className="form-label">
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Add any special instructions..."
              rows={4}
              className={cx(
                "form-input-default",
                tw.checkoutTextarea,
                "focus:border-[#c8a96e]",
              )}
            />
          </div>
        </div>

        <div className={tw.checkoutSummary}>
          <h3 className={tw.checkoutSummaryTitle}>Order Summary</h3>

          <div className={tw.checkoutSummaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div
              className={cx(tw.checkoutSummaryRow, tw.checkoutSummaryDiscount)}
            >
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className={tw.checkoutSummaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className={tw.checkoutSummaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button type="submit" className={tw.checkoutSubmit}>
            Place Order
          </button>

          <p className={tw.checkoutHint}>
            Free shipping on orders over ${SHIPPING_THRESHOLD}
          </p>
        </div>
      </form>
    </div>
  );
}

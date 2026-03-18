import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { registerApi } from "../api/authApi";
import { keyframes } from "../assets/theme/theme";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Invalid email address";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.terms) e.terms = "You must agree to the Terms & Conditions";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const data = await registerApi(
        form.firstName + " " + form.lastName,
        form.email,
        form.password,
      );
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {keyframes}
        .animate-slideUp {
          animation: slideUp 0.5s ease both;
        }
        .shadow-card-hover {
          box-shadow: 0 8px 24px rgba(200, 169, 110, 0.12);
        }
      </style>
      <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center justify-center p-6">
        <Link
          to="/"
          className="flex items-center gap-2 mb-9 no-underline"
        >
          <span className="w-5 h-5 rounded-full bg-[#c8a96e]" />
          <span className="heading text-xl text-[#2c2c2c]">Maison</span>
        </Link>

        <div className="w-full max-w-[420px] bg-white rounded-2xl p-10 shadow-card-hover animate-slideUp">
          <p className="text-[11px] tracking-widest uppercase text-[#c8a96e] m-0 mb-2">
            Join our community
          </p>
          <h1 className="heading text-2xl text-[#2c2c2c] m-0 mb-7">
            Create Account
          </h1>

          {apiError && (
            <div className="bg-[#fff0f0] text-[#c0392b] px-3.5 py-2.5 rounded-lg text-sm mb-4">
              {apiError}
            </div>
          )}

          <form className="flex flex-col gap-4.5" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-[#666] mb-1.5 font-medium">
                First Name *
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                placeholder="First name"
                className={`w-full text-sm bg-[#fafafa] px-3.5 py-2.5 border rounded-lg text-[#2c2c2c] outline-none transition-colors ${
                  errors.firstName ? "border-[#c0392b]" : "border-[#e5e5e5]"
                }`}
              />
              {errors.firstName && (
                <p className="text-[#c0392b] text-[11px] mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-[#666] mb-1.5 font-medium">
                Last Name *
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                placeholder="Last name"
                className={`w-full text-sm bg-[#fafafa] px-3.5 py-2.5 border rounded-lg text-[#2c2c2c] outline-none transition-colors ${
                  errors.lastName ? "border-[#c0392b]" : "border-[#e5e5e5]"
                }`}
              />
              {errors.lastName && (
                <p className="text-[#c0392b] text-[11px] mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-[#666] mb-1.5 font-medium">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="your@email.com"
                className={`w-full text-sm bg-[#fafafa] px-3.5 py-2.5 border rounded-lg text-[#2c2c2c] outline-none transition-colors ${
                  errors.email ? "border-[#c0392b]" : "border-[#e5e5e5]"
                }`}
              />
              {errors.email && (
                <p className="text-[#c0392b] text-[11px] mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-[#666] mb-1.5 font-medium">
                Password *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="At least 8 characters"
                className={`w-full text-sm bg-[#fafafa] px-3.5 py-2.5 border rounded-lg text-[#2c2c2c] outline-none transition-colors ${
                  errors.password ? "border-[#c0392b]" : "border-[#e5e5e5]"
                }`}
              />
              {errors.password && (
                <p className="text-[#c0392b] text-[11px] mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-[#666] mb-1.5 font-medium">
                Confirm Password *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.confirm}
                onChange={(e) => setField("confirm", e.target.value)}
                placeholder="Re-enter password"
                className={`w-full text-sm bg-[#fafafa] px-3.5 py-2.5 border rounded-lg text-[#2c2c2c] outline-none transition-colors ${
                  errors.confirm ? "border-[#c0392b]" : "border-[#e5e5e5]"
                }`}
              />
              {errors.confirm && (
                <p className="text-[#c0392b] text-[11px] mt-1">
                  {errors.confirm}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                checked={form.terms}
                onChange={(e) => setField("terms", e.target.checked)}
                className="mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-xs text-[#666] leading-relaxed"
              >
                I agree to the{" "}
                <a
                  href="#terms"
                  className="text-[#2c2c2c] font-medium no-underline hover:underline"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-[#c0392b] text-[11px] mt-1">
                {errors.terms}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`px-0 py-3 rounded-xl text-xs tracking-widest uppercase font-semibold border-none cursor-pointer transition-colors ${
                loading
                  ? "bg-[#999] text-white cursor-not-allowed"
                  : "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a]"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-5 text-sm text-[#999]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2c2c2c] font-medium no-underline hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 text-[11px] no-underline text-[#999] hover:text-[#2c2c2c] transition-colors"
        >
          ← Back to store
        </Link>
      </div>
    </>
  );
}

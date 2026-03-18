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
      <style
        dangerouslySetInnerHTML={{
          __html: keyframes,
        }}
      />
      <div className="auth-page">
        <Link to="/" className="auth-logo-link">
          <span className="auth-logo-icon" />
          <span className="auth-logo-text">Maison</span>
        </Link>

        <div className="auth-card">
          <p className="auth-card-label">Join our community</p>
          <h1 className="auth-card-title">Create Account</h1>

          {apiError && <div className="auth-error-box">{apiError}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="auth-form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                placeholder="First name"
                className={errors.firstName ? "form-input-error" : "form-input-default"}
              />
              {errors.firstName && (
                <p className="form-error-text">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="auth-form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                placeholder="Last name"
                className={errors.lastName ? "form-input-error" : "form-input-default"}
              />
              {errors.lastName && (
                <p className="form-error-text">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="auth-form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="your@email.com"
                className={errors.email ? "form-input-error" : "form-input-default"}
              />
              {errors.email && <p className="form-error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="auth-form-group">
              <label className="form-label">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="At least 8 characters"
                className={errors.password ? "form-input-error" : "form-input-default"}
              />
              {errors.password && (
                <p className="form-error-text">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.confirm}
                onChange={(e) => setField("confirm", e.target.value)}
                placeholder="Re-enter password"
                className={errors.confirm ? "form-input-error" : "form-input-default"}
              />
              {errors.confirm && (
                <p className="form-error-text">{errors.confirm}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="form-checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={form.terms}
                onChange={(e) => setField("terms", e.target.checked)}
                className="form-checkbox"
              />
              <label htmlFor="terms" className="form-checkbox-label">
                I agree to the{" "}
                <a href="#terms" className="btn-link">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.terms && <p className="form-error-text">{errors.terms}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={loading ? "btn-primary-disabled" : "btn-primary-enabled"}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-footer">
            Already have an account?{" "}
            <Link to="/login" className="btn-link">
              Sign in
            </Link>
          </p>
        </div>

        <Link to="/" className="text-back-link">
          ← Back to store
        </Link>
      </div>
    </>
  );
}

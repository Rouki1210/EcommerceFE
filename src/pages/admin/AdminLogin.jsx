import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/authApi";
import { colors, keyframes } from "../../assets/theme/theme";
import "../../assets/styles/admin.css";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginAdmin(form.email, form.password);
      if (res?.token) {
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem("adminToken", res.token);
        navigate("/admin/dashboard");
      } else {
        setError(res?.message || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Cannot connect to server.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{keyframes}</style>
      <div className="admin-login-container">
        {/* LEFT PANEL */}
        <div className="admin-login-left">
          {/* Logo */}
          <div className="admin-login-logo">
            <div className="admin-login-logo-icon">A</div>
            <div className="admin-login-logo-text">
              <h3>ADMIN PAGE</h3>
              <p>ECOMMERCE</p>
            </div>
          </div>

          {/* Hero */}
          <div className="admin-login-hero">
            <div className="admin-login-badge">MANAGEMENT PORTAL</div>
            <h2>
              Your store,
              <br />
              <span>fully in control.</span>
            </h2>
            <p>
              Manage products, track orders, and grow your ecommerce business
              from one powerful dashboard.
            </p>
          </div>

          {/* Trust badges */}
          <div className="admin-login-badges">
            {["🔒 Secure", "⚡ Fast", "📊 Analytics"].map((t) => (
              <div key={t} className="admin-login-badge-item">
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="admin-login-right">
          <div className="admin-login-form-wrapper">
            {/* Header */}
            <div className="admin-login-header">
              <div className="admin-login-header-label">Welcome Back</div>
              <h1>
                Sign in to your
                <br />
                admin account
              </h1>
              <p>Enter your credentials to continue</p>
            </div>

            {error && <div className="admin-login-error">⚠ {error}</div>}

            {/* Email Input */}
            <div className="admin-form-group">
              <label className="admin-form-label">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="admin@shop.com"
                className="admin-form-input"
              />
            </div>

            {/* Password Input */}
            <div className="admin-form-group">
              <div className="admin-form-label-row">
                <label className="admin-form-label">Password</label>
                <a href="#" className="admin-form-link">
                  Forgot password?
                </a>
              </div>
              <div className="admin-form-input-wrapper">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="••••••••"
                  className="admin-form-input"
                  style={{ paddingRight: "40px" }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="admin-form-input-toggle"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="admin-btn-submit"
            >
              {loading ? (
                <>
                  <span className="admin-btn-submit-spinner">⟳</span>
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>

            {/* Divider */}
            <div className="admin-divider">
              <div className="admin-divider-line" />
              <span className="admin-divider-text">DEMO ACCESS</span>
              <div className="admin-divider-line" />
            </div>

            {/* Demo Box */}
            <div className="admin-demo-box">
              <div className="admin-demo-item">
                <div>
                  <div className="admin-demo-field-label">Email</div>
                  <div className="admin-demo-field-value">admin@shop.com</div>
                </div>
              </div>
              <div className="admin-demo-divider" />
              <div className="admin-demo-item">
                <div>
                  <div className="admin-demo-field-label">Password</div>
                  <div className="admin-demo-field-value">admin123</div>
                </div>
                <button
                  onClick={() =>
                    setForm({ email: "admin@shop.com", password: "admin123" })
                  }
                  className="admin-demo-btn"
                >
                  Fill ↗
                </button>
              </div>
            </div>

            {/* Back Link */}
            <div className="admin-back-link">
              <a href="/">← Back to shop</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

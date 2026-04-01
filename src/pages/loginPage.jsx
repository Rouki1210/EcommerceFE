import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginApi } from "../api/authApi";
import { tw } from "../assets/theme/theme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={tw.authPage}>
      <Link to="/" className="auth-logo-link">
        <span className="auth-logo-icon" />
        <span className="auth-logo-text">Maison</span>
      </Link>

      <div className="auth-card animate-slideUp">
        <p className="auth-card-label">Welcome back</p>
        <h1 className="auth-card-title">Sign In</h1>

        {error && <div className="auth-error-box">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="form-input-default"
            />
          </div>

          <div className="auth-form-group">
            <label className="form-label">Password</label>
            <div className={tw.authPasswordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="form-input-default pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={tw.authPasswordToggle}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? "btn-primary-disabled" : "btn-primary-enabled"}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-footer">
          Don't have an account?{" "}
          <Link to="/register" className="btn-link">
            Sign Up
          </Link>
        </p>
      </div>

      <Link to="/" className="btn-back-link">
        ← Back to store
      </Link>
    </div>
  );
}

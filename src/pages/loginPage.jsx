import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginApi } from "../api/authApi";

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
      setError(err.response?.data?.message || "Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "36px", textDecoration: "none" }}>
        <span style={{ width: "20px", height: "20px", borderRadius: "50%",
          background: "#c8a96e", display: "inline-block" }} />
        <span className="heading" style={{ fontSize: "22px", color: "#2c2c2c" }}>Maison</span>
      </Link>

      <div style={{ background: "white", borderRadius: "16px", padding: "40px",
        width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(44,44,44,0.07)" }}>
        <p style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase",
          color: "#c8a96e", marginBottom: "8px" }}>Welcome back</p>
        <h1 className="heading" style={{ fontSize: "28px", color: "#2c2c2c", marginBottom: "28px" }}>
          Sign In
        </h1>

        {error && (
          <div style={{ background: "#fff0f0", color: "#c0392b", padding: "10px 14px",
            borderRadius: "8px", fontSize: "13px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px",
              textTransform: "uppercase", color: "#9a8c7e", marginBottom: "6px" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" required
              style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e2db",
                borderRadius: "8px", fontSize: "14px", background: "#faf8f5",
                outline: "none", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "1.5px",
              textTransform: "uppercase", color: "#9a8c7e", marginBottom: "6px" }}>Password</label>
            <input type={showPassword ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password" required
              style={{ width: "100%", padding: "11px 14px", border: "1px solid #e8e2db",
                borderRadius: "8px", fontSize: "14px", background: "#faf8f5",
                outline: "none", boxSizing: "border-box" }} />
          </div>

          <button type="submit" disabled={loading}
            style={{ background: loading ? "#999" : "#2c2c2c", color: "white",
              border: "none", padding: "13px", borderRadius: "10px",
              fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#999" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2c2c2c", fontWeight: 500 }}>Create one</Link>
        </p>
      </div>

      {/* Back to store */}
      <Link
        to="/"
        style={{
          marginTop: "24px",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#9a8c7e",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ← Back to store
      </Link>
    </div>
  );
}
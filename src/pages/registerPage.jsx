import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { registerApi } from "../api/authApi";

function PasswordInput({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "11px 40px 11px 14px",
          border: "1px solid #e8e2db",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#2c2c2c",
          background: "#faf8f5",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
        onBlur={(e) => (e.target.style.borderColor = "#e8e2db")}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#b0a090",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {show ? (
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid #e8e2db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#2c2c2c",
  background: "#faf8f5",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#9a8c7e",
  marginBottom: "6px",
};

const errorStyle = {
  color: "#c0392b",
  fontSize: "11px",
  marginTop: "4px",
};

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

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) { e.firstName = "First name is required"; return e; }
    if (!form.lastName.trim()) { e.lastName = "Last name is required"; return e; }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      { e.email = "Invalid email address"; return e; }
    if (form.password.length < 8)
      { e.password = "Password must be at least 8 characters"; return e; }
    if (form.password !== form.confirm) { e.confirm = "Passwords do not match"; return e; }
    if (!form.terms) { e.terms = "You must agree to the Terms & Conditions"; return e; }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const firstName = form.firstName.trim();
      const lastName = form.lastName.trim();
      const email = form.email.trim();
      const password = form.password;
      const data = await registerApi(firstName, lastName, email, password);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f0eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "36px",
          textDecoration: "none",
          opacity: 0.9,
        }}
      >
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#c8a96e",
            display: "inline-block",
          }}
        />
        <span
          className="heading"
          style={{ fontSize: "22px", color: "#2c2c2c" }}
        >
          Maison
        </span>
      </Link>

      {/* Card */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 4px 24px rgba(44,44,44,0.07)",
        }}
      >
        {/* Heading */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#c8a96e",
            marginBottom: "8px",
          }}
        >
          Join Maison
        </p>
        <h1
          className="heading"
          style={{ fontSize: "28px", color: "#2c2c2c", marginBottom: "28px" }}
        >
          Create Account
        </h1>

        {/* API Error Banner */}
        {apiError && (
          <div
            style={{
              background: "#fdf0f0",
              border: "1px solid #e8c0c0",
              borderRadius: "8px",
              padding: "12px 14px",
              marginBottom: "18px",
              fontSize: "13px",
              color: "#c0392b",
            }}
          >
            {apiError}
          </div>
        )}

        {/* Form */}
        <form
          noValidate 
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          {/* First name */}
          <div>
            <label style={labelStyle}>First Name</label>
            <input
              type="text"
              placeholder="Your first name"
              value={form.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              style={{
                ...inputStyle,
                borderColor: errors.firstName ? "#c0392b" : "#e8e2db",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.firstName
                  ? "#c0392b"
                  : "#e8e2db")
              }
            />
            {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
          </div>

          {/* Last name */}
          <div>
            <label style={labelStyle}>Last Name</label>
            <input
              type="text"
              placeholder="Your last name"
              value={form.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e2db")}
            />
            {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              style={{
                ...inputStyle,
                borderColor: errors.email ? "#c0392b" : "#e8e2db",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.email
                  ? "#c0392b"
                  : "#e8e2db")
              }
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <PasswordInput
              placeholder="Min 8 characters"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <PasswordInput
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={(e) => setField("confirm", e.target.value)}
            />
            {errors.confirm && <p style={errorStyle}>{errors.confirm}</p>}
          </div>

          {/* Terms */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "12px",
              color: "#777",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setField("terms", e.target.checked)}
              style={{
                marginTop: "2px",
                accentColor: "#2c2c2c",
                flexShrink: 0,
                cursor: "pointer",
              }}
            />
            I agree to the{" "}
            <span
              style={{ color: "#2c2c2c", borderBottom: "1px solid #2c2c2c" }}
            >
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span
              style={{ color: "#2c2c2c", borderBottom: "1px solid #2c2c2c" }}
            >
              Privacy Policy
            </span>
          </div>
          {errors.terms && <p style={errorStyle}>{errors.terms}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "4px",
              padding: "13px",
              background: loading ? "#888" : "#2c2c2c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = "#111";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = "#2c2c2c";
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#888",
            marginTop: "24px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2c2c2c",
              fontWeight: 500,
              textDecoration: "none",
              borderBottom: "1px solid #2c2c2c",
              paddingBottom: "1px",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Back to home */}
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

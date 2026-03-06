import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function RegisterPage() {
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

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          {/* Full name */}
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e2db")}
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e2db")}
            />
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <PasswordInput placeholder="Min. 8 characters" />
          </div>

          {/* Confirm password */}
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <PasswordInput placeholder="Repeat your password" />
          </div>

          {/* Terms */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
              fontSize: "12px",
              color: "#777",
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              style={{
                marginTop: "2px",
                accentColor: "#2c2c2c",
                flexShrink: 0,
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
          </label>

          {/* Submit */}
          <button
            type="submit"
            style={{
              marginTop: "4px",
              padding: "13px",
              background: "#2c2c2c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#111")}
            onMouseLeave={(e) => (e.target.style.background = "#2c2c2c")}
          >
            Create Account
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

import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
          maxWidth: "420px",
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
          Welcome back
        </p>
        <h1
          className="heading"
          style={{ fontSize: "28px", color: "#2c2c2c", marginBottom: "28px" }}
        >
          Sign In
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#9a8c7e",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
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
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e2db")}
            />
          </div>

          {/* Password */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <label
                style={{
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#9a8c7e",
                }}
              >
                Password
              </label>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "11px",
                  color: "#c8a96e",
                  cursor: "pointer",
                  padding: 0,
                  letterSpacing: "0.5px",
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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
                onClick={() => setShowPassword((v) => !v)}
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
                {showPassword ? (
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
          </div>

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
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#ede8e1" }} />
          <span
            style={{ fontSize: "11px", color: "#b0a090", letterSpacing: "1px" }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: "1px", background: "#ede8e1" }} />
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#2c2c2c",
              fontWeight: 500,
              textDecoration: "none",
              borderBottom: "1px solid #2c2c2c",
              paddingBottom: "1px",
            }}
          >
            Create account
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

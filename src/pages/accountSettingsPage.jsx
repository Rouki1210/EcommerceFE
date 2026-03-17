import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { changePasswordApi, updateProfileApi } from "../api/authApi";
import { usePageTitle } from "../hooks/usePageTitle";

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

export default function AccountSettingsPage() {
  usePageTitle("Account Settings");
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const initialForm = useMemo(
    () => ({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      currentPassword: "",
      newPassword: "",
    }),
    [user],
  );

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (apiError) setApiError("");
    if (successMessage) setSuccessMessage("");
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Invalid email address";
    }

    const hasCurrentPassword = form.currentPassword.trim().length > 0;
    const hasNewPassword = form.newPassword.trim().length > 0;
    if (hasCurrentPassword || hasNewPassword) {
      if (!hasCurrentPassword) {
        nextErrors.currentPassword = "Current password is required";
      }
      if (!hasNewPassword) {
        nextErrors.newPassword = "New password is required";
      } else if (form.newPassword.length < 8) {
        nextErrors.newPassword = "New password must be at least 8 characters";
      }
      if (
        hasCurrentPassword &&
        hasNewPassword &&
        form.currentPassword === form.newPassword
      ) {
        nextErrors.newPassword =
          "New password must be different from current password";
      }
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");
    setSuccessMessage("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const shouldChangePassword =
      form.currentPassword.trim().length > 0 &&
      form.newPassword.trim().length > 0;

    const profilePayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    };

    setLoading(true);
    try {
      const profileResponse = await updateProfileApi(profilePayload);
      const profileData = profileResponse?.data ?? profileResponse ?? {};

      dispatch(
        updateProfile({
          firstName: profileData.firstName ?? profilePayload.firstName,
          lastName: profileData.lastName ?? profilePayload.lastName,
          email: profileData.email ?? profilePayload.email,
        }),
      );

      if (shouldChangePassword) {
        await changePasswordApi({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
      }

      setForm((prev) => ({
        ...prev,
        firstName: profileData.firstName ?? profilePayload.firstName,
        lastName: profileData.lastName ?? profilePayload.lastName,
        email: profileData.email ?? profilePayload.email,
        currentPassword: "",
        newPassword: "",
      }));

      setSuccessMessage(
        shouldChangePassword
          ? "Profile and password updated successfully."
          : "Profile updated successfully.",
      );
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Unable to update account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ minHeight: "80vh", background: "#f5f0eb", padding: "40px 24px" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/"
            style={{
              color: "#9a8c7e",
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            ← Back to store
          </Link>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 32,
            boxShadow: "0 4px 24px rgba(44,44,44,0.07)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#c8a96e",
              marginBottom: 8,
            }}
          >
            Account
          </p>
          <h1
            className="heading"
            style={{ fontSize: 28, color: "#2c2c2c", marginBottom: 8 }}
          >
            Account Settings
          </h1>
          <p style={{ color: "#9a8c7e", fontSize: 13, marginBottom: 24 }}>
            Manage your profile information and password.
          </p>

          {successMessage && (
            <div
              style={{
                background: "#eaf4ee",
                color: "#2f6f42",
                border: "1px solid #d4e9db",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {successMessage}
            </div>
          )}

          {apiError && (
            <div
              style={{
                background: "#fff0f0",
                color: "#c0392b",
                border: "1px solid #f4cccc",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: errors.firstName ? "#c0392b" : "#e8e2db",
                  }}
                  placeholder="Your first name"
                />
                {errors.firstName && (
                  <p style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: errors.lastName ? "#c0392b" : "#e8e2db",
                  }}
                  placeholder="Your last name"
                />
                {errors.lastName && (
                  <p style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: errors.email ? "#c0392b" : "#e8e2db",
                }}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label style={labelStyle}>Current Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={form.currentPassword}
                    onChange={(e) =>
                      setField("currentPassword", e.target.value)
                    }
                    style={{
                      ...inputStyle,
                      borderColor: errors.currentPassword
                        ? "#c0392b"
                        : "#e8e2db",
                      paddingRight: "40px",
                    }}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((value) => !value)}
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
                    {showCurrentPassword ? (
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
                {errors.currentPassword && (
                  <p style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={(e) => setField("newPassword", e.target.value)}
                    style={{
                      ...inputStyle,
                      borderColor: errors.newPassword ? "#c0392b" : "#e8e2db",
                      paddingRight: "40px",
                    }}
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((value) => !value)}
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
                    {showNewPassword ? (
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
                {errors.newPassword && (
                  <p style={{ color: "#c0392b", fontSize: 11, marginTop: 4 }}>
                    {errors.newPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                width: "fit-content",
                background: loading ? "#999" : "#2c2c2c",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: 10,
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

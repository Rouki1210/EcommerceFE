import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { changePasswordApi, updateProfileApi } from "../api/authApi";
import { usePageTitle } from "../hooks/usePageTitle";

export default function AccountSettingsPage() {
  usePageTitle("Account Settings");
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

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
  const [loading, setLoading] = useState(false);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileApi(form.firstName + " " + form.lastName);
      dispatch(
        updateProfile({ firstName: form.firstName, lastName: form.lastName }),
      );
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) {
      setErrors({ newPassword: "Password must be at least 8 characters" });
      return;
    }
    setLoading(true);
    try {
      await changePasswordApi(form.currentPassword, form.newPassword);
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      setSuccessMessage("Password changed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrors({
        password: err.response?.data?.message || "Password change failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-8 bg-white">
        <h1 className="text-4xl text-[#2c2c2c] mb-8 font-bold">
          Account Settings
        </h1>

        {successMessage && (
          <div className="bg-[#27ae60]/20 text-[#27ae60] px-4 py-3 rounded-lg mb-6 text-sm">
            {successMessage}
          </div>
        )}

        {/* Profile Information Card */}
        <div className="bg-[#f5f0eb] rounded-xl p-8 mb-6 shadow-[0_4px_16px_rgba(200,169,110,0.08)]">
          <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
            Profile Information
          </h2>
          <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="form-input-default"
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="form-input-default"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="form-input-default opacity-60 cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-sm mt-4 transition-all ${
                loading
                  ? "btn-primary-disabled"
                  : "bg-[#c8a96e] text-[#f5f0eb] hover:bg-[#8b7355] shadow-[0_4px_12px_rgba(200,169,110,0.2)]"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-[#f5f0eb] rounded-xl p-8 shadow-[0_4px_16px_rgba(200,169,110,0.08)]">
          <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
            Change Password
          </h2>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            <div>
              <label className="form-label">Current Password</label>
              <input
                type="password"
                value={form.currentPassword}
                onChange={(e) => setField("currentPassword", e.target.value)}
                className="form-input-default"
              />
            </div>
            <div>
              <label className="form-label">New Password</label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => setField("newPassword", e.target.value)}
                className={errors.newPassword ? "form-input-error" : "form-input-default"}
              />
              {errors.newPassword && (
                <p className="form-error-text">{errors.newPassword}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-sm mt-4 transition-all ${
                loading
                  ? "btn-primary-disabled"
                  : "bg-[#c8a96e] text-[#f5f0eb] hover:bg-[#8b7355] shadow-[0_4px_12px_rgba(200,169,110,0.2)]"
              }`}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

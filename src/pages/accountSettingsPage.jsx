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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  //Return condition after declaration
  if (!isAuthenticated) return <Navigate to="/login" />;

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Always update profile
      await updateProfileApi({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      });
      dispatch(
        updateProfile({ 
          firstName: form.firstName, 
          lastName: form.lastName,
          email: form.email
        }),
      );

      // Update password if provided
      if (form.newPassword) {
        if (form.newPassword.length < 8) {
          setErrors({ newPassword: "Password must be at least 8 characters" });
          setLoading(false);
          return;
        }
        await changePasswordApi({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.newPassword
        });
        setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      }

      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Failed to save changes",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-4xl text-[#2c2c2c] mb-8 font-bold text-center">
          Account Settings
        </h1>

        {successMessage && (
          <div className="bg-[#27ae60]/20 text-[#27ae60] px-4 py-3 rounded-lg mb-6 text-sm">
            {successMessage}
          </div>
        )}

        {errors.api && (
          <div className="bg-red-50/80 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {errors.api}
          </div>
        )}

        {/* Unified Settings Form */}
        <div className="bg-[#f5f0eb] rounded-xl p-8 shadow-[0_4px_16px_rgba(200,169,110,0.08)]">
          <form onSubmit={handleSaveChanges} className="flex flex-col gap-6">
            {/* Profile Information Section */}
            <div>
              <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
                Profile Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
            </div>

            {/* Divider */}
            <div className="border-t border-[#e5e5e5]"></div>

            {/* Change Password Section */}
            <div>
              <h2 className="text-lg text-[#2c2c2c] mb-6 font-semibold">
                Change Password
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="form-label">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={form.currentPassword}
                      onChange={(e) =>
                        setField("currentPassword", e.target.value)
                      }
                      className="form-input-default pr-10"
                      placeholder="Required if changing password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-base"
                    >
                      {showCurrentPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="form-label">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={form.newPassword}
                      onChange={(e) => setField("newPassword", e.target.value)}
                      className={
                        errors.newPassword
                          ? "form-input-error pr-10"
                          : "form-input-default pr-10"
                      }
                      placeholder="Leave blank to keep current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-base"
                    >
                      {showNewPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="form-error-text">{errors.newPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
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
      </div>
    </>
  );
}

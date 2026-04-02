import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { changePasswordApi, updateProfileApi } from "../api/authApi";
import { usePageTitle } from "../hooks/usePageTitle";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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
      await updateProfileApi({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });
      dispatch(
        updateProfile({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
        }),
      );

      if (form.newPassword) {
        if (!form.currentPassword) {
          setErrors({ currentPassword: "Current password is required" });
          setLoading(false);
          return;
        }
        if (form.newPassword.length < 8) {
          setErrors({ newPassword: "Password must be at least 8 characters" });
          setLoading(false);
          return;
        }
        await changePasswordApi({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.newPassword,
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
    <div className={tw.accountPage}>
      <h1 className={cx("heading", tw.accountTitle)}>Account Settings</h1>

      {successMessage && (
        <div className={tw.accountSuccess}>{successMessage}</div>
      )}

      {errors.api && <div className={tw.accountError}>{errors.api}</div>}

      <div className={tw.accountCard}>
        <form onSubmit={handleSaveChanges} className="flex flex-col gap-6">
          <div>
            <h2 className={tw.accountSectionTitle}>Profile Information</h2>
            <div className={cx(tw.accountGrid2, "mb-4")}>
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="form-input-default focus:border-[#c8a96e]"
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="form-input-default focus:border-[#c8a96e]"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="form-input-default cursor-not-allowed opacity-60"
              />
            </div>
          </div>

          <div className={tw.accountDivider} />

          <div>
            <h2 className={tw.accountSectionTitle}>Change Password</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="form-label">Current Password</label>
                <div className={tw.accountPasswordWrap}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={form.currentPassword}
                    onChange={(e) =>
                      setField("currentPassword", e.target.value)
                    }
                    className={cx(
                      errors.currentPassword
                        ? "form-input-error"
                        : "form-input-default",
                      "pr-10 focus:border-[#c8a96e]",
                    )}
                    placeholder="Required if changing password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={tw.accountPasswordToggle}
                  >
                    {showCurrentPassword ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="form-error-text">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="form-label">New Password</label>
                <div className={tw.accountPasswordWrap}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={(e) => setField("newPassword", e.target.value)}
                    className={cx(
                      errors.newPassword
                        ? "form-input-error"
                        : "form-input-default",
                      "pr-10 focus:border-[#c8a96e]",
                    )}
                    placeholder="Leave blank to keep current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={tw.accountPasswordToggle}
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

          <button
            type="submit"
            disabled={loading}
            className={cx(
              tw.accountSaveBtn,
              loading ? tw.accountSaveBtnLoading : tw.accountSaveBtnReady,
            )}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

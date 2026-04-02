import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { changePasswordApi, updateProfileApi } from "../api/authApi";
import { usePageTitle } from "../hooks/usePageTitle";
import { Box, Button, Card, Divider, Input, tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");
const PROFILE_KEYS = ["firstName", "lastName"];
const PROFILE_ROWS = [
  [
    { key: "firstName", label: "First Name", type: "text" },
    { key: "lastName", label: "Last Name", type: "text" },
  ],
];

const buildProfilePayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
});

function PasswordField({
  label,
  value,
  onChange,
  error,
  placeholder,
  isVisible,
  onToggle,
}) {
  return (
    <Input
      label={label}
      type={isVisible ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
      className={cx("pr-16", tw.accountInputField)}
      inputWrapperClassName={tw.accountPasswordWrap}
      endAdornment={
        <button
          type="button"
          onClick={onToggle}
          className={tw.accountPasswordToggle}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      }
    />
  );
}

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
      confirmPassword: "",
    }),
    [user],
  );

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialProfile = useMemo(
    () => buildProfilePayload(initialForm),
    [initialForm],
  );
  const currentProfile = useMemo(() => buildProfilePayload(form), [form]);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setErrors({});

    const hasProfileChanges = PROFILE_KEYS.some(
      (key) => currentProfile[key] !== initialProfile[key],
    );
    const wantsPasswordChange = Boolean(
      form.currentPassword || form.newPassword || form.confirmPassword,
    );

    if (!hasProfileChanges && !wantsPasswordChange) {
      setSuccessMessage("No changes to save");
      return;
    }

    if (wantsPasswordChange) {
      if (!form.currentPassword) {
        setErrors({ currentPassword: "Current password is required" });
        return;
      }
      if (!form.newPassword) {
        setErrors({ newPassword: "New password is required" });
        return;
      }
      if (form.newPassword.length < 8) {
        setErrors({ newPassword: "Password must be at least 8 characters" });
        return;
      }
      if (!form.confirmPassword) {
        setErrors({ confirmPassword: "Confirm password is required" });
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }
    }

    if (hasProfileChanges) {
      if (!currentProfile.firstName) {
        setErrors({ firstName: "First name is required" });
        return;
      }
      if (!currentProfile.lastName) {
        setErrors({ lastName: "Last name is required" });
        return;
      }
    }

    setSuccessMessage("");
    setLoading(true);

    try {
      if (hasProfileChanges) {
        await updateProfileApi(currentProfile);
        dispatch(updateProfile(currentProfile));
      }

      if (wantsPasswordChange) {
        await changePasswordApi({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        });
        setForm((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
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
    <Box className={tw.accountPage}>
      <h1 className={cx("heading", tw.accountTitle)}>Account Settings</h1>

      {successMessage && (
        <div className={tw.accountSuccess}>{successMessage}</div>
      )}

      {errors.api && <div className={tw.accountError}>{errors.api}</div>}

      <Card className={tw.accountCard}>
        <form onSubmit={handleSaveChanges} className={tw.accountFormContent}>
          <Box>
            <h2 className={tw.accountSectionTitle}>Profile Information</h2>
            {PROFILE_ROWS.map((row, index) => (
              <Box
                key={`profile-row-${index}`}
                className={cx(tw.accountGrid2, tw.accountFormRow)}
              >
                {row.map((field) => (
                  <Input
                    key={field.key}
                    label={field.label}
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={tw.accountInputField}
                    error={errors[field.key]}
                  />
                ))}
              </Box>
            ))}

            <Input
              label="Email Address"
              type="email"
              value={form.email}
              placeholder="your@email.com"
              className={tw.accountInputField}
              error={errors.email}
              disabled
            />
          </Box>

          <Divider className={tw.accountDivider} />

          <Box>
            <h2 className={tw.accountSectionTitle}>Change Password</h2>
            <Box className={tw.accountPasswordFields}>
              <PasswordField
                label="Current Password"
                value={form.currentPassword}
                onChange={(e) => setField("currentPassword", e.target.value)}
                error={errors.currentPassword}
                placeholder="Required if changing password"
                isVisible={showCurrentPassword}
                onToggle={() => setShowCurrentPassword((prev) => !prev)}
              />

              <PasswordField
                label="New Password"
                value={form.newPassword}
                onChange={(e) => setField("newPassword", e.target.value)}
                error={errors.newPassword}
                placeholder="Leave blank to keep current password"
                isVisible={showNewPassword}
                onToggle={() => setShowNewPassword((prev) => !prev)}
              />

              <PasswordField
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                placeholder="Re-enter new password"
                isVisible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((prev) => !prev)}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            disabled={loading}
            className={cx(
              tw.accountSaveBtn,
              loading ? tw.accountSaveBtnLoading : tw.accountSaveBtnReady,
            )}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </Box>
  );
}

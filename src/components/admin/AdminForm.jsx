import { memo } from "react";
import "../../assets/styles/admin.css";

const AdminForm = memo(function AdminForm({
  fields,
  onSubmit,
  submitText = "Save",
  loading = false,
  className = "",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`admin-form ${className}`}>
      {fields.map((field, idx) => (
        <div key={idx} className="admin-form-group">
          {/* Label */}
          <label className="admin-form-label">
            {field.label}
            {field.required && <span className="admin-form-required">*</span>}
          </label>

          {/* Input Types */}
          {field.type === "textarea" ? (
            <textarea
              value={field.value}
              onChange={(e) => field.onChange?.(e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={`admin-form-input ${field.error ? "admin-form-input-error" : ""}`}
            />
          ) : field.type === "select" ? (
            <select
              value={field.value}
              onChange={(e) => field.onChange?.(e.target.value)}
              className={`admin-form-input ${field.error ? "admin-form-input-error" : ""}`}
            >
              <option value="">{field.placeholder || "Select..."}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              value={field.value}
              onChange={(e) => field.onChange?.(e.target.value)}
              placeholder={field.placeholder}
              className={`admin-form-input ${field.error ? "admin-form-input-error" : ""}`}
            />
          )}

          {/* Error */}
          {field.error && <div className="admin-form-error">{field.error}</div>}
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`admin-form-button ${loading ? "admin-form-button-disabled" : ""}`}
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
});

export default AdminForm;

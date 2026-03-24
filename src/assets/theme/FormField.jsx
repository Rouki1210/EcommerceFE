/**
 * FormField Component
 * Reusable form field wrapper with label and error handling
 * @param {Object} props
 * @param {string} props.label - Field label text
 * @param {string} props.id - Input id attribute
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Mark field as required
 * @param {ReactNode} props.children - Input element(s)
 */
export default function FormField({
  label,
  id,
  error,
  required = false,
  children,
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-[#c0392b]"> *</span>}
      </label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

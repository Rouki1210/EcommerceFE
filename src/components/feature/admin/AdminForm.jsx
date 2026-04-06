const joinClassName = (...parts) => parts.filter(Boolean).join(" ");

export default function AdminForm({
  title,
  subtitle,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  className,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={joinClassName(
        "rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {subtitle ? (
            <div className="mb-1 text-[10px] uppercase tracking-[1.6px] text-slate-400">
              {subtitle}
            </div>
          ) : null}
          {title ? (
            <h3 className="m-0 text-sm font-bold text-slate-900">{title}</h3>
          ) : null}
        </div>
      )}

      <div className="space-y-4">{children}</div>

      {(onCancel || onSubmit) && (
        <div className="mt-5 flex items-center justify-end gap-2 border-t border-black/[0.05] pt-4">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-black/[0.1] bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              {cancelLabel}
            </button>
          ) : null}
          {onSubmit ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl border border-transparent bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          ) : null}
        </div>
      )}
    </form>
  );
}

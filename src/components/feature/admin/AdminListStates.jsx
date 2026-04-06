import AdminCard from "./AdminCard";

export function AdminLoadingState({ message = "Loading data..." }) {
  return (
    <AdminCard className="p-12 text-center">
      <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
      <div className="text-[13px] text-slate-400">{message}</div>
    </AdminCard>
  );
}

export function AdminErrorState({ message, onRetry, retryLabel = "Retry" }) {
  return (
    <AdminCard className="border-red-200 bg-red-50 p-8 text-center">
      <div className="text-[13px] font-semibold text-red-500">
        Error: {message}
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border-none bg-red-500 px-4 py-2 text-xs text-white transition-colors hover:bg-red-600"
        >
          {retryLabel}
        </button>
      ) : null}
    </AdminCard>
  );
}

export function AdminEmptyState({
  title = "No data found",
  description,
  icon,
  actionLabel,
  onAction,
}) {
  return (
    <AdminCard className="p-12 text-center">
      {icon ? <div className="mb-3 text-4xl">{icon}</div> : null}
      <div className="mb-1.5 text-sm font-bold text-slate-900">{title}</div>
      {description ? (
        <div className="text-[13px] text-slate-400">{description}</div>
      ) : null}
      {onAction && actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-[11px] font-bold text-yellow-700 transition-colors hover:bg-yellow-500/20"
        >
          {actionLabel}
        </button>
      ) : null}
    </AdminCard>
  );
}

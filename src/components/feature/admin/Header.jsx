import NotificationBell from "./NotificationBell";

function getTodayLabel() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Header({
  title,
  subtitle,
  actions,
  hideNotifications = false,
}) {
  const today = getTodayLabel();

  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="mb-1.5 text-[11px] uppercase tracking-[3px] text-slate-400">
          {subtitle}
        </div>
        <h1 className="m-0 text-[28px] font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
          <span aria-hidden>📅</span>
          {today}
        </div>
        {!hideNotifications && <NotificationBell />}
        {actions}
      </div>
    </div>
  );
}

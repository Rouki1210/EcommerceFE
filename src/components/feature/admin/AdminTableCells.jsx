import {
  ADMIN_SOFT_TONE_CLASS_MAP,
  DEFAULT_ADMIN_SOFT_TONE,
} from "./adminStyleConstants";

const toneClass = (tone) =>
  ADMIN_SOFT_TONE_CLASS_MAP[tone] ||
  ADMIN_SOFT_TONE_CLASS_MAP[DEFAULT_ADMIN_SOFT_TONE];

export function AdminPill({ children, tone = "slate", className = "" }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneClass(tone)} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export function AdminActionButton({
  children,
  tone = "slate",
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-colors hover:brightness-95 ${toneClass(tone)} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export function AdminStatusToggle({
  active,
  onToggle,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all ${
        active
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-400" : "bg-slate-400"
        }`}
      />
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}

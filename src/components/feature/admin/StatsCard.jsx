export default function StatsCard({
  title,
  value,
  change,
  up = true,
  icon,
  sub,
  delay = 0,
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm"
      style={{ animation: `fadeSlideUp 0.5s ease ${delay}s both` }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent)",
        }}
      />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-[1.8px] text-slate-400">
            {title}
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{value}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10 text-base">
          {icon || "•"}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`rounded-md px-2 py-1 text-[11px] font-bold ${
            up
              ? "bg-emerald-400/10 text-emerald-500"
              : "bg-red-400/10 text-red-400"
          }`}
        >
          {change}
        </span>
        <span className="text-[11px] text-slate-400">{sub}</span>
      </div>
    </div>
  );
}

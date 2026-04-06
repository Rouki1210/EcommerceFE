const joinClassName = (...parts) => parts.filter(Boolean).join(" ");

export default function AdminCard({
  title,
  subtitle,
  icon,
  actions,
  footer,
  children,
  className,
  onClick,
}) {
  const isClickable = typeof onClick === "function";

  return (
    <section
      onClick={onClick}
      className={joinClassName(
        "rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm",
        isClickable &&
          "cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      {(title || subtitle || actions || icon) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2.5">
            {icon ? (
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-yellow-500/20 bg-yellow-500/10 text-sm">
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              {subtitle ? (
                <div className="mb-1 text-[10px] uppercase tracking-[1.6px] text-slate-400">
                  {subtitle}
                </div>
              ) : null}
              {title ? (
                <h3 className="m-0 truncate text-sm font-bold text-slate-900">
                  {title}
                </h3>
              ) : null}
            </div>
          </div>
          {actions ? (
            <div className="flex items-center gap-2">{actions}</div>
          ) : null}
        </header>
      )}

      {children}

      {footer ? (
        <footer className="mt-4 border-t border-black/[0.05] pt-3">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}

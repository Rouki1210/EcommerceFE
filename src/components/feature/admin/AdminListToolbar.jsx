const searchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2.5"
    aria-hidden
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  showClear = false,
  onClear,
  containerClassName = "flex-1 max-w-[340px] bg-white border border-black/[0.08] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm",
  inputClassName = "border-none outline-none bg-transparent text-slate-900 text-xs w-full",
  icon = searchIcon,
  clearButtonClassName = "bg-transparent border-none cursor-pointer text-slate-300 text-sm p-0 hover:text-slate-500",
}) {
  return (
    <div className={containerClassName}>
      {icon}
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={inputClassName}
      />
      {showClear ? (
        <button
          type="button"
          onClick={onClear}
          className={clearButtonClassName}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}

export function AdminFilterChips({
  options = [],
  activeValue,
  onChange,
  renderOptionLabel,
  className = "flex gap-2",
  chipClassName = "px-3.5 py-2 rounded-lg text-[11px] font-semibold cursor-pointer transition-all border",
  activeClassName = "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/30",
  inactiveClassName = "bg-white text-slate-500 border-black/[0.08]",
  getActiveClassName,
  getInactiveClassName,
}) {
  return (
    <div className={className}>
      {options.map((option) => {
        const isActive = option === activeValue;
        const resolvedActiveClass =
          typeof getActiveClassName === "function"
            ? getActiveClassName(option)
            : activeClassName;
        const resolvedInactiveClass =
          typeof getInactiveClassName === "function"
            ? getInactiveClassName(option)
            : inactiveClassName;

        return (
          <button
            key={String(option)}
            type="button"
            onClick={() => onChange?.(option)}
            className={`${chipClassName} ${isActive ? resolvedActiveClass : resolvedInactiveClass}`}
          >
            {typeof renderOptionLabel === "function"
              ? renderOptionLabel(option)
              : option}
          </button>
        );
      })}
    </div>
  );
}

export function AdminListCounter({
  filteredCount,
  totalCount,
  noun,
  className = "ml-auto text-slate-400 text-[11px]",
}) {
  return (
    <div className={className}>
      {filteredCount} / {totalCount} {noun}
    </div>
  );
}

const getAlignClass = (align) => {
  if (align === "right") {
    return "text-right";
  }
  if (align === "center") {
    return "text-center";
  }
  return "text-left";
};

export default function AdminTableComponent({
  columns = [],
  rows = [],
  rowKey = "id",
  emptyMessage = "No data available",
  className,
  getRowProps,
}) {
  const gridTemplateColumns = columns
    .map((column) => column.width || "1fr")
    .join(" ");

  const resolveRowKey = (row, index) => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }
    return row?.[rowKey] ?? index;
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm ${className || ""}`.trim()}
    >
      {columns.length > 0 && (
        <div
          className="grid gap-2 border-b border-black/[0.05] bg-slate-50 px-5 py-3"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={`text-[10px] font-semibold uppercase tracking-[1.4px] text-slate-600 ${getAlignClass(column.align)}`}
            >
              {column.label}
            </div>
          ))}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-5 py-10 text-center text-xs text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        rows.map((row, index) => {
          const rowProps =
            typeof getRowProps === "function" ? getRowProps(row, index) : {};
          const rowClassName = rowProps?.className ?? "";
          const rowStyle = rowProps?.style;

          return (
            <div
              key={resolveRowKey(row, index)}
              className={`grid items-center gap-2 border-b border-black/[0.04] px-5 py-3.5 text-xs last:border-b-0 ${rowClassName}`.trim()}
              style={{ gridTemplateColumns, ...(rowStyle || {}) }}
            >
              {columns.map((column) => (
                <div
                  key={`${resolveRowKey(row, index)}-${column.key}`}
                  className={getAlignClass(column.align)}
                >
                  {typeof column.render === "function"
                    ? column.render(row, index)
                    : row?.[column.key]}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}

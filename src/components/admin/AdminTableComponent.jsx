import { memo } from "react";
import "../../assets/styles/admin.css";

const AdminTable = memo(function AdminTable({
  columns,
  data,
  renderRow,
  onRowClick,
  emptyMessage = "No data found",
  loading = false,
}) {
  if (loading) {
    return <div className="admin-table-loading">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="admin-table-empty">{emptyMessage}</div>;
  }

  const gridColumns = columns.map((c) => c.width || "1fr").join(" ");

  return (
    <div className="admin-table">
      {/* Header */}
      <div
        className="admin-table-header"
        style={{ gridTemplateColumns: gridColumns }}
      >
        {columns.map((col) => (
          <div key={col.key || col.label} className="admin-table-header-cell">
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map((row, rowIdx) => (
        <div
          key={row.id || rowIdx}
          onClick={() => onRowClick?.(row)}
          className="admin-table-row"
          style={{ gridTemplateColumns: gridColumns }}
        >
          {renderRow ? (
            renderRow(row, rowIdx, columns)
          ) : (
            <>
              {columns.map((col) => (
                <div
                  key={`${col.key}-${row.id || rowIdx}`}
                  className="admin-table-cell"
                >
                  {row[col.key]}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
});

export default AdminTable;

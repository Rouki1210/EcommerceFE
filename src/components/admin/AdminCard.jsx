import { memo } from "react";

const AdminCard = memo(function AdminCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className = "",
  children,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`admin-card ${onClick ? "admin-card-clickable" : ""} ${className}`}
    >
      {children ? (
        children
      ) : (
        <>
          {icon && <div className="admin-card-icon">{icon}</div>}
          <div className="admin-card-title">{title}</div>
          <div className="admin-card-value">{value}</div>
          {change && (
            <div
              className={`admin-card-change ${isPositive ? "positive" : "negative"}`}
            >
              {isPositive ? "↑" : "↓"} {change}
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default AdminCard;

import React from "react";
import { tw } from "../theme";

/**
 * EmptyState component: Hiển thị trạng thái rỗng với icon, message, action.
 * Props: icon, message, action, className
 */
const EmptyState = ({ icon, message, action, className = "", ...props }) => (
  <div className={`${tw.emptyState} ${className}`} {...props}>
    {icon && <div className="mb-3">{icon}</div>}
    {message && <div className={tw.subtitle}>{message}</div>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;

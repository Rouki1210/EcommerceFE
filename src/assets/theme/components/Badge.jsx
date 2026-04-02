import React from "react";
import { tw } from "../theme";

/**
 * Badge component: Hiển thị badge trạng thái (success, error, neutral).
 * Props: children, type (success|error|neutral), className
 */
const Badge = ({ children, type = "neutral", className = "", ...props }) => {
  const typeClass =
    type === "success"
      ? tw.badgeSuccess
      : type === "error"
        ? tw.badgeError
        : tw.badgeNeutral;
  return (
    <span className={`${tw.badge} ${typeClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;

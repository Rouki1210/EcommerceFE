export const ADMIN_SOFT_TONE_CLASS_MAP = {
  blue: "border-blue-400/20 bg-blue-400/10 text-blue-600",
  red: "border-red-400/20 bg-red-400/10 text-red-500",
  emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-500",
  yellow: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700",
  slate: "border-slate-300 bg-slate-100 text-slate-600",
};

export const DEFAULT_ADMIN_SOFT_TONE = "slate";

export const ORDER_STATUS_OPTIONS = [
  "Pending",
  "Processing",
  "Delivered",
  "Cancelled",
];

export const ORDER_STATUS_FILTER_OPTIONS = ["All", ...ORDER_STATUS_OPTIONS];

export const ORDER_STATUS_SELECT_CLASS_MAP = {
  Pending: "bg-yellow-400/10 text-yellow-600",
  Processing: "bg-blue-400/10 text-blue-500",
  Delivered: "bg-emerald-400/10 text-emerald-500",
  Cancelled: "bg-red-400/10 text-red-500",
};

export const ORDER_STATUS_DOT_CLASS_MAP = {
  Delivered: "bg-emerald-400",
  Pending: "bg-yellow-400",
  Processing: "bg-blue-400",
  Cancelled: "bg-red-400",
};

export const ORDER_STATUS_ACTIVE_FILTER_CLASS_MAP = {
  Delivered: "bg-emerald-400/10 text-emerald-500 border-emerald-400",
  Pending: "bg-yellow-400/12 text-yellow-500 border-yellow-400",
  Processing: "bg-blue-400/12 text-blue-500 border-blue-400",
  Cancelled: "bg-red-400/10 text-red-400 border-red-400",
};

export const USER_ROLE_BADGE_CLASS_MAP = {
  Admin: "bg-yellow-500/15 text-yellow-500",
  Customer: "bg-blue-400/12 text-blue-400",
};

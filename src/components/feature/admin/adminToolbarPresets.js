import { createElement } from "react";
import {
  ORDER_STATUS_ACTIVE_FILTER_CLASS_MAP,
  ORDER_STATUS_DOT_CLASS_MAP,
} from "./adminStyleConstants";

const ADMIN_SEARCH_CLEAR_BUTTON_CLASS =
  "bg-transparent border-none cursor-pointer text-slate-300 text-sm p-0";
const ORDER_STATUS_ALL_ACTIVE_CHIP_CLASS =
  "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/30";

export const ADMIN_ACCENT_GRADIENT_STYLE = {
  background: "linear-gradient(135deg, #eab308, #f59e0b)",
};

export const ADMIN_PRIMARY_SHADOW_BUTTON_CLASS =
  "border-transparent text-black shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50";

export const ADMIN_SEARCH_INPUT_PRESETS = {
  orders: {
    placeholder: "Search by order ID, customer, product...",
    clearButtonClassName: ADMIN_SEARCH_CLEAR_BUTTON_CLASS,
  },
  products: {
    placeholder: "Search by name or category...",
  },
  users: {
    placeholder: "Search users...",
    containerClassName:
      "w-auto bg-white border border-black/[0.08] rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm",
    inputClassName:
      "bg-transparent border-none outline-none text-slate-800 text-xs w-44",
    clearButtonClassName: ADMIN_SEARCH_CLEAR_BUTTON_CLASS,
  },
};

export const ADMIN_FILTER_CHIP_PRESETS = {
  productsCategory: {
    inactiveClassName:
      "bg-white text-slate-500 border-black/[0.08] hover:border-yellow-400/40",
  },
};

export const ADMIN_PRIMARY_ACTION_BUTTON_PRESETS = {
  addProduct: {
    label: "+ Add Product",
    className: `border-none text-black text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-shadow ${ADMIN_PRIMARY_SHADOW_BUTTON_CLASS}`,
    style: ADMIN_ACCENT_GRADIENT_STYLE,
  },
};

export const getOrderStatusFilterChipActiveClassName = (status) =>
  status === "All"
    ? ORDER_STATUS_ALL_ACTIVE_CHIP_CLASS
    : ORDER_STATUS_ACTIVE_FILTER_CLASS_MAP[status];

export const renderOrderStatusFilterChipLabel = (status) => {
  if (status === "All") {
    return "All";
  }

  const dotClassName = ORDER_STATUS_DOT_CLASS_MAP[status] || "bg-slate-400";

  return createElement(
    "span",
    { className: "flex items-center gap-1.5" },
    createElement("span", {
      className: `w-1.5 h-1.5 rounded-full ${dotClassName}`,
    }),
    status,
  );
};

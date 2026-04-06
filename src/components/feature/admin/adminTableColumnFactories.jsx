import {
  AdminActionButton,
  AdminPill,
  AdminStatusToggle,
} from "./AdminTableCells";
import {
  ORDER_STATUS_OPTIONS,
  ORDER_STATUS_SELECT_CLASS_MAP,
  USER_ROLE_BADGE_CLASS_MAP,
} from "./adminStyleConstants";
import { formatAdminCurrency } from "./adminTableCellUtils";

export const createOrderColumns = ({ onStatusChange }) => [
  {
    key: "id",
    label: "Order ID",
    width: "1fr",
    render: (order) => (
      <span className="font-semibold text-slate-700">#{order.id}</span>
    ),
  },
  {
    key: "customer",
    label: "Customer",
    width: "1.4fr",
    render: (order) => (
      <span className="text-slate-600">{order.customer || "Unknown"}</span>
    ),
  },
  {
    key: "product",
    label: "Product",
    width: "1.6fr",
    render: (order) => (
      <span className="text-slate-600">{order.product || "-"}</span>
    ),
  },
  {
    key: "total",
    label: "Total",
    width: "0.9fr",
    render: (order) => (
      <span className="font-bold text-slate-900">
        {formatAdminCurrency(order.total)}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "1fr",
    render: (order) => (
      <select
        value={order.status || "Pending"}
        onChange={(event) => onStatusChange?.(order.id, event.target.value)}
        className={`w-full rounded-lg border border-transparent px-2.5 py-1.5 text-[11px] font-semibold outline-none transition-colors ${ORDER_STATUS_SELECT_CLASS_MAP[order.status] || "bg-slate-100 text-slate-600"}`}
      >
        {ORDER_STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    ),
  },
  {
    key: "updatedAt",
    label: "Updated",
    width: "1fr",
    render: (order) => (
      <span className="text-[11px] text-slate-400">
        {order.updatedAt || order.date || "-"}
      </span>
    ),
  },
];

export const createProductColumns = ({ onEdit, onDelete }) => [
  {
    key: "name",
    label: "Product",
    width: "2fr",
    render: (product) => (
      <div className="flex items-center gap-3">
        <img
          src={product.image || "https://via.placeholder.com/64x64?text=IMG"}
          alt={product.name || "Product image"}
          className="h-11 w-11 rounded-lg border border-black/[0.08] object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-slate-800">
            {product.name || "Untitled"}
          </div>
          <div className="truncate text-[11px] text-slate-400">
            ID: {product.id || "-"}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "price",
    label: "Price",
    width: "0.9fr",
    render: (product) => (
      <span className="text-xs font-bold text-slate-900">
        {formatAdminCurrency(product.price)}
      </span>
    ),
  },
  {
    key: "stock",
    label: "Stock",
    width: "0.9fr",
    render: (product) => (
      <span
        className={`text-xs font-semibold ${
          Number(product.stock) > 0 ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {Number(product.stock) > 0 ? product.stock : "Out"}
      </span>
    ),
  },
  {
    key: "category",
    label: "Category",
    width: "1fr",
    render: (product) => (
      <span className="text-xs text-slate-600">{product.category || "-"}</span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    width: "0.9fr",
    render: (product) => (
      <div className="flex items-center gap-2">
        <AdminActionButton tone="blue" onClick={() => onEdit?.(product)}>
          Edit
        </AdminActionButton>
        <AdminActionButton tone="red" onClick={() => onDelete?.(product.id)}>
          Delete
        </AdminActionButton>
      </div>
    ),
  },
];

export const createUserColumns = ({
  onToggleStatus,
  onDelete,
  roleStyle = USER_ROLE_BADGE_CLASS_MAP,
}) => [
  {
    key: "user",
    label: "User",
    width: "2fr",
    render: (user) => (
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-yellow-500/20 text-xs font-bold text-yellow-400"
          style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}
        >
          {user.name?.charAt(0) || "?"}
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-800">
            {user.name}
          </div>
          <div className="text-[10px] text-slate-500">
            Joined {user.joined || user.createdAt || "—"}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    width: "2fr",
    render: (user) => (
      <span className="text-xs text-slate-500">{user.email}</span>
    ),
  },
  {
    key: "role",
    label: "Role",
    width: "1fr",
    render: (user) => (
      <AdminPill
        className={
          roleStyle[user.role]
            ? `border-transparent ${roleStyle[user.role]}`
            : "border-transparent bg-slate-100 text-slate-500"
        }
      >
        {user.role || "Customer"}
      </AdminPill>
    ),
  },
  {
    key: "orders",
    label: "Orders",
    width: "1fr",
    render: (user) => (
      <span className="text-xs font-semibold text-slate-800">
        {user.orders ?? 0}
      </span>
    ),
  },
  {
    key: "spent",
    label: "Spent",
    width: "1fr",
    render: (user) => (
      <span className="text-xs font-bold text-yellow-500">
        {formatAdminCurrency(user.spent)}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "1fr",
    render: (user) => (
      <div title="Click to toggle">
        <AdminStatusToggle
          active={user.active}
          onToggle={() => onToggleStatus(user)}
        />
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    width: "80px",
    render: (user) => (
      <AdminActionButton
        tone="red"
        className="font-semibold text-red-400"
        onClick={() => onDelete(user.id)}
      >
        Del
      </AdminActionButton>
    ),
  },
];

import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/admin/products", label: "Products", icon: "🛍" },
  { to: "/admin/orders", label: "Orders", icon: "📦" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/analytics", label: "Analytics", icon: "📈" },
  { to: "/admin/settings", label: "Settings", icon: "⚙️" },
];

const linkClassName = ({ isActive }) =>
  [
    "group flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all",
    isActive
      ? "border-yellow-400/30 bg-yellow-500/10 text-yellow-700"
      : "border-transparent text-slate-500 hover:border-black/[0.08] hover:bg-white",
  ].join(" ");

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="w-full rounded-3xl border border-black/[0.08] bg-slate-50 p-4 lg:sticky lg:top-4 lg:w-64 lg:self-start">
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-900 px-3.5 py-3 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg text-black">
          A
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[2px] text-yellow-200">
            Ecommerce
          </div>
          <div className="text-sm font-bold">Admin Panel</div>
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClassName}>
            <span className="text-sm" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-500/15"
      >
        <span aria-hidden>↩</span>
        Logout
      </button>
    </aside>
  );
}

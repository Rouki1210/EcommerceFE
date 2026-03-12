import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiClipboard,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: <FiGrid size={15} />, path: "/admin/dashboard" },
  { label: "Products", icon: <FiPackage size={15} />, path: "/admin/products" },
  {
    label: "Orders",
    icon: <FiClipboard size={15} />,
    path: "/admin/orders",
    badge: 5,
  },
  { label: "Users", icon: <FiUsers size={15} />, path: "/admin/users" },
  {
    label: "Analytics",
    icon: <FiBarChart2 size={15} />,
    path: "/admin/analytics",
  },
  {
    label: "Settings",
    icon: <FiSettings size={15} />,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeNav =
    navItems.find((i) => location.pathname.startsWith(i.path))?.label ||
    "Dashboard";
  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#2c2c2c",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
        backdropFilter: "blur(20px)",
        animation: "fadeSlideUp 0.5s ease forwards",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "32px 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #c8a96e, #b8965e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 900,
              color: "#fff",
              boxShadow: "0 0 20px rgba(200,169,110,0.35)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            A
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Maison Admin
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: 10,
                letterSpacing: 2,
              }}
            >
              CONTROL PANEL
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "20px 12px", flex: 1 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.28)",
            fontSize: 9,
            letterSpacing: 3,
            paddingLeft: 12,
            marginBottom: 12,
          }}
        >
          MENU
        </div>
        {navItems.map((item) => (
          <div
            key={item.label}
            className="nav-item"
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: 10,
              marginBottom: 4,
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeNav === item.label
                  ? "rgba(200,169,110,0.15)"
                  : "transparent",
              border:
                activeNav === item.label
                  ? "1px solid rgba(200,169,110,0.3)"
                  : "1px solid transparent",
              position: "relative",
            }}
          >
            {activeNav === item.label && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 20,
                  background: "linear-gradient(180deg, #c8a96e, #b8965e)",
                  borderRadius: "0 3px 3px 0",
                }}
              />
            )}
            <span
              style={{
                fontSize: 14,
                color:
                  activeNav === item.label
                    ? "#c8a96e"
                    : "rgba(255,255,255,0.42)",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: activeNav === item.label ? 600 : 400,
                color:
                  activeNav === item.label
                    ? "#c8a96e"
                    : "rgba(255,255,255,0.58)",
                letterSpacing: 0.3,
              }}
            >
              {item.label}
            </span>
            {item.badge && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "rgba(200,169,110,0.2)",
                  color: "#c8a96e",
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: 20,
                  letterSpacing: 0.5,
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile + Logout */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(200,169,110,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c8a96e",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            AD
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
              Admin User
            </div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>
              admin@shop.com
            </div>
          </div>
          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              navigate("/admin/login");
            }}
            title="Logout"
            style={{
              marginLeft: "auto",
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.2)",
              borderRadius: 8,
              width: 30,
              height: 30,
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f87171",
              transition: "all 0.2s",
            }}
          >
            ⏻
          </button>
        </div>
      </div>
    </aside>
  );
}

import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    { label: "Dashboard", icon: "⬡", path: "/admin/dashboard" },
    { label: "Products",  icon: "◈", path: "/admin/products" },
    { label: "Orders",    icon: "◎", path: "/admin/orders", badge: 5 },
    { label: "Users",     icon: "◉", path: "/admin/users" },
    { label: "Analytics", icon: "◇", path: "/admin/analytics" },
    { label: "Settings",  icon: "⚙", path: "/admin/settings" },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const activeNav = navItems.find(i => location.pathname.startsWith(i.path))?.label || "Dashboard";
    return (
        <aside style={{
            width: 240, minHeight: "100vh",
            background: "#1a1a2e",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            display: "flex", flexDirection: "column",
            position: "relative", zIndex: 10,
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.5s ease forwards",
        }}>
            {/* Logo */}
            <div style={{ padding: "32px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, fontWeight: 900, color: "#000",
                        boxShadow: "0 0 20px rgba(234,179,8,0.4)",
                        animation: "float 3s ease-in-out infinite",
                    }}>A</div>
                    <div>
                        <div style={{ fontFamily: "Syne, sans-serif", color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 1 }}>
                            ADMINEX
                        </div>
                        <div style={{ color: "#475569", fontSize: 10, letterSpacing: 2 }}>CONTROL PANEL</div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ padding: "20px 12px", flex: 1 }}>
                <div style={{ color: "#334155", fontSize: 9, letterSpacing: 3, paddingLeft: 12, marginBottom: 12 }}>MENU</div>
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className="nav-item"
                        onClick={() => navigate(item.path)}
                        style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "11px 14px", borderRadius: 10, marginBottom: 4,
                            cursor: "pointer", transition: "all 0.2s ease",
                            background: activeNav === item.label ? "rgba(234,179,8,0.1)" : "transparent",
                            border: activeNav === item.label ? "1px solid rgba(234,179,8,0.2)" : "1px solid transparent",
                            position: "relative",
                        }}
                    >
                        {activeNav === item.label && (
                            <div style={{
                                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                                width: 3, height: 20, background: "linear-gradient(180deg, #eab308, #f59e0b)",
                                borderRadius: "0 3px 3px 0",
                            }} />
                        )}
                        <span style={{ fontSize: 14, color: activeNav === item.label ? "#eab308" : "#475569" }}>
              {item.icon}
            </span>
                        <span style={{
                            fontSize: 13, fontWeight: activeNav === item.label ? 600 : 400,
                            color: activeNav === item.label ? "#eab308" : "#64748b",
                            letterSpacing: 0.3,
                        }}>
              {item.label}
            </span>
                        {item.badge && (
                            <span style={{
                                marginLeft: "auto", background: "rgba(234,179,8,0.2)", color: "#eab308",
                                fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, letterSpacing: 0.5,
                            }}>{item.badge}</span>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "linear-gradient(135deg, #1e293b, #334155)",
                        border: "1px solid rgba(234,179,8,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#eab308", fontSize: 13, fontWeight: 700,
                    }}>AD</div>
                    <div>
                        <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>Admin User</div>
                        <div style={{ color: "#475569", fontSize: 10 }}>admin@shop.com</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: "#475569", cursor: "pointer", fontSize: 16 }}>⋯</div>
                </div>
            </div>
        </aside>
    );
}
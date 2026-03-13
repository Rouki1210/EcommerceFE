import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { DiCssTricks } from "react-icons/di";
import {
    MdOutlineDashboard, MdOutlineInventory2,
    MdOutlineShoppingBag, MdOutlinePeople,
    MdOutlineBarChart, MdOutlineSettings,
} from "react-icons/md";

const navItems = [
    { label: "Dashboard", icon: MdOutlineDashboard,   path: "/admin/dashboard" },
    { label: "Products",  icon: MdOutlineInventory2,  path: "/admin/products" },
    { label: "Orders",    icon: MdOutlineShoppingBag, path: "/admin/orders", badge: 5 },
    { label: "Users",     icon: MdOutlinePeople,      path: "/admin/users" },
    { label: "Analytics", icon: MdOutlineBarChart,    path: "/admin/analytics" },
    { label: "Settings",  icon: MdOutlineSettings,    path: "/admin/settings" },
];

const sidebarVariants = {
    hidden: { x: -240, opacity: 0 },
    show:   { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show:   (i) => ({ x: 0, opacity: 1, transition: { delay: 0.1 + i * 0.06, duration: 0.35, ease: "easeOut" } }),
};

export default function Sidebar() {
    const navigate   = useNavigate();
    const location   = useLocation();
    const activeNav  = navItems.find(i => location.pathname.startsWith(i.path))?.label || "Dashboard";

    return (
        <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="show"
            style={{
                width: 240, minHeight: "100vh",
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                display: "flex", flexDirection: "column",
                position: "relative", zIndex: 10,
            }}
        >
            {/* Top glow */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)",
            }} />

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{ padding: "28px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: 38, height: 38, borderRadius: 12,
                            background: "linear-gradient(135deg, #eab308, #f59e0b)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 17, fontWeight: 900, color: "#000",
                            boxShadow: "0 0 20px rgba(234,179,8,0.45)",
                        }}
                    >A</motion.div>
                    <div>
                        <div style={{ fontFamily: "Syne, sans-serif", color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: 0.5 }}>
                            ADMIN PAGE
                        </div>
                        <div style={{ color: "#64748b", fontSize: 9, letterSpacing: 2 }}>ECOMMERCE</div>
                    </div>
                </div>
            </motion.div>

            {/* Nav */}
            <nav style={{ padding: "18px 12px", flex: 1 }}>
                <div style={{ color: "#334155", fontSize: 9, letterSpacing: 3, paddingLeft: 12, marginBottom: 10 }}>MENU</div>
                {navItems.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.label;
                    return (
                        <motion.div
                            key={item.label}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: "flex", alignItems: "center", gap: 11,
                                padding: "10px 14px", borderRadius: 12, marginBottom: 3,
                                cursor: "pointer",
                                background: isActive ? "rgba(234,179,8,0.12)" : "transparent",
                                border: isActive ? "1px solid rgba(234,179,8,0.2)" : "1px solid transparent",
                                position: "relative", transition: "background 0.2s, border 0.2s",
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    style={{
                                        position: "absolute", left: 0, top: "50%",
                                        width: 3, height: 20,
                                        background: "linear-gradient(180deg, #eab308, #f59e0b)",
                                        borderRadius: "0 3px 3px 0",
                                    }}
                                    initial={false}
                                    animate={{ y: "-50%" }}
                                />
                            )}
                            <Icon size={17} color={isActive ? "#eab308" : "#475569"} />
                            <span style={{
                                fontSize: 13, fontWeight: isActive ? 600 : 400,
                                color: isActive ? "#eab308" : "#64748b",
                                letterSpacing: 0.2, flex: 1,
                            }}>{item.label}</span>
                            {item.badge && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        background: "rgba(234,179,8,0.2)", color: "#eab308",
                                        fontSize: 9, fontWeight: 700, padding: "2px 7px",
                                        borderRadius: 20, letterSpacing: 0.5,
                                    }}
                                >{item.badge}</motion.span>
                            )}
                        </motion.div>
                    );
                })}
            </nav>

            {/* User Profile + Logout */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
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
                    <motion.button
                        whileHover={{ scale: 1.1, background: "rgba(248,113,113,0.2)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            localStorage.removeItem("adminAuth");
                            localStorage.removeItem("adminToken");
                            navigate("/admin/login");
                        }}
                        title="Logout"
                        style={{
                            marginLeft: "auto", background: "rgba(248,113,113,0.1)",
                            border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8,
                            width: 30, height: 30, cursor: "pointer", fontSize: 13,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#f87171",
                        }}
                    >⏻</motion.button>
                </div>
            </motion.div>
        </motion.aside>
    );
}
import { useNavigate, useLocation } from "react-router-dom";
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
    const navigate  = useNavigate();
    const location  = useLocation();
    const activeNav = navItems.find(i => location.pathname.startsWith(i.path))?.label || "Dashboard";

    return (
        <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="show"
            className="w-60 min-h-screen flex flex-col relative z-10 border-r border-white/5"
            style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" }}
        >
            <div className="absolute top-0 left-0 right-0 h-px"
                 style={{ background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent)" }} />

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="px-6 pt-7 pb-5 border-b border-white/5"
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black text-black flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)", boxShadow: "0 0 20px rgba(234,179,8,0.45)" }}
                    >A</motion.div>
                    <div>
                        <div className="text-white text-[13px] font-extrabold tracking-wide">ADMIN PAGE</div>
                        <div className="text-slate-500 text-[9px] tracking-[2px]">ECOMMERCE</div>
                    </div>
                </div>
            </motion.div>

            <nav className="px-3 py-4 flex-1">
                <div className="text-slate-700 text-[9px] tracking-[3px] pl-3 mb-2">MENU</div>
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
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl mb-1 cursor-pointer relative transition-all duration-200 border ${
                                isActive ? "bg-yellow-500/10 border-yellow-500/20" : "bg-transparent border-transparent"
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 w-[3px] h-5 rounded-r-sm"
                                    style={{ background: "linear-gradient(180deg, #eab308, #f59e0b)", top: "50%", transform: "translateY(-50%)" }}
                                    initial={false}
                                />
                            )}
                            <Icon size={17} color={isActive ? "#eab308" : "#475569"} />
                            <span className={`text-[13px] flex-1 tracking-[0.2px] ${isActive ? "font-semibold text-yellow-400" : "font-normal text-slate-500"}`}>
                                {item.label}
                            </span>
                            {item.badge && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-yellow-500/20 text-yellow-400 text-[9px] font-bold px-2 py-0.5 rounded-full"
                                >{item.badge}</motion.span>
                            )}
                        </motion.div>
                    );
                })}
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="px-5 py-4 border-t border-white/5"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-yellow-400 text-xs font-bold border border-yellow-500/30 flex-shrink-0"
                         style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>AD</div>
                    <div>
                        <div className="text-slate-200 text-xs font-semibold">Admin User</div>
                        <div className="text-slate-500 text-[10px]">admin@shop.com</div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            localStorage.removeItem("adminAuth");
                            localStorage.removeItem("adminToken");
                            navigate("/admin/login");
                        }}
                        title="Logout"
                        className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg border border-red-400/20 bg-red-400/10 text-red-400 cursor-pointer text-sm"
                    >⏻</motion.button>
                </div>
            </motion.div>
        </motion.aside>
    );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificationContext";

const typeColors = {
    order:   { bg: "rgba(96,165,250,0.12)",  text: "#3b82f6" },
    product: { bg: "rgba(52,211,153,0.12)",  text: "#10b981" },
    user:    { bg: "rgba(167,139,250,0.12)", text: "#8b5cf6" },
    system:  { bg: "rgba(234,179,8,0.12)",   text: "#b45309" },
};

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotification();

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <motion.div
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: open ? "rgba(234,179,8,0.2)" : "rgba(234,179,8,0.1)",
                    border: `1px solid ${open ? "rgba(234,179,8,0.5)" : "rgba(234,179,8,0.25)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, cursor: "pointer", position: "relative",
                }}
            >
                🔔
                <AnimatePresence>
                    {unreadCount > 0 && (
                        <motion.div
                            key="badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            style={{
                                position: "absolute", top: -5, right: -5,
                                minWidth: 18, height: 18, borderRadius: 9,
                                background: "#ef4444", border: "2px solid #f4f6fb",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#fff", fontSize: 9, fontWeight: 800, padding: "0 4px",
                            }}
                        >{unreadCount > 9 ? "9+" : unreadCount}</motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0,  scale: 1 }}
                        exit={{   opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                            position: "absolute", top: 46, right: 0, width: 360,
                            background: "#fff", borderRadius: 16,
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                            zIndex: 999, overflow: "hidden",
                            transformOrigin: "top right",
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 14, fontWeight: 800 }}>Notifications</div>
                                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</div>
                            </div>
                            {unreadCount > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={markAllAsRead}
                                    style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", color: "#b45309", fontSize: 10, fontWeight: 700, padding: "5px 10px", borderRadius: 7, cursor: "pointer" }}
                                >Mark all read</motion.button>
                            )}
                        </div>

                        {/* List */}
                        <div style={{ maxHeight: 360, overflowY: "auto" }}>
                            {notifications.length === 0 ? (
                                <div style={{ padding: "32px", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}>
                                    <div style={{ fontSize: 28, marginBottom: 8 }}>🔕</div>
                                    No notifications yet
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {notifications.map((notif, i) => (
                                        <motion.div
                                            key={notif.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            onClick={() => markAsRead(notif.id)}
                                            style={{
                                                padding: "12px 18px", borderBottom: "1px solid rgba(0,0,0,0.04)",
                                                display: "flex", alignItems: "flex-start", gap: 12,
                                                background: notif.read ? "#fff" : "rgba(234,179,8,0.03)",
                                                cursor: "pointer", position: "relative",
                                            }}
                                            whileHover={{ background: "#f8fafc" }}
                                        >
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: typeColors[notif.type]?.bg || typeColors.system.bg,
                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                                            }}>{notif.icon}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ color: "#0f172a", fontSize: 12, fontWeight: notif.read ? 500 : 700, marginBottom: 3 }}>{notif.title}</div>
                                                <div style={{ color: "#64748b", fontSize: 11, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{notif.message}</div>
                                                <div style={{ color: "#cbd5e1", fontSize: 10, marginTop: 4 }}>{notif.time}</div>
                                            </div>
                                            {!notif.read && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    style={{ width: 7, height: 7, borderRadius: "50%", background: "#eab308", flexShrink: 0, marginTop: 4 }}
                                                />
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.2, color: "#ef4444" }}
                                                onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                                                style={{ position: "absolute", top: 8, right: 10, background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", fontSize: 12, padding: 2 }}
                                            >✕</motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div style={{ padding: "10px 18px", borderTop: "1px solid rgba(0,0,0,0.06)", background: "#f8fafc", textAlign: "center" }}>
                                <span style={{ color: "#94a3b8", fontSize: 11 }}>{notifications.length} total notifications</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
import { motion } from "framer-motion";
import NotificationBell from "./NotificationBell";

export default function Header({ title, subtitle }) {
    const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
    });

    return (
        <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: 28,
        }}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {subtitle && (
                    <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: 3, marginBottom: 6 }}>
                        {subtitle.toUpperCase()}
                    </div>
                )}
                <h1 style={{
                    fontFamily: "Syne, sans-serif", color: "#0f172a",
                    fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0,
                }}>{title}</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    style={{
                        background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 10, padding: "9px 16px",
                        display: "flex", alignItems: "center", gap: 8,
                        color: "#64748b", fontSize: 12, whiteSpace: "nowrap",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        cursor: "default",
                    }}
                >
                    📅 {today}
                </motion.div>
                <NotificationBell />
            </motion.div>
        </div>
    );
}
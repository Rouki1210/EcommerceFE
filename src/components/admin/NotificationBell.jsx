import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificationContext";

const typeColors = {
    order:   "bg-blue-400/10 text-blue-500",
    product: "bg-emerald-400/10 text-emerald-500",
    user:    "bg-violet-400/10 text-violet-500",
    system:  "bg-yellow-400/10 text-yellow-700",
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
        <div ref={ref} className="relative">
            <motion.div
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-base cursor-pointer relative border transition-all ${
                    open ? "bg-yellow-500/20 border-yellow-500/50" : "bg-yellow-500/10 border-yellow-500/25"
                }`}
            >
                🔔
                <AnimatePresence>
                    {unreadCount > 0 && (
                        <motion.div
                            key="badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-[#f4f6fb] flex items-center justify-center text-white text-[9px] font-black px-1"
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
                        className="absolute top-12 right-0 w-[360px] bg-white rounded-2xl border border-black/[0.08] shadow-2xl z-[999] overflow-hidden origin-top-right"
                    >
                        {/* Header */}
                        <div className="px-[18px] pt-4 pb-3 border-b border-black/[0.06] flex justify-between items-center">
                            <div>
<div className="text-slate-900 text-sm font-extrabold">Notifications</div>
                                <div className="text-slate-400 text-[11px] mt-0.5">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</div>
                            </div>
                            {unreadCount > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={markAllAsRead}
                                    className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer"
                                >Mark all read</motion.button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[360px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-300 text-[13px]">
                                    <div className="text-3xl mb-2">🔕</div>
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
                                            className={`px-[18px] py-3 border-b border-black/[0.04] flex items-start gap-3 cursor-pointer relative hover:bg-slate-50 transition-colors ${notif.read ? "bg-white" : "bg-yellow-500/[0.03]"}`}
                                        >
                                            <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-base ${typeColors[notif.type] || typeColors.system}`}>
                                                {notif.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-slate-900 text-xs mb-0.5 ${notif.read ? "font-medium" : "font-bold"}`}>{notif.title}</div>
                                                <div className="text-slate-500 text-[11px] leading-relaxed truncate">{notif.message}</div>
                                                <div className="text-slate-300 text-[10px] mt-1">{notif.time}</div>
                                            </div>
{!notif.read && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 mt-1"
                                                />
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                                                className="absolute top-2 right-2.5 bg-transparent border-none cursor-pointer text-slate-200 hover:text-red-400 text-xs p-0.5 transition-colors"
                                            >✕</motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="px-[18px] py-2.5 border-t border-black/[0.06] bg-slate-50 text-center">
                                <span className="text-slate-400 text-[11px]">{notifications.length} total notifications</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

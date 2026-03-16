import { motion } from "framer-motion";
import NotificationBell from "./NotificationBell";

export default function Header({ title, subtitle }) {
    const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
    });

    return (
        <div className="flex justify-between items-start mb-7">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {subtitle && (
                    <div className="text-slate-400 text-[11px] tracking-[3px] mb-1.5 uppercase">
                        {subtitle}
                    </div>
                )}
                <h1 className="text-slate-900 text-[28px] font-extrabold tracking-tight m-0">
                    {title}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-3"
            >
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white border border-black/[0.08] rounded-xl px-4 py-2 flex items-center gap-2 text-slate-500 text-xs shadow-sm whitespace-nowrap cursor-default"
                >
                    📅 {today}
                </motion.div>
                <NotificationBell />
            </motion.div>
        </div>
  );
}

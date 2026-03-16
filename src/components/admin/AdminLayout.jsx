import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { NotificationProvider } from "../../context/NotificationContext";

const pageVariants = {
    initial: { opacity: 0, y: 16, scale: 0.99 },
    animate: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:    { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.2,  ease: "easeIn" } },
};

export default function AdminLayout() {
    const [mounted, setMounted] = useState(false);
    const location = useLocation();

    useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

    return (
        <NotificationProvider>
            <div className="flex h-screen w-full overflow-hidden relative bg-[#f4f6fb]">
                {/* Ambient blobs */}
                <div className="fixed -top-48 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
                     style={{ background: "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)" }} />
                <div className="fixed -bottom-48 left-24 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
                     style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)" }} />

                <Sidebar />

                <main
                    className="flex-1 overflow-y-auto px-9 py-8 relative z-[1] transition-opacity duration-400"
                    style={{ opacity: mounted ? 1 : 0 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </NotificationProvider>
    );
}
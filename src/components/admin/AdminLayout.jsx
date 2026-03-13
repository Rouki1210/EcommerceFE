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
    const [activeNav, setActiveNav] = useState("Dashboard");
    const location = useLocation();

    useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

    return (
        <NotificationProvider>
            <div style={{
                display: "flex", height: "100vh", width: "100%",
                background: "#f4f6fb", overflow: "hidden", position: "relative",
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            }}>
                {/* Ambient blobs */}
                <div style={{
                    position: "fixed", top: -200, right: -100, width: 600, height: 600,
                    background: "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0,
                }} />
                <div style={{
                    position: "fixed", bottom: -200, left: 100, width: 500, height: 500,
                    background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0,
                }} />

                <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

                <main style={{
                    flex: 1, overflowY: "auto", padding: "32px 36px",
                    position: "relative", zIndex: 1,
                    opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease",
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{ height: "100%" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </NotificationProvider>
    );
}
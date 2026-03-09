import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
    const [mounted, setMounted] = useState(false);

    const [activeNav, setActiveNav] = useState("Dashboard");

    useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

    return (
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
                opacity: mounted ? 1 : 0, transition: "opacity 0.3s ease",
            }}>
                <Outlet />
            </main>
        </div>
    );
}
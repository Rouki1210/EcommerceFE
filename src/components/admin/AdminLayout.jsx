import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [mounted, setMounted] = useState(false);

  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#f5f0eb",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
                @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
                @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 0.4; } 100% { transform: scale(1); opacity: 0.8; } }
                .nav-item:hover { background: rgba(200,169,110,0.08) !important; }
                .stat-card:hover { transform: translateY(-4px); border-color: rgba(200,169,110,0.4) !important; }
                .order-row:hover { background: rgba(200,169,110,0.05) !important; }
            `}</style>
      {/* Ambient blobs */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -100,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -200,
          left: 100,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 36px",
          position: "relative",
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

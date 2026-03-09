import { useState, useEffect } from "react";
import "./styles/globals.css";

import Sidebar from "./components/admin/Sidebar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";

const pages = {
  Dashboard: AdminDashboard,
  Orders: AdminOrders,
  Products: AdminProducts,
  Users: AdminUsers,
};

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const PageComponent = pages[activeNav] || AdminDashboard;

  return (
      <div style={{
        display: "flex", height: "100vh", width: "100%",
        background: "#080810", overflow: "hidden", position: "relative",
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
          <PageComponent />
        </main>
      </div>
  );
}
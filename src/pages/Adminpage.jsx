import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import Admindashboard from "./admin/Admindashboard";
import Adminorders from "./admin/Adminorders";

// Import global styles
import "./globalStyles.css";

const pages = {
    Dashboard: Admindashboard,
    Orders:    Adminorders,
    // Products: Adminproducts,   // add when ready
    // Users:    Adminusers,      // add when ready
};

export default function Adminpage() {
    const [activeNav, setActiveNav] = useState("Dashboard");

    const PageComponent = pages[activeNav] || Admindashboard;

    return (
        <AdminLayout activeNav={activeNav} setActiveNav={setActiveNav}>
            <PageComponent />
        </AdminLayout>
    );
}
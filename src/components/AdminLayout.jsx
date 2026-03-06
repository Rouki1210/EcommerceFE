import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: "220px",
                background: "#111",
                color: "white",
                padding: "20px"
            }}>
                <h2>Admin</h2>

                <nav style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/products">Products</Link>
                    <Link to="/admin/orders">Orders</Link>
                    <Link to="/admin/users">Users</Link>
                </nav>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "20px" }}>
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;
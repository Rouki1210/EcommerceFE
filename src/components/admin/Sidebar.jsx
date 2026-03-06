import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "230px",
                background: "#111",
                color: "white",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <h2>Admin Panel</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/admin/products">Products</Link>
                </li>

                <li>
                    <Link to="/admin/orders">Orders</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
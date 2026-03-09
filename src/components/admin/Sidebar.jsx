import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen">

            <div className="p-6 text-xl font-bold">
                Admin
            </div>

            <nav className="flex flex-col gap-2 p-4">

                <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
                    Dashboard
                </Link>

                <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">
                    Products
                </Link>

                <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">
                    Orders
                </Link>

            </nav>

        </div>
    );
}
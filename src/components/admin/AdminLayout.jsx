import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header />

                <div className="p-6">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}
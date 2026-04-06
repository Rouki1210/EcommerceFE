import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 p-4 lg:flex-row lg:gap-6 lg:p-6">
        <Sidebar />
        <main className="min-w-0 flex-1 rounded-3xl border border-black/[0.08] bg-white p-4 shadow-sm sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

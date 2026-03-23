import { useState, useEffect, useMemo } from "react";
import OrderTable from "../../components/admin/OrderTable";
import Header from "../../components/admin/Header";
import { useNotification } from "../../context/NotificationContext";
import { getOrders, updateOrderStatus } from "../../api/orderApi";

const STATUS_FILTERS = ["All", "Pending", "Processing", "Delivered", "Cancelled"];
const statusDot = {
    Delivered: "bg-emerald-400", Pending: "bg-yellow-400",
    Processing: "bg-blue-400",  Cancelled: "bg-red-400",
};
const statusActive = {
    Delivered: "bg-emerald-400/10 text-emerald-500 border-emerald-400",
    Pending:   "bg-yellow-400/12 text-yellow-500 border-yellow-400",
    Processing:"bg-blue-400/12 text-blue-500 border-blue-400",
    Cancelled: "bg-red-400/10 text-red-400 border-red-400",
};

export default function Adminorders() {
    const [orders, setOrders]             = useState([]);
    const [search, setSearch]             = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading]           = useState(true);
    const [error, setError]               = useState(null);
    const { addNotification }             = useNotification();

    const loadOrders = () => {
        setLoading(true);
        getOrders()
            .then(data => setOrders(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadOrders(); }, []);

    const filtered = useMemo(() => orders.filter(o => {
        const q = search.toLowerCase();
        const matchSearch = o.id?.toString().toLowerCase().includes(q) ||
            o.customer?.toLowerCase().includes(q) ||
            o.product?.toLowerCase().includes(q);
        const matchStatus = filterStatus === "All" || o.status === filterStatus;
        return matchSearch && matchStatus;
    }), [orders, search, filterStatus]);

    const handleStatusChange = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
            addNotification({ type: "order", title: "Order Updated", message: `Order #${id} status changed to ${status}`, icon: "📦" });
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="animate-[fadeSlideUp_0.5s_ease_both]">
            <Header title="Orders" subtitle="Management" />

            {/* Search + Filter */}
            <div className="flex items-center gap-3 mb-5 -mt-2">
                <div className="flex-1 max-w-[340px] bg-white border border-black/[0.08] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID, customer, product..."
                           className="border-none outline-none bg-transparent text-slate-900 text-xs w-full" />
                    {search && <button onClick={() => setSearch("")} className="bg-transparent border-none cursor-pointer text-slate-300 text-sm p-0">✕</button>}
                </div>
                <div className="flex gap-2">
                    {STATUS_FILTERS.map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                                className={`px-3.5 py-2 rounded-lg text-[11px] font-semibold cursor-pointer transition-all border ${
                                    filterStatus === s
                                        ? s === "All" ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/30" : statusActive[s]
                                        : "bg-white text-slate-500 border-black/[0.08]"
                                }`}
                        >
                            {s === "All" ? "All" : (
                                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s]}`} />{s}
                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="ml-auto text-slate-400 text-[11px]">{filtered.length} / {orders.length} orders</div>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.07]">
                    <div className="text-3xl mb-2 animate-spin inline-block">⟳</div>
                    <div className="text-slate-400 text-[13px]">Loading orders...</div>
                </div>
            ) : error ? (
                <div className="bg-red-50 rounded-2xl p-8 text-center border border-red-200">
                    <div className="text-red-500 text-[13px] font-semibold">⚠ {error}</div>
                    <button onClick={loadOrders} className="mt-3 bg-red-500 border-none text-white px-4 py-2 rounded-lg cursor-pointer text-xs">Retry</button>
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.07]">
                    <div className="text-4xl mb-3">🔍</div>
                    <div className="text-slate-900 font-bold text-sm mb-1.5">No orders found</div>
                    <button onClick={() => { setSearch(""); setFilterStatus("All"); }}
                            className="mt-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-[11px] font-bold px-4 py-1.5 rounded-lg cursor-pointer">
                        Clear filters
                    </button>
                </div>
            ) : (
                <OrderTable orders={filtered} onStatusChange={handleStatusChange} />
            )}
        </div>
    );
}
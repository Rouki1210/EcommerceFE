import { useState, useEffect, useMemo } from "react";
import OrderTable from "../../components/admin/OrderTable";
import Header from "../../components/admin/Header";
import { useNotification } from "../../context/NotificationContext";

const initialOrders = [
    { id: "#ORD-8821", customer: "Nguyen Van A", product: "Nike Air Max",   amount: "$240", status: "Delivered",  date: "09 Mar 2026", avatar: "N" },
    { id: "#ORD-8820", customer: "Tran Thi B",   product: "Adidas Ultra",   amount: "$180", status: "Pending",    date: "08 Mar 2026", avatar: "T" },
    { id: "#ORD-8819", customer: "Le Van C",      product: "Puma RS-X",     amount: "$150", status: "Processing", date: "08 Mar 2026", avatar: "L" },
    { id: "#ORD-8818", customer: "Pham Thi D",    product: "New Balance",   amount: "$210", status: "Delivered",  date: "07 Mar 2026", avatar: "P" },
    { id: "#ORD-8817", customer: "Hoang Van E",   product: "Converse All",  amount: "$90",  status: "Cancelled",  date: "07 Mar 2026", avatar: "H" },
    { id: "#ORD-8816", customer: "Dinh Van F",    product: "Vans Old Skool",amount: "$75",  status: "Delivered",  date: "06 Mar 2026", avatar: "D" },
];

const fakeIncoming = [
    { customer: "Vo Thi G",    product: "Jordan 1 High",    amount: "$320" },
    { customer: "Bui Van H",   product: "Yeezy Boost 350",  amount: "$410" },
    { customer: "Nguyen Thi I",product: "New Balance 990",  amount: "$195" },
];

const STATUS_FILTERS = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

const statusColors = {
    Delivered:  { bg: "rgba(52,211,153,0.1)",  text: "#10b981" },
    Pending:    { bg: "rgba(234,179,8,0.12)",  text: "#eab308" },
    Processing: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa" },
    Cancelled:  { bg: "rgba(248,113,113,0.1)", text: "#f87171" },
};

export default function Adminorders() {
    const [orders, setOrders]     = useState(initialOrders);
    const [simIdx, setSimIdx]     = useState(0);
    const [search, setSearch]     = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const { addNotification }     = useNotification();

    useEffect(() => {
        const timer = setTimeout(() => {
            const fake = fakeIncoming[simIdx % fakeIncoming.length];
            const newOrder = {
                id: `#ORD-${8822 + simIdx}`,
                customer: fake.customer,
                product: fake.product,
                amount: fake.amount,
                status: "Pending",
                date: "11 Mar 2026",
                avatar: fake.customer.charAt(0),
            };
            setOrders(prev => [newOrder, ...prev]);
            addNotification({
                type: "order",
                title: "New Order!",
                message: `${fake.customer} just placed order ${newOrder.id} — ${fake.product} (${fake.amount})`,
                icon: "📦",
            });
            setSimIdx(prev => prev + 1);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const filtered = useMemo(() => orders.filter(o => {
        const q = search.toLowerCase();
        const matchSearch = o.id.toLowerCase().includes(q) ||
            o.customer.toLowerCase().includes(q) ||
            o.product.toLowerCase().includes(q);
        const matchStatus = filterStatus === "All" || o.status === filterStatus;
        return matchSearch && matchStatus;
    }), [orders, search, filterStatus]);

    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <Header title="Orders" subtitle="Management" />

            {/* Search + Filter bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: -8 }}>

                {/* Search input */}
                <div style={{
                    flex: 1, maxWidth: 340, background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10,
                    padding: "10px 14px", display: "flex", alignItems: "center", gap: 10,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by order ID, customer, product..."
                        style={{
                            border: "none", outline: "none", background: "transparent",
                            color: "#0f172a", fontSize: 12, width: "100%",
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#cbd5e1", fontSize: 14, padding: 0, lineHeight: 1,
                        }}>✕</button>
                    )}
                </div>

                {/* Status filter pills */}
                <div style={{ display: "flex", gap: 8 }}>
                    {STATUS_FILTERS.map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)} style={{
                            padding: "8px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                            cursor: "pointer", transition: "all 0.15s", border: "1px solid",
                            background: filterStatus === s
                                ? (s === "All" ? "#eab308" : statusColors[s]?.bg || "#eab308")
                                : "#fff",
                            color: filterStatus === s
                                ? (s === "All" ? "#000" : statusColors[s]?.text || "#000")
                                : "#64748b",
                            borderColor: filterStatus === s
                                ? (s === "All" ? "#eab308" : statusColors[s]?.text || "#eab308")
                                : "rgba(0,0,0,0.08)",
                            boxShadow: filterStatus === s ? "0 2px 8px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
                        }}>
                            {s === "All" ? "All" : (
                                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: statusColors[s]?.text, display: "inline-block",
                  }} />
                                    {s}
                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Count */}
                <div style={{ marginLeft: "auto", color: "#94a3b8", fontSize: 11 }}>
                    {filtered.length} / {orders.length} orders
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div style={{
                    background: "#fff", borderRadius: 16, padding: "48px",
                    textAlign: "center", border: "1px solid rgba(0,0,0,0.07)",
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>No orders found</div>
                    <div style={{ color: "#94a3b8", fontSize: 12 }}>Try a different keyword or status filter</div>
                    <button onClick={() => { setSearch(""); setFilterStatus("All"); }} style={{
                        marginTop: 16, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)",
                        color: "#b45309", fontSize: 11, fontWeight: 700, padding: "7px 16px",
                        borderRadius: 8, cursor: "pointer",
                    }}>Clear filters</button>
                </div>
            ) : (
                <OrderTable orders={filtered} />
            )}
        </div>
    );
}
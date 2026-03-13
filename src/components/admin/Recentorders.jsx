import { useNavigate } from "react-router-dom";

const recentOrders = [
    { id: "#ORD-8821", customer: "Nguyen Van A", product: "Nike Air Max",   amount: "$240", status: "Delivered",  avatar: "N" },
    { id: "#ORD-8820", customer: "Tran Thi B",   product: "Adidas Ultra",   amount: "$180", status: "Pending",    avatar: "T" },
    { id: "#ORD-8819", customer: "Le Van C",      product: "Puma RS-X",     amount: "$150", status: "Processing", avatar: "L" },
    { id: "#ORD-8818", customer: "Pham Thi D",    product: "New Balance",   amount: "$210", status: "Delivered",  avatar: "P" },
    { id: "#ORD-8817", customer: "Hoang Van E",   product: "Converse All",  amount: "$90",  status: "Cancelled",  avatar: "H" },
];

const statusColors = {
    Delivered:  { bg: "rgba(52,211,153,0.15)",  text: "#34d399", dot: "#34d399" },
    Pending:    { bg: "rgba(251,191,36,0.15)",   text: "#fbbf24", dot: "#fbbf24" },
    Processing: { bg: "rgba(96,165,250,0.15)",   text: "#60a5fa", dot: "#60a5fa" },
    Cancelled:  { bg: "rgba(248,113,113,0.15)",  text: "#f87171", dot: "#f87171" },
};

export default function Recentorders() {
    const navigate = useNavigate();

    return (
        <div style={{
            background: "#ffffff", border: "1px solid #e8e2db",
            borderRadius: 16, padding: "24px",
            animation: "fadeSlideUp 0.6s ease 0.55s both",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <div style={{ color: "#9a8c7e", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>LATEST</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2c2c2c", fontSize: 16, fontWeight: 600, margin: 0 }}>
                        Recent Orders
                    </h3>
                </div>
                <button
                    onClick={() => navigate("/admin/orders")}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,110,0.2)"; e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,169,110,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}
                    style={{
                        background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.25)",
                        color: "#c8a96e", fontSize: 11, padding: "6px 14px", borderRadius: 8,
                        cursor: "pointer", fontWeight: 600, letterSpacing: 0.5,
                        transition: "all 0.2s ease",
                    }}
                >View All →</button>
            </div>

            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", padding: "0 8px 10px", borderBottom: "1px solid #e8e2db" }}>
                {["Customer", "Product", "Amount", "Status"].map(h => (
                    <div key={h} style={{ color: "#9a8c7e", fontSize: 10, letterSpacing: 1.5, fontWeight: 600 }}>{h}</div>
                ))}
            </div>

            {recentOrders.map((order, i) => (
                <div
                    key={i}
                    onClick={() => navigate("/admin/orders")}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(200,169,110,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    className="order-row"
                    style={{
                        display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr",
                        padding: "12px 8px", borderBottom: "1px solid rgba(44,44,44,0.05)",
                        cursor: "pointer", borderRadius: 8, transition: "background 0.2s ease",
                        animation: `fadeSlideUp 0.4s ease ${0.6 + i * 0.07}s both`,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                            background: "#f5f0eb", border: "1px solid rgba(200,169,110,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#c8a96e", fontSize: 11, fontWeight: 700,
                        }}>{order.avatar}</div>
                        <div>
                            <div style={{ color: "#2c2c2c", fontSize: 12, fontWeight: 600 }}>{order.customer}</div>
                            <div style={{ color: "#9a8c7e", fontSize: 10 }}>{order.id}</div>
                        </div>
                    </div>
                    <div style={{ color: "#9a8c7e", fontSize: 12, display: "flex", alignItems: "center" }}>{order.product}</div>
                    <div style={{ color: "#2c2c2c", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center" }}>{order.amount}</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{
                fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                background: statusColors[order.status].bg,
                color: statusColors[order.status].text,
                display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColors[order.status].dot, display: "inline-block" }} />
                {order.status}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
const topProducts = [
    { name: "Nike Air Max", sold: 142, revenue: "$17,040", trend: 12 },
    { name: "Adidas Ultra",  sold: 98,  revenue: "$11,760", trend: -3 },
    { name: "Puma RS-X",     sold: 76,  revenue: "$9,120",  trend: 8 },
    { name: "New Balance",   sold: 65,  revenue: "$7,800",  trend: 5 },
];

export default function Topproducts() {
    return (
        <div style={{
            background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 16, padding: "24px",
            animation: "fadeSlideUp 0.6s ease 0.6s both",
        }}>
            <div style={{ marginBottom: 20 }}>
                <div style={{ color: "#475569", fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>RANKING</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 16, fontWeight: 700 }}>Top Products</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {topProducts.map((prod, i) => (
                    <div key={i} style={{
                        background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)",
                        borderRadius: 12, padding: "14px 16px",
                        animation: `fadeSlideUp 0.4s ease ${0.65 + i * 0.08}s both`,
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{
                                    width: 26, height: 26, borderRadius: 7,
                                    background: `rgba(234,179,8,${0.15 - i * 0.02})`,
                                    border: "1px solid rgba(234,179,8,0.25)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#eab308", fontSize: 10, fontWeight: 800,
                                }}>#{i + 1}</div>
                                <span style={{ color: "#1e293b", fontSize: 13, fontWeight: 600 }}>{prod.name}</span>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: prod.trend > 0 ? "#34d399" : "#f87171" }}>
                {prod.trend > 0 ? "↑" : "↓"} {Math.abs(prod.trend)}%
              </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ color: "#475569", fontSize: 11 }}>{prod.sold} sold</span>
                            <span style={{ color: "#64748b", fontSize: 11 }}>{prod.revenue}</span>
                        </div>
                        <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{
                                height: "100%", borderRadius: 2,
                                width: `${(prod.sold / 150) * 100}%`,
                                background: "linear-gradient(90deg, #eab308, #f59e0b)",
                                boxShadow: "0 0 8px rgba(234,179,8,0.4)",
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
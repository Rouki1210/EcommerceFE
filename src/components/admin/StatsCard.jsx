import { useEffect, useState } from "react";

function AnimatedNumber({ value }) {
    const [display, setDisplay] = useState(0);
    const target = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.includes("$") ? "$" : "";

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setDisplay(target); clearInterval(timer); }
            else setDisplay(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, []);

    return <span>{prefix}{display.toLocaleString()}</span>;
}

export default function StatsCard({ title, value, change, up, icon, sub, delay = 0 }) {
    return (
        <div className="stat-card" style={{
            background: "rgba(15,15,25,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "24px 26px",
            cursor: "pointer", transition: "all 0.3s ease",
            position: "relative", overflow: "hidden",
            animation: `fadeSlideUp 0.6s ease ${delay}s both`,
        }}>
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.3), transparent)",
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                    <div style={{ color: "#475569", fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}>
                        {title.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "Syne, sans-serif", color: "#f1f5f9", fontSize: 32, fontWeight: 800, letterSpacing: -1 }}>
                        <AnimatedNumber value={value} />
                    </div>
                </div>
                <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{icon}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
            fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
            background: up ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
            color: up ? "#34d399" : "#f87171",
        }}>{change}</span>
                <span style={{ color: "#334155", fontSize: 11 }}>{sub}</span>
            </div>
        </div>
    );
}
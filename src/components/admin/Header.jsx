import NotificationBell from "./NotificationBell";

const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function Header({ title, subtitle }) {
    return (
        <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: 28,
        }}>
            {/* Left: title */}
            <div>
                {subtitle && (
                    <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: 3, marginBottom: 6 }}>
                        {subtitle.toUpperCase()}
                    </div>
                )}
                <h1 style={{
                    fontFamily: "Syne, sans-serif", color: "#0f172a",
                    fontSize: 28, fontWeight: 800, letterSpacing: -0.5,
                    margin: 0,
                }}>{title}</h1>
            </div>

            {/* Right: date + bell */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                    background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 10, padding: "9px 16px",
                    display: "flex", alignItems: "center", gap: 8,
                    color: "#64748b", fontSize: 12, cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                    <span>📅</span> Mar 2026
                </div>
                <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, cursor: "pointer", position: "relative",
                }}>
                    <span>📅</span> {formatDate()}
                </div>
                <NotificationBell />
            </div>
        </div>
    );
}
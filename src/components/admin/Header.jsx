import { FiCalendar, FiBell } from "react-icons/fi";

export default function Header({ title, subtitle }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 28,
      }}
    >
      {/* Left: title */}
      <div>
        {subtitle && (
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 11,
              letterSpacing: 3,
              marginBottom: 6,
            }}
          >
            {subtitle.toUpperCase()}
          </div>
        )}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#2c2c2c",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.3,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right: date + bell */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e8e2db",
            borderRadius: 10,
            padding: "9px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#9a8c7e",
            fontSize: 12,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(44,44,44,0.06)",
          }}
        >
          <FiCalendar size={13} /> Mar 2026
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            cursor: "pointer",
            position: "relative",
          }}
        >
          <FiBell size={15} />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 7,
              height: 7,
              background: "#c8a96e",
              borderRadius: "50%",
              boxShadow: "0 0 6px #c8a96e",
              animation: "pulse-ring 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

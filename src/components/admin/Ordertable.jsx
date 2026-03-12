const statusColors = {
  Delivered: { bg: "rgba(52,211,153,0.15)", text: "#34d399", dot: "#34d399" },
  Pending: { bg: "rgba(251,191,36,0.15)", text: "#fbbf24", dot: "#fbbf24" },
  Processing: { bg: "rgba(96,165,250,0.15)", text: "#60a5fa", dot: "#60a5fa" },
  Cancelled: { bg: "rgba(248,113,113,0.15)", text: "#f87171", dot: "#f87171" },
};

const columns = ["Order ID", "Customer", "Product", "Amount", "Date", "Status"];

export default function OrderTable({ orders = [] }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e2db",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 1fr 1fr",
          padding: "16px 24px",
          borderBottom: "1px solid #e8e2db",
          background: "#faf8f5",
        }}
      >
        {columns.map((h) => (
          <div
            key={h}
            style={{
              color: "#9a8c7e",
              fontSize: 10,
              letterSpacing: 1.5,
              fontWeight: 600,
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {orders.map((order, i) => (
        <div
          key={i}
          className="order-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 1fr 1fr",
            padding: "14px 24px",
            borderBottom: "1px solid rgba(44,44,44,0.05)",
            cursor: "pointer",
            transition: "background 0.2s ease",
            animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
          }}
        >
          <div
            style={{
              color: "#c8a96e",
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            {order.id}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                flexShrink: 0,
                background: "#f5f0eb",
                border: "1px solid rgba(200,169,110,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c8a96e",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {order.avatar}
            </div>
            <span style={{ color: "#2c2c2c", fontSize: 12, fontWeight: 500 }}>
              {order.customer}
            </span>
          </div>
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            {order.product}
          </div>
          <div
            style={{
              color: "#2c2c2c",
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            {order.amount}
          </div>
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
            }}
          >
            {order.date}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background: statusColors[order.status]?.bg,
                color: statusColors[order.status]?.text,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: statusColors[order.status]?.dot,
                  display: "inline-block",
                }}
              />
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

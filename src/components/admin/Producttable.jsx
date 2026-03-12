export default function ProductTable({ products = [], onEdit, onDelete }) {
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
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          padding: "16px 24px",
          borderBottom: "1px solid #e8e2db",
          background: "#faf8f5",
        }}
      >
        {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
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

      {products.map((prod, i) => (
        <div
          key={prod.id}
          className="order-row"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            padding: "14px 24px",
            borderBottom: "1px solid rgba(44,44,44,0.05)",
            transition: "background 0.2s ease",
            animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                overflow: "hidden",
                background: "#faf8f5",
                border: "1px solid #e8e2db",
                flexShrink: 0,
              }}
            >
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <span style={{ color: "#2c2c2c", fontSize: 13, fontWeight: 600 }}>
              {prod.name}
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
            {prod.category}
          </div>
          <div
            style={{
              color: "#c8a96e",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            ${prod.price}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background:
                  prod.stock < 5
                    ? "rgba(248,113,113,0.1)"
                    : "rgba(52,211,153,0.1)",
                color: prod.stock < 5 ? "#f87171" : "#34d399",
              }}
            >
              {prod.stock} left
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => onEdit && onEdit(prod)}
              style={{
                background: "rgba(44,44,44,0.06)",
                border: "1px solid rgba(44,44,44,0.12)",
                color: "#2c2c2c",
                fontSize: 11,
                padding: "5px 12px",
                borderRadius: 7,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(prod.id)}
              style={{
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.2)",
                color: "#f87171",
                fontSize: 11,
                padding: "5px 12px",
                borderRadius: 7,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Del
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

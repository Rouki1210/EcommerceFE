import { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";
import Header from "../../components/admin/Header";
import { FiCalendar, FiBell } from "react-icons/fi";

const mockProducts = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    stock: 10,
    category: "Sneakers",
    image: "https://via.placeholder.com/48",
  },
  {
    id: 2,
    name: "Adidas Ultra",
    price: 90,
    stock: 25,
    category: "Running",
    image: "https://via.placeholder.com/48",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 85,
    stock: 4,
    category: "Lifestyle",
    image: "https://via.placeholder.com/48",
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 110,
    stock: 18,
    category: "Classics",
    image: "https://via.placeholder.com/48",
  },
];

export default function Adminproducts() {
  const [products, setProducts] = useState(mockProducts);
  const [editing, setEditing] = useState(null);

  const openAdd = () =>
    setEditing({ name: "", price: "", stock: "", category: "" });
  const openEdit = (p) => setEditing({ ...p });
  const closeModal = () => setEditing(null);

  const saveProduct = (form) => {
    if (form.id) {
      setProducts(products.map((p) => (p.id === form.id ? form : p)));
    } else {
      setProducts([
        ...products,
        {
          ...form,
          id: Date.now(),
          image: form.image || "https://via.placeholder.com/48",
        },
      ]);
    }
    closeModal();
  };

  return (
    <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
      {/* Header row: title left, button right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 11,
              letterSpacing: 3,
              marginBottom: 6,
            }}
          >
            MANAGEMENT
          </div>
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
            Products
          </h1>
        </div>

        {/* Right: date + bell + Add button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 10,
              padding: "9px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#9a8c7e",
              fontSize: 12,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
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
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                background: "#c8a96e",
                borderRadius: "50%",
                boxShadow: "0 0 6px #c8a96e",
              }}
            />
          </div>
          <button
            onClick={openAdd}
            style={{
              background: "#2c2c2c",
              border: "none",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "10px 20px",
              borderRadius: 10,
              cursor: "pointer",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      <ProductTable
        products={products}
        onEdit={openEdit}
        onDelete={(id) => setProducts(products.filter((p) => p.id !== id))}
      />

      {editing && (
        <ProductModal
          product={editing}
          onClose={closeModal}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}

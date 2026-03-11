import { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";
import Header from "../../components/admin/Header";

const mockProducts = [
    { id: 1, name: "Nike Air Max",    price: 120, stock: 10, category: "Sneakers", image: "https://via.placeholder.com/48" },
    { id: 2, name: "Adidas Ultra",    price: 90,  stock: 25, category: "Running",  image: "https://via.placeholder.com/48" },
    { id: 3, name: "Puma RS-X",       price: 85,  stock: 4,  category: "Lifestyle",image: "https://via.placeholder.com/48" },
    { id: 4, name: "New Balance 574", price: 110, stock: 18, category: "Classics", image: "https://via.placeholder.com/48" },
];

export default function Adminproducts() {
    const [products, setProducts] = useState(mockProducts);
    const [editing, setEditing]   = useState(null);

    const openAdd  = () => setEditing({ name: "", price: "", stock: "", category: "" });
    const openEdit = (p) => setEditing({ ...p });
    const closeModal = () => setEditing(null);

    const saveProduct = (form) => {
        if (form.id) {
            setProducts(products.map(p => p.id === form.id ? form : p));
        } else {
            setProducts([...products, { ...form, id: Date.now(), image: form.image || "https://via.placeholder.com/48" }]);
        }
        closeModal();
    };

    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>

            {/* Header row: title left, button right */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
                <div>
                    <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: 3, marginBottom: 6 }}>MANAGEMENT</div>
                    <h1 style={{
                        fontFamily: "Syne, sans-serif", color: "#0f172a",
                        fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0,
                    }}>Products</h1>
                </div>

                {/* Right: date + bell + Add button */}
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
                        🔔
                        <div style={{
                            position: "absolute", top: 8, right: 8, width: 7, height: 7,
                            background: "#eab308", borderRadius: "50%",
                            boxShadow: "0 0 6px #eab308",
                        }} />
                    </div>
                    <button onClick={openAdd} style={{
                        background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", color: "#000", fontSize: 12, fontWeight: 700,
                        padding: "10px 20px", borderRadius: 10, cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(234,179,8,0.3)", letterSpacing: 0.3,
                    }}>+ Add Product</button>
                </div>
            </div>

            <ProductTable
                products={products}
                onEdit={openEdit}
                onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
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
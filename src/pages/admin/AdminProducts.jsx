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

export default function AdminProducts() {
    const [products, setProducts] = useState(mockProducts);
    const [editing, setEditing] = useState(null);

    const openAdd  = () => setEditing({ name: "", price: "", stock: "", category: "" });
    const openEdit = (p) => setEditing({ ...p });
    const closeModal = () => setEditing(null);

    const saveProduct = (form) => {
        if (form.id) {
            setProducts(products.map(p => p.id === form.id ? form : p));
        } else {
            setProducts([...products, { ...form, id: Date.now(), image: "https://via.placeholder.com/48" }]);
        }
        closeModal();
    };

    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
                <Header title="Products" subtitle="Management" />
                <button onClick={openAdd} style={{
                    background: "linear-gradient(135deg, #eab308, #f59e0b)", border: "none",
                    color: "#000", fontSize: 12, fontWeight: 700, padding: "10px 20px",
                    borderRadius: 10, cursor: "pointer", letterSpacing: 0.5,
                    boxShadow: "0 0 20px rgba(234,179,8,0.3)",
                }}>+ Add Product</button>
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
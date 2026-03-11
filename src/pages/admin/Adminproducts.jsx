import { useState, useMemo } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";
import NotificationBell from "../../components/admin/NotificationBell";
import { useNotification } from "../../context/NotificationContext";

const mockProducts = [
    { id: 1, name: "Nike Air Max",    price: 120, stock: 10, category: "Sneakers", image: "https://via.placeholder.com/48" },
    { id: 2, name: "Adidas Ultra",    price: 90,  stock: 25, category: "Running",  image: "https://via.placeholder.com/48" },
    { id: 3, name: "Puma RS-X",       price: 85,  stock: 4,  category: "Lifestyle",image: "https://via.placeholder.com/48" },
    { id: 4, name: "New Balance 574", price: 110, stock: 18, category: "Classics", image: "https://via.placeholder.com/48" },
];

export default function Adminproducts() {
    const [products, setProducts] = useState(mockProducts);
    const [editing, setEditing]   = useState(null);
    const [search, setSearch]     = useState("");
    const [filterCat, setFilterCat] = useState("All");
    const { addNotification }     = useNotification();

    const categories = ["All", ...new Set(products.map(p => p.category))];

    const filtered = useMemo(() => products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === "All" || p.category === filterCat;
        return matchSearch && matchCat;
    }), [products, search, filterCat]);

    const openAdd    = () => setEditing({ name: "", price: "", stock: "", category: "" });
    const openEdit   = (p) => setEditing({ ...p });
    const closeModal = () => setEditing(null);

    const saveProduct = (form) => {
        const isNew = !form.id;
        if (isNew) {
            setProducts(prev => [...prev, { ...form, id: Date.now(), image: form.image || "https://via.placeholder.com/48" }]);
            addNotification({ type: "product", title: "Product Added", message: `Admin just added "${form.name || "a new product"}" to the store`, icon: "🛍" });
        } else {
            setProducts(prev => prev.map(p => p.id === form.id ? form : p));
            addNotification({ type: "product", title: "Product Updated", message: `"${form.name}" has been updated`, icon: "✏️" });
        }
        closeModal();
    };

    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>

            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
                <div>
                    <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: 3, marginBottom: 6 }}>MANAGEMENT</div>
                    <h1 style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>
                        Products
                    </h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10,
                        padding: "9px 16px", display: "flex", alignItems: "center", gap: 8,
                        color: "#64748b", fontSize: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}>
                        <span>📅</span> {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </div>
                    <NotificationBell />
                    <button onClick={openAdd} style={{
                        background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", color: "#000", fontSize: 12, fontWeight: 700,
                        padding: "10px 20px", borderRadius: 10, cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(234,179,8,0.3)",
                    }}>+ Add Product</button>
                </div>
            </div>

            {/* Search + Filter bar */}
            <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
            }}>
                {/* Search input */}
                <div style={{
                    flex: 1, maxWidth: 340,
                    background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 10, padding: "10px 14px",
                    display: "flex", alignItems: "center", gap: 10,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "border 0.2s",
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or category..."
                        style={{
                            border: "none", outline: "none", background: "transparent",
                            color: "#0f172a", fontSize: 12, width: "100%",
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#cbd5e1", fontSize: 14, padding: 0, lineHeight: 1,
                        }}>✕</button>
                    )}
                </div>

                {/* Category filter pills */}
                <div style={{ display: "flex", gap: 8 }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilterCat(cat)} style={{
                            padding: "8px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                            cursor: "pointer", transition: "all 0.15s", border: "1px solid",
                            background: filterCat === cat ? "#eab308" : "#fff",
                            color: filterCat === cat ? "#000" : "#64748b",
                            borderColor: filterCat === cat ? "#eab308" : "rgba(0,0,0,0.08)",
                            boxShadow: filterCat === cat ? "0 2px 8px rgba(234,179,8,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
                        }}>{cat}</button>
                    ))}
                </div>

                {/* Result count */}
                <div style={{ marginLeft: "auto", color: "#94a3b8", fontSize: 11 }}>
                    {filtered.length} / {products.length} products
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div style={{
                    background: "#fff", borderRadius: 16, padding: "48px",
                    textAlign: "center", border: "1px solid rgba(0,0,0,0.07)",
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>No products found</div>
                    <div style={{ color: "#94a3b8", fontSize: 12 }}>Try a different keyword or category</div>
                    <button onClick={() => { setSearch(""); setFilterCat("All"); }} style={{
                        marginTop: 16, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)",
                        color: "#b45309", fontSize: 11, fontWeight: 700, padding: "7px 16px",
                        borderRadius: 8, cursor: "pointer",
                    }}>Clear filters</button>
                </div>
            )}

            {filtered.length > 0 && (
                <ProductTable
                    products={filtered}
                    onEdit={openEdit}
                    onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
                />
            )}

            {editing && (
                <ProductModal product={editing} onClose={closeModal} onSave={saveProduct} />
            )}
        </div>
    );
}
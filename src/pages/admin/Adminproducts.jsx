import { useState, useEffect, useMemo } from "react";
import ProductTable from "../../components/feature/admin/Producttable";
import ProductModal from "../../components/feature/admin/ProductModal";
import NotificationBell from "../../components/feature/admin/NotificationBell";
import { useNotification } from "../../context/NotificationContext";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../../api/productApi";

export default function Adminproducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const q = search.toLowerCase();
        const matchSearch =
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q);
        const matchCat = filterCat === "All" || p.category === filterCat;
        return matchSearch && matchCat;
      }),
    [products, search, filterCat],
  );

  const openAdd = () =>
    setEditing({ name: "", price: "", stock: "", category: "" });
  const openEdit = (p) => setEditing({ ...p });
  const closeModal = () => setEditing(null);

  const saveProduct = async (form) => {
    const isNew = !form.id;
    try {
      let saved;
      if (isNew) {
        saved = await createProduct(form);
        if (form.imageFile && saved?.id) {
          const imgRes = await uploadProductImage(saved.id, form.imageFile);
          saved = { ...saved, image: imgRes.imageUrl };
        }
        setProducts((prev) => [...prev, saved]);
        addNotification({
          type: "product",
          title: "Product Added",
          message: `Admin just added "${saved.name}" to the store`,
          icon: "🛍",
        });
      } else {
        saved = await updateProduct(form.id, form);
        if (form.imageFile) {
          const imgRes = await uploadProductImage(form.id, form.imageFile);
          saved = { ...saved, image: imgRes.imageUrl };
        }
        setProducts((prev) => prev.map((p) => (p.id === form.id ? saved : p)));
        addNotification({
          type: "product",
          title: "Product Updated",
          message: `"${saved.name}" has been updated`,
          icon: "✏️",
        });
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="animate-[fadeSlideUp_0.5s_ease_both]">
      {/* Top bar */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-slate-400 text-[11px] tracking-[3px] mb-1.5 uppercase">
            Management
          </div>
          <h1 className="text-slate-900 text-[28px] font-extrabold tracking-tight m-0">
            Products
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-black/[0.08] rounded-xl px-4 py-2 flex items-center gap-2 text-slate-500 text-xs shadow-sm">
            <span>📅</span> {today}
          </div>
          <NotificationBell />
          <button
            onClick={openAdd}
            className="border-none text-black text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-shadow"
            style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 max-w-[340px] bg-white border border-black/[0.08] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="border-none outline-none bg-transparent text-slate-900 text-xs w-full"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="bg-transparent border-none cursor-pointer text-slate-300 text-sm p-0 hover:text-slate-500"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-semibold cursor-pointer transition-all border ${
                filterCat === cat
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/30"
                  : "bg-white text-slate-500 border-black/[0.08] hover:border-yellow-400/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto text-slate-400 text-[11px]">
          {filtered.length} / {products.length} products
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.07]">
          <div className="text-3xl mb-2 animate-spin inline-block">⟳</div>
          <div className="text-slate-400 text-[13px]">Loading products...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-2xl p-8 text-center border border-red-200">
          <div className="text-red-500 text-[13px] font-semibold">
            ⚠ {error}
          </div>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              getProducts()
                .then(setProducts)
                .catch((e) => setError(e.message))
                .finally(() => setLoading(false));
            }}
            className="mt-3 bg-red-500 border-none text-white px-4 py-2 rounded-lg cursor-pointer text-xs hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.07]">
          <div className="text-4xl mb-3">🔍</div>
          <div className="text-slate-900 font-bold text-sm mb-1.5">
            No products found
          </div>
          <button
            onClick={() => {
              setSearch("");
              setFilterCat("All");
            }}
            className="mt-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-[11px] font-bold px-4 py-1.5 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductTable
          products={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

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

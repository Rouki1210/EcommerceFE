import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const BADGES = ["", "Bestseller", "New", "Sale", "Limited"];
const GENDERS = ["women", "men", "unisex"];

const inputCls =
  "w-full bg-slate-50 border border-black/[0.08] rounded-lg px-3 py-2 text-slate-900 text-xs outline-none focus:border-yellow-400 transition-colors";
const labelCls =
  "text-slate-400 text-[9px] tracking-[1.5px] block mb-1.5 font-semibold uppercase";

export default function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    gender: "women",
    price: "",
    badge: "",
    variant: "",
    description: "",
    material: "",
    care: "",
    sizes: [],
    stock: "",
    sizeChart: {
      headers: ["Size", "Chest (cm)", "Waist (cm)", "Length (cm)"],
      rows: [],
    },
    image: null,
    imageFile: null,
    ...product,
  });
  const [preview, setPreview] = useState(product?.image || null);
  const [dragging, setDragging] = useState(false);
  const [tab, setTab] = useState("basic");
  const inputRef = useRef();

  const set = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    set("image", url);
    set("imageFile", file);
  };

  const toggleSize = (size) => {
    const sizes = form.sizes.includes(size)
      ? form.sizes.filter((s) => s !== size)
      : [...form.sizes, size];
    set("sizes", sizes);
  };

  const addSizeRow = () =>
    set("sizeChart", {
      ...form.sizeChart,
      rows: [...form.sizeChart.rows, ["", "", "", ""]],
    });
  const removeSizeRow = (i) =>
    set("sizeChart", {
      ...form.sizeChart,
      rows: form.sizeChart.rows.filter((_, idx) => idx !== i),
    });
  const updateSizeRow = (ri, ci, val) => {
    const rows = form.sizeChart.rows.map((row, i) =>
      i === ri ? row.map((c, j) => (j === ci ? val : c)) : row,
    );
    set("sizeChart", { ...form.sizeChart, rows });
  };

  const tabs = ["basic", "details", "sizes"];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-32px)] my-auto"
          style={{ width: "min(860px, calc(100vw - 280px))", maxWidth: "98vw" }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-0 border-b border-black/[0.06] flex justify-between items-center flex-wrap gap-2.5">
            <div>
              <div className="text-slate-900 text-lg font-extrabold">
                {form.id ? "Edit Product" : "Add Product"}
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Fill in all product information
              </div>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {tabs.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => setTab(t)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-1.5 rounded-lg border-none cursor-pointer text-xs capitalize transition-all ${
                    tab === t
                      ? "bg-white text-slate-900 font-bold shadow-sm"
                      : "bg-transparent text-slate-400 font-medium"
                  }`}
                >
                  {t === "basic"
                    ? "Basic Info"
                    : t === "details"
                      ? "Details"
                      : "Sizes & Chart"}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-black/[0.08] bg-slate-50 hover:bg-red-50 cursor-pointer text-sm text-slate-500 flex items-center justify-center transition-colors"
            >
              ✕
            </motion.button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* BASIC TAB */}
                {tab === "basic" && (
                  <div
                    className="grid gap-5"
                    style={{ gridTemplateColumns: "min(200px,35%) 1fr" }}
                  >
                    {/* Image upload */}
                    <div>
                      <label className={labelCls}>Product Image</label>
                      <motion.div
                        onClick={() => inputRef.current.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(false);
                          handleFile(e.dataTransfer.files[0]);
                        }}
                        whileHover={{ borderColor: "#eab308" }}
                        className={`border-2 border-dashed rounded-xl cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
                          dragging
                            ? "border-yellow-400 bg-yellow-500/[0.04]"
                            : "border-black/10 bg-slate-50"
                        } ${preview ? "" : "h-40"}`}
                      >
                        {preview ? (
                          <div className="relative w-full">
                            <img
                              src={preview}
                              alt="preview"
                              className="w-full h-40 object-cover block"
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center"
                            >
                              <span className="text-white text-[11px] font-semibold">
                                🖼 Change
                              </span>
                            </motion.div>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <div className="text-3xl mb-1.5">📁</div>
                            <div className="text-slate-500 text-[11px] font-semibold">
                              Click to select
                            </div>
                            <div className="text-slate-400 text-[10px] mt-1">
                              or drag & drop
                            </div>
                            <div className="text-slate-300 text-[9px] mt-0.5">
                              PNG · JPG · WEBP
                            </div>
                          </div>
                        )}
                      </motion.div>
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files[0])}
                      />
                      {preview && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          onClick={() => {
                            setPreview(null);
                            set("image", null);
                          }}
                          className="mt-1.5 w-full bg-red-400/[0.08] border border-red-400/20 text-red-500 text-[10px] py-1.5 rounded-md cursor-pointer font-semibold hover:bg-red-400/15 transition-colors"
                        >
                          ✕ Remove
                        </motion.button>
                      )}
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="col-span-2">
                        <label className={labelCls}>Product Name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="e.g. Merino Wool Sweater"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Category *</label>
                        <input
                          value={form.category}
                          onChange={(e) => set("category", e.target.value)}
                          placeholder="e.g. Knitwear"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Gender *</label>
                        <select
                          value={form.gender}
                          onChange={(e) => set("gender", e.target.value)}
                          className={inputCls + " cursor-pointer"}
                        >
                          {GENDERS.map((g) => (
                            <option key={g} value={g}>
                              {g.charAt(0).toUpperCase() + g.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Price ($) *</label>
                        <input
                          value={form.price}
                          onChange={(e) => set("price", e.target.value)}
                          placeholder="e.g. 128"
                          type="number"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Stock *</label>
                        <input
                          value={form.stock}
                          onChange={(e) => set("stock", e.target.value)}
                          placeholder="e.g. 50"
                          type="number"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Badge</label>
                        <select
                          value={form.badge}
                          onChange={(e) => set("badge", e.target.value)}
                          className={inputCls + " cursor-pointer"}
                        >
                          {BADGES.map((b) => (
                            <option key={b} value={b}>
                              {b || "— None —"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Variant / Color</label>
                        <input
                          value={form.variant}
                          onChange={(e) => set("variant", e.target.value)}
                          placeholder="e.g. Ivory"
                          className={inputCls}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className={labelCls}>Available Sizes</label>
                        <div className="flex gap-2">
                          {SIZES.map((size) => (
                            <motion.div
                              key={size}
                              onClick={() => toggleSize(size)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.93 }}
                              className={`w-10 h-9 rounded-lg cursor-pointer flex items-center justify-center text-xs font-bold border transition-all ${
                                form.sizes.includes(size)
                                  ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/30"
                                  : "bg-slate-100 text-slate-500 border-black/[0.08]"
                              }`}
                            >
                              {size}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DETAILS TAB */}
                {tab === "details" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        placeholder="A classic merino wool sweater..."
                        rows={4}
                        className={
                          inputCls + " resize-y leading-relaxed font-[inherit]"
                        }
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Material</label>
                      <input
                        value={form.material}
                        onChange={(e) => set("material", e.target.value)}
                        placeholder="e.g. 100% Merino Wool"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Care Instructions</label>
                      <input
                        value={form.care}
                        onChange={(e) => set("care", e.target.value)}
                        placeholder="e.g. Hand wash cold"
                        className={inputCls}
                      />
                    </div>
                    {(form.name || form.price) && (
                      <div className="col-span-2">
                        <label className={labelCls}>Preview</label>
                        <div className="bg-slate-50 rounded-xl p-4 border border-black/[0.06] flex gap-4 items-start">
                          {preview && (
                            <img
                              src={preview}
                              alt=""
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <div className="text-slate-900 font-bold text-sm">
                              {form.name || "—"}
                            </div>
                            <div className="text-slate-500 text-[11px] mt-0.5">
                              {form.category} · {form.gender} · {form.variant}
                            </div>
                            {form.badge && (
                              <span className="inline-block mt-1 bg-yellow-500/15 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {form.badge}
                              </span>
                            )}
                            <div className="text-yellow-400 font-extrabold text-base mt-1.5">
                              ${form.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SIZES TAB */}
                {tab === "sizes" && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <label className={labelCls}>Size Chart</label>
                        <div className="text-slate-500 text-[11px]">
                          Headers: {form.sizeChart.headers.join(" · ")}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addSizeRow}
                        className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-700 text-[11px] font-bold px-3.5 py-1.5 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-colors"
                      >
                        + Add Row
                      </motion.button>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-black/[0.07]">
                      <div
                        className="bg-slate-50 border-b border-black/[0.06]"
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${form.sizeChart.headers.length}, 1fr) 36px`,
                        }}
                      >
                        {form.sizeChart.headers.map((h) => (
                          <div
                            key={h}
                            className="px-3 py-2.5 text-slate-500 text-[10px] font-bold tracking-wide"
                          >
                            {h}
                          </div>
                        ))}
                        <div />
                      </div>
                      {form.sizeChart.rows.length === 0 && (
                        <div className="p-6 text-center text-slate-300 text-xs">
                          No rows yet — click "+ Add Row"
                        </div>
                      )}
                      <AnimatePresence>
                        {form.sizeChart.rows.map((row, ri) => (
                          <motion.div
                            key={`row-${ri}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`border-b border-black/[0.04] ${ri % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                            style={{
                              display: "grid",
                              gridTemplateColumns: `repeat(${form.sizeChart.headers.length}, 1fr) 36px`,
                            }}
                          >
                            {row.map((cell, ci) => (
                              <input
                                key={`${ri}-${ci}`}
                                value={cell}
                                onChange={(e) =>
                                  updateSizeRow(ri, ci, e.target.value)
                                }
                                placeholder={form.sizeChart.headers[ci]}
                                className="border-none bg-transparent px-3 py-2.5 text-xs text-slate-900 outline-none w-full focus:bg-yellow-500/5 transition-colors"
                              />
                            ))}
                            <button
                              onClick={() => removeSizeRow(ri)}
                              className="border-none bg-transparent cursor-pointer text-red-400 text-sm hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-black/[0.06] flex justify-between items-center flex-wrap gap-2.5 bg-slate-50 rounded-b-2xl">
            <div className="text-slate-400 text-[11px]">
              {form.name ? `📦 ${form.name}` : "No product name yet"}
              {form.price ? ` · $${form.price}` : ""}
            </div>
            <div className="flex gap-2.5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="bg-transparent border border-black/10 text-slate-500 px-5 py-2 rounded-xl cursor-pointer text-xs font-medium hover:bg-slate-100 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 6px 20px rgba(234,179,8,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSave && onSave(form)}
                className="border-none text-black font-bold px-6 py-2 rounded-xl cursor-pointer text-xs shadow-lg shadow-yellow-400/30"
                style={{
                  background: "linear-gradient(135deg, #eab308, #f59e0b)",
                }}
              >
                {form.id ? "Save Changes" : "Add Product"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

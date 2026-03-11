import { useState, useRef } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const BADGES = ["", "Bestseller", "New", "Sale", "Limited"];
const GENDERS = ["women", "men", "unisex"];

export default function ProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState({
        name: "", category: "", gender: "women", price: "",
        badge: "", variant: "", description: "", material: "",
        care: "", sizes: [], stock: "",
        sizeChart: { headers: ["Size", "Chest (cm)", "Waist (cm)", "Length (cm)"], rows: [] },
        image: null, imageFile: null,
        ...product,
    });
    const [preview, setPreview] = useState(product?.image || null);
    const [dragging, setDragging] = useState(false);
    const [tab, setTab] = useState("basic"); // basic | details | sizes
    const inputRef = useRef();

    const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        set("image", url); set("imageFile", file);
    };

    const toggleSize = (size) => {
        const sizes = form.sizes.includes(size)
            ? form.sizes.filter(s => s !== size)
            : [...form.sizes, size];
        set("sizes", sizes);
    };

    const addSizeRow = () => {
        set("sizeChart", {
            ...form.sizeChart,
            rows: [...form.sizeChart.rows, ["", "", "", ""]],
        });
    };

    const updateSizeRow = (rowIdx, colIdx, value) => {
        const rows = form.sizeChart.rows.map((row, i) =>
            i === rowIdx ? row.map((cell, j) => j === colIdx ? value : cell) : row
        );
        set("sizeChart", { ...form.sizeChart, rows });
    };

    const removeSizeRow = (rowIdx) => {
        set("sizeChart", {
            ...form.sizeChart,
            rows: form.sizeChart.rows.filter((_, i) => i !== rowIdx),
        });
    };

    const inputStyle = {
        width: "100%", background: "#f8fafc",
        border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8,
        padding: "9px 12px", color: "#0f172a", fontSize: 12,
        outline: "none",
    };

    const labelStyle = {
        color: "#94a3b8", fontSize: 9, letterSpacing: 1.5,
        display: "block", marginBottom: 5, fontWeight: 600,
    };

    const tabs = ["basic", "details", "sizes"];

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
            <div style={{
                background: "#fff", borderRadius: 20, width: "860px", maxWidth: "95vw",
                boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                animation: "fadeSlideUp 0.3s ease both",
                display: "flex", flexDirection: "column", maxHeight: "92vh",
            }}>
                {/* Header */}
                <div style={{
                    padding: "20px 28px 0", borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexShrink: 0,
                }}>
                    <div>
                        <div style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 18, fontWeight: 800 }}>
                            {form.id ? "Edit Product" : "Add Product"}
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>Fill in all product information</div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 10 }}>
                        {tabs.map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                padding: "6px 16px", borderRadius: 7, border: "none", cursor: "pointer",
                                background: tab === t ? "#fff" : "transparent",
                                color: tab === t ? "#0f172a" : "#94a3b8",
                                fontSize: 12, fontWeight: tab === t ? 700 : 500,
                                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                transition: "all 0.2s", textTransform: "capitalize",
                            }}>{t === "basic" ? "Basic Info" : t === "details" ? "Details" : "Sizes & Chart"}</button>
                        ))}
                    </div>

                    <button onClick={onClose} style={{
                        width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)",
                        background: "#f8fafc", cursor: "pointer", fontSize: 14, color: "#64748b",
                    }}>✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: "20px 28px", overflowY: "auto", flex: 1 }}>

                    {/* ── TAB: BASIC INFO ── */}
                    {tab === "basic" && (
                        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
                            {/* Image upload */}
                            <div>
                                <label style={labelStyle}>PRODUCT IMAGE</label>
                                <div
                                    onClick={() => inputRef.current.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                                    style={{
                                        border: `2px dashed ${dragging ? "#eab308" : "rgba(0,0,0,0.12)"}`,
                                        borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                                        background: dragging ? "rgba(234,179,8,0.04)" : "#f8fafc",
                                        overflow: "hidden", height: preview ? 200 : 160,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}
                                >
                                    {preview ? (
                                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                            <img src={preview} alt="preview"
                                                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                            <div style={{
                                                position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                opacity: 0, transition: "opacity 0.2s",
                                            }}
                                                 onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                                 onMouseLeave={e => e.currentTarget.style.opacity = 0}
                                            >
                                                <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>🖼 Change</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: "center", padding: 16 }}>
                                            <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
                                            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>Click to select</div>
                                            <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 3 }}>or drag & drop</div>
                                            <div style={{ color: "#cbd5e1", fontSize: 9, marginTop: 2 }}>PNG · JPG · WEBP</div>
                                        </div>
                                    )}
                                </div>
                                <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
                                       onChange={(e) => handleFile(e.target.files[0])} />
                                {preview && (
                                    <button onClick={() => { setPreview(null); set("image", null); }} style={{
                                        marginTop: 6, width: "100%", background: "rgba(248,113,113,0.08)",
                                        border: "1px solid rgba(248,113,113,0.2)", color: "#ef4444",
                                        fontSize: 10, padding: "5px", borderRadius: 6, cursor: "pointer", fontWeight: 600,
                                    }}>✕ Remove</button>
                                )}
                            </div>

                            {/* Right fields */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                {/* Name - full width */}
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <label style={labelStyle}>PRODUCT NAME *</label>
                                    <input value={form.name} onChange={e => set("name", e.target.value)}
                                           placeholder="e.g. Merino Wool Sweater" style={inputStyle}
                                           onFocus={e => e.target.style.borderColor = "#eab308"}
                                           onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                                </div>

                                <div>
                                    <label style={labelStyle}>CATEGORY *</label>
                                    <input value={form.category} onChange={e => set("category", e.target.value)}
                                           placeholder="e.g. Knitwear" style={inputStyle}
                                           onFocus={e => e.target.style.borderColor = "#eab308"}
                                           onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                                </div>

                                <div>
                                    <label style={labelStyle}>GENDER *</label>
                                    <select value={form.gender} onChange={e => set("gender", e.target.value)}
                                            style={{ ...inputStyle, cursor: "pointer" }}>
                                        {GENDERS.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={labelStyle}>PRICE ($) *</label>
                                    <input value={form.price} onChange={e => set("price", e.target.value)}
                                           placeholder="e.g. 128" type="number" style={inputStyle}
                                           onFocus={e => e.target.style.borderColor = "#eab308"}
                                           onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                                </div>

                                <div>
                                    <label style={labelStyle}>STOCK *</label>
                                    <input value={form.stock} onChange={e => set("stock", e.target.value)}
                                           placeholder="e.g. 50" type="number" style={inputStyle}
                                           onFocus={e => e.target.style.borderColor = "#eab308"}
                                           onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                                </div>

                                <div>
                                    <label style={labelStyle}>BADGE</label>
                                    <select value={form.badge} onChange={e => set("badge", e.target.value)}
                                            style={{ ...inputStyle, cursor: "pointer" }}>
                                        {BADGES.map(b => <option key={b} value={b}>{b || "— None —"}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={labelStyle}>VARIANT / COLOR</label>
                                    <input value={form.variant} onChange={e => set("variant", e.target.value)}
                                           placeholder="e.g. Ivory" style={inputStyle}
                                           onFocus={e => e.target.style.borderColor = "#eab308"}
                                           onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                                </div>

                                {/* Available sizes */}
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <label style={labelStyle}>AVAILABLE SIZES</label>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {SIZES.map(size => (
                                            <div key={size} onClick={() => toggleSize(size)} style={{
                                                width: 40, height: 36, borderRadius: 8, cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 12, fontWeight: 700, transition: "all 0.15s",
                                                background: form.sizes.includes(size) ? "#eab308" : "#f1f5f9",
                                                color: form.sizes.includes(size) ? "#000" : "#64748b",
                                                border: form.sizes.includes(size) ? "1px solid #eab308" : "1px solid rgba(0,0,0,0.08)",
                                                boxShadow: form.sizes.includes(size) ? "0 2px 8px rgba(234,179,8,0.3)" : "none",
                                            }}>{size}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── TAB: DETAILS ── */}
                    {tab === "details" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={{ gridColumn: "1 / -1" }}>
                                <label style={labelStyle}>DESCRIPTION</label>
                                <textarea value={form.description} onChange={e => set("description", e.target.value)}
                                          placeholder="A classic merino wool sweater crafted for everyday elegance..."
                                          rows={4} style={{
                                    ...inputStyle, resize: "vertical", lineHeight: 1.6, fontFamily: "inherit",
                                }}
                                          onFocus={e => e.target.style.borderColor = "#eab308"}
                                          onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                            </div>

                            <div>
                                <label style={labelStyle}>MATERIAL</label>
                                <input value={form.material} onChange={e => set("material", e.target.value)}
                                       placeholder="e.g. 100% Merino Wool" style={inputStyle}
                                       onFocus={e => e.target.style.borderColor = "#eab308"}
                                       onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                            </div>

                            <div>
                                <label style={labelStyle}>CARE INSTRUCTIONS</label>
                                <input value={form.care} onChange={e => set("care", e.target.value)}
                                       placeholder="e.g. Hand wash cold · Dry flat" style={inputStyle}
                                       onFocus={e => e.target.style.borderColor = "#eab308"}
                                       onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
                            </div>

                            {/* Preview card */}
                            {(form.name || form.price) && (
                                <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                                    <label style={labelStyle}>PREVIEW</label>
                                    <div style={{
                                        background: "#f8fafc", borderRadius: 12, padding: 16,
                                        border: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start",
                                    }}>
                                        {preview && <img src={preview} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />}
                                        <div>
                                            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 14 }}>{form.name || "—"}</div>
                                            <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{form.category} · {form.gender} · {form.variant}</div>
                                            {form.badge && <span style={{
                                                display: "inline-block", marginTop: 4, background: "rgba(234,179,8,0.15)",
                                                color: "#b45309", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                                            }}>{form.badge}</span>}
                                            <div style={{ color: "#eab308", fontWeight: 800, fontSize: 16, marginTop: 6 }}>${form.price}</div>
                                            {form.description && <div style={{ color: "#64748b", fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>{form.description.slice(0, 100)}...</div>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── TAB: SIZES & CHART ── */}
                    {tab === "sizes" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <div>
                                        <label style={labelStyle}>SIZE CHART</label>
                                        <div style={{ color: "#64748b", fontSize: 11 }}>Headers: {form.sizeChart.headers.join(" · ")}</div>
                                    </div>
                                    <button onClick={addSizeRow} style={{
                                        background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)",
                                        color: "#b45309", fontSize: 11, fontWeight: 700,
                                        padding: "6px 14px", borderRadius: 8, cursor: "pointer",
                                    }}>+ Add Row</button>
                                </div>

                                {/* Table */}
                                <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)" }}>
                                    {/* Header row */}
                                    <div style={{
                                        display: "grid", gridTemplateColumns: `repeat(${form.sizeChart.headers.length}, 1fr) 36px`,
                                        background: "#f8fafc", borderBottom: "1px solid rgba(0,0,0,0.06)",
                                    }}>
                                        {form.sizeChart.headers.map((h, i) => (
                                            <div key={i} style={{ padding: "10px 12px", color: "#64748b", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{h}</div>
                                        ))}
                                        <div />
                                    </div>

                                    {form.sizeChart.rows.length === 0 && (
                                        <div style={{ padding: "24px", textAlign: "center", color: "#cbd5e1", fontSize: 12 }}>
                                            No rows yet — click "+ Add Row"
                                        </div>
                                    )}

                                    {form.sizeChart.rows.map((row, rowIdx) => (
                                        <div key={rowIdx} style={{
                                            display: "grid", gridTemplateColumns: `repeat(${form.sizeChart.headers.length}, 1fr) 36px`,
                                            borderBottom: "1px solid rgba(0,0,0,0.04)",
                                            background: rowIdx % 2 === 0 ? "#fff" : "#fafafa",
                                        }}>
                                            {row.map((cell, colIdx) => (
                                                <input key={colIdx} value={cell}
                                                       onChange={e => updateSizeRow(rowIdx, colIdx, e.target.value)}
                                                       placeholder={form.sizeChart.headers[colIdx]}
                                                       style={{
                                                           border: "none", background: "transparent", padding: "9px 12px",
                                                           fontSize: 12, color: "#0f172a", outline: "none", width: "100%",
                                                       }}
                                                       onFocus={e => e.target.style.background = "rgba(234,179,8,0.05)"}
                                                       onBlur={e => e.target.style.background = "transparent"}
                                                />
                                            ))}
                                            <button onClick={() => removeSizeRow(rowIdx)} style={{
                                                border: "none", background: "transparent", cursor: "pointer",
                                                color: "#f87171", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>✕</button>
                                        </div>
                                    ))}
                                </div>

                                {form.sizeChart.rows.length > 0 && (
                                    <div style={{ marginTop: 10, color: "#94a3b8", fontSize: 10 }}>
                                        {form.sizeChart.rows.length} row(s) · Click a cell to edit
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: "16px 28px", borderTop: "1px solid rgba(0,0,0,0.06)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexShrink: 0, background: "#fafafa", borderRadius: "0 0 20px 20px",
                }}>
                    <div style={{ color: "#94a3b8", fontSize: 11 }}>
                        {form.name ? `📦 ${form.name}` : "No product name yet"} {form.price ? `· $${form.price}` : ""}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={onClose} style={{
                            background: "transparent", border: "1px solid rgba(0,0,0,0.1)",
                            color: "#64748b", padding: "9px 20px", borderRadius: 10,
                            cursor: "pointer", fontSize: 12, fontWeight: 500,
                        }}>Cancel</button>
                        <button onClick={() => onSave && onSave(form)} style={{
                            background: "linear-gradient(135deg, #eab308, #f59e0b)",
                            border: "none", color: "#000", fontWeight: 700,
                            padding: "9px 24px", borderRadius: 10, cursor: "pointer", fontSize: 12,
                            boxShadow: "0 4px 15px rgba(234,179,8,0.3)",
                        }}>
                            {form.id ? "Save Changes" : "Add Product"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
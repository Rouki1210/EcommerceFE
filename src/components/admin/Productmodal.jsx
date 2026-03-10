import { useState, useRef } from "react";

export default function ProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState({ ...product });
    const [preview, setPreview] = useState(product?.image || null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef();

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        setForm(prev => ({ ...prev, image: url, imageFile: file }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
            <div style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 20, padding: 32, width: 460,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                animation: "fadeSlideUp 0.3s ease both",
                maxHeight: "90vh", overflowY: "auto",
            }}>
                {/* Title */}
                <div style={{
                    fontFamily: "Syne, sans-serif", color: "#0f172a",
                    fontSize: 20, fontWeight: 800, marginBottom: 24,
                }}>
                    {form.id ? "Edit Product" : "Add Product"}
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ color: "#94a3b8", fontSize: 10, letterSpacing: 1.5, display: "block", marginBottom: 8 }}>
                        PRODUCT IMAGE
                    </label>

                    <div
                        onClick={() => inputRef.current.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        style={{
                            border: `2px dashed ${dragging ? "#eab308" : "rgba(0,0,0,0.12)"}`,
                            borderRadius: 12, cursor: "pointer",
                            transition: "all 0.2s ease",
                            background: dragging ? "rgba(234,179,8,0.04)" : "#f8fafc",
                            overflow: "hidden",
                            height: preview ? "auto" : 120,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        {preview ? (
                            <div style={{ position: "relative", width: "100%" }}>
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                                />
                                <div
                                    style={{
                                        position: "absolute", inset: 0,
                                        background: "rgba(0,0,0,0.4)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        opacity: 0, transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                    onMouseLeave={e => e.currentTarget.style.opacity = 0}
                                >
                                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>🖼 Change Image</span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: 20 }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
                                <div style={{ color: "#64748b", fontSize: 12, fontWeight: 500 }}>Click to select image</div>
                                <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>or drag & drop here</div>
                                <div style={{ color: "#cbd5e1", fontSize: 10, marginTop: 2 }}>PNG, JPG, WEBP</div>
                            </div>
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleFile(e.target.files[0])}
                    />

                    {preview && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreview(null);
                                setForm(prev => ({ ...prev, image: null }));
                            }}
                            style={{
                                marginTop: 8, background: "rgba(248,113,113,0.1)",
                                border: "1px solid rgba(248,113,113,0.2)", color: "#ef4444",
                                fontSize: 11, padding: "4px 12px", borderRadius: 6,
                                cursor: "pointer", fontWeight: 600,
                            }}
                        >✕ Remove Image</button>
                    )}
                </div>

                {/* Fields */}
                {[
                    { field: "name",     label: "NAME",     placeholder: "e.g. Nike Air Max" },
                    { field: "category", label: "CATEGORY", placeholder: "e.g. Sneakers" },
                    { field: "price",    label: "PRICE",    placeholder: "e.g. 120" },
                    { field: "stock",    label: "STOCK",    placeholder: "e.g. 10" },
                ].map(({ field, label, placeholder }) => (
                    <div key={field} style={{ marginBottom: 16 }}>
                        <label style={{ color: "#94a3b8", fontSize: 10, letterSpacing: 1.5, display: "block", marginBottom: 6 }}>
                            {label}
                        </label>
                        <input
                            value={form[field] || ""}
                            onChange={e => handleChange(field, e.target.value)}
                            placeholder={placeholder}
                            style={{
                                width: "100%", background: "#f8fafc",
                                border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8,
                                padding: "10px 14px", color: "#0f172a", fontSize: 13,
                                outline: "none", transition: "border 0.2s ease",
                            }}
                            onFocus={e => e.target.style.borderColor = "#eab308"}
                            onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"}
                        />
                    </div>
                ))}

                {/* Buttons */}
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button onClick={onClose} style={{
                        flex: 1, background: "transparent",
                        border: "1px solid rgba(0,0,0,0.1)",
                        color: "#64748b", padding: "11px", borderRadius: 10,
                        cursor: "pointer", fontSize: 13, fontWeight: 500,
                    }}>Cancel</button>
                    <button onClick={() => onSave && onSave(form)} style={{
                        flex: 1, background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", color: "#000", fontWeight: 700,
                        padding: "11px", borderRadius: 10, cursor: "pointer", fontSize: 13,
                        boxShadow: "0 4px 15px rgba(234,179,8,0.3)",
                    }}>Save</button>
                </div>
            </div>
        </div>
    );
}
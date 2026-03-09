export default function ProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState({ ...product });

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
            <div style={{
                background: "#0d0d1a", border: "1px solid rgba(234,179,8,0.2)",
                borderRadius: 20, padding: 32, width: 420,
                boxShadow: "0 0 60px rgba(234,179,8,0.15)",
                animation: "fadeSlideUp 0.3s ease both",
            }}>
                <div style={{
                    fontFamily: "Syne, sans-serif", color: "#f1f5f9",
                    fontSize: 20, fontWeight: 800, marginBottom: 24,
                }}>
                    {form.id ? "Edit Product" : "Add Product"}
                </div>

                {["name", "category", "price", "stock"].map((field) => (
                    <div key={field} style={{ marginBottom: 16 }}>
                        <label style={{ color: "#475569", fontSize: 10, letterSpacing: 1.5, display: "block", marginBottom: 6 }}>
                            {field.toUpperCase()}
                        </label>
                        <input
                            value={form[field] || ""}
                            onChange={e => handleChange(field, e.target.value)}
                            style={{
                                width: "100%", background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                                padding: "10px 14px", color: "#e2e8f0", fontSize: 13, outline: "none",
                            }}
                        />
                    </div>
                ))}

                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button onClick={onClose} style={{
                        flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#64748b", padding: "10px", borderRadius: 10, cursor: "pointer", fontSize: 13,
                    }}>Cancel</button>
                    <button onClick={() => onSave && onSave(form)} style={{
                        flex: 1, background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", color: "#000", fontWeight: 700,
                        padding: "10px", borderRadius: 10, cursor: "pointer", fontSize: 13,
                    }}>Save</button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
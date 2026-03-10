import { useState, useRef } from "react";

export default function ImageUpload({ onUpload, label = "Upload Image" }) {
    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef();

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        onUpload && onUpload(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div>
            {label && (
                <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
                    {label.toUpperCase()}
                </div>
            )}
            <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${dragging ? "#eab308" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 12, padding: 24, textAlign: "center",
                    cursor: "pointer", transition: "all 0.2s ease",
                    background: dragging ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.02)",
                    minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 8,
                }}
            >
                {preview ? (
                    <img src={preview} alt="preview" style={{ maxHeight: 100, borderRadius: 8, objectFit: "cover" }} />
                ) : (
                    <>
                        <span style={{ fontSize: 28 }}>📁</span>
                        <div style={{ color: "#64748b", fontSize: 12 }}>Click or drag image here</div>
                        <div style={{ color: "#334155", fontSize: 10 }}>PNG, JPG, WEBP</div>
                    </>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
    );
}
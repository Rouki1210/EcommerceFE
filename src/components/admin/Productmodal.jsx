import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZES  = ["XS", "S", "M", "L", "XL", "XXL"];
const BADGES = ["", "Bestseller", "New", "Sale", "Limited"];
const GENDERS = ["women", "men", "unisex"];

export default function ProductModal({ product, onClose, onSave }) {
    const [form, setForm]       = useState({ name:"", category:"", gender:"women", price:"", badge:"", variant:"", description:"", material:"", care:"", sizes:[], stock:"", sizeChart:{ headers:["Size","Chest (cm)","Waist (cm)","Length (cm)"], rows:[] }, image:null, imageFile:null, ...product });
    const [preview, setPreview] = useState(product?.image || null);
    const [dragging, setDragging] = useState(false);
    const [tab, setTab]         = useState("basic");
    const inputRef = useRef();

    const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setPreview(url); set("image", url); set("imageFile", file);
    };

    const toggleSize = (size) => {
        const sizes = form.sizes.includes(size) ? form.sizes.filter(s => s !== size) : [...form.sizes, size];
        set("sizes", sizes);
    };

    const addSizeRow    = () => set("sizeChart", { ...form.sizeChart, rows: [...form.sizeChart.rows, ["","","",""]] });
    const removeSizeRow = (i) => set("sizeChart", { ...form.sizeChart, rows: form.sizeChart.rows.filter((_,idx) => idx !== i) });
    const updateSizeRow = (ri, ci, val) => {
        const rows = form.sizeChart.rows.map((row, i) => i === ri ? row.map((c, j) => j === ci ? val : c) : row);
        set("sizeChart", { ...form.sizeChart, rows });
    };

    const inp = { width:"100%", background:"#f8fafc", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:"9px 12px", color:"#0f172a", fontSize:12, outline:"none" };
    const lbl = { color:"#94a3b8", fontSize:9, letterSpacing:1.5, display:"block", marginBottom:5, fontWeight:600 };
    const tabs = ["basic","details","sizes"];

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:"16px", overflowY:"auto" }}
            >
                <motion.div
                    initial={{ opacity:0, scale:0.94, y:24 }}
                    animate={{ opacity:1, scale:1,    y:0  }}
                    exit={{    opacity:0, scale:0.94, y:24 }}
                    transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
                    style={{ background:"#fff", borderRadius:20, width:"min(860px, calc(100vw - 280px))", maxWidth:"98vw", minWidth:0, boxShadow:"0 24px 60px rgba(0,0,0,0.18)", display:"flex", flexDirection:"column", maxHeight:"calc(100vh - 32px)", margin:"auto" }}
                >
                    {/* Header */}
                    <div style={{ padding:"20px 20px 0", borderBottom:"1px solid rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, flexWrap:"wrap", gap:10 }}>
                        <div>
                            <div style={{ fontFamily:"Syne,sans-serif", color:"#0f172a", fontSize:18, fontWeight:800 }}>{form.id ? "Edit Product" : "Add Product"}</div>
                            <div style={{ color:"#94a3b8", fontSize:11, marginTop:2 }}>Fill in all product information</div>
                        </div>
                        <div style={{ display:"flex", gap:4, background:"#f1f5f9", padding:4, borderRadius:10 }}>
                            {tabs.map(t => (
                                <motion.button key={t} onClick={() => setTab(t)} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} style={{
                                    padding:"6px 16px", borderRadius:7, border:"none", cursor:"pointer",
                                    background: tab===t ? "#fff" : "transparent",
                                    color: tab===t ? "#0f172a" : "#94a3b8",
                                    fontSize:12, fontWeight: tab===t ? 700 : 500,
                                    boxShadow: tab===t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                    transition:"all 0.2s", textTransform:"capitalize",
                                }}>{t==="basic" ? "Basic Info" : t==="details" ? "Details" : "Sizes & Chart"}</motion.button>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale:1.1, background:"#fee2e2" }} whileTap={{ scale:0.9 }} onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:"1px solid rgba(0,0,0,0.08)", background:"#f8fafc", cursor:"pointer", fontSize:14, color:"#64748b" }}>✕</motion.button>
                    </div>

                    {/* Body */}
                    <div style={{ padding:"20px", overflowY:"auto", flex:1 }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={tab} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }} transition={{ duration:0.2 }}>

                                {/* BASIC TAB */}
                                {tab==="basic" && (
                                    <div style={{ display:"grid", gridTemplateColumns:"min(200px, 35%) 1fr", gap:20 }}>
                                        {/* Image upload */}
                                        <div>
                                            <label style={lbl}>PRODUCT IMAGE</label>
                                            <motion.div
                                                onClick={() => inputRef.current.click()}
                                                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                                onDragLeave={() => setDragging(false)}
                                                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                                                whileHover={{ borderColor:"#eab308" }}
                                                style={{ border:`2px dashed ${dragging?"#eab308":"rgba(0,0,0,0.12)"}`, borderRadius:12, cursor:"pointer", background: dragging?"rgba(234,179,8,0.04)":"#f8fafc", overflow:"hidden", height:preview?"auto":160, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
                                            >
                                                {preview ? (
                                                    <div style={{ position:"relative", width:"100%" }}>
                                                        <img src={preview} alt="preview" style={{ width:"100%", height:160, objectFit:"cover", display:"block" }} />
                                                        <motion.div initial={{ opacity:0 }} whileHover={{ opacity:1 }} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                                                            <span style={{ color:"#fff", fontSize:11, fontWeight:600 }}>🖼 Change</span>
                                                        </motion.div>
                                                    </div>
                                                ) : (
                                                    <div style={{ textAlign:"center", padding:16 }}>
                                                        <div style={{ fontSize:28, marginBottom:6 }}>📁</div>
                                                        <div style={{ color:"#64748b", fontSize:11, fontWeight:600 }}>Click to select</div>
                                                        <div style={{ color:"#94a3b8", fontSize:10, marginTop:3 }}>or drag & drop</div>
                                                        <div style={{ color:"#cbd5e1", fontSize:9, marginTop:2 }}>PNG · JPG · WEBP</div>
                                                    </div>
                                                )}
                                            </motion.div>
                                            <input ref={inputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])} />
                                            {preview && (
                                                <motion.button whileHover={{ scale:1.03 }} onClick={() => { setPreview(null); set("image",null); }} style={{ marginTop:6, width:"100%", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", color:"#ef4444", fontSize:10, padding:"5px", borderRadius:6, cursor:"pointer", fontWeight:600 }}>✕ Remove</motion.button>
                                            )}
                                        </div>

                                        {/* Fields */}
                                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                                            <div style={{ gridColumn:"1/-1" }}>
                                                <label style={lbl}>PRODUCT NAME *</label>
                                                <input value={form.name} onChange={e => set("name",e.target.value)} placeholder="e.g. Merino Wool Sweater" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} />
                                            </div>
                                            <div><label style={lbl}>CATEGORY *</label><input value={form.category} onChange={e=>set("category",e.target.value)} placeholder="e.g. Knitwear" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                            <div><label style={lbl}>GENDER *</label><select value={form.gender} onChange={e=>set("gender",e.target.value)} style={{...inp,cursor:"pointer"}}>{GENDERS.map(g=><option key={g} value={g}>{g.charAt(0).toUpperCase()+g.slice(1)}</option>)}</select></div>
                                            <div><label style={lbl}>PRICE ($) *</label><input value={form.price} onChange={e=>set("price",e.target.value)} placeholder="e.g. 128" type="number" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                            <div><label style={lbl}>STOCK *</label><input value={form.stock} onChange={e=>set("stock",e.target.value)} placeholder="e.g. 50" type="number" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                            <div><label style={lbl}>BADGE</label><select value={form.badge} onChange={e=>set("badge",e.target.value)} style={{...inp,cursor:"pointer"}}>{BADGES.map(b=><option key={b} value={b}>{b||"— None —"}</option>)}</select></div>
                                            <div><label style={lbl}>VARIANT / COLOR</label><input value={form.variant} onChange={e=>set("variant",e.target.value)} placeholder="e.g. Ivory" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                            <div style={{ gridColumn:"1/-1" }}>
                                                <label style={lbl}>AVAILABLE SIZES</label>
                                                <div style={{ display:"flex", gap:8 }}>
                                                    {SIZES.map(size => (
                                                        <motion.div key={size} onClick={() => toggleSize(size)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.93 }} style={{ width:40, height:36, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, background: form.sizes.includes(size)?"#eab308":"#f1f5f9", color: form.sizes.includes(size)?"#000":"#64748b", border: form.sizes.includes(size)?"1px solid #eab308":"1px solid rgba(0,0,0,0.08)", boxShadow: form.sizes.includes(size)?"0 2px 8px rgba(234,179,8,0.3)":"none" }}>{size}</motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* DETAILS TAB */}
                                {tab==="details" && (
                                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                                        <div style={{ gridColumn:"1/-1" }}>
                                            <label style={lbl}>DESCRIPTION</label>
                                            <textarea value={form.description} onChange={e=>set("description",e.target.value)} placeholder="A classic merino wool sweater..." rows={4} style={{...inp,resize:"vertical",lineHeight:1.6,fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} />
                                        </div>
                                        <div><label style={lbl}>MATERIAL</label><input value={form.material} onChange={e=>set("material",e.target.value)} placeholder="e.g. 100% Merino Wool" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                        <div><label style={lbl}>CARE INSTRUCTIONS</label><input value={form.care} onChange={e=>set("care",e.target.value)} placeholder="e.g. Hand wash cold" style={inp} onFocus={e=>e.target.style.borderColor="#eab308"} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.08)"} /></div>
                                        {(form.name||form.price) && (
                                            <div style={{ gridColumn:"1/-1" }}>
                                                <label style={lbl}>PREVIEW</label>
                                                <div style={{ background:"#f8fafc", borderRadius:12, padding:16, border:"1px solid rgba(0,0,0,0.06)", display:"flex", gap:16, alignItems:"flex-start" }}>
                                                    {preview && <img src={preview} alt="" style={{ width:60, height:60, objectFit:"cover", borderRadius:8 }} />}
                                                    <div>
                                                        <div style={{ color:"#0f172a", fontWeight:700, fontSize:14 }}>{form.name||"—"}</div>
                                                        <div style={{ color:"#64748b", fontSize:11, marginTop:2 }}>{form.category} · {form.gender} · {form.variant}</div>
                                                        {form.badge && <span style={{ display:"inline-block", marginTop:4, background:"rgba(234,179,8,0.15)", color:"#b45309", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{form.badge}</span>}
                                                        <div style={{ color:"#eab308", fontWeight:800, fontSize:16, marginTop:6 }}>${form.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* SIZES TAB */}
                                {tab==="sizes" && (
                                    <div>
                                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                                            <div><label style={lbl}>SIZE CHART</label><div style={{ color:"#64748b", fontSize:11 }}>Headers: {form.sizeChart.headers.join(" · ")}</div></div>
                                            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={addSizeRow} style={{ background:"rgba(234,179,8,0.1)", border:"1px solid rgba(234,179,8,0.25)", color:"#b45309", fontSize:11, fontWeight:700, padding:"6px 14px", borderRadius:8, cursor:"pointer" }}>+ Add Row</motion.button>
                                        </div>
                                        <div style={{ borderRadius:12, overflow:"hidden", border:"1px solid rgba(0,0,0,0.07)" }}>
                                            <div style={{ display:"grid", gridTemplateColumns:`repeat(${form.sizeChart.headers.length},1fr) 36px`, background:"#f8fafc", borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
                                                {form.sizeChart.headers.map((h,i) => <div key={i} style={{ padding:"10px 12px", color:"#64748b", fontSize:10, fontWeight:700, letterSpacing:1 }}>{h}</div>)}
                                                <div/>
                                            </div>
                                            {form.sizeChart.rows.length===0 && <div style={{ padding:"24px", textAlign:"center", color:"#cbd5e1", fontSize:12 }}>No rows yet — click "+ Add Row"</div>}
                                            <AnimatePresence>
                                                {form.sizeChart.rows.map((row,ri) => (
                                                    <motion.div key={ri} initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }} style={{ display:"grid", gridTemplateColumns:`repeat(${form.sizeChart.headers.length},1fr) 36px`, borderBottom:"1px solid rgba(0,0,0,0.04)", background:ri%2===0?"#fff":"#fafafa" }}>
                                                        {row.map((cell,ci) => <input key={ci} value={cell} onChange={e=>updateSizeRow(ri,ci,e.target.value)} placeholder={form.sizeChart.headers[ci]} style={{ border:"none", background:"transparent", padding:"9px 12px", fontSize:12, color:"#0f172a", outline:"none", width:"100%" }} onFocus={e=>e.target.style.background="rgba(234,179,8,0.05)"} onBlur={e=>e.target.style.background="transparent"} />)}
                                                        <button onClick={() => removeSizeRow(ri)} style={{ border:"none", background:"transparent", cursor:"pointer", color:"#f87171", fontSize:14 }}>✕</button>
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
                    <div style={{ padding:"14px 20px", borderTop:"1px solid rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, background:"#fafafa", borderRadius:"0 0 20px 20px", flexWrap:"wrap", gap:10 }}>
                        <div style={{ color:"#94a3b8", fontSize:11 }}>{form.name ? `📦 ${form.name}` : "No product name yet"}{form.price ? ` · $${form.price}` : ""}</div>
                        <div style={{ display:"flex", gap:10 }}>
                            <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={onClose} style={{ background:"transparent", border:"1px solid rgba(0,0,0,0.1)", color:"#64748b", padding:"9px 20px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:500 }}>Cancel</motion.button>
                            <motion.button whileHover={{ scale:1.03, boxShadow:"0 6px 20px rgba(234,179,8,0.4)" }} whileTap={{ scale:0.97 }} onClick={() => onSave && onSave(form)} style={{ background:"linear-gradient(135deg,#eab308,#f59e0b)", border:"none", color:"#000", fontWeight:700, padding:"9px 24px", borderRadius:10, cursor:"pointer", fontSize:12, boxShadow:"0 4px 15px rgba(234,179,8,0.3)" }}>{form.id ? "Save Changes" : "Add Product"}</motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
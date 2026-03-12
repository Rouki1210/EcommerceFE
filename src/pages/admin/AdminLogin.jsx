import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const ADMIN_CREDENTIALS = { email: "admin@shop.com", password: "admin123" };

    const handleSubmit = () => {
        setError("");
        if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
        setLoading(true);
        setTimeout(() => {
            if (form.email === ADMIN_CREDENTIALS.email && form.password === ADMIN_CREDENTIALS.password) {
                localStorage.setItem("adminAuth", "true");
                navigate("/admin/dashboard");
            } else {
                setError("Invalid email or password.");
            }
            setLoading(false);
        }, 800);
    };

    const inp = {
        width: "100%", background: "#f8fafc",
        border: "1px solid #e2e8f0", borderRadius: 10,
        padding: "12px 14px", color: "#0f172a", fontSize: 13,
        outline: "none", boxSizing: "border-box", transition: "all 0.2s",
    };

    return (
        <div style={{
            minHeight: "100vh", display: "flex",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%,100% { transform: translateY(0); }
                    50%      { transform: translateY(-8px); }
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                input::placeholder { color: #cbd5e1; }
                .login-input:focus {
                    border-color: #eab308 !important;
                    background: #fff !important;
                    box-shadow: 0 0 0 3px rgba(234,179,8,0.1) !important;
                }
                .stat-card:hover { transform: translateY(-2px); }
            `}</style>

            {/* LEFT PANEL — Light editorial style */}
            <div style={{
                width: "48%",
                background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                padding: "48px 56px",
                position: "relative", overflow: "hidden",
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: "absolute", top: -80, right: -80,
                    width: 300, height: 300, borderRadius: "50%",
                    background: "rgba(234,179,8,0.15)", pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: -60, left: -60,
                    width: 240, height: 240, borderRadius: "50%",
                    background: "rgba(234,179,8,0.1)", pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "45%", right: 40,
                    width: 120, height: 120, borderRadius: "50%",
                    background: "rgba(234,179,8,0.12)", pointerEvents: "none",
                }} />

                {/* Top: Logo */}
                <div style={{ position: "relative", zIndex: 1, animation: "fadeSlideUp 0.5s ease both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: "linear-gradient(135deg, #eab308, #f59e0b)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20, fontWeight: 900, color: "#000",
                            boxShadow: "0 4px 16px rgba(234,179,8,0.4)",
                            animation: "float 3s ease-in-out infinite",
                        }}>A</div>
                        <div>
                            <div style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 15, fontWeight: 800, letterSpacing: 1 }}>
                                ADMIN PAGE
                            </div>
                            <div style={{ color: "#92400e", fontSize: 9, letterSpacing: 2 }}>ECOMMERCE</div>
                        </div>
                    </div>
                </div>

                {/* Middle: Hero text */}
                <div style={{ position: "relative", zIndex: 1, animation: "fadeSlideUp 0.6s ease 0.1s both" }}>
                    <div style={{
                        display: "inline-block", background: "rgba(180,83,9,0.1)",
                        color: "#92400e", fontSize: 10, fontWeight: 700,
                        letterSpacing: 2, padding: "5px 12px", borderRadius: 20,
                        marginBottom: 20, border: "1px solid rgba(180,83,9,0.15)",
                    }}>MANAGEMENT PORTAL</div>

                    <h2 style={{
                        fontFamily: "Syne, sans-serif", color: "#0f172a",
                        fontSize: 40, fontWeight: 800, lineHeight: 1.15,
                        letterSpacing: -1, margin: "0 0 20px",
                    }}>
                        Your store,<br />
                        <span style={{ color: "#d97706" }}>fully in control.</span>
                    </h2>

                    <p style={{ color: "#78350f", fontSize: 13, lineHeight: 1.8, maxWidth: 320, margin: 0 }}>
                        Manage products, track orders, and grow your ecommerce business from one powerful dashboard.
                    </p>

                    {/* Stats row */}
                    <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
                        {[
                            { value: "1.2K", label: "Orders", icon: "📦" },
                            { value: "$48K", label: "Revenue", icon: "💰" },
                            { value: "3.4K", label: "Customers", icon: "👥" },
                        ].map((s, i) => (
                            <div key={i} className="stat-card" style={{
                                flex: 1, background: "rgba(255,255,255,0.7)",
                                border: "1px solid rgba(234,179,8,0.3)",
                                borderRadius: 14, padding: "14px 16px",
                                backdropFilter: "blur(8px)",
                                transition: "transform 0.2s",
                                cursor: "default",
                            }}>
                                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                                <div style={{ fontFamily: "Syne, sans-serif", color: "#0f172a", fontSize: 18, fontWeight: 800 }}>{s.value}</div>
                                <div style={{ color: "#92400e", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: trust badges */}
                <div style={{ position: "relative", zIndex: 1, animation: "fadeSlideUp 0.6s ease 0.2s both" }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                        {["🔒 Secure", "⚡ Fast", "📊 Analytics"].map((t, i) => (
                            <div key={i} style={{
                                color: "#92400e", fontSize: 11, fontWeight: 600,
                                display: "flex", alignItems: "center", gap: 4,
                            }}>{t}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL — Form */}
            <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", padding: 48,
                background: "#fff",
            }}>
                <div style={{
                    width: "100%", maxWidth: 400,
                    animation: "fadeSlideUp 0.5s ease 0.15s both",
                }}>
                    <div style={{ marginBottom: 36 }}>
                        <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>
                            WELCOME BACK
                        </div>
                        <h1 style={{
                            fontFamily: "Syne, sans-serif", color: "#0f172a",
                            fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5,
                        }}>Sign in to your<br />admin account</h1>
                        <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 10 }}>
                            Enter your credentials to continue
                        </p>
                    </div>

                    {error && (
                        <div style={{
                            background: "#fef2f2", border: "1px solid #fecaca",
                            borderRadius: 10, padding: "10px 14px", marginBottom: 20,
                            color: "#ef4444", fontSize: 12, display: "flex", alignItems: "center", gap: 8,
                        }}>⚠ {error}</div>
                    )}

                    <div style={{ marginBottom: 18 }}>
                        <label style={{ color: "#475569", fontSize: 11, fontWeight: 600, display: "block", marginBottom: 7 }}>
                            Email address
                        </label>
                        <input
                            className="login-input"
                            type="email" value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                            placeholder="admin@shop.com"
                            style={inp}
                        />
                    </div>

                    <div style={{ marginBottom: 28 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                            <label style={{ color: "#475569", fontSize: 11, fontWeight: 600 }}>Password</label>
                            <span style={{ color: "#eab308", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                                Forgot password?
                            </span>
                        </div>
                        <div style={{ position: "relative" }}>
                            <input
                                className="login-input"
                                type={showPass ? "text" : "password"} value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                placeholder="••••••••"
                                style={{ ...inp, paddingRight: 44 }}
                            />
                            <button onClick={() => setShowPass(!showPass)} style={{
                                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14,
                            }}>{showPass ? "🙈" : "👁"}</button>
                        </div>
                    </div>

                    <button onClick={handleSubmit} disabled={loading} style={{
                        width: "100%", padding: "13px",
                        background: loading ? "#fde68a" : "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
                        color: "#000", fontWeight: 800, fontSize: 14,
                        boxShadow: loading ? "none" : "0 4px 20px rgba(234,179,8,0.35)",
                        transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                        {loading
                            ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Signing in...</>
                            : "Sign In →"
                        }
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                        <span style={{ color: "#cbd5e1", fontSize: 11 }}>DEMO ACCESS</span>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                    </div>

                    <div style={{
                        background: "#f8fafc", borderRadius: 12, padding: "14px 16px",
                        border: "1px solid #e2e8f0", display: "flex", gap: 24, alignItems: "center",
                    }}>
                        <div>
                            <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>EMAIL</div>
                            <div style={{ color: "#0f172a", fontSize: 12, fontWeight: 600 }}>admin@shop.com</div>
                        </div>
                        <div style={{ width: 1, background: "#e2e8f0", alignSelf: "stretch" }} />
                        <div>
                            <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>PASSWORD</div>
                            <div style={{ color: "#0f172a", fontSize: 12, fontWeight: 600 }}>admin123</div>
                        </div>
                        <button
                            onClick={() => setForm({ email: "admin@shop.com", password: "admin123" })}
                            style={{
                                marginLeft: "auto", background: "rgba(234,179,8,0.1)",
                                border: "1px solid rgba(234,179,8,0.25)", color: "#b45309",
                                fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6,
                                cursor: "pointer", whiteSpace: "nowrap",
                            }}
                        >Fill ↗</button>
                    </div>

                    <div style={{ textAlign: "center", marginTop: 28 }}>
                        <a href="/" style={{ color: "#94a3b8", fontSize: 12, textDecoration: "none" }}>
                            ← Back to shop
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
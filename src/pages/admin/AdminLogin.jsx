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
            background: "#f1f5f9",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #cbd5e1; }
        .login-input:focus { border-color: #eab308 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(234,179,8,0.1) !important; }
      `}</style>

            {/* LEFT PANEL — Branding */}
            <div style={{
                width: "45%", background: "linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                padding: 48, position: "relative", overflow: "hidden",
            }}>
                {/* Grid pattern */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(rgba(234,179,8,0.08) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }} />
                {/* Glow */}
                <div style={{
                    position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
                    width: 400, height: 400,
                    background: "radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)",
                }} />

                <div style={{ position: "relative", zIndex: 1, textAlign: "center", animation: "fadeSlideUp 0.6s ease both" }}>
                    {/* Logo */}
                    <div style={{
                        width: 64, height: 64, borderRadius: 18,
                        background: "linear-gradient(135deg, #eab308, #f59e0b)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 28, fontWeight: 900, color: "#000",
                        boxShadow: "0 0 40px rgba(234,179,8,0.4)",
                        margin: "0 auto 20px",
                        animation: "float 3s ease-in-out infinite",
                    }}>A</div>

                    <div style={{ fontFamily: "Syne, sans-serif", color: "#fff", fontSize: 28, fontWeight: 800, letterSpacing: 2 }}>
                        ADMINEX
                    </div>
                    <div style={{ color: "#475569", fontSize: 11, letterSpacing: 4, marginTop: 6 }}>
                        E-COMMERCE CONTROL PANEL
                    </div>

                    {/* Divider */}
                    <div style={{ width: 40, height: 2, background: "#eab308", margin: "28px auto", borderRadius: 2 }} />

                    {/* Stats preview */}
                    <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
                        {[
                            { label: "Orders", value: "1.2K" },
                            { label: "Revenue", value: "$48K" },
                            { label: "Users", value: "3.4K" },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div style={{ fontFamily: "Syne, sans-serif", color: "#eab308", fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                                <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 40, color: "#334155", fontSize: 12, lineHeight: 1.8, maxWidth: 280 }}>
                        Manage your store, track orders,<br />
                        and grow your business — all in one place.
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
                    animation: "fadeSlideUp 0.5s ease 0.1s both",
                }}>
                    {/* Header */}
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

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: "#fef2f2", border: "1px solid #fecaca",
                            borderRadius: 10, padding: "10px 14px", marginBottom: 20,
                            color: "#ef4444", fontSize: 12, display: "flex", alignItems: "center", gap: 8,
                        }}>⚠ {error}</div>
                    )}

                    {/* Email */}
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

                    {/* Password */}
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
                        </div>
                    </div>

                    {/* Submit */}
                    <button onClick={handleSubmit} disabled={loading} style={{
                        width: "100%", padding: "13px",
                        background: loading ? "#fde68a" : "linear-gradient(135deg, #eab308, #f59e0b)",
                        border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
                        color: "#000", fontWeight: 800, fontSize: 14,
                        boxShadow: loading ? "none" : "0 4px 20px rgba(234,179,8,0.3)",
                        transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                        {loading
                            ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Signing in...</>
                            : "Sign In →"
                        }
                    </button>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                        <span style={{ color: "#cbd5e1", fontSize: 11 }}>DEMO ACCESS</span>
                        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                    </div>

                    {/* Demo credentials */}
                    <div style={{
                        background: "#f8fafc", borderRadius: 12, padding: "14px 16px",
                        border: "1px solid #e2e8f0", display: "flex", gap: 24,
                    }}>
                        <div>
                            <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>EMAIL</div>
                            <div style={{ color: "#0f172a", fontSize: 12, fontWeight: 600 }}>admin@shop.com</div>
                        </div>
                        <div style={{ width: 1, background: "#e2e8f0" }} />
                        <div>
                            <div style={{ color: "#94a3b8", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>PASSWORD</div>
                            <div style={{ color: "#0f172a", fontSize: 12, fontWeight: 600 }}>admin123</div>
                        </div>
                        <button
                            onClick={() => setForm({ email: "admin@shop.com", password: "admin123" })}
                            style={{
                                marginLeft: "auto", background: "rgba(234,179,8,0.1)",
                                border: "1px solid rgba(234,179,8,0.25)", color: "#b45309",
                                fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                                alignSelf: "center", whiteSpace: "nowrap",
                            }}
                        >Fill ↗</button>
                    </div>

                    {/* Back */}
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
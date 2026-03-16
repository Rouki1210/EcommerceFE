import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/authApi";

const ADMIN_EMAIL = "admin@shop.com";
const ADMIN_PASSWORD = "admin123";

const DEMO = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };

const INPUT_CLS =
  "login-input w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-900 text-[13px] transition-all";

export default function AdminLogin() {
    const [form, setForm]       = useState({ email: "", password: "" });
    const [error, setError]     = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
        setLoading(true);
        try {
            const res = await loginAdmin(form.email, form.password);
            if (res?.token) {
                localStorage.setItem("adminAuth", "true");
                localStorage.setItem("adminToken", res.token);
                navigate("/admin/dashboard");
            } else {
                setError(res?.message || "Invalid credentials.");
            }
        } catch (err) {
            setError(err.message || "Cannot connect to server.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex font-sans">
            {/* LEFT PANEL */}
            <div className="w-[48%] flex flex-col justify-between px-14 py-12 relative overflow-hidden"
                 style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)" }}>
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-yellow-400/15 pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-yellow-400/10 pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10 animate-[fadeSlideUp_0.5s_ease_both]">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black text-black shadow-lg shadow-yellow-400/40 animate-[float_3s_ease-in-out_infinite]"
                             style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}>A</div>
                        <div>
                            <div className="text-slate-900 text-[15px] font-extrabold tracking-wider">ADMIN PAGE</div>
                            <div className="text-yellow-800 text-[9px] tracking-[2px]">ECOMMERCE</div>
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div className="relative z-10 animate-[fadeSlideUp_0.6s_ease_0.1s_both]">
                    <div className="inline-block bg-yellow-800/10 text-yellow-900 text-[10px] font-bold tracking-[2px] px-3 py-1.5 rounded-full mb-5 border border-yellow-800/15">
                        MANAGEMENT PORTAL
                    </div>
                    <h2 className="text-slate-900 text-[40px] font-extrabold leading-[1.15] tracking-tight m-0 mb-5">
                        Your store,<br />
                        <span className="text-amber-600">fully in control.</span>
                    </h2>
                    <p className="text-yellow-900 text-[13px] leading-[1.8] max-w-xs m-0">
                        Manage products, track orders, and grow your ecommerce business from one powerful dashboard.
                    </p>
                </div>

                {/* Trust badges */}
                <div className="relative z-10 flex gap-5 animate-[fadeSlideUp_0.6s_ease_0.2s_both]">
                    {["🔒 Secure", "⚡ Fast", "📊 Analytics"].map((t, i) => (
                        <div key={i} className="text-yellow-900 text-[11px] font-semibold">{t}</div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 flex flex-col justify-center items-center p-12 bg-white">
                <div className="w-full max-w-[400px] animate-[fadeSlideUp_0.5s_ease_0.15s_both]">
                    <div className="mb-9">
                        <div className="text-slate-400 text-[11px] tracking-[2px] mb-2 uppercase">Welcome Back</div>
                        <h1 className="text-slate-900 text-[28px] font-extrabold m-0 tracking-tight">
                            Sign in to your<br />admin account
                        </h1>
                        <p className="text-slate-400 text-[13px] mt-2.5">Enter your credentials to continue</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 mb-5 text-red-500 text-xs flex items-center gap-2">
                            ⚠ {error}
                        </div>
                    )}

                    <div className="mb-4.5">
                        <label className="text-slate-600 text-[11px] font-semibold block mb-1.5">Email address</label>
                        <input
                            type="email" value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                            placeholder="admin@shop.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-900 text-[13px] outline-none focus:border-yellow-400 focus:bg-white focus:ring-[3px] focus:ring-yellow-400/10 transition-all box-border"
                        />
                    </div>

                    <div className="mb-7">
                        <div className="flex justify-between mb-1.5">
                            <label className="text-slate-600 text-[11px] font-semibold">Password</label>
                            <span className="text-yellow-500 text-[11px] cursor-pointer font-semibold hover:text-yellow-600">Forgot password?</span>
                        </div>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"} value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 pr-11 text-slate-900 text-[13px] outline-none focus:border-yellow-400 focus:bg-white focus:ring-[3px] focus:ring-yellow-400/10 transition-all box-border"
                            />
                            <button onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 text-sm">
                                {showPass ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>

                    <button onClick={handleSubmit} disabled={loading}
                            className={`w-full py-3.5 border-none rounded-xl cursor-pointer text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                                loading ? "bg-yellow-200 cursor-not-allowed shadow-none" : "shadow-lg shadow-yellow-400/35 hover:shadow-yellow-400/50"
                            }`}
                            style={{ background: loading ? "#fde68a" : "linear-gradient(135deg, #eab308, #f59e0b)" }}
                    >
                        {loading ? <><span className="animate-spin inline-block">⟳</span> Signing in...</> : "Sign In →"}
                    </button>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-slate-300 text-[11px] tracking-wider">DEMO ACCESS</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <div className="bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-200 flex gap-6 items-center">
                        <div>
                            <div className="text-slate-400 text-[9px] tracking-[1.5px] mb-1 uppercase">Email</div>
                            <div className="text-slate-900 text-xs font-semibold">admin@shop.com</div>
                        </div>
                        <div className="w-px bg-slate-200 self-stretch" />
                        <div>
                            <div className="text-slate-400 text-[9px] tracking-[1.5px] mb-1 uppercase">Password</div>
                            <div className="text-slate-900 text-xs font-semibold">admin123</div>
                        </div>
                        <button onClick={() => setForm({ email: "admin@shop.com", password: "admin123" })}
                                className="ml-auto bg-yellow-500/10 border border-yellow-500/25 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer hover:bg-yellow-500/20 whitespace-nowrap transition-colors">
                            Fill ↗
                        </button>
                    </div>

                    <div className="text-center mt-7">
                        <a href="/" className="text-slate-400 text-xs no-underline hover:text-slate-600 transition-colors">← Back to shop</a>
                    </div>
                </div>
            </div>
            <button
              onClick={() => setForm(DEMO)}
              className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer border whitespace-nowrap"
              style={{
                background: "rgba(234,179,8,0.1)",
                borderColor: "rgba(234,179,8,0.25)",
                color: "#b45309",
              }}
            >
              Fill ↗
            </button>
          </div>

          {/* Back */}
          <div className="text-center mt-7">
            <a href="/" className="text-slate-400 text-xs no-underline hover:text-slate-600 transition-colors">
              ← Back to shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
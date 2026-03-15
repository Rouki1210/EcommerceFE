import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@shop.com";
const ADMIN_PASSWORD = "admin123";

const DEMO = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };

const INPUT_CLS =
  "login-input w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-900 text-[13px] transition-all";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .font-syne { font-family: 'Syne', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes spinIcon {
          to { transform: rotate(360deg); }
        }

        .anim-fade       { animation: fadeSlideUp 0.5s ease both; }
        .anim-fade-d1    { animation: fadeSlideUp 0.6s ease 0.1s both; }
        .anim-fade-d2    { animation: fadeSlideUp 0.6s ease 0.2s both; }
        .anim-fade-right { animation: fadeSlideUp 0.5s ease 0.15s both; }
        .anim-float      { animation: floatY 3s ease-in-out infinite; }
        .anim-spin       { display: inline-block; animation: spinIcon 1s linear infinite; }

        input::placeholder { color: #cbd5e1; }
        .login-input:focus {
          outline: none;
          border-color: #eab308 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(234,179,8,0.1) !important;
        }
      `}</style>

      {/* LEFT PANEL */}
      <div
        className="w-[48%] relative overflow-hidden flex flex-col justify-between px-14 py-12"
        style={{ background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none bg-yellow-400/15" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full pointer-events-none bg-yellow-400/10" />
        <div className="absolute top-[45%] right-10 w-28 h-28 rounded-full pointer-events-none bg-yellow-400/10" />

        {/* Logo */}
        <div className="relative z-10 anim-fade flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black text-black anim-float"
            style={{
              background: "linear-gradient(135deg, #eab308, #f59e0b)",
              boxShadow: "0 4px 16px rgba(234,179,8,0.4)",
            }}
          >
            A
          </div>
          <div>
            <div className="font-syne text-slate-900 text-[15px] font-extrabold tracking-widest">ADMIN PAGE</div>
            <div className="text-amber-800 text-[9px] tracking-[2px]">ECOMMERCE</div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 anim-fade-d1">
          <div
            className="inline-block text-amber-800 text-[10px] font-bold tracking-[2px] px-3 py-1 rounded-full mb-5 border"
            style={{ background: "rgba(180,83,9,0.1)", borderColor: "rgba(180,83,9,0.15)" }}
          >
            MANAGEMENT PORTAL
          </div>
          <h2 className="font-syne text-slate-900 text-[40px] font-extrabold leading-tight tracking-tight mb-5">
            Your store,<br />
            <span className="text-amber-600">fully in control.</span>
          </h2>
          <p className="text-amber-900 text-[13px] leading-relaxed max-w-xs">
            Manage products, track orders, and grow your ecommerce business from one powerful dashboard.
          </p>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 anim-fade-d2 flex gap-5">
          {["🔒 Secure", "⚡ Fast", "📊 Analytics"].map((t) => (
            <span key={t} className="text-amber-800 text-[11px] font-semibold">{t}</span>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex justify-center items-center p-12 bg-white">
        <div className="w-full max-w-sm anim-fade-right">

          {/* Header */}
          <div className="mb-9">
            <p className="text-slate-400 text-[11px] tracking-[2px] mb-2">WELCOME BACK</p>
            <h1 className="font-syne text-slate-900 text-[28px] font-extrabold tracking-tight leading-tight">
              Sign in to your<br />admin account
            </h1>
            <p className="text-slate-400 text-[13px] mt-2.5">Enter your credentials to continue</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-5 text-red-500 text-xs flex items-center gap-2">
              ⚠ {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-slate-600 text-[11px] font-semibold block mb-1.5">Email address</label>
            <input
              className={INPUT_CLS}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={ADMIN_EMAIL}
            />
          </div>

          {/* Password */}
          <div className="mb-7">
            <div className="flex justify-between mb-1.5">
              <label className="text-slate-600 text-[11px] font-semibold">Password</label>
              <span className="text-yellow-500 text-[11px] font-semibold cursor-pointer">Forgot password?</span>
            </div>
            <div className="relative">
              <input
                className={`${INPUT_CLS} pr-11`}
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer text-slate-400 text-sm"
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-extrabold text-sm text-black flex items-center justify-center gap-2 transition-all"
            style={{
              background: loading ? "#fde68a" : "linear-gradient(135deg, #eab308, #f59e0b)",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px rgba(234,179,8,0.35)",
            }}
          >
            {loading ? <><span className="anim-spin">⟳</span> Signing in...</> : "Sign In →"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-300 text-[11px]">DEMO ACCESS</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Demo credentials */}
          <div className="bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-200 flex gap-6 items-center">
            <div>
              <p className="text-slate-400 text-[9px] tracking-[1.5px] mb-1">EMAIL</p>
              <p className="text-slate-900 text-xs font-semibold">{ADMIN_EMAIL}</p>
            </div>
            <div className="w-px self-stretch bg-slate-200" />
            <div>
              <p className="text-slate-400 text-[9px] tracking-[1.5px] mb-1">PASSWORD</p>
              <p className="text-slate-900 text-xs font-semibold">{ADMIN_PASSWORD}</p>
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
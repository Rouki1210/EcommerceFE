import { useState } from "react";
import Header from "../../components/feature/admin/Header";
import {
  ADMIN_ACCENT_GRADIENT_STYLE,
  ADMIN_PRIMARY_SHADOW_BUTTON_CLASS,
} from "../../components/feature/admin/adminToolbarPresets";

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-black/5 last:border-0">
      <div>
        <div className="text-slate-900 text-[13px] font-semibold mb-0.5">
          {label}
        </div>
        {desc && <div className="text-slate-400 text-[11px]">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full cursor-pointer relative transition-all duration-200 ${value ? "bg-yellow-400 shadow-md shadow-yellow-400/30" : "bg-black/10"}`}
    >
      <div
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all duration-200 ${value ? "left-[23px]" : "left-[3px]"}`}
      />
    </div>
  );
}

const inputCls =
  "w-full bg-slate-50 border border-black/[0.08] rounded-lg px-3.5 py-2.5 text-slate-900 text-[13px] outline-none focus:border-yellow-400 transition-colors";

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@shop.com",
    phone: "+84 123 456 789",
  });
  const [notif, setNotif] = useState({
    email: true,
    orders: true,
    users: false,
    reports: true,
  });
  const [security, setSecurity] = useState({ twofa: false, sessions: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 animate-[fadeSlideUp_0.5s_ease_both]">
      <Header title="Settings" subtitle="Configuration" />

      <div className="grid grid-cols-2 gap-5">
        {/* Profile */}
        <div
          className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
          style={{ animation: "fadeSlideUp 0.5s ease 0.1s both" }}
        >
          <div className="mb-5">
            <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
              Account
            </div>
            <h3 className="text-slate-900 text-base font-bold m-0">
              Profile Info
            </h3>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-yellow-400/30"
              style={ADMIN_ACCENT_GRADIENT_STYLE}
            >
              A
            </div>
            <div>
              <div className="text-slate-900 text-sm font-bold">
                {profile.name}
              </div>
              <div className="text-slate-400 text-[11px] mb-1.5">
                {profile.email}
              </div>
              <button className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-500 text-[10px] px-3 py-1 rounded-md cursor-pointer font-semibold hover:bg-yellow-500/20 transition-colors">
                Change Avatar
              </button>
            </div>
          </div>

          {["name", "email", "phone"].map((field) => (
            <div key={field} className="mb-3.5">
              <label className="text-slate-400 text-[10px] tracking-[1.5px] block mb-1.5 uppercase font-semibold">
                {field}
              </label>
              <input
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                className={inputCls}
              />
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Notifications */}
          <div
            className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
            style={{ animation: "fadeSlideUp 0.5s ease 0.15s both" }}
          >
            <div className="mb-4">
              <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
                Alerts
              </div>
              <h3 className="text-slate-900 text-base font-bold m-0">
                Notifications
              </h3>
            </div>
            <SettingRow
              label="Email Notifications"
              desc="Receive updates via email"
            >
              <Toggle
                value={notif.email}
                onChange={(v) => setNotif({ ...notif, email: v })}
              />
            </SettingRow>
            <SettingRow label="New Orders" desc="Alert when new order arrives">
              <Toggle
                value={notif.orders}
                onChange={(v) => setNotif({ ...notif, orders: v })}
              />
            </SettingRow>
            <SettingRow label="New Users" desc="Alert on new registrations">
              <Toggle
                value={notif.users}
                onChange={(v) => setNotif({ ...notif, users: v })}
              />
            </SettingRow>
            <SettingRow label="Weekly Reports" desc="Summary every Monday">
              <Toggle
                value={notif.reports}
                onChange={(v) => setNotif({ ...notif, reports: v })}
              />
            </SettingRow>
          </div>

          {/* Security */}
          <div
            className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
            style={{ animation: "fadeSlideUp 0.5s ease 0.2s both" }}
          >
            <div className="mb-4">
              <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
                Security
              </div>
              <h3 className="text-slate-900 text-base font-bold m-0">
                Security
              </h3>
            </div>
            <SettingRow
              label="Two-Factor Auth"
              desc="Extra layer of protection"
            >
              <Toggle
                value={security.twofa}
                onChange={(v) => setSecurity({ ...security, twofa: v })}
              />
            </SettingRow>
            <SettingRow label="Active Sessions" desc="Track login sessions">
              <Toggle
                value={security.sessions}
                onChange={(v) => setSecurity({ ...security, sessions: v })}
              />
            </SettingRow>
            <div className="mt-4">
              <button className="w-full bg-red-400/[0.08] border border-red-400/20 text-red-500 py-2.5 rounded-xl cursor-pointer text-xs font-semibold hover:bg-red-400/15 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`text-[13px] font-bold px-8 py-3 rounded-xl cursor-pointer tracking-wide transition-all duration-300 border ${
            saved
              ? "bg-emerald-400/15 border-emerald-400 text-emerald-500 shadow-none"
              : ADMIN_PRIMARY_SHADOW_BUTTON_CLASS
          }`}
          style={{
            background: saved
              ? undefined
              : ADMIN_ACCENT_GRADIENT_STYLE.background,
          }}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

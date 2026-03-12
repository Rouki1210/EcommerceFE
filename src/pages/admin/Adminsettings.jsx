import { useState } from "react";
import Header from "../../components/admin/Header";

const card = {
  background: "#fff",
  border: "1px solid #e8e2db",
  borderRadius: 16,
  padding: "24px",
  boxShadow: "0 2px 12px rgba(44,44,44,0.05)",
};

function SettingRow({ label, desc, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #e8e2db",
      }}
    >
      <div>
        <div
          style={{
            color: "#2c2c2c",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 3,
          }}
        >
          {label}
        </div>
        {desc && <div style={{ color: "#9a8c7e", fontSize: 11 }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        cursor: "pointer",
        background: value ? "#c8a96e" : "rgba(44,44,44,0.12)",
        position: "relative",
        transition: "background 0.2s ease",
        boxShadow: value ? "0 0 10px rgba(200,169,110,0.3)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: value ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

export default function Adminsettings() {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      <Header title="Settings" subtitle="Configuration" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Profile */}
        <div style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.1s both" }}>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                color: "#9a8c7e",
                fontSize: 10,
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              ACCOUNT
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2c2c2c",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Profile Info
            </h3>
          </div>

          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "linear-gradient(135deg, #c8a96e, #b8965e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
                color: "#fff",
                boxShadow: "0 0 20px rgba(200,169,110,0.3)",
              }}
            >
              A
            </div>
            <div>
              <div style={{ color: "#2c2c2c", fontSize: 14, fontWeight: 700 }}>
                {profile.name}
              </div>
              <div style={{ color: "#9a8c7e", fontSize: 11, marginBottom: 6 }}>
                {profile.email}
              </div>
              <button
                style={{
                  background: "rgba(200,169,110,0.1)",
                  border: "1px solid rgba(200,169,110,0.25)",
                  color: "#c8a96e",
                  fontSize: 10,
                  padding: "4px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Change Avatar
              </button>
            </div>
          </div>

          {["name", "email", "phone"].map((field) => (
            <div key={field} style={{ marginBottom: 14 }}>
              <label
                style={{
                  color: "#9a8c7e",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {field.toUpperCase()}
              </label>
              <input
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                style={{
                  width: "100%",
                  background: "#faf8f5",
                  border: "1px solid #e8e2db",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#2c2c2c",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.15s both" }}
          >
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: "#9a8c7e",
                  fontSize: 10,
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                ALERTS
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#2c2c2c",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
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
            style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.2s both" }}
          >
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  color: "#9a8c7e",
                  fontSize: 10,
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                SECURITY
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#2c2c2c",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
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
            <div style={{ marginTop: 16 }}>
              <button
                style={{
                  width: "100%",
                  background: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.2)",
                  color: "#ef4444",
                  padding: "10px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          style={{
            background: saved ? "rgba(52,211,153,0.15)" : "#2c2c2c",
            border: saved ? "1px solid #34d399" : "1px solid transparent",
            color: saved ? "#10b981" : "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "12px 32px",
            borderRadius: 12,
            cursor: "pointer",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            boxShadow: saved ? "none" : "0 4px 16px rgba(44,44,44,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

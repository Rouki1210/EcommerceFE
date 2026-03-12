import { useState } from "react";
import Header from "../../components/admin/Header";

const mockUsers = [
    { id: 1, name: "Nguyen Van A", email: "vana@mail.com",  role: "Customer", orders: 12, spent: "$1,440", joined: "Jan 2025", avatar: "N", active: true },
    { id: 2, name: "Tran Thi B",   email: "thib@mail.com",  role: "Customer", orders: 7,  spent: "$630",   joined: "Feb 2025", avatar: "T", active: true },
    { id: 3, name: "Le Van C",     email: "vanc@mail.com",  role: "Admin",    orders: 0,  spent: "$0",     joined: "Dec 2024", avatar: "L", active: true },
    { id: 4, name: "Pham Thi D",   email: "thid@mail.com",  role: "Customer", orders: 3,  spent: "$270",   joined: "Mar 2025", avatar: "P", active: false },
    { id: 5, name: "Hoang Van E",  email: "vane@mail.com",  role: "Customer", orders: 21, spent: "$2,520", joined: "Nov 2024", avatar: "H", active: true },
];

const roleColors = {
    Admin:    { bg: "rgba(234,179,8,0.15)",  text: "#eab308" },
    Customer: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa" },
};

export default function AdminUsers() {
    const [users] = useState(mockUsers);
    const [search, setSearch] = useState("");

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
                <Header title="Users" subtitle="Management" />
                <div style={{
                    background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 10, padding: "9px 16px", display: "flex", alignItems: "center", gap: 8,
                }}>
                    <span style={{ color: "#475569", fontSize: 13 }}>🔍</span>
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search users..."
                        style={{
                            background: "transparent", border: "none", outline: "none",
                            color: "#1e293b", fontSize: 12, width: 160,
                        }}
                    />
                </div>
            </div>

            <div style={{
                background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 16, overflow: "hidden",
            }}>
                {/* Table Header */}
                <div style={{
                    display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr",
                    padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)",
                    background: "#f8fafc",
                }}>
                    {["User", "Email", "Role", "Orders", "Spent", "Status"].map(h => (
                        <div key={h} style={{ color: "#334155", fontSize: 10, letterSpacing: 1.5, fontWeight: 600 }}>{h}</div>
                    ))}
                </div>

                {filtered.map((user, i) => (
                    <div key={user.id} className="order-row" style={{
                        display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr",
                        padding: "14px 24px", borderBottom: "1px solid rgba(0,0,0,0.04)",
                        transition: "background 0.2s ease",
                        animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                                background: "linear-gradient(135deg, #1e293b, #334155)",
                                border: "1px solid rgba(234,179,8,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#eab308", fontSize: 12, fontWeight: 700,
                            }}>{user.avatar}</div>
                            <div>
                                <div style={{ color: "#1e293b", fontSize: 12, fontWeight: 600 }}>{user.name}</div>
                                <div style={{ color: "#475569", fontSize: 10 }}>Joined {user.joined}</div>
                            </div>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12, display: "flex", alignItems: "center" }}>{user.email}</div>
                        <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                  fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  background: roleColors[user.role].bg, color: roleColors[user.role].text,
              }}>{user.role}</span>
                        </div>
                        <div style={{ color: "#1e293b", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center" }}>{user.orders}</div>
                        <div style={{ color: "#eab308", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center" }}>{user.spent}</div>
                        <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                  fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  background: user.active ? "rgba(52,211,153,0.1)" : "rgba(100,116,139,0.1)",
                  color: user.active ? "#34d399" : "#64748b",
                  display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: user.active ? "#34d399" : "#475569", display: "inline-block",
                }} />
                  {user.active ? "Active" : "Inactive"}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
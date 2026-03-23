import { useState, useEffect, useMemo } from "react";
import Header from "../../components/admin/Header";
import { getUsers, updateUserStatus, deleteUser } from "../../api/userApi";

const roleStyle = {
    Admin:    "bg-yellow-500/15 text-yellow-500",
    Customer: "bg-blue-400/12 text-blue-400",
};

export default function AdminUsers() {
    const [users, setUsers]     = useState([]);
    const [search, setSearch]   = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const loadUsers = () => {
        setLoading(true);
        getUsers()
            .then(data => setUsers(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadUsers(); }, []);

    const filtered = useMemo(() => users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    ), [users, search]);

    const handleToggleStatus = async (user) => {
        try {
            await updateUserStatus(user.id, !user.active);
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, active: !u.active } : u));
        } catch (err) { alert("Error: " + err.message); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) { alert("Error: " + err.message); }
    };

    return (
        <div className="animate-[fadeSlideUp_0.5s_ease_both]">
            <Header title="Users" subtitle="Management" />

            {/* Search */}
            <div className="flex justify-end mb-5 -mt-2">
                <div className="bg-white border border-black/[0.08] rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                    <span className="text-slate-500 text-[13px]">🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                           className="bg-transparent border-none outline-none text-slate-800 text-xs w-44" />
                </div>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-black/[0.07]">
                    <div className="text-3xl mb-2 animate-spin inline-block">⟳</div>
                    <div className="text-slate-400 text-[13px]">Loading users...</div>
                </div>
            ) : error ? (
                <div className="bg-red-50 rounded-2xl p-8 text-center border border-red-200">
                    <div className="text-red-500 text-[13px] font-semibold">⚠ {error}</div>
                    <button onClick={loadUsers} className="mt-3 bg-red-500 border-none text-white px-4 py-2 rounded-lg cursor-pointer text-xs">Retry</button>
                </div>
            ) : (
                <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="grid px-6 py-4 border-b border-black/5 bg-slate-50"
                         style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr 80px" }}>
                        {["User", "Email", "Role", "Orders", "Spent", "Status", "Actions"].map(h => (
                            <div key={h} className="text-slate-700 text-[10px] tracking-[1.5px] font-semibold uppercase">{h}</div>
                        ))}
                    </div>

                    {filtered.map((user, i) => (
                        <div
                            key={user.id}
                            className="grid px-6 py-3.5 border-b border-black/[0.04] hover:bg-slate-50 transition-colors"
                            style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr 80px", animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both` }}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-yellow-400 text-xs font-bold border border-yellow-500/20"
                                     style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>
                                    {user.name?.charAt(0) || "?"}
                                </div>
                                <div>
                                    <div className="text-slate-800 text-xs font-semibold">{user.name}</div>
                                    <div className="text-slate-500 text-[10px]">Joined {user.joined || user.createdAt || "—"}</div>
                                </div>
                            </div>
                            <div className="text-slate-500 text-xs flex items-center">{user.email}</div>
                            <div className="flex items-center">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${roleStyle[user.role] || "bg-slate-100 text-slate-500"}`}>
                  {user.role || "Customer"}
                </span>
                            </div>
                            <div className="text-slate-800 text-xs font-semibold flex items-center">{user.orders ?? 0}</div>
                            <div className="text-yellow-500 text-xs font-bold flex items-center">{user.spent || "$0"}</div>
                            <div className="flex items-center">
                <span
                    onClick={() => handleToggleStatus(user)}
                    title="Click to toggle"
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                        user.active ? "bg-emerald-400/10 text-emerald-400" : "bg-slate-100 text-slate-500"
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${user.active ? "bg-emerald-400" : "bg-slate-400"}`} />
                    {user.active ? "Active" : "Inactive"}
                </span>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => handleDelete(user.id)}
                                        className="bg-red-400/10 border border-red-400/20 text-red-400 text-[10px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer hover:bg-red-400/20 transition-colors">
                                    Del
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-[13px]">No users found</div>
                    )}
                </div>
            )}
        </div>
    );
}
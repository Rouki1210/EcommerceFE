import { useState, useEffect, useMemo } from "react";
import Header from "../../components/admin/Header";
import { getUsers, updateUserStatus, deleteUser } from "../../api/userApi";
import "../../assets/styles/admin.css";

const roleStyle = {
  Admin: "bg-yellow-500/15 text-yellow-500",
  Customer: "bg-blue-400/12 text-blue-400",
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  const handleToggleStatus = async (user) => {
    try {
      await updateUserStatus(user.id, !user.active);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)),
      );
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <Header title="Users" subtitle="Management" />
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1.25rem",
          marginTop: "-0.5rem",
        }}
      >
        <div className="admin-search-input">
          <span>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-loading-spinner">⟳</div>
          <div className="admin-loading-text">Loading users...</div>
        </div>
      ) : error ? (
        <div className="admin-error">
          <div className="admin-error-message">⚠ {error}</div>
          <button onClick={loadUsers} className="admin-error-retry">
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">👥</div>
          <div className="admin-empty-title">No users found</div>
          <button onClick={() => setSearch("")} className="admin-empty-action">
            Clear search
          </button>
        </div>
      ) : (
        <div className="admin-table">
          {/* Header */}
          <div
            className="admin-table-header"
            style={{
              gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr 80px",
            }}
          >
            {[
              "User",
              "Email",
              "Role",
              "Orders",
              "Spent",
              "Status",
              "Actions",
            ].map((h) => (
              <div key={h} className="admin-table-header-cell">
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((user, i) => (
            <div
              key={user.id}
              className="admin-table-row"
              style={{
                gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr 80px",
                animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fbbf24",
                    fontSize: "12px",
                    fontWeight: "700",
                    border: "1px solid rgba(251, 191, 36, 0.2)",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    flexShrink: 0,
                  }}
                >
                  {user.name?.charAt(0) || "?"}
                </div>
                <div>
                  <div
                    style={{
                      color: "#2c2c2c",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {user.name}
                  </div>
                  <div style={{ color: "#999", fontSize: "11px" }}>
                    Joined {user.joined || user.createdAt || "—"}
                  </div>
                </div>
              </div>
              <div className="admin-table-cell">{user.email}</div>
              <div className="admin-table-cell">
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "16px",
                    background:
                      user.role === "Admin"
                        ? "rgba(251, 191, 36, 0.1)"
                        : "rgba(96, 165, 250, 0.1)",
                    color: user.role === "Admin" ? "#fbbf24" : "#60a5fa",
                  }}
                >
                  {user.role || "Customer"}
                </span>
              </div>
              <div className="admin-table-cell">{user.orders ?? 0}</div>
              <div
                style={{
                  color: "#c8a96e",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {user.spent || "$0"}
              </div>
              <div className="admin-table-cell">
                <span
                  onClick={() => handleToggleStatus(user)}
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "16px",
                    background: user.active
                      ? "rgba(34, 197, 94, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                    color: user.active ? "#22c55e" : "#999",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    transition: "all 0.2s ease",
                  }}
                  title="Click to toggle"
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: user.active ? "#22c55e" : "#999",
                    }}
                  />
                  {user.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    background: "rgba(248, 113, 113, 0.1)",
                    border: "1px solid rgba(248, 113, 113, 0.2)",
                    color: "#f87171",
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(248, 113, 113, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(248, 113, 113, 0.1)";
                  }}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

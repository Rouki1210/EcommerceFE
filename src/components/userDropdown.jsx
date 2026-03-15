import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function UserDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Lấy chữ cái đầu để hiển thị avatar
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const fullName =
    user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 rounded-full bg-[#2c2c2c] text-white text-[11px] font-semibold tracking-wide flex items-center justify-center hover:bg-[#c8a96e] transition-colors"
        aria-label="Account menu"
        title={fullName}
      >
        {initials}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          {/* Backdrop nhẹ để click ra ngoài */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-10 z-50 w-64 bg-white rounded-2xl shadow-xl border border-[#ede8e1] overflow-hidden"
            style={{ animation: "dropIn 0.18s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <style>{`
              @keyframes dropIn {
                from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0)   scale(1); }
              }
            `}</style>

            {/* Header — thông tin user */}
            <div className="px-5 py-4 border-b border-[#f0ebe4]">
              <div className="flex items-center gap-3">
                {/* Avatar lớn */}
                <div className="w-10 h-10 rounded-full bg-[#2c2c2c] text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-[#2c2c2c] truncate">
                    {fullName || "User"}
                  </p>
                  <p className="text-[11px] text-[#aaa] truncate">{user?.email}</p>
                </div>
              </div>
              {/* Role badge */}
              {user?.role && (
                <span
                  className="inline-block mt-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background:
                      user.role === "ADMIN"
                        ? "rgba(200,169,110,0.15)"
                        : "rgba(44,44,44,0.07)",
                    color: user.role === "ADMIN" ? "#b8952e" : "#666",
                  }}
                >
                  {user.role}
                </span>
              )}
            </div>

            {/* Menu items */}
            <div className="py-2">
              <button
                onClick={() => { setOpen(false); navigate("/orders"); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#555] hover:bg-[#f9f6f2] hover:text-[#2c2c2c] transition-colors text-left"
              >
                {/* Order icon */}
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 12h6M9 16h4" />
                </svg>
                My Orders
              </button>

              <button
                onClick={() => { setOpen(false); navigate("/profile"); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#555] hover:bg-[#f9f6f2] hover:text-[#2c2c2c] transition-colors text-left"
              >
                {/* Settings icon */}
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Account Settings
              </button>
            </div>

            {/* Divider + Logout */}
            <div className="border-t border-[#f0ebe4] py-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#c0392b] hover:bg-red-50 transition-colors text-left"
              >
                {/* Logout icon */}
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
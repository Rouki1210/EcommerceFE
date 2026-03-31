import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

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

  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";

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
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div
            className="absolute right-0 top-10 z-50 w-64 bg-white rounded-2xl shadow-xl border border-[#ede8e1] overflow-hidden"
            style={{
              animation: "dropIn 0.18s cubic-bezier(0.22,1,0.36,1) both",
            }}
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
                  {/* ...existing code... */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

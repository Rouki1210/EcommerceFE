import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { tw } from "../../assets/theme/theme";

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

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className={tw.userMenuRoot} ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={tw.userMenuAvatar}
        aria-label="Account menu"
        title={fullName}
      >
        {initials}
      </button>

      {open && (
        <>
          <div className={tw.userMenuBackdrop} onClick={() => setOpen(false)} />

          <div className={tw.userMenuPanel}>
            <div className={tw.userMenuHeader}>
              <div className={tw.userMenuHeaderRow}>
                <div className={tw.userMenuAvatarLg}>{initials}</div>
                <div className={tw.userMenuIdentity}>
                  <p className={tw.userMenuName}>{fullName || "User"}</p>
                  <p className={tw.userMenuEmail}>{user?.email || ""}</p>
                </div>
              </div>
            </div>

            <div className={tw.userMenuBody}>
              <button
                type="button"
                onClick={() => goTo("/profile")}
                className={tw.userMenuItem}
              >
                Account settings
              </button>
              <button
                type="button"
                onClick={() => goTo("/order-tracking")}
                className={tw.userMenuItem}
              >
                My order
              </button>
            </div>

            <div className={tw.userMenuFooter}>
              <button
                type="button"
                onClick={handleLogout}
                className={tw.userMenuLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { useDismissibleLayer } from "../../../hooks/useDismissibleLayer";
import { useListKeyboardNavigation } from "../../../hooks/useListKeyboardNavigation";
import { tw } from "../../../assets/theme/theme";

export default function UserDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const ordersMenuItemRef = useRef(null);
  const logoutMenuItemRef = useRef(null);
  const menuId = useId();
  const {
    activeIndex,
    setActiveIndex,
    resetActiveIndex,
    handleArrowNavigation,
    jumpToFirst,
    jumpToLast,
  } = useListKeyboardNavigation({ itemCount: 3 });
  const closeMenu = useCallback(() => {
    setOpen(false);
    resetActiveIndex();
  }, [resetActiveIndex]);

  useDismissibleLayer({
    isOpen: open,
    onDismiss: closeMenu,
    initialFocusRef: firstMenuItemRef,
    closeOnOutsidePress: true,
    outsidePressRef: dropdownRef,
  });

  const focusMenuItem = useCallback((index) => {
    const refs = [firstMenuItemRef, ordersMenuItemRef, logoutMenuItemRef];
    refs[index]?.current?.focus?.();
  }, []);

  useEffect(() => {
    if (open) {
      jumpToFirst();
    }
  }, [open, jumpToFirst]);

  useEffect(() => {
    if (!open || activeIndex < 0) {
      return;
    }

    focusMenuItem(activeIndex);
  }, [open, activeIndex, focusMenuItem]);

  // Lấy chữ cái đầu để hiển thị avatar
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  const goTo = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleMenuKeyDown = (event) => {
    if (handleArrowNavigation(event)) {
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      jumpToFirst();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      jumpToLast();
    }
  };

  return (
    <div className={tw.userMenuRoot} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={tw.userMenuAvatar}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        title={fullName}
      >
        {initials}
      </button>

      {open && (
        <>
          <div className={tw.userMenuBackdrop} aria-hidden="true" />

          <div
            id={menuId}
            className={tw.userMenuPanel}
            role="menu"
            aria-label="Account options"
            onKeyDown={handleMenuKeyDown}
          >
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
                ref={firstMenuItemRef}
                type="button"
                onClick={() => goTo("/profile")}
                onMouseEnter={() => setActiveIndex(0)}
                className={tw.userMenuItem}
                role="menuitem"
              >
                Account settings
              </button>
              <button
                ref={ordersMenuItemRef}
                type="button"
                onClick={() => goTo("/orders")}
                onMouseEnter={() => setActiveIndex(1)}
                className={tw.userMenuItem}
                role="menuitem"
              >
                My orders
              </button>
            </div>

            <div className={tw.userMenuFooter}>
              <button
                ref={logoutMenuItemRef}
                type="button"
                onClick={handleLogout}
                onMouseEnter={() => setActiveIndex(2)}
                className={tw.userMenuLogout}
                role="menuitem"
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

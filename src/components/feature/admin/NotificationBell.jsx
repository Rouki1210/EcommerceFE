import { useContext, useMemo, useRef, useState } from "react";
import NotificationContext from "../../../context/notificationContextValue";
import { useDismissibleLayer } from "../../../hooks/useDismissibleLayer";

const EMPTY_NOTIFICATIONS = [];

export default function NotificationBell() {
  const notificationApi = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const markAllRef = useRef(null);

  const notifications = notificationApi?.notifications ?? EMPTY_NOTIFICATIONS;
  const unreadCount =
    notificationApi?.unreadCount ??
    notifications.filter((notification) => !notification.read).length;

  const visibleNotifications = useMemo(
    () => notifications.slice(0, 6),
    [notifications],
  );

  useDismissibleLayer({
    isOpen,
    onDismiss: () => setIsOpen(false),
    closeOnEscape: true,
    closeOnOutsidePress: true,
    outsidePressRef: [panelRef, triggerRef],
    initialFocusRef: markAllRef,
  });

  const handleMarkRead = (id) => {
    notificationApi?.markAsRead?.(id);
  };

  const handleRemove = (event, id) => {
    event.stopPropagation();
    notificationApi?.removeNotification?.(id);
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open notifications"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-base shadow-sm transition-colors hover:border-yellow-500/40"
      >
        <span aria-hidden>🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-40 mt-2 w-[340px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Notifications
              </div>
              <div className="text-[11px] text-slate-400">
                {unreadCount} unread item{unreadCount === 1 ? "" : "s"}
              </div>
            </div>
            <button
              ref={markAllRef}
              type="button"
              onClick={() => notificationApi?.markAllAsRead?.()}
              disabled={unreadCount === 0}
              className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-[10px] font-bold text-yellow-700 transition-colors hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {visibleNotifications.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-400">
                No notifications yet.
              </div>
            ) : (
              visibleNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleMarkRead(notification.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleMarkRead(notification.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`flex w-full items-start gap-3 border-b border-black/[0.04] px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-slate-50 ${
                    notification.read ? "opacity-70" : ""
                  }`}
                >
                  <span className="mt-0.5 text-base" aria-hidden>
                    {notification.icon || "🔔"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-slate-800">
                      {notification.title || "Notification"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {notification.message || ""}
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400">
                      {notification.time || "Just now"}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove notification"
                    onClick={(event) => handleRemove(event, notification.id)}
                    className="rounded p-1 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

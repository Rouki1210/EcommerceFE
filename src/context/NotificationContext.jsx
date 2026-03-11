import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([
        // Seed data mẫu
        {
            id: 1,
            type: "order",
            title: "New Order",
            message: "Nguyen Van A just placed order #ORD-8821",
            time: "2 min ago",
            read: false,
            icon: "📦",
        },
    ]);

    // Thêm notification mới
    const addNotification = useCallback((notif) => {
        const newNotif = {
            id: Date.now(),
            read: false,
            time: "Just now",
            ...notif,
        };
        setNotifications(prev => [newNotif, ...prev]);
    }, []);

    // Đánh dấu đã đọc 1 cái
    const markAsRead = useCallback((id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }, []);

    // Đánh dấu đã đọc tất cả
    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    // Xoá 1 notification
    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            removeNotification,
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotification must be used inside NotificationProvider");
    return ctx;
}
import baseUrl from "./config";

export const getOrders = () =>
    baseUrl.get("/api/orders").then((res) => res.data);

export const getOrderById = (id) =>
    baseUrl.get(`/api/orders/${id}`).then((res) => res.data);

export const updateOrderStatus = (id, status) =>
    baseUrl.patch(`/api/orders/${id}/status`, { status }).then((res) => res.data);

export const deleteOrder = (id) =>
    baseUrl.delete(`/api/orders/${id}`).then((res) => res.data);
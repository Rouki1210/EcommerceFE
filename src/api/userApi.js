import baseUrl from "./config";

export const getUsers = () =>
    baseUrl.get("/api/users").then((res) => res.data);

export const getUserById = (id) =>
    baseUrl.get(`/api/users/${id}`).then((res) => res.data);

export const updateUserStatus = (id, active) =>
    baseUrl.patch(`/api/users/${id}/status`, { active }).then((res) => res.data);

export const deleteUser = (id) =>
    baseUrl.delete(`/api/users/${id}`).then((res) => res.data);
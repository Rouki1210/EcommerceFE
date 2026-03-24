import baseUrl from "./config";

export const loginApi = (email, password) =>
  baseUrl.post("/auth/login", { email, password }).then((res) => res.data);

export const loginAdmin = (email, password) =>
  baseUrl.post("/admin/auth/login", { email, password }).then((res) => res.data);

export const registerApi = (firstName, lastName, email, password) =>
    baseUrl
        .post("/auth/register", { firstName, lastName, email, password })
        .then((res) => res.data);

export const getProfileApi = () =>
  baseUrl
    .get("/auth/me")
    .then((res) => res.data);

export const updateProfileApi = ({ firstName, lastName, email }) =>
  baseUrl
    .put("/auth/profile", { firstName, lastName, email })
    .then((res) => res.data);

export const changePasswordApi = ({ currentPassword, newPassword }) =>
  baseUrl
    .post("/auth/change-password", { currentPassword, newPassword })
    .then((res) => res.data);

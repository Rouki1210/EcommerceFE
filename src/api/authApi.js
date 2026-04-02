import baseUrl from "./config";

const unwrapResponseData = (res) => res?.data?.data ?? res?.data;

export const loginApi = (email, password) =>
  baseUrl.post("/auth/login", { email, password }).then(unwrapResponseData);

export const loginAdmin = (email, password) =>
  baseUrl
    .post("/admin/auth/login", { email, password })
    .then((res) => res.data);

export const registerApi = (firstName, lastName, email, password) =>
  baseUrl
    .post("/auth/register", { firstName, lastName, email, password })
    .then(unwrapResponseData);

export const getProfileApi = () =>
  baseUrl.get("/auth/me").then(unwrapResponseData);

export const updateProfileApi = (payload) =>
  baseUrl.put("/auth/update-profile", payload).then(unwrapResponseData);

export const changePasswordApi = ({
  currentPassword,
  newPassword,
  confirmPassword,
}) =>
  baseUrl
    .post("/auth/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    })
    .then(unwrapResponseData);

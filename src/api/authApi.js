import baseUrl from "./config";

export const loginApi = (email, password) =>
    baseUrl.post("/api/auth/login", { email, password }).then((res) => res.data);

export const registerApi = (fullName, email, password) =>
    baseUrl.post("/api/auth/register", { fullName, email, password }).then((res) => res.data);

// Alias dùng trong AdminLogin.jsx
export const loginAdmin = (email, password) => loginApi(email, password);
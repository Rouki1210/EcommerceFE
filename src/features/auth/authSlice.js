import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("auth_user");
const initialState = stored ? JSON.parse(stored) : {
  token: null,
  user: null,       // { email, fullName, role }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        fullName: action.payload.fullName,
        role: action.payload.role,
      };
      state.isAuthenticated = true;
      // Persist to localStorage
      localStorage.setItem("auth_token", action.payload.token);
      localStorage.setItem("auth_user", JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
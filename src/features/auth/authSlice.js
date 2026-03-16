import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("auth_user");
const initialState = stored
  ? JSON.parse(stored)
  : {
      token: null,
      user: null, // { email, fullName, role }
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = {
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
      };
      state.isAuthenticated = true;
      // Persist to localStorage
      localStorage.setItem("auth_token", action.payload.accessToken);
      localStorage.setItem("auth_user", JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
    updateProfile: (state, action) => {
      if (!state.user) return;
      state.user = {
        ...state.user,
        ...action.payload,
      };
      localStorage.setItem("auth_user", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

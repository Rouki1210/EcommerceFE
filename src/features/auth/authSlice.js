import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_AUTH_STATE = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const unwrapAuthPayload = (payload) => payload?.data ?? payload ?? {};

const resolveAccessToken = (payload) => {
  const authPayload = unwrapAuthPayload(payload);
  return (
    authPayload?.accessToken ??
    authPayload?.token ??
    authPayload?.jwt ??
    authPayload?.tokens?.accessToken ??
    authPayload?.tokens?.token ??
    null
  );
};

const resolveUserPayload = (payload) => {
  const authPayload = unwrapAuthPayload(payload);
  return authPayload?.user ?? authPayload;
};

const isValidJwt = (token) =>
  typeof token === "string" && token.trim().split(".").length === 3;

const buildInitialState = () => {
  const storedAuth = localStorage.getItem("auth_user");
  const storedToken = localStorage.getItem("auth_token");

  if (!storedAuth) {
    return { ...DEFAULT_AUTH_STATE };
  }

  try {
    const parsedState = JSON.parse(storedAuth);
    const tokenFromState = parsedState?.token;
    const validStoredToken = isValidJwt(storedToken) ? storedToken : null;
    const validStateToken = isValidJwt(tokenFromState) ? tokenFromState : null;
    const token = validStoredToken ?? validStateToken;

    if (!token || !parsedState?.user) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return { ...DEFAULT_AUTH_STATE };
    }

    if (storedToken !== token) {
      localStorage.setItem("auth_token", token);
    }

    return {
      ...DEFAULT_AUTH_STATE,
      ...parsedState,
      token,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    return { ...DEFAULT_AUTH_STATE };
  }
};

const initialState = buildInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const accessToken = resolveAccessToken(action.payload);
      const hasValidToken = isValidJwt(accessToken);
      const userPayload = resolveUserPayload(action.payload);

      if (!hasValidToken) {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        return;
      }

      state.token = accessToken;
      state.user = {
        email: userPayload?.email ?? "",
        firstName: userPayload?.firstName ?? "",
        lastName: userPayload?.lastName ?? "",
        phone: userPayload?.phone ?? "",
        address: userPayload?.address ?? "",
        city: userPayload?.city ?? "",
        country: userPayload?.country ?? "Vietnam",
        role: userPayload?.role,
      };
      state.isAuthenticated = true;

      localStorage.setItem("auth_token", accessToken);
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

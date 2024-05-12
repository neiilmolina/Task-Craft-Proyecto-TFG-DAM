import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./intefaces";

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  error: null,
  isExpired: null,
  loading: false,
  success: false,
  userData: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
        state.isAuth = false
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

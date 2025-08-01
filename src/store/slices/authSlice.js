import { createSlice } from "@reduxjs/toolkit";

// Load auth state from localStorage (only safe data)
const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = savedAuth || {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ Save only safe data to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          token,
          isAuthenticated: true,
        })
      );
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Clear localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

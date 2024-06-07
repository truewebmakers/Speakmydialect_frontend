import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    token: "",
    userInfo: "",
  },
  profileData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logOutSuccess: (state) => {
      state.user = {
        token: "",
        userInfo: "",
      };
      state.profileData = {};
      state.isLoggedIn = false;
    },
    getProfileDetails: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { logInSuccess, logOutSuccess, getProfileDetails } =
  authSlice.actions;

export default authSlice.reducer;

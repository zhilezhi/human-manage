import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userStore.actions;

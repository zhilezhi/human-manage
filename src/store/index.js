import { configureStore } from "@reduxjs/toolkit";
import user from "@/store/modules/user.js";
import manager from "@/store/modules/manager.js";
const store = configureStore({
  reducer: {
    user,
    manager,
  },
});

export default store;

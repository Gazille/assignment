import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../appSlice";

const store = configureStore({
  reducer: {
    apps: appSlice.reducer,
  },
});

export default store;

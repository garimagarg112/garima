import { configureStore } from "@reduxjs/toolkit";

import DashboardSlice from "./DashboardSlice";
const store = configureStore({
  reducer: {
    data : DashboardSlice
  },
});

export default store;
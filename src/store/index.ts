import { configureStore } from "@reduxjs/toolkit";
import employee from "./employeeSlice";

export const store = configureStore({
  reducer: {
    employee,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

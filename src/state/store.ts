import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    game: gameReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

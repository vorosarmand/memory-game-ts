import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    username: "default-username",
    score: 0,
    ellapsed_time: 0,
    number_of_cards: 12,
  },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    ellapseTime(state) {
      return { ...state, ellapsed_time: state.ellapsed_time + 1 };
    },
    addPoints(state, action) {
      return { ...state, score: state.score + action.payload };
    },
    setNumberOfCards(state, action) {
      return { ...state, number_of_cards: action.payload };
    },
  },
});

export const { setUsername, ellapseTime, addPoints, setNumberOfCards } =
  configSlice.actions;
export default configSlice.reducer;

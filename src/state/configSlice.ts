import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    username: "default-username",
    total_time: 60,
    number_of_cards: 12,
  },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    setTotalTime(state, action) {
      return { ...state, total_time: action.payload };
    },
    setNumberOfCards(state, action) {
      return { ...state, number_of_cards: action.payload };
    },
  },
});

export const { setUsername, setTotalTime, setNumberOfCards } =
  configSlice.actions;
export default configSlice.reducer;

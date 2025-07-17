import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    username: "username",
    total_time: 60,
    number_of_cards: 12,
    allowed_bad_guesses: 10,
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
    setAllowedBadGuesses(state, action) {
      return { ...state, allowed_bad_guesses: action.payload };
    },
  },
});

export const {
  setUsername,
  setTotalTime,
  setNumberOfCards,
  setAllowedBadGuesses,
} = configSlice.actions;
export default configSlice.reducer;

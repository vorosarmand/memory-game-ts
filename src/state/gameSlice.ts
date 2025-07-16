import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimalEmojis, animalEmojiType } from "../types/AnimalEmojiType";
import { shuffle } from "lodash";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    cards: [] as { id: number; type: animalEmojiType }[],
    turnedCardIds: [] as number[],
    matchedCardIds: [] as number[],
    ellapsed_time: 0,
    mistakes: 0,
    matches: 0,
    isCheckingMatch: false,
    isGameFinished: false,
  },
  reducers: {
    setCards(
      state,
      action: PayloadAction<{ id: number; type: animalEmojiType }[]>,
    ) {
      state.cards = action.payload;
    },

    turnCard(state, action: PayloadAction<number>) {
      const cardId = action.payload;

      // Prevent turning more cards if a check is in progress or if already turned 2
      if (state.isCheckingMatch || state.turnedCardIds.length === 2) {
        return;
      }

      // Prevent turning an already matched card
      if (state.matchedCardIds.includes(cardId)) {
        return;
      }

      // Only add if not already in turnedCardIds
      if (!state.turnedCardIds.includes(cardId)) {
        state.turnedCardIds.push(cardId);
      }
    },

    ellapseTime(state, action) {
      if (state.ellapsed_time < action.payload) state.ellapsed_time += 1;
      else state.isGameFinished = true;
    },

    checkMatch: (
      state,
      action: PayloadAction<{
        card1Type: animalEmojiType;
        card2Type: animalEmojiType;
        card1Id: number;
        card2Id: number;
      }>,
    ) => {
      state.isCheckingMatch = true;
      if (action.payload.card1Type === action.payload.card2Type) {
        state.matches += 1;

        state.matchedCardIds.push(
          action.payload.card1Id,
          action.payload.card2Id,
        );

        state.turnedCardIds = [];

        // Check for game finish
        if (state.matchedCardIds.length === state.cards.length) {
          console.log("finished");
          state.isGameFinished = true;
        }
      } else {
        state.mistakes += 1;
      }
    },
    clearTurnedCards: (state) => {
      state.turnedCardIds = [];
      state.isCheckingMatch = false;
    },
    resetGame: (state, action) => {
      state.turnedCardIds = [];
      state.matchedCardIds = [];
      state.ellapsed_time = 0;
      state.mistakes = 0;
      state.matches = 0;
      state.isCheckingMatch = false;
      state.isGameFinished = false;

      const numberOfCards = action.payload;
      const cardTypes = shuffle(AnimalEmojis).slice(0, numberOfCards);
      state.cards = shuffle([...cardTypes, ...cardTypes]).map((card, index) => {
        return { id: index, type: card };
      });
    },
  },
});

export const {
  setCards,
  turnCard,
  ellapseTime,
  checkMatch,
  clearTurnedCards,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;

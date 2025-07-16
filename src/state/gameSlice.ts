import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { animalEmojiType } from "../types/AnimalEmojiType";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    cards: [] as { id: number; type: animalEmojiType }[],
    turnedCardIds: [] as number[],
    matchedCardIds: [] as number[],
    mistakes: 0,
    matches: 0,
    isCheckingMatch: false,
  },
  reducers: {
    setCards(
      state,
      action: PayloadAction<{ id: number; type: animalEmojiType }[]>
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

    checkMatch: (
      state,
      action: PayloadAction<{
        card1Type: animalEmojiType;
        card2Type: animalEmojiType;
        card1Id: number;
        card2Id: number;
      }>
    ) => {
      state.isCheckingMatch = true;
      if (action.payload.card1Type === action.payload.card2Type) {
        state.matches += 1;

        state.matchedCardIds.push(
          action.payload.card1Id,
          action.payload.card2Id
        );

        state.turnedCardIds = [];
      } else {
        state.mistakes += 1;
      }
    },
    clearTurnedCards: (state) => {
      state.turnedCardIds = [];
      state.isCheckingMatch = false;
    },
  },
});

export const { setCards, turnCard, checkMatch, clearTurnedCards } =
  gameSlice.actions;
export default gameSlice.reducer;

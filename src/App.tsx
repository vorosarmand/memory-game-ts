import { faGear, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import Button from "./components/Button";
import Card from "./components/Card";
import GameFinishedPopup from "./components/GameFinishedPopup";
import SettingsPopup from "./components/SettingsPopup";
import Timer from "./components/Timer";
import {
  checkMatch,
  clearTurnedCards,
  resetGame,
  turnCard as turnCardAction,
} from "./state/gameSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";

function App() {
  const config = useAppSelector((state) => state.config);
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize cards
  useEffect(() => {
    dispatch(resetGame(config.number_of_cards));
  }, []);

  // Check for matches and mistakes
  useEffect(() => {
    // Only proceed if exactly two cards are turned and not already checking
    if (game.turnedCardIds.length === 2 && !game.isCheckingMatch) {
      const [id1, id2] = game.turnedCardIds;
      const card1 = game.cards.find((card) => card.id === id1);
      const card2 = game.cards.find((card) => card.id === id2);

      // If both cards are found, check for a match
      if (card1 && card2) {
        setTimeout(() => {
          dispatch(
            checkMatch({
              card1Type: card1.type,
              card2Type: card2.type,
              card1Id: card1.id,
              card2Id: card2.id,
            }),
          );
        }, 500);

        // If no match, clear after a short delay so user can see both cards
        setTimeout(() => {
          dispatch(clearTurnedCards());
        }, 500);
      }
    }
  }, [game.turnedCardIds, game.isCheckingMatch, game.cards, dispatch]);

  const handleCardClick = (cardId: number) => {
    // Click prevention
    if (!game.isCheckingMatch && game.turnedCardIds.length < 2) {
      dispatch(turnCardAction(cardId));
    }
  };

  const handleResetGame = () => {
    dispatch(resetGame(config.number_of_cards));
  };

  return (
    <main className="h-full w-full px-[50px] py-[30px]">
      <div className="m-auto w-full max-w-[1080px]">
        <header className="flex h-60 w-full items-center justify-between">
          <div>
            <img src={logo} alt="memory game logo" />
          </div>
          <Timer />
          <div className="flex h-[44px] items-center gap-5">
            <Button icon={faGear} onClick={() => setIsSettingsOpen(true)} />
            <div className="h-full w-px bg-[#D5D5D5]"></div>
            <Button icon={faRepeat} onClick={handleResetGame} />
          </div>
        </header>
        <div className="flex w-full flex-wrap justify-center gap-5 rounded-xl bg-[#F5F5F5] px-[30px] py-[35px] lg:px-[55px] lg:py-[50px]">
          {game.cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              isTurned={
                game.turnedCardIds.includes(card.id) ||
                game.matchedCardIds.includes(card.id)
              }
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
      <SettingsPopup isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      <GameFinishedPopup
        isOpen={game.isGameFinished}
        onPlayAgain={handleResetGame}
        hasWon={game.matches === game.cards.length / 2}
        username={config.username}
      />
    </main>
  );
}

export default App;

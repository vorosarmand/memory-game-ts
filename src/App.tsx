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
  setGamePaused,
  turnCard as turnCardAction,
} from "./state/gameSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { useMediaQuery } from "react-responsive";

function App() {
  const config = useAppSelector((state) => state.config);
  const game = useAppSelector((state) => state.game);
  const isLargeBreakpoint = useMediaQuery({ minWidth: 860 });
  const dispatch = useAppDispatch();

  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

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

  const handleSettingsOpen = () => {
    dispatch(setGamePaused(true));
    setIsSettingsOpen(true);
  };

  const handleResetGame = () => {
    dispatch(resetGame(config.number_of_cards));
  };

  return (
    <main className="h-full w-full px-[50px] py-[30px]">
      <div className="m-auto w-full max-w-[1080px]">
        <header className="mb-[30px] flex w-full flex-col items-center gap-5">
          <div className="flex w-full items-center justify-between">
            <div>
              <img src={logo} alt="memory game logo" />
            </div>
            {isLargeBreakpoint && (
              <div className="hidden lg:block">
                <Timer />
              </div>
            )}
            <div className="flex h-[44px] items-center gap-5">
              <Button icon={faGear} onClick={handleSettingsOpen} />
              <div className="h-full w-px bg-[#D5D5D5]"></div>
              <Button icon={faRepeat} onClick={handleResetGame} />
            </div>
          </div>
          {!isLargeBreakpoint && <Timer />}
        </header>
        <div className="flex w-full flex-wrap justify-center gap-2.5 rounded-xl bg-[#F5F5F5] px-[30px] py-[35px] md:px-[55px] md:py-[50px] lg:gap-5">
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
      <SettingsPopup
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        hideCloseButton={game.isGameStarted !== true}
      />
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
